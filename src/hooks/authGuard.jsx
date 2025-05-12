import { Navigate, Outlet} from "react-router-dom";
import { useAuth } from "../hooks/authProvider";

const AuthGuard = ({ children }) => {
  const user = useAuth(); 
  if (!user.token) return (<Navigate to="/login"/>);
  return (<Outlet/>);
};

export default AuthGuard;