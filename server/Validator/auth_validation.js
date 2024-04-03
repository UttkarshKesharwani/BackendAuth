const z = require("zod");

const zodSchema = z.object({
  username: z
    .string({ required_error: "username must be string" })
    .trim()
    .min(3, { message: "Name must be atleast of 3 char" })
    .max(50, { message: "Name must be inside 50 char" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,{message : "enter valid mail"})
    .min(3, { message: "Email must alteast of 3 characters" })
    .max(50, { message: "Email must be under 50 char" }),
  phone: z
    .string({ required_error: "Phone no is required" })
    .trim()
    .min(10, { message: "Phone no must be of 10 character" }),
});

module.exports = zodSchema;
