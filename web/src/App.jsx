import { Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/'>
        <Layout>Hello World</Layout>
      </Route>
    </Switch>
  );
}

export default App;
