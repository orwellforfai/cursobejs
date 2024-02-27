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
            console.log('Producto agregado correctamente')
        }

    }

    getProducts() {
        return console.log(" Muestro el contenido del archivo Productos", this.products)
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            console.log(`Error: No se encontró el producto con el id ${id}`);
            return;
        }
        console.log("Muestro el producto con el id", id);
        return product;
    }
}

const product = new ProductManager()
product.getProducts()
product.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin Imagen", "abc123", 25)
product.getProducts()
product.getProductById(25)