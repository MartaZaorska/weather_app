import { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import Loader from './components/Loader';

const Main = lazy(() => import("./pages/Main"));
const Forecast = lazy(() => import("./pages/Forecast"));

function App() {
  return (
    <Switch>
      <Suspense fallback={<Loader />}>
        <Route path="/" exact><Main /></Route>
        <Route path="/forecast"><Forecast /></Route>
      </Suspense>
    </Switch>
  );
}

export default App;
