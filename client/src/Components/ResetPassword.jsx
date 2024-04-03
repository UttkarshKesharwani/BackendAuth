import { useState } from "react";
import { validatingResetPassword } from "../Utils/ValidatingFormData";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errMessage, setErrMessage] = useState(null);

  const { id, token } = useParams();

  const validatePassword = ({ newPassword, confirmPassword }) => {
    const message = validatingResetPassword(newPassword, confirmPassword);
    setErrMessage(message);
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (errMessage) {
      alert("please enter alphanumeric password");
    } else {
      if (password.newPassword === password.confirmPassword) {
        const data = await fetch(
          `http://localhost:3000/api/resetPassword/${id}/${token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            //!  In HTTP POST requests, parameters are typically sent in the request body rather than in the URL path.
            // ! Therefore, you won't directly access parameters from req.params in a POST request as you would in a GET request.
            // !  body: JSON.stringify(password),
            
            body: JSON.stringify({
              ...password,
              id: id,
              token: token,
            }),
           
          }
        );
        console.log(data);
        const json = await data.json();
        console.log(json);
      } else {
        alert("Password doesn't matches");
      }
    }
  };

  const handlePassword = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  console.log(password);
  return (
    <div className="px-10 py-5">
      <form
        onSubmit={handleResetPasswordSubmit}
        action=""
        method="post"
        className="flex flex-col"
      >
        <label>Password:</label>
        <input
          className="border border-black rounded-lg px-2 py-1 w-60 my-1"
          placeholder="Password"
          type="password"
          name="newPassword"
          value={password.newPassword}
          onChange={handlePassword}
        />
        <label>Confirm Password:</label>
        <input
          className="border border-black rounded-lg px-2 py-1 w-60 my-1"
          placeholder="Confirm Password"
          type="password"
          name="confirmPassword"
          value={password.confirmPassword}
          onChange={handlePassword}
        />
        <p className="text-red-600 font-semibold my-1">{errMessage}</p>
        <button
          onClick={() => validatePassword(password)}
          className="border border-black px-2 py-1 w-20  mt-2 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
