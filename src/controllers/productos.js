import fs from 'fs';
//const fs = require('fs');
const filename = './src/models/productos.json';

class ProductManager {
    products = []

    constructor() {
        this.products = [];

    }

    generateID = () => {
        let prod = this.getProducts()
        if (prod.length === 0) return 1
        return prod[prod.length - 1].id + 1
    }

    addProduct(title, description, price, image, code, stock) {
        const lista = this.getProducts()
        const id = this.generateID()
        console.log("muestro ID", id)
        const product = {id, title, description, price, image, code, stock}
        // Valido que el producto tenga todos los campos
        if (!title || !description || !price || !image || !code || !stock) {
            return console.log('Error: Todos los campos son obligatorios')
        }
        //Valido que el producto ingresado no exista
        const productExists = lista.some((product) => product.code === code)
        console.log("producto existe ?", productExists)
        if (productExists) {
            return console.log('Error: El producto ya existe')
        } else {
            lista.push(product)
            fs.writeFileSync(filename, JSON.stringify(lista, null, '\t'))
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
        } else {
            console.log("Muestro el producto con el id", id);
            return product
        }
    }

    updateProduct = (id, title, description, price, image, code, stock) => {
    //TODO ver que pasa con el update, me actualiza solo lo que le mando en el body, el resto queda vacio

        const list = this.getProducts()
        const product = list.findIndex((p) => p.id === parseInt(id))
        if (!product) {
            console.log(`Error: No se encontró el producto con el id ${id}`);
            return;
        }
        const newProduct = {id, title, description, price, image, code, stock}
        console.log(newProduct)
        fs.writeFileSync(filename, JSON.stringify(list.map((product) => product.id === parseInt(id) ? newProduct : product), null, '\t'))

    }

    deleteProduct = (id) => {
        const product = this.getProducts()
        const resultado = product.find(product => product.id === parseInt(id))
        console.log(resultado)
        if (!resultado) {
            console.log(`Error: No se encontró el producto con el id ${id}`);
            return;
        }
        const newProduct = product.filter(product => product.id !== parseInt(id))
        fs.writeFileSync(filename, JSON.stringify(newProduct, null, '\t'))
        console.log('Producto eliminado correctamente')
    }
}

// Exporto la clase ProductManager para poder ser usada en el archivo index.js. Esto resuelve el error TypeError: ProductManager is not a constructor
export default ProductManager;
