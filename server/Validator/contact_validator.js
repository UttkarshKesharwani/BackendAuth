const z = require("zod");

const zodContact = z.object({
  username: z
    .string({ required_error: "username Cannot blank" })
    .trim()
    .min(3, { message: "username must be atleast of 3 character" }),
  email: z
    .string({ required_error: "email cannot be blank" })
    .trim()
    .email()
    .min(3, { message: "email must be atleast 3 char" }),
  message: z
    .string({ required_error: "message cannot be blank" })
    .trim()
    .min(10, { message: "message must of 10 words" })
    .max(50, { message: "message connot excceds more than 50 words" }),
});


module.exports=zodContact;