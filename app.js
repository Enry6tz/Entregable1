const express = require('express')
const path = require('path')


const productsRouter = require('./src/routes/products.router')
const cartsRouter = require('./src/routes/carts.router')
const app = express()
const PORT= 8080

//midleworld
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.get('/',(req, res) =>{
    res.sendFile(path.join(__dirname, './src/public', 'index.html'))
})

//listen
app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`)
})