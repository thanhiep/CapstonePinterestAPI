import jwt from "jsonwebtoken";

export const createToken = (data) => {
  return jwt.sign({ data: data }, "PINTEREST", {
    algorithm: "HS256",
    expiresIn: "5m",
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, "PINTEREST", (error) => error);
};

export const creatTokenRef = (data) => {
  return jwt.sign({ data: data }, "RESET", {
    algorithm: "HS256",
    expiresIn: "7d",
  });
};

export const verifyTokenRef = (token) => {
  return jwt.verify(token, "RESET", (error) => error);
};

export const decodeToken = (token) => {
    return jwt.decode(token)
}

export const middleWareToken = (req,res,next) => {
    let {token} = req.headers

    let checkToken = verifyToken(token)

    if(checkToken == null){
        next()
    } else {
        res.status(401).send(checkToken.name)
    }
}
