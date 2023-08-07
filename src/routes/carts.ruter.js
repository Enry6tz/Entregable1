const express = require('express')
const router = express.Router()

router.get('/api/carts', (req,res) => {
    res.send("api carts")
})


module.exports = router