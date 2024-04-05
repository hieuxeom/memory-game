const userModel = require("../../models/UserModel");

const bcrypt = require("bcrypt")
const saltRounds = 10

class ApiAuthController {
    async loginWithGoogle(req, res, next) {
        try {
            const { email } = req.body;

            const userData = await userModel.findOne({
                email
            });

            if (userData) {
                return res.status(203).json({
                    status: "success",
                    message: "This email address with Google Provider already exists",
                    data: {
                        userData
                    }
                });
            } else {
                const newUser = new userModel(userData);

                const userData = await newUser.save();

                return res.status(201).json({
                    status: "success",
                    message: "New user created successfully",
                    data: {
                        userData
                    }
                });
            }
        } catch (err) {
            return res.status(400).json({
                status: "error",
                message: "Have some problem",
                error: {
                    name: err.name,
                    message: err.message
                }
            });
        }

    }

    async credentialsRegister(req, res, next) {
        const { email, password } = req.body;

        const userData = await userModel.findOne({
            email
        });

        if (userData) {
            return res.status(404).json({
                status: "fail",
                message: "Email already exists! Please try again with different email!",
            });
        } else {
            let bcryptPwd = await bcrypt.hash(password, 10)
                .then(hash => {
                    return hash
                })
                .catch(err => {
                    return res.status(503).json({
                        status: "error",
                        message: "There is a problem from the server",
                        error: {
                            name: err.name,
                            message: err.message
                        }
                    })
                })

            let newUserData = {
                ...req.body,
                password: bcryptPwd
            }
            console.log(newUserData);

            const newUser = new userModel(newUserData);
            console.log(newUser);

            await newUser.save();

            return res.status(201).json({
                status: "success",
                message: "New account created successfully!"
            });
        }
    }

    async loginWithPassword(req, res, next) {
        const { uEmail, uPassword } = req.body;

        const userData = await userModel.findOne({
            email: uEmail,
        }).select("password");

        if (userData) {
            const { password } = userData;

            const responseUserData = await userModel.findOne({
                email: uEmail,
            }).select("-password")

            bcrypt
                .compare(uPassword, password)
                .then(check => {
                    if (check) {
                        return res.status(200).json({
                            status: "success",
                            message: "Logged in successfully",
                            data: {
                                userData: responseUserData
                            },
                        })
                    } else {
                        return res.status(404).json({
                            status: "fail",
                            message: "Wrong password!"
                        })
                    }

                })
                .catch((err) => {
                    console.log(err)
                    return res.status(503).json({
                        status: "error",
                        message: "There is a problem from the server",
                        error: {
                            name: err.name,
                            message: err.message
                        }
                    })
                })
        } else {
            return res.status(404).json({
                status: "fail",
                message: "Email does not exist",
            });
        }

    }

    async changePassword(req, res, next) {
        const { _id, oldPwd, newPwd } = req.body;

        const userData = await userModel.findOne({
            _id: _id
        });

        if (userData) {
            const { password } = userData
            bcrypt
                .compare(oldPwd, password)
                .then(check => {
                    if (check) {
                        bcrypt.hash(newPwd, 10)
                            .then(async (hashPassword) => {
                                await userModel.findByIdAndUpdate(_id, {
                                    password: hashPassword
                                });

                                return res.json({
                                    status: "success",
                                    message: "Changed password successfully",
                                });
                            })
                            .catch(err => {
                                return res.status(503).json({
                                    status: "error",
                                    message: "There is a problem from the server",
                                    error: {
                                        name: err.name,
                                        message: err.message
                                    }
                                })
                            })
                    } else {
                        return res.status(404).json({
                            status: "fail",
                            message: "Old password is wrong!",
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                    return res.status(503).json({
                        status: "error",
                        message: "There is a problem from the server",
                        error: {
                            name: err.name,
                            message: err.message
                        }
                    })
                })
        }
    }
}

module.exports = new ApiAuthController();
