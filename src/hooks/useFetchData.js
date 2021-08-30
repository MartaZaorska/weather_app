import { useState, useEffect } from "react";


const useFetchData = (url) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if(url){
      setLoading(true);
      fetch(url).then(res => res.json()).then(resData => {
        setData(resData);
        setLoading(false);
      }).catch(error => {
        setError(error);
        setLoading(false);
      });
    }
  }, [url]);

  return {data, loading, error};
}

export default useFetchData;