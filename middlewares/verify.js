const jwt = require('jsonwebtoken');

async function verifyToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                error: "Authorization header missing, redirecting to Sign up"
            });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                error: "Token missing, redirecting to Sign up"
            });
        }

        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            error: 'Authorization Error Occurred!'
        });
    }
}

module.exports = {
    verifyToken
};
