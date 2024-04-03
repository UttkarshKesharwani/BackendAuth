import { useState } from "react";
import { checkValidSignUpData } from "../Utils/ValidatingFormData";
import { useNavigate } from "react-router-dom";
import { RandomCaptcha } from "../Utils/Constants";

const SignUp = () => {
  const [detail, setDetails] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errMessage, setErrMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState(RandomCaptcha());

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //! The useNavigate hook returns a function that lets you navigate programmatically
  const navigate = useNavigate();

  const handleInput = (e) => {
    // console.log(e);
    // ! captcha yha swe ja rha hai
    setDetails({ ...detail, [e.target.name]: e.target.value });
  };

  const validatingSignUp = ({ username, email, phone, password }) => {
    const message = checkValidSignUpData(username, email, phone, password);
    //  console.log(message);
    setErrMessage(message);
  };
  console.log(errMessage);

  // ! handling form submission

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(detail),
      });
      console.log(response);

      const data = await response.json();

      if (!response.ok) {
        console.log(data.msg);
      } else {
        alert(data.msg);
        console.log(data.token);
        console.log(data.msg);
        localStorage.setItem("jwtToken", data.token);
      }

      // if (!errMessage) {
      //   // setDetails({
      //   //   username: "",
      //   //   email: "",
      //   //   phone: "",
      //   //   password: "",
      //   // });
      //   navigate("/login");
      // }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(detail);
  return (
    <div className="flex items-center max-w-5xl mx-auto mt-10  bg-gray-50">
      <div className="w-2/5 px-16">
        <h1 className="font-bold text-3xl mb-12">Registration form</h1>
        <form action="" onSubmit={handleSubmit} className="flex flex-col  ">
          <label htmlFor="">Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="border border-blue-400 px-2 py-1 my-2 rounded-lg"
            value={detail.username}
            onChange={handleInput}
          />
          <label htmlFor="">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border border-blue-400 px-2 py-1 my-2 rounded-lg"
            value={detail.email}
            onChange={handleInput}
          />
          <label htmlFor="">Phone:</label>
          <input
            type="number"
            name="phone"
            placeholder="Phone no"
            className="border border-blue-400 px-2 py-1 my-2 rounded-lg"
            value={detail.phone}
            onChange={handleInput}
          />
          <label htmlFor="">Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="border border-blue-400 px-2 my-2 py-1 rounded-lg"
            value={detail.password}
            onChange={handleInput}
          />
          <span
            onClick={handleShowPassword}
            className="cursor-pointer text-blue-600 underline text-sm"
          >
            show password?
          </span>
          <label htmlFor="captcha">Captcha:</label>
          <div className="flex justify-between ">
            <input
              type="number"
              name="captcha"
              onChange={handleInput}
              className="border border-blue-400 px-2 my-2 py-1 rounded-lg"
            />
            <p className="text-center">{captcha}</p>
          </div>
          <p className="font-bold text-red-600 mb-4">{errMessage}</p>
          <button
            type="submit"
            onClick={() => validatingSignUp(detail)}
            className="rounded-lg bg-blue-400 text-white px-2 py-1 w-1/4 mt-1"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="bg-blue-400 w-3/5 text-center text-white py-52 rounded-s-lg">
        <div>
          <h2 className="text-2xl">Glad to see you!</h2>
          <h3 className="text-2xl">Welcome to the Community</h3>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
