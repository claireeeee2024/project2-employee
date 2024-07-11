import bcrypt from "bcryptjs";
const users = [
  {
    username: "hrtest",
    password: bcrypt.hashSync("123456", 10),
    email: "hr@email.com",
    role: "hr",
    personalInfo: {
      firstName: "Jane",
      lastName: "Smith",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
export default users;
