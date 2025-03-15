const express = require("express");
const { storeFile, calculate } = require("../service/fileProcessing");

const router = express.Router();

router.post("/calculate", calculate);
router.post("/store-file", storeFile);

module.exports = router;
