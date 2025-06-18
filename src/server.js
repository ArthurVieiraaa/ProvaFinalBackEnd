const express = require("express");
const database = require("./config/database");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./docs/swagger');
const cors = require('cors');

// ROTAS
const UserRoutes = require("./routes/userRoutes");
const CategoryRoutes = require("./routes/categoryRoutes");
const ProductRoutes = require("./routes/productRoutes");
const OrderRoutes = require("./routes/orderRoutes");


app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/', (req, res) => {
    res.send("Starting Page");
});


app.use('/api/users', UserRoutes);
app.use('/api/categories', CategoryRoutes);
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

database.db.sync({ force: false })
    .then(() => {
        app.listen(database.port, () => {
            console.log(`Servidor rodando na porta ${database.port}`);
        });
    })
    .catch((error) => {
        console.error("Error synchronizing database:", error);
    });