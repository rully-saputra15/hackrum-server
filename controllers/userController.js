const { signToken } = require("../helpers/jwt");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");

class UserController {
  static async glogin(req, res, next) {
    try {
      const { google_token } = req.headers;
      const client = new OAuth2Client();
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        clientId: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      const [user, _created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          email: payload.email,
          role: "student",
          isActive: true,
        },
      });

      const token = signToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      res.status(200).json({
        statusCode: 200,
        message: {
          access_token: token,
          role: user.role,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
