// Role-checking middleware
module.exports = function checkRole(allowedRoles) {
    return function(req, res, next) {
        const userRole = req.user.role;  // Assumes `req.user` contains the authenticated user with a `role` field

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).send('Access denied. You do not have the necessary permissions.');
        }

        next();  // Continue to the next middleware or route handler
    };
};
