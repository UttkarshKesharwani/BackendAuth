import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { validEmail } from "../Utils/ValidatingFormData";

const ForgetPassword = () => {
  const [resetEmail, setResetEmail] = useState({
    email: "",
  });
  const [errMessage, setErrMessage] = useState(null);
  // const navigate = useNavigate();
  

  const handleForgetPasswordSumbit = async (e) => {
    e.preventDefault();
    const data = await fetch("http://localhost:3000/api/forgetPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resetEmail),
    });

    const errorData = await data.json();
    if (!data.ok) {
      console.log("ok data");
      console.log(errorData);
    } else {
      console.log(errorData);
      alert(errorData.msg);
      if(errMessage){
        alert("Enter valid Email")
      }else{
        // navigate("/login")
      }
    }
  };

  const validatingEmail = ({ email }) => {
    const message = validEmail(email);
    setErrMessage(message);
  };

  return (
    <div className=" rounded-lg max-w-80 mx-auto bg-gray-200 mt-20 px-10 py-5">
      <div>
        <div className="text-center mb-30">
          <h1 className="font-bold text-2xl">Trouble Logging In?</h1>
          <h6 className="text-md mt-2 font-semibold">
            Enter your email and we will send you a link to get back into your
            account
          </h6>
        </div>
        <div className="">
          <form action="" onSubmit={handleForgetPasswordSumbit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              value={resetEmail.email}
              placeholder="Email . . ."
              onChange={(e) => {
                setResetEmail({ ...resetEmail, email: e.target.value });
                // console.log(resetEmail);
              }}
              className="border  w-full rounded-lg border-blue-200 px-2 py-1 mt-1"
            />
            <p className="font-bold text-red-600 mx-1 ">{errMessage}</p>

            <button
              onClick={() => validatingEmail(resetEmail)}
              className="border bg-gray-900 text-white border-black px-2 py-1 rounded-lg mt-3"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
