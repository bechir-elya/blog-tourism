import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {

    const token = req.headers.authorization;
    if (!token) return res.status(401).json('Unauthorized');
    try {
        const decoded = jwt.verify(token, 'mefkkzerjrjvnzerkjekgelhgk');
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};