import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RequireLogout(props) {
  let isLogged = useSelector((state) => state.isLogged.isLogged);
  console.log("isLogged", isLogged);

  if (isLogged) {
    return <Navigate to="/"></Navigate>;
  }

  return props.children;
}
