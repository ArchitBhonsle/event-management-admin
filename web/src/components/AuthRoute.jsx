import { Redirect, Route } from "react-router-dom";
import useUser from "../utils/useUser";

export default function AuthRoute({ component: Component, rest }) {
  const { user } = useUser();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
}
