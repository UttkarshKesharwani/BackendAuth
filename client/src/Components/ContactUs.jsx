import {  useState } from "react";
// import AuthTokenContext from "../Utils/AuthTokenContext";

const ContactUs = () => {
  const [messageDetail, setMessageDetail] = useState({
    username: "",
    email: "",
    message: "",
  });
  const [errMessage, setErrMessage] = useState(null);

  // ! useContext Api is used to read the data provided by the provide(global place to store data)
  // const val = useContext(AuthTokenContext);
  // console.log(val.token);

  const handleMessage = (e) => {
    setMessageDetail({
      ...messageDetail,
      [e.target.name]: e.target.value,
    });
  };
  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    const data = await fetch("http://localhost:3000/api/contactUs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messageDetail),
    });
    console.log(data);
    const json = await data.json();
    console.log(json.msg);
    setErrMessage(json.msg)
    alert(json.msg)
  };
  // console.log(messageDetail);
  return (
    <div className="max-w-5xl mx-auto bg-gray-100 px-1 py-1">
      <div className="w-3/6 mx-auto px-10 py-10  ">
        <h1 className="text-2xl font-semibold mb-2">Have a Project in mind?</h1>
        <h1 className="text-2xl font-semibold mb-2">Let's Get in Touch</h1>
        <form
          action=""
          className="flex flex-col"
          onSubmit={handleMessageSubmit}
        >
          <label className="font-semibold" htmlFor="username">
            Username:
          </label>
          <input
            className="border my-2 border-black px-2 py-1 rounded-lg"
            type="text"
            placeholder="Username"
            name="username"
            value={messageDetail.username}
            onChange={handleMessage}
          />
          <label className="font-semibold" htmlFor="email">
            Email:
          </label>
          <input
            className="border my-2 border-black px-2 py-1 rounded-lg"
            type="email"
            name="email"
            placeholder="Email"
            value={messageDetail.email}
            onChange={handleMessage}
          />
          <label className="font-semibold" htmlFor="message">
            Message:
          </label>

          <textarea
            className="border my-2 border-black px-2 py-1 rounded-lg"
            placeholder="Type your text here . . . "
            name="message"
            id="message"
            cols="30"
            rows="10"
            value={messageDetail.message}
            onChange={handleMessage}
          ></textarea>
          <p className="font-bold text-red-600 mb-4">{errMessage}</p>

          <button className="bg-blue-500 px-4 py-2  text-white rounded-lg w-2/6">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
