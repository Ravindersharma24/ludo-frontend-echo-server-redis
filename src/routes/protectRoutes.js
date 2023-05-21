import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const Protected = ({ children }) => {
 const authenticated = useSelector(state => state.user.details.isAuthenticated);
 const authToken = localStorage.getItem("_token");
 if(authenticated === "loading" && authToken){
    return <div>Loading...</div>;
 }
 if (!authenticated || !authToken) {
    return <Navigate to="/login" replace />;
 }
 return children;
};
export default Protected;
