const UserService = require('./user.service');
const service = new UserService();

const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

const { config } = require('../config/config');

class AuthService {

  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    return user;
  }

  singToken(user) {
    const payload = {
      sub: user.id,
      role: user.role
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return ({
      user,
      token
    });
  }

  async sendRecoveryPassword(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret);
    const link = `${token}`;
    await service.update(user.id, { recoveryToken: token });
    const mail = {
      from: config.email, // sender address
      to: `${user.email}`, // list of receivers
      subject: "password recovery", // Subject line
      // text: "correo a gmail", // plain text body
      html: `<b>ingresa a este link => ${link}</b>`, // html body
    }
    const rta = await this.sendMail(mail);
    return rta;
  }

  async sendMail(infoMail) {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
        user: config.email,
        pass: config.passEmail
      }
    });
    await transporter.sendMail(infoMail);
    return { message: 'Mail send' };
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, { recoveryToken: null, password: hash });
      return { message: 'Password changed' };
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = AuthService;
