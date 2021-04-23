export const authenticationMiddleware = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/warehouse/login');
    }
};
export const roleMiddleware = (roles) => (req, res, next) => {
    if (roles && roles.includes(req.user.role)) {
        next();
    } else {
        res.sendStatus(401);
    }
};