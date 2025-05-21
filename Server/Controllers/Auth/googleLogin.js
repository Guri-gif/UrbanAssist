const axios = require("axios");
const jwt = require("jsonwebtoken");
const { oauth2Client } = require("../../Utils/googleClient");
const GoogleUser = require("../../Models/googleLogin_model"); 
require('dotenv').config();
const config = require("../../Config/config");


const googleLogin = async (req, res, next) => {
  try {
    const code = req.query.code;
    console.log("yeh aya code frontend say", code);
    
    const googleRes = await oauth2Client.getToken(code);
    console.log("yeh raha google res", googleRes.tokens.access_token);
    
    oauth2Client.setCredentials({
      access_token: googleRes.tokens.access_token,
    });

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );

    const { email, name, picture, id: googleId } = userRes.data; 
    console.log("yeh ha user res", userRes);

    let googleUser = await GoogleUser.findOne({ email });

    if (!googleUser) {
      googleUser = await GoogleUser.create({
        googleId,
        email,
        name,
        image: picture || null,
        accessToken: googleRes.tokens.access_token,
        refreshToken: googleRes.tokens.refresh_token || null,
      });
    }

    const { _id } = googleUser;
    const token = jwt.sign({ _id, email }, config.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({
      message: "success",
      token,
      user: {
        name: googleUser.name,
        email: googleUser.email,
        image: googleUser.image || null,
      },
    });
  } catch (err) {
    console.error(
      "Google login error:",
      err?.response?.data || err.message || err
    );
    res.status(500).json({
      message: "Internal Server Error",
      error: err?.message || "Unknown error",
    });
  }
};

module.exports = googleLogin;
