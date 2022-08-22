import jwt from "jsonwebtoken";
export default function middleware(req, res) {
  // bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    if (!token)
      return res.status(401).json({ msg: "No token, authorization denied" });
    try {
      const decoded = jwt.verify(token, processs.env.JWT_SECRET);
      req.user = decoded.user;
    } catch (error) {
      res.status(401).json({ msg: "Token is not valid" });
    }
  }
  // verify token
}
