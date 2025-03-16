const axios = require("axios");
const { log } = require("console");
const fs = require("fs");
const { console } = require("inspector");
const path = require("path");
const dotenv = require("dotenv").config();

const CONTAINER_2_URL = process.env.CONTAINER_2_URL;
const FILE_DIRECTORY = path.resolve(__dirname, process.env.FILE_DIRECTORY);

const fileExists = (file) => fs.existsSync(path.join(FILE_DIRECTORY, file));
console.log("File exists:", fileExists("file.dat"));
console.log("hello")
const writeFile = (filePath, data) => {
  fs.writeFileSync(filePath, data);
};

const calculate = async (req, res) => {
    const { file, product } = req.body;
  
    if (!file || !product) {
      return res.status(400).json({ file: null, error: "Invalid JSON input." });
    }
  
    const filePath = path.join(FILE_DIRECTORY, file);
    if (!fileExists(file)) {
      return res.status(404).json({ file, error: "File not found." });
    }
    try {
      const response = await axios.post(CONTAINER_2_URL, { file, product });
  
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(500).json({ file,error: "Server error." });
    }
  };

const storeFile = (req, res) => {
    const { file, data } = req.body;
  
    if (!file) {
      return res.status(400).json({ file: null, error: "Invalid JSON input." });
    }
  
    const filePath = path.join(FILE_DIRECTORY, file);
  
    let newData = data?.replaceAll(" ", "") || data;
  
    try {
      writeFile(filePath, newData);
      
      return res.status(200).json({ file, message: "Success." });
    } catch (error) {
      return res
        .status(500)
        .json({ file, error: "Error while storing the file to the storage." });
    }
};

module.exports = { storeFile, calculate };
