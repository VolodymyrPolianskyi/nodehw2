import jwt from 'jsonwebtoken';
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.status(401).json({ error: "Token not provided" });
    jwt.verify(token, 'SomeSecretKey', (err, user) => {
        if (err)
            return res.status(403).json({ error: "Invalid token" });
        res.locals.user = user;
        next();
    });
};
export default authenticateToken;
