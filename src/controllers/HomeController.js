class HomeController {
    constructor() {

    }

    homepage(req, res, next) {
        return res.render("index", {
            containerId: "homeContainer",
            listScripts: [
                {
                    path: "home/home.process.js",
                    type: "module",
                }
            ]
        })
    }
}

module.exports = new HomeController();