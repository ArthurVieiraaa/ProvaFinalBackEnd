const database = require("./config/database");
const express = require("express");
const UserRoutes = require("./routes/userRoutes");
const CategoryRoutes = require("./routes/categoryRoutes");
const ProductRoutes = require("./routes/productRoutes");
const OrderRoutes = require("./routes/orderRoutes");
// const OrderProductRoutes = require("./routes/order-productRoutes");
const router = express();

console.log("Starting server...");

router.get('/', (req, res) => {
    res.send("Starting Page");
});

router.use('api/users', UserRoutes);
router.use('api/categories', CategoryRoutes);
router.use('api/products', ProductRoutes);
router.use('api/orders', OrderRoutes);
// router.use('api/order-products', OrderProductRoutes);

database.db.sync({ force: false })
    .then(() => {
        app.listen(database.port, () => {
            console.log("Database synchronized successfully.");
        })
    })
    .catch((error) => {
        console.error("Error synchronizing database:", error);
    });