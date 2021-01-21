import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Users from './pages/Users';
import useUser from './utils/useUser';

function App() {
  useUser();

  return (
    <Switch>
      <Route path='/login'>
        <Login />
      </Route>
      <Route exact path='/'>
        <Redirect to='/dashboard' />
      </Route>
      <Route path='/dashboard'>
        <Dashboard />
      </Route>
      <Route path='/users'>
        <Users />
      </Route>
      <Route path='/events'>
        <Events />
      </Route>
    </Switch>
  );
}

export default App;
