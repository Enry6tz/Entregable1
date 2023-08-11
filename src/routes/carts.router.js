const express = require('express');
const router = express.Router();

let cartIdCounter = 1; // Inicializa el contador en 1
const carts = [];

router.get("/carts", (req, res) => {
    res.json({ carrito });
});


router.get("/carts/:cid", (req, res) => {
  const cid = parseInt(req.params.cid);
  
  const carritofound = carts.find(cart => cart.id === cid);
  
  if (carritofound) {
    res.json({ status: "success", carritofound });
  } else {
    res.status(404).json({ status: "error", message: "Carrito no encontrado" });
  }
});


router.post('/', (req, res) => {
    const newCart = {
        id: cartIdCounter++, // Usa el contador y luego incrementa
        products: []
    };
    carts.push(newCart);
    res.json(newCart);
});

router.post("/carts/:cid/products/:pid", (req, res) => {
    try {
      const cid = parseInt(req.params.cid);
      const pid = parseInt(req.params.pid);
  
      const carrito = carts.find(cart => cart.id === cid);
      if (!carrito) {
        return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
      }
  
      // Simplemente agregamos el ID del producto al carrito
      carrito.products.push(pid);
      
      res.json({
        status: "success",
        message: "Producto agregado al carrito exitosamente.",
      });
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
      res
        .status(500)
        .json({ status: "error", message: "Error al agregar el producto al carrito." });
    }
  });
  



module.exports = router;







