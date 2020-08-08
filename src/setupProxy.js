const proxy = require("http-proxy-middleware");

module.exports = function(app){
    app.use(
        proxy("/api/login", {
            target: "https://www.promo-to.it/v2",
            changeOrigin: true
        })
    );

    app.use(
        proxy("/events/**", {
            target: "https://www.promo-to.it/v2",
            changeOrigin: true
        })
    );

    app.use(
        proxy("/event/**", {
            target: "https://www.promo-to.it/v2",
            changeOrigin: true
        })
    );

    app.use(
        proxy("/user", {
            target: "https://www.promo-to.it/v2",
            changeOrigin: true
        })
    );

    app.use(
        proxy("/dashboard/**", {
            target: "https://www.promo-to.it/v2",
            changeOrigin: true
        })
    );

}