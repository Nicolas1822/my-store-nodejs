const express = require('express');
const passport = require('passport');

const { checkRoles } = require('../middlewares/auth.handler');
const validatorHandler = require('./../middlewares/validator.handler');
const { changePasswordSchema, recoveryPasswordSchema } = require('../schemas/auth.shcema');
const AuthService = require('../services/auth.service');
const service = new AuthService();
const router = express.Router();

router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(service.singToken(user));
    } catch (error) {
      next(error);
    }
  });

router.post('/recovery',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  validatorHandler(recoveryPasswordSchema, 'body'),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const rta = await service.sendRecoveryPassword(email);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  });

router.post('/change-password',
  validatorHandler(changePasswordSchema, 'body'),
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const rta = await service.changePassword(token, newPassword);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
