export const verifyLogin = (req, res, next) => {
    console.log(req.user);
    if (!req.isAuthenticated()) {
        throw new Error({ message: 'Please login to view that page.' });
    }
    next();
};
