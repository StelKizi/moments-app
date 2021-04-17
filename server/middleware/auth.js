import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const customAuth = token.length < 500;

    let decodedData;
    if (token && customAuth) {
      decodedData = jwt.verify(token, 'secret');
      req.userId = decodedData?.id;
    } else {
      /* If Google OAuth token */
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
