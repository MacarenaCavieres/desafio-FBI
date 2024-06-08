import jwt from "jsonwebtoken";

export const generateToken = (user, secretKey, expiresIn) => {
    return jwt.sign(
        {
            data: user,
        },
        secretKey,
        { expiresIn }
    );
};

export const verifyToken = (token, secretKey) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, data) => {
            return err ? reject(err) : resolve(data);
        });
    });
};
