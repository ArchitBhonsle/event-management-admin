import { Switch, Route, Redirect } from "react-router-dom";

import AuthRoute from "./components/AuthRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import Users from "./pages/Users";

import UserLoader from "./components/UserLoader";

function App() {
  return (
    <UserLoader>
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
    </UserLoader>
  );
}

export default App;
