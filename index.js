const express = require('express');

const app = express();

const ProductManager = require('./src/productos');

app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Curso Backend')

})

app.get('/products', (req, res) => {
    const productManager = new ProductManager()
    let limit = req.query.limit;
    const products = productManager.getProducts()
    if (limit) {
        console.log("limit", limit)
        const data = products.slice(0, parseInt(limit))
        console.log("data", data)
        res.send(data);

    } else {
        res.send(products)
    }
})

app.get('/products/:id', (req, res) => {
    const productManager = new ProductManager()
    const id = req.params.id
    const data = productManager.getProductById(id)

    res.send({
        data
    })
})


app.listen(8080, () => {
    console.log('Servidor escuchando en http://localhost:8080')
})
