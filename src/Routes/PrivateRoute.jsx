import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import UserRoleRoute from "./UserRoleRoute";


const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const [currentUser, userLoading]=  UserRoleRoute()
    const location= useLocation()

    if (loading || userLoading) {
        return <progress className="progress w-56"></progress>
    }
    if (user && currentUser){
        return children
    }
    
    return <Navigate to='/' state={{from: location}} replace></Navigate>
};

export default PrivateRoute;