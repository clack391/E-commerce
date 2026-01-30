const isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined) {
        res.status(401).json("You do not have access.");
    } else {
        next();
    }
};

module.exports = {
    isAuthenticated
};
