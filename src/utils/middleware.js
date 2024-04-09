const userModel = require("../models/UserModel");

const loadDb = async (req, res, next) => {
	try {
		req.db = {
			users: {
				getUserRole: async (_id) => {
					try {
						const user = await userModel.findById(_id).select("role");
						if (user) {
							return user;
						}
					} catch (error) {
						console.error("Error fetching user role:", error);
						return null;
					}
				},
			},
		};
		next();
	} catch (error) {
		console.error("Error loading database:", error);
		next(error);
	}
};

const authentication = async (req, res, next) => {
	try {
		const { _id } = req.cookies;
		req.user = await req.db.users.getUserRole(_id);
		next();
	} catch (error) {
		console.error("Authentication error:", error);
		next(error);
	}
};

const permit = (requireRole) => {
	return (req, res, next) => {
		const { user } = req;
		if (user !== undefined && user.role === requireRole) {
			next();
		} else {
			res.redirect("/");
		}
	};
};

const isExpired = () => {
	return (req, res, next) => {
		if (!req.cookies._id) {
			return res.redirect("/auth/signout");
		} else {
			next();
		}
	};
};

const checkStreak = () => {
	return (req, res, next) => {
		if (req.cookies._id) {
			fetch(`http://localhost:${process.env.PORT || 5000}/api/users/${req.cookies._id}/streak`);
		}
		next();
	};
};

module.exports = { loadDb, authentication, permit, isExpired, checkStreak };
