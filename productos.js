const fs = require('fs');
const filename = 'productos.json';

class ProductManager {
    #products = []

    constructor() {
        this.#products = [];

    }

    #generateID = () => {
        if (this.#products.length === 0) return 1
        return this.#products[this.#products.length - 1].id + 1
    }

    addProduct(title, description, price, image, code, stock) {
        const id = this.#generateID()
        console.log(" id a agregar", id)
        const product = {id, title, description, price, image, code, stock}

        // Valido que el producto tenga todos los campos
        if (!title || !description || !price || !image || !code || !stock) {
            return console.log('Error: Todos los campos son obligatorios')
        }

        //Valido que el producto ingresado no exista
        const productExists = this.#products.some((product) => product.code === code)
        if (productExists) {
            return console.log('Error: El producto ya existe')
        } else {
            this.#products.push(product)
            fs.writeFileSync(filename, JSON.stringify(this.#products, null, '\t'))
            console.log('Producto agregado correctamente')
        }

    }

    getProducts() {
        //return console.log(" Muestro el contenido del archivo Productos", this.products)
        const contenido = fs.readFileSync(filename, 'utf-8');
        console.log("Muestro el contenido del archivo Productos", contenido)
    }

    getProductById(id) {
        //const product = this.products.find(product => product.id === id);
        const product = JSON.parse(fs.readFileSync(filename, 'utf-8')).find(product => product.id === id);
        if (!product) {
            console.log(`Error: No se encontró el producto con el id ${id}`);
            return;
        }
        console.log("Muestro el producto con el id", id);
        return product;
    }

    updateProduct = (id, title, description, price, image, code, stock) => {
        const product = this.#products.find(product => product.id === id);
        if (!product) {
            console.log(`Error: No se encontró el producto con el id ${id}`);
            return;
        }
        const newProduct = {id, title, description, price, image, code, stock}
        this.#products = this.#products.map((product) => product.id === id ? newProduct : product)
        fs.writeFileSync(filename, JSON.stringify(this.#products, null, '\t'))
        console.log('Producto actualizado correctamente')
    }

    deleteProduct = (id) => {
        const product = JSON.parse(fs.readFileSync(filename, 'utf-8'))
        product.find(product => product.id === id)
        if (!product) {
            console.log(`Error: No se encontró el producto con el id ${id}`);
            return;
        }
        const newProduct = product.filter(product => product.id !== id)
        fs.writeFileSync(filename, JSON.stringify(newProduct, null, '\t'))
        console.log('Producto eliminado correctamente')
    }
}


const product = new ProductManager()
product.getProducts()
product.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin Imagen", "abc123", 25)
product.getProductById(2)
product.updateProduct(1, "producto prueba actualizado", "Este es un producto prueba actualizado", 200, "Sin Imagen", "abc123", 25)
const product2 = new ProductManager()
product2.addProduct("producto prueba 2", "Este es un producto prueba 2", 400, "Sin Imagen 2", "cba123", 50)
product.deleteProduct(1)
//product.addProduct("producto prueba 3", "Este es un producto prueba 3", 600, "Sin Imagen 3", "bca123", 75)