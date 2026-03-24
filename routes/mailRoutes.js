const express = require("express");
const router = express.Router();
const upload = require("multer")({ dest: "uploads/" });

const { sendMailPage, sendMail } = require("../controllers/mailController");

router.get("/", sendMailPage);
router.post("/send", upload.single("file"), sendMail);

module.exports = router;