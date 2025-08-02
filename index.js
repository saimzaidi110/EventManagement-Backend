const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const ConnectDB = require("./config/db.js");
require('dotenv').config()


const UserRouter = require("./routes/UserRoutes");
const ProductRoutes = require("./routes/ProductRoutes");

const app = express();
ConnectDB();

// Enable CORS with credentials for frontend
app.use(cors({
  origin: "http://localhost:5173",  // Update if your frontend runs elsewhere
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/users", UserRouter);
app.use("/products", ProductRoutes);

// Home test
app.get('/', (req, res) => {
  res.send("Server is Running");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
