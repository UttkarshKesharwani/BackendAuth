export const checkValidSignUpData = (username, email, phone, password) => {
  console.log(username, email, phone, password);
  const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  const validPasswrord =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  const validNumber = /^\d{10}$/.test(phone);
  const validFirstName = /^[a-zA-Z]{2,30}$/.test(username);
  // console.log(validEmail,validFirstName,validNumber,validFirstName);
  if (!validEmail) return "Enter valid email";
  if (!validPasswrord) return "Enter AlphaNumeric password";
  if (!validNumber) return "Enter valid phone number";
  if (!validFirstName) return "Enter valid FirstName";

  return null;
};

export const checkValidLoginData = (email, password) => {
  const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  const validPasswrord =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  if (!validEmail) return "Enter valid email";
  if (!validPasswrord) return "Enter AlphaNumeric password";
  return null;
};

export const validEmail = (email) => {
  const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  if (!validEmail) return "Enter valid Email";
  return null;
};

export const validatingResetPassword = (password, confirmPassword) => {
  const newPassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  const finalPassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(confirmPassword);
    if(!newPassword ) return "Enter Alphanumeric Password"
    if(!finalPassword ) return "Enter Alphanumeric Password"
    return null ;

};
