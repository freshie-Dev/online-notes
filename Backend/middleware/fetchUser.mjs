import jwt from "jsonwebtoken";

const fetchUser = (req, res, next) => {
  const JWT_SECRET = "this is my jwt secret 1122";

  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Invalid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.userId = data.user.id;
    next();
  } catch (error) {
    res.status(401).send({ error: "Invalid token" });
  }
};

export default fetchUser;
