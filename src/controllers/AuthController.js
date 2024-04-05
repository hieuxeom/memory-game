class AuthController {

    index(req, res, next) {
        return res.render("auth/index", {
            containerId: "authContainer",
            class: "px-8 py-2",
            listScripts: [
                {
                    path: "auth/google/auth.google.js",
                    type: "module",
                },
            ],
        });
    }

    loginWithPassword(req, res, next) {
        return res.render("auth/login-password", {
            containerId: "authContainer",
            class: "px-8 py-2",
            listScripts: [
                {
                    path: "/auth/credentials/auth.credentials.js",
                    type: "module",
                },
            ],
        })
    }

    register(req, res, next) {
        return res.render("auth/register", {
            containerId: "authContainer",
            class: "px-8 py-2",
            listScripts: [
                {
                    path: "/auth/credentials/register.js",
                    type: "module",
                },
            ],
        })
    }

    signOut(req, res, next) {
        return res.render("auth/signout", {
            listScripts: [
                {
                    path: "/auth/signout.js",
                    type: "module",
                }
            ]
        })
    }
}

module.exports = new AuthController();
