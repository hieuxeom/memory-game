class InventoryController {
    constructor() {
        this.index = this.index.bind(this)
    }

    index(req, res, next) {
        return res.render("inventory/index", {
            containerId: "siteContainer",
            title: "Inventory",
            buttonBackRef: "/",
            listScripts: [
                {
                    path: "inventory/inventory.process.js",
                    type: "module",
                }
            ]
        })
    }
}

module.exports = new InventoryController();