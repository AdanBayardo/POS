import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.mjs';

let refreshTokens = [];

function authController() {
  async function signUp(req, res) {
    try {
      const user = new User(req.body);
      await user.save();
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(201).json({ user, token });
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async function logIn(req, res, next) {
    passport.authenticate(
      'login',
      async (err, user) => {
        try {
          if (err || !user) {
            const error = new Error('An error occurred.');
            return next(error);
          }

          const isPasswordValid = await user.comparePassword(req.body.password);
          if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
          }

          return req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const data = {
                _id: user._id,
                email: user.email,
                name: user.name,
                lastName: user.lastName,
                cart: user.cart,
                isAdmin: user.isAdmin
              };
              const token = jwt.sign(
                { user: data },
                process.env.JWT_SECRET,
                { expiresIn: '60m' }
              );
              const refreshToken = jwt.sign(
                { user: data },
                process.env.JWT_SECRET
              );

              refreshTokens.push(refreshToken);

              return res.json({
                token,
                refreshToken
              });
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }

  function updateToken(req, res) {
    const { token } = req.body;

    if (!token) {
      return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
      return res.sendStatus(403);
    }

    return jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      const data = { _id: user._id, email: user.email };

      const accessToken = jwt.sign(
        { user: data },
        process.env.JWT_SECRET,
        { expiresIn: '20m' }
      );

      return res.json({
        accessToken
      });
    });
  }

  function logOut(req, res) {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter((current) => current !== token);

    res.send('Logout successful');
  }

  return {
    signUp,
    logIn,
    updateToken,
    logOut
  };
}

export default authController();
