import express from "express";
import CartManager from '../controllers/cart.js';

const router = express.Router();

const cartManager = new CartManager("./src/models/cart.json")


//rutas
router.get('/carts/:id', async (request, response) => {
    const id = parseInt(request.params.id)
    try {
        const carrito = await cartManager.getCarritoById(id)
        console.log("carrito", carrito)
        response.send(carrito)

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

router.post('/carts/:id/product/:id_producto', async (request, response) => {
    const id = parseInt(request.params.id)
    const id_producto = parseInt(request.params.id_producto)

    let cantidad = parseInt(request.body.cantidad)
//    if (!cantidad) {
  //   cantidad = 1
    //     }
    try {
        const actualizarCarrito = await cartManager.agregarProductoAlCarrito(id, id_producto, cantidad)
        response.send(actualizarCarrito)


    } catch (error) {
        console.log("Error", error)
        response.send("Error")
    }
})
export default router;