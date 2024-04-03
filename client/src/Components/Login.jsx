import { useState } from "react";
import { checkValidLoginData } from "../Utils/ValidatingFormData";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [loginDetail, setLoginDetail] = useState({
    email: "",
    password: "",
  });
  const [errMessage, setErrMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    setLoginDetail({
      ...loginDetail,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const data = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginDetail),
    });

    const errorData = await data.json();
 
    if (!data.ok) {
      console.log(errorData.msg);
      alert(errorData.msg);
    } else {
      console.log(errorData.msg);
      alert(errorData.msg);
      navigate("/home");
    }
  };

  const validatingLogin = ({ email, password }) => {
    const message = checkValidLoginData(email, password);
    // console.log(message);
    setErrMessage(message);
  };
  // console.log(loginDetail);
  return (
    <div className="max-w-5xl mx-auto flex items-center bg-gray-100 mt-10">
      <div className="w-2/5 px-10 py-5">
        <p className="font-bold text-2xl">Login Here</p>
        <form action="" onSubmit={handleLoginSubmit} className=" flex flex-col">
          <input
            className="px-2 py-1 my-2 border border-blue-300 rounded-r-lg"
            type="text"
            placeholder="Email"
            name="email"
            value={loginDetail.email}
            onChange={handleLogin}
          />
          <input
            className="px-2 py-1 my-2 border border-blue-300 rounded-lg"
            type="password"
            placeholder="Password"
            name="password"
            value={loginDetail.password}
            onChange={handleLogin}
          />
          <Link to={"/forgetPassword"} className="font-bold text-black mb-2">Forget Password?</Link>

          <p className="font-bold text-red-600 mb-2">{errMessage}</p>

          <button
            onClick={() => validatingLogin(loginDetail)}
            className="text-white py-1  rounded-lg bg-blue-300 w-4/12"
          >
            Login Now
          </button>
        </form>
      </div>
      <div className="w-3/5 text-center bg-blue-400 text-gray-100 py-28">
        <h1 className="text-xl">Nice to see you again</h1>
        <h1 className="text-4xl font-bold">WELCOME BACK</h1>
      </div>
    </div>
  );
};

export default Login;
