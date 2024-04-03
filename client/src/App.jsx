import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Body from "./Components/Body";
import ContactUs from "./Components/ContactUs";
import Home from "./Components/Home";
import Error from "./Components/Error";
import Login from "./Components/Login";
import AuthTokenContext from "./Utils/AuthTokenContext";
import ForgetPassword from "./Components/ForgetPassword";
import ResetPassword from "./Components/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    errorElement: <Error />,
    children: [
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/contact_us",
        element: <ContactUs />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgetPassword",
        element: <ForgetPassword />,
      },
    ],
  },
  {
    path: "resetPassword/:id/:token",
    element: <ResetPassword />,
  },
]);

function App() {
  return (
    <>
      <AuthTokenContext.Provider
        value={{ token: localStorage.getItem("jwtToken") }}
      >
        <RouterProvider router={router} />
      </AuthTokenContext.Provider>
    </>
  );
}

export default App;
