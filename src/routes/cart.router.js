import express from "express";
import CartManager from '../controllers/cart.js';

const router = express.Router();

const cartManager = new CartManager("./src/models/cart.json")


//rutas
router.get('/carts/:id', async (request, response) => {
    const id = parseInt(request.params.id)
    try {
        const carrito = await cartManager.getCarritoById(id)
        response.send(carrito.products)

    } catch (error) {
        console.log("Error", error)
        response.send("Error")
    }

})


router.post('/carts', async (request, response) => {
        try {

            const nuevoCarrito = await cartManager.crearCarrito()
            response.send(nuevoCarrito)


        } catch (error) {
            console.log("Error", error)
            response.send("Error")
        }

    }
)


export default router;