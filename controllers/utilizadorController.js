const utilizador = require("../models/Utilizador");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ quiet: true });
const asyncHandler = require("../utils/asincHandler");

exports.registerUtilizador = asyncHandler(async (req, res, next) => {
  const { name, email, password, perfil } = req.body;
  if ((!name || !email || !password, !perfil)) {
    return res.status(401).json({ message: "All data is required!" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  const newUtilizador = await utilizador.create({
    name,
    email,
    password: hashedPassword,
    perfil,
  });

  return res.status(201).json(newUtilizador);
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ message: "All data is required!" });
  }
  const user = await utilizador.findOne({ where: { email: email } });

  if (!user) {
    return res.status(401).json({ message: "This user does not exiest!" });
  }

  const passwordMacth = await bcrypt.compare(password, user.password);
  if (!passwordMacth) {
    return res.status(401).json({ message: "pass" });
  }

  const access_token = jwt.sign(
    { userId: user.id },
    process.env.accessTokenSecret,
    {
      subject: "accessApi",
      expiresIn: "1h",
    },
  );
  await utilizador.update(
    { access_token: access_token },
    { where: { id: user.id } },
  );
  return res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    accessToken: access_token,
  });
});

exports.current = async (req, res, next) => {
  try {
    // 1. Obter o token
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      return res.status(401).json({
        message: "Access Token not found!",
      });
    }

    // 2. Validar o token
    const decoded = jwt.verify(accessToken, process.env.accessTokenSecret);

    // 3. Procurar o utilizador
    const user = await utilizador.findByPk(decoded.userId);

    if (!user.access_token) {
      return res.status(404).json({
        message: "Access token not found!",
      });
    }

    // 4. Devolver os dados
    return res.status(200).json({
      name: user.name,
      email: user.email,
      id: user.id,
    });
  } catch (error) {
    console.log(error);

    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        message: "Access token is invalid or expired!",
      });
    }

    return res.status(500).json({
      message: "Internal server error!",
    });
  }
};

exports.logout = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      return res.status(401).json({
        message: "Access Token not found!",
      });
    }

    // 2. Validar o token
    const decoded = jwt.verify(accessToken, process.env.accessTokenSecret);

    // 3. Procurar o utilizador
    const user = await utilizador.findByPk(decoded.userId);

    if (!user.access_token) {
      return res.status(404).json({
        message: "Access Token not found!",
      });
    }

    await utilizador.update(
      { access_token: "" },
      { where: { access_token: user.access_token } },
    );
    return res.status(201).json({ message: "logout successfull!" });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error!",
    });
  }
};
