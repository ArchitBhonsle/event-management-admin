import { Switch, Route, Redirect } from 'react-router-dom';

import AuthRoute from './components/AuthRoute';
import Login from './pages/Login';
import Events from './pages/Events';
import Users from './pages/Users';
import Payments from './pages/Payments';
import Details from './pages/Details';

import FetchAdmin from './components/FetchAdmin';
import Layout from './components/Layout';

function App() {
  return (
    <FetchAdmin>
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
          <AuthRoute path='/payments' component={Payments} />
          <AuthRoute path='/details' component={Details} />
        </Switch>
      </Layout>
    </FetchAdmin>
  );
}

export default App;
