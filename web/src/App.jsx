import { Switch, Route, Redirect } from 'react-router-dom';

import AuthRoute from './components/AuthRoute';
import Login from './pages/Login';
import Events from './pages/Events';
import Users from './pages/Users';

import UserLoader from './components/UserLoader';
import Layout from './components/Layout';

function App() {
  return (
    <UserLoader>
      <Layout>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route exact path='/'>
            <Redirect to='/users' />
          </Route>
          <AuthRoute path='/users' component={Users} />
          <AuthRoute path='/events' component={Events} />
        </Switch>
      </Layout>
    </UserLoader>
  );
}

export default App;
