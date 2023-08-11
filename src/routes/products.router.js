const express = require('express')
const router = express.Router()


//array de productos
const products =[]

//funcion auxiliar para generar ID
function generateUniqueId(){
    return Date.now().toString();
}


//ruta para obtener todos los productos
router.get('/', (req,res) =>{
    res.json({ products })
    res.status(200)
})

// producto con id especifico
router.get('/:pid', (req,res) =>{
    const pid =parseInt(req.params.pid)
    const product = products.find ((product) => product.id === pid)

    if (!product){
        return res.status(404).json({error: 'producto no encontrado'})
    }else{
        res.status(200).json({ message: 'Producto encontrado' })
        return res.json(product)
    }

})

// Ruta para actualizar un producto por su ID
router.put('/:pid', (req, res) => {
    const pid = parseInt(req.params.pid); // Obtener el ID del producto de los parámetros de la solicitud
    const updateFields = req.body; // Obtener los campos a actualizar del cuerpo de la solicitud

    // Validar si se proporcionaron campos para actualizar
    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ error: 'Ingresar al menos un campo para actualizar' });
        // Si no se proporcionaron campos, responder con un error 400 Bad Request
    }

    // Encontrar el índice del producto en el arreglo basado en su ID
    const productIndex = products.findIndex((product) => product.id === pid);

    if (productIndex === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
        // Si el producto no se encuentra (índice es -1), responder con un error 404 Not Found
    }

    // Actualiza el objeto que esta en el indice encontrado con los nuevo valores
    products[productIndex] = {
        ...products[productIndex], // Mantener los campos originales del producto
        ...updateFields // Actualizar con los nuevos valores proporcionados en updateFields
    };

    return res.json(products[productIndex]); // Responder con el producto actualizado
});



//ruta para agregar un nuevo producto
router.post('/',(req,res) => {
    const newProduct = req.body // Accede a los datos enviados en el cuerpo de la solicitud
    products.push(newProduct) // Agrega el nuevo producto al arreglo de productos
    console.log(products)
    res.status(200).json({ message: 'Producto agregado correctamente' })
});


// Ruta para eliminar un producto por su ID
router.delete('/api/products/:pid', (req, res) => {
    const pid = parseInt(req.params.pid); // Obtener el ID del producto de los parámetros de la solicitud

    // Encontrar el índice del producto en el arreglo basado en su ID
    const productIndex = products.findIndex((product) => product.id === pid);

    if (productIndex === -1) {
        return res.status(404).json({ error: "Producto no encontrado" });
        // Si el producto no se encuentra (índice es -1), responder con un error 404 Not Found
    } else {
        const deletedProduct = products.splice(productIndex, 1); // Eliminar el producto del arreglo
        return res.status(200).json({ message: `Producto encontrado y eliminado correctamente ${deletedProduct[0]}` });
        // Responder con un mensaje de éxito indicando el producto eliminado
    }
});

module.exports = router