const fs = require('fs');
const filename = 'productos.json';

class ProductManager {
    products = []

    constructor() {
        this.products = [];

    }

    generateID = () => {
        if (this.products.length === 0) return 1
        return this.products[this.products.length - 1].id + 1
    }

    addProduct(title, description, price, image, code, stock) {
        const id = this.generateID()
        console.log(" id a agregar", id)
        const product = {id, title, description, price, image, code, stock}

        // Valido que el producto tenga todos los campos
        if (!title || !description || !price || !image || !code || !stock) {
            return console.log('Error: Todos los campos son obligatorios')
        }

        //Valido que el producto ingresado no exista
        const productExists = this.products.some((product) => product.code === code)
        if (productExists) {
            return console.log('Error: El producto ya existe')
        } else {
            this.products.push(product)
            fs.writeFileSync(filename, JSON.stringify(this.products, null, '\t'))
            console.log('Producto agregado correctamente')
        }

    }

    getProducts() {
        return JSON.parse(fs.readFileSync(filename, 'utf-8'))
    }

    getProductById(id) {
        const products = this.getProducts()
        const product = products.find(product => product.id === parseInt(id))
        if (!product) {
            console.log(`Error: No se encontró el producto con el id ${id}`);
        }else
        {
            console.log("Muestro el producto con el id", id);
            return product
        }
    }

    updateProduct = (id, title, description, price, image, code, stock) => {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            console.log(`Error: No se encontró el producto con el id ${id}`);
            return;
        }
        const newProduct = {id, title, description, price, image, code, stock}
        this.products = this.products.map((product) => product.id === id ? newProduct : product)
        fs.writeFileSync(filename, JSON.stringify(this.products, null, '\t'))
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

// Exporto la clase ProductManager para poder ser usada en el archivo index.js. Esto resuelve el error TypeError: ProductManager is not a constructor
module.exports = ProductManager