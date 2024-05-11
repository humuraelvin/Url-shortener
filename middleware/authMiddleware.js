const jwt = require('jsonwebtoken');
const cookieParser=require("cookie-parser")

const authenticateToken = (req, res, next) => {
    
    const authHeader = req.cookies;
    
    const token=req.cookies["token"]

    
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.userId = user.userId;
        next();
    });
}

module.exports = { authenticateToken };