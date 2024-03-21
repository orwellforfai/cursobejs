import express  from "express";
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';

const app = express();




// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api', productsRouter);
app.use('/api', cartRouter);



app.listen(8080, () => {
    console.log('Servidor escuchando en http://localhost:8080')
})
