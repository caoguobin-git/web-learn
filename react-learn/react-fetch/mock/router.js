const express = require("express");
const router = express.Router();

router.get("/api/list", (req, res) => {
    res.send([
        {
            name: 'iwen',
            age: 23,
            sex: '男'
        },
        {
            name: 'iwen',
            age: 23,
            sex: '男'
        }
    ])
});
module.exports = router;