const express = require('express');
const router = express.Router();

let cartIdCounter = 1; // Inicializa el contador en 1

const carts = [];

router.post('/', (req, res) => {
    const newCart = {
        id: cartIdCounter++, // Usa el contador y luego incrementa
        products: []
    };
    carts.push(newCart);
    res.json(newCart);
});




module.exports = router;
