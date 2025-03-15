const express = require("express");
const dotenv = require("dotenv");
const fileRoutes = require("./routes/fileRoutes");

dotenv.config(); // Load .env file

const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json()); // Use built-in express JSON parser  

app.use("/", fileRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
