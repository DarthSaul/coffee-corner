export const verifyLogin = (req, res, next) => {
    console.log(req.user);
    if (!req.isAuthenticated()) {
        throw new Error({ message: 'Please login to view that page.' });
    }
    next();
};

export const checkUser = (req, res, next) => {
    console.log('Middleware: ' + req.user);
    console.log(req.session);
    next();
};
