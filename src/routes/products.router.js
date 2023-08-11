const express = require('express')
const router = express.Router()

router.get('/api/products', (req,res) =>{
    res.json('desde productos')
})

module.exports = router