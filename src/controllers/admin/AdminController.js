class AdminController {
    index(req, res) {
        return res.redirect("/admin/card-themes")
    }

    analytics(req, res) {
        return res.render("admin/analytics/index", {
            containerId: "siteContainer",
            title: "Game Analytics",
            buttonBackRef: "/admin",
            listScripts: [
                {
                    path: "admin/analytics.index.js",
                    type: "module"
                }
            ]
        });
    }
}

module.exports = new AdminController();
