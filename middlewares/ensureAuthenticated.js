const jwt = require("jsonwebtoken");

async function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Access Token not found!",
    });
  }

  const [, accessToken] = authHeader.split(" ");

  if (!accessToken) {
    return res.status(401).json({
      message: "Invalid Authorization header!",
    });
  }

  try {
    const decodedAccessToken = jwt.verify(
      accessToken,
      process.env.accessTokenSecret,
    );

    req.user = {
      id: decodedAccessToken.userId,
    };

    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Access token is invalid or expired!",
    });
  }
}

module.exports = ensureAuthenticated;
