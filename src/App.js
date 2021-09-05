import { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useAppContext } from './context/index';
import Loader from './components/Loader';

const Main = lazy(() => import("./pages/Main"));
const Forecast = lazy(() => import("./pages/Forecast"));

function App() {
  const {active} = useAppContext();

  return (
    <Switch>
      <Suspense fallback={<Loader />}>
        <Route path="/" exact><Main /></Route>
        <Route path="/forecast">
          {active ? <Forecast /> : <Redirect to="/" />}
        </Route>
      </Suspense>
    </Switch>
  );
}

export default App;
