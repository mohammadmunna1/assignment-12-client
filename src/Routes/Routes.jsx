import {
  createBrowserRouter
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Login/Register";
import Classes from "../Pages/Classes/Classes";
import Instructors from "../Pages/Instructors/Instructors";
import Dashboard from "../Layout/Dashboard/Dashboard";
import AdminHome from "../Dashboard/Admin/AdminHome";
import StudentHome from "../Dashboard/Student/StudentHome";
import InstructorHome from "../Dashboard/Instructor/InstructorHome";
import ManageClasses from "../Dashboard/Admin/ManageClasses";
import ManageUsers from "../Dashboard/Admin/ManageUsers";
import AddAClass from "../Dashboard/Instructor/AddAClass";
import MyClasses from "../Dashboard/Instructor/MyClasses";
import SelectedClasses from "../Dashboard/Student/SelectedClasses";
import EnrolledClasses from "../Dashboard/Student/EnrolledClasses";
import Payment from "../Dashboard/Student/Payment/Payment";
import UserRoleRoute from "./UserRoleRoute";
import PaymentHistory from "../Dashboard/Student/PaymentHistory";
import Profile from "../Pages/Profile/Profile";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/classes',
        element: <Classes></Classes>
      },
      {
        path: '/instructors',
        element: <Instructors></Instructors>
      },
      {
        path: '/profile',
        element: <Profile></Profile>
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    errorElement: <ErrorPage></ErrorPage>,
    children:[

      //Admin routes
      {
        path: 'adminHome',
        element: <AdminHome></AdminHome>
      },
      {
        path: 'manageClasses',
        element: <ManageClasses></ManageClasses>
      },
      {
        path: 'manageUsers',
        element: <ManageUsers></ManageUsers>
      },


      //Instructor routes
      {
        path: 'instructorHome',
        element: <InstructorHome></InstructorHome>
      },
      {
        path: 'addAClass',
        element: <AddAClass></AddAClass>
      },
      {
        path: 'myClasses',
        element: <MyClasses></MyClasses>
      },


      //Student routes
      {
        path: 'studentHome',
        element: <StudentHome></StudentHome>
      },
      {
        path: 'selectedClasses',
        element: <SelectedClasses></SelectedClasses>
      },
      {
        path: 'enrolledClasses',
        element: <EnrolledClasses></EnrolledClasses>
      },
      {
        path: 'payment/:id',
        element: <Payment></Payment>
      },
      {
        path: 'paymentHistory',
        element: <PaymentHistory></PaymentHistory>
      }
    ]

  }
]);

export default router;