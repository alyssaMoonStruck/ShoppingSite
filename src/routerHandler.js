const productRoutes = require("./app/Product/routes");
const cartRoutes = require('./app/Cart/routes')
const authRoutes = require('./app/Auth/auth')

module.exports = app => {
    app.use("/product", productRoutes);
    app.use("/cart", cartRoutes);
    app.use("/auth", authRoutes);
}
