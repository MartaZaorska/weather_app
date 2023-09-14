import { useEffect } from "react";
import { Outlet, redirect, useActionData, useLoaderData, Link } from "react-router-dom"

export function Main() {
  const actionData = useActionData();
  const loaderData = useLoaderData();

  useEffect(() => {
    if(actionData) window.alert(actionData.message);
  }, [actionData]);

  return (
    <main>
      <Outlet context={loaderData} />
    </main>
  )
}

export function ErrorBoundary(){
  /*
  const error = useRouteError();
  console.log(error);
  */

  return (
    <div className="error">
      <p>Coś poszło nie tak.</p>
      <Link to="/">Wróć do strony głównej.</Link>
    </div>
  )
}

export async function loader(){
  const { getFromStorage } = await import("../utils");
  const storageData = getFromStorage("weather_react_app_mz") ?? [];
  const now = new Date().getTime();
  
  return storageData.map(item => now - item.updatedAt >= 60 * 60 * 1000 ? { ...item, current: undefined } : item);
}

export async function action({ request }){
  const formData = await request.formData();
  const city = formData.get("city");
  
  if(city === "") return { message: "Nazwa miasta jest wymagana" };

  //check in localStorage
  const { getFromStorage, saveInStorage, formatLocationData } = await import("../utils");

  const storageData = getFromStorage("weather_react_app_mz") ?? [];

  if(request.method === "DELETE"){
    saveInStorage("weather_react_app_mz", storageData.filter(item => item.id !== city));
    return redirect("/");
  }

  const location = storageData.find(item => item.city.toLowerCase() === city.toLowerCase());

  if(location) return redirect(`/${location.id}`);

  //fetch location
  const { fetchLocation } = await import("../services");

  let fetchData;

  try {
    fetchData = await fetchLocation(city);
  }catch(err){
    return { message: err.message }
  }

  if(!fetchData || fetchData?.length === 0) return { message: `Nie znaleziono miasta o nazwie "${city}"` };

  const data = formatLocationData(fetchData[0]);
  data.updatedAt = new Date().getTime();

  saveInStorage("weather_react_app_mz", [...storageData, data]);

  return redirect(`/${data.id}`);
};