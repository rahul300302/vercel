const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt=require("bcrypt")
const User=require("./model")

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.set('debug', true);
mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB Connected Successfully"))
  .catch((err) => console.error("DB Connection Error:", err));

app.get("/",(req,res)=>{
    res.send("hihihihihihihi")
})
app.get("/signin", async(req, res) => {
    try {
        const {email ,password}= req.body
        const hashedPassword = await bcrypt.hash(password.toString(), 12);
        console.log(email);
        const find = await User.find({ email: email })
        if (find.length > 0) {
          let id = find[0]._id.toString()
          res.status(401).json({
            result: false,
            message: 'User Email Already exits ',
            id: find
          });
        } else {
          const user = await User.create({ email: email, password: hashedPassword });
        //   const token = jwt.sign({ id: user._id.toString() },process.env.JWT_SECRET, { expiresIn: '12h' });
          await user.save();
          res.status(201).json({ resulr: true, message: 'User uploaded successfully',data:user });
        }
      } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
});

app.post("/hello", async(req, res) => {
    try {
        const {email ,password}= req.body
        const hashedPassword = await bcrypt.hash(password, 12);
        console.log(email);
        const find = await User.find({ email: email })
        if (find.length > 0) {
          let id = find[0]._id.toString()
          res.status(401).json({
            result: false,
            message: 'User Email Already exits ',
            id: find
          });
        } else {
          const user = await User.create({ email: email, password: hashedPassword });
        //   const token = jwt.sign({ id: user._id.toString() },process.env.JWT_SECRET, { expiresIn: '12h' });
          await user.save();
          res.status(201).json({ resulr: true, message: 'User Created successfully',data:user });
        }
      } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



// # MONGODB_URL="mongodb+srv://rahulseaboss:GrI2a54mXyf8kU84@mongodb.1tejc.mongodb.net/"


// # mongodb+srv://rahulseaboss:GrI2a54mXyf8kU84@mongodb.1tejc.mongodb.net/
// # GrI2a54mXyf8kU84
// # Ga50HTV3nHP