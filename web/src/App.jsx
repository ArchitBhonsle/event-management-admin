import { Switch, Route, Redirect } from "react-router-dom";

import AuthRoute from "./components/AuthRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import Users from "./pages/Users";

function App() {
  return (
    <Switch>
      <Route path='/login'>
        <Login />
      </Route>
      <Route exact path='/'>
        <Redirect to='/dashboard' />
      </Route>
      <AuthRoute path='/dashboard' component={Dashboard} />
      <AuthRoute path='/users' component={Users} />
      <AuthRoute path='/events' component={Events} />
    </Switch>
  );
}

export default App;
