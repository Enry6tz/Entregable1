const express = require('express')
const router = express.Router()

// array de productos
const products = []

//ruta para todos los productos
router.get('/api/products', (req,res) =>{
    res.json({products})
})

router.get('/api/products/:pid', (req, res) => {
    const pid = parseInt (req.params.pid)
    console.log(pid)

    const product = products.find((product) => product.id === pid)

    if (!product){
        return res.status(404).json({error: 'producto no encontrado.'})
    }

    return res.json(product)
})

router.post('/api/products', (req,res) => {
    res.send("hola buenas")
})

module.exports = router