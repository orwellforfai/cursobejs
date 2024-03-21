import {promises as fs} from 'fs';




class CartManager {
    constructor(path) {
        this.carts = [];   // propiedad carts que arranca como array vacío
        this.path = path;  // propiedad path que recibe el path de los carritos
        this.ultId = 0;     // propiedad ultId que arranca en 0


        //dentro del constructor, en cada instancia de CartManager, se debe leer el archivo de carritos y cargarlo
        this.cargarCarrito()

    }

    async crearCarrito() {
        const nuevoCarrito = {
            id: this.ultId + 1,
            timestamp: Date.now(),
            products: []
        }
        this.carts.push(nuevoCarrito)
        this.ultId++
        // hay que guardarlo en el archivo
        await this.guardarCarritos()
        return nuevoCarrito

    }

    async cargarCarrito() {
        try {
            const data = await fs.readFile(this.path, 'utf-8')
            this.carts = JSON.parse(data)
            if (this.carts.length > 0) {                                    // verifico si hay algo en el array carts
                this.ultId = Math.max(...this.carts.map(cart => cart.id))  // si hay algo, busco el id más alto y lo guardo en ultId

            }
        } catch (error) {
            console.log("Error", error)
            // si no existe el archivo debo crearlo
            // al iniciarlizar el carrito no esta creado, por eso se ejecuta esta linea
            await this.guardarCarritos()
        }

    }


    async guardarCarritos() {
        await fs.writeFile(this.path, JSON.stringify(this.carts, null,2 ))

    }

    async getCarritoById(carritoId) {
        try {

            const carrito = this.carts.find(cart => cart.id === carritoId)
            if (!carrito) {
                return {
                    error: 'carrito no encontrado'

                }
            }

        } catch (error) {
            console.log("Error", error)
        }

    }

    async agregarProductoAlCarrito(carritoId, productoId, cantidad) {
        const carrito = await this.getCarritoById(carritoId)
        const existeProducto = carrito.products.find(product => product.id === productoId)
        if (existeProducto) {
            existeProducto.cantidad += cantidad
        } else {
            carrito.products.push({id: productoId, cantidad: cantidad})
        }
        await this.guardarCarritos()
        return carrito

    }

}

export default CartManager;
