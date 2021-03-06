// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function (req, res, next) {
    // If the user is logged in, continue with the request to the restricted route
    if (req.user && req.user.instructor) {
        return next();
    }

    // If the user isn't logged in, redirect them to the login page
    return res.send("You cannot access this page! Please go back and try logging in again.");
};