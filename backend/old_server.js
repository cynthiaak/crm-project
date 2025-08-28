const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());


// const users = [
//   { email: "test@gmail.com", password: "12345" }
// ];

// app.post("/login", (req, res) => {
//   const {email, password} = req.body;
//   const user = users.find(u => u.email === email && u.password === password);

//   if (user) {
//     res.status(200).json({ message: "Login successful", success: true });
//   } else {
//     res.status(401).json({ message: "Login failed", success: false });
//   }
// });
  app.post("/forgot-password", (req,res)=>{
  const {email}= req.body;
  const user= users.find(u=> u.email===email);
  if(!user){
    return res.json({message: "Password reset link sent to your email if account exists"});
  }

  });

const authRouter = require('./register');   
app.use('/auth', authRouter);

app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});