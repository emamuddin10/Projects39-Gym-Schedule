import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import ErrorPage from "../pages/ErrorPage";
import AddSchedule from "../pages/AddSchedule";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";


const router =createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout></HomeLayout>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
          path:'/',
          element:<Home></Home>
        },
        {
          path:"addSchedule",
          element:<AddSchedule></AddSchedule>
        }
      ]
    },
    {
      path:'/singIn',
      element:<SignIn></SignIn>
    },
    {
      path:'/signUp',
      element:<SignUp></SignUp>
    }
  ])


export default router;