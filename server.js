const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt=require("bcrypt")
const User=require("./model")

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Database connection
mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB Connected Successfully"))
  .catch((err) => console.error("DB Connection Error:", err));

// Default route
app.get("/", async(req, res) => {
    try {
        const email  = "abced@123"
        const password="99665655"
        const hashedPassword = await bcrypt.hash(password, 12);
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
          res.status(201).json({ resulr: true, message: 'User created successfully',data:user });
        }
      } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
});

// 404 fallback
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
