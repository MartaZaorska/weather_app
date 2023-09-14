import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import Loader from './components/Loader';
import { Main, loader, action, ErrorBoundary } from './pages/Main';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Main />} loader={loader} action={action} errorElement={<ErrorBoundary />} shouldRevalidate={() => true}>
      <Route index lazy={() => import('./pages/Home')} />
      <Route path=":city" lazy={() => import("./pages/Forecast")} />
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router} fallbackElement={<Loader />} /> 
  )
}

export default App
