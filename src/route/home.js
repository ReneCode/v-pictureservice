
var express = require('express');
var router = express.Router();

router.get("/", (req, res) => {
	res.send("v picture service");
})

module.exports = router;

