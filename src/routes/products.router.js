import express from 'express';
import ProductManager from "../controllers/productos.js";

const router = express.Router();


const productManager = new ProductManager()

// Rutas
router.get('/', (request, response) => {
    response.send('Curso Backend')

})

router.get('/products', async (request, response) => {
    try {
        let limit = request.query.limit;
        const products = productManager.getProducts()
        if (limit) {
            const data = products.slice(0, parseInt(limit))
            response.send(data);

        } else {
            response.send(products)
        }
    } catch (error) {
        console.log("Error", error)
        response.send("Error")
    }
})

router.get('/products/:id', async (request, response) => {
    try {
        const id = request.params.id
        const data = productManager.getProductById(id)
        response.send({
            data
        })
    } catch (error) {
        console.log("Error", error)
        response.send("Error")
    }
})

router.post('/products', async (request, response,) => {
    try {
        const {title, description, price, image, code, stock} = request.body
        productManager.addProduct(title, description, price, image, code, stock)
        response.send('Producto agregado correctamente')
    } catch (error) {
        console.log("Error", error)
        response.send("Error")
    }
})

router.put('/products/:id', async (request, response) => {
    const id = request.params.id
  console.log("id a modificar", id)
 const updatedFields = request.body
   try {

     const data = await productManager.updateProduct(id, updatedFields)
        response.send({
            message: "Metodo PUT OK",
            data: data
        })
    } catch (error) {
      console.log("Error", error)
     response.send("Error")
    }
})

router.delete('/products/:id', async (request, response) => {
    try {
        const id = request.params.id
        const data = await productManager.deleteProduct(id)

        response.send({
            message: "Metodo DELETE OK",
            data: data
        })
    } catch (error) {
        console.log("Error", error)
        response.send("Error")
    }
})

export default router;