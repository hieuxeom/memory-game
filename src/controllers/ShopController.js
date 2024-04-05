class ShopController {
    index(req, res, next) {

        let {tab} = req.query

        if (!tab) {
            tab = "card-themes"
        }

        return res.render(`shop/${tab}`, {
            containerId: "siteContainer",
            class: "px-8 py-2",
            title: "Vip Shop",
            buttonBackRef: "/",
            listScripts: [
                {
                    path: "shop/shop.process.js",
                    type: "module"
                }
            ]
        })
    }
}

module.exports = new ShopController();