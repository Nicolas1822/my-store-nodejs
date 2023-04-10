const express = require('express');
const passport = require('passport');

const CustomerService = require('../services/customer.service');
const { checkRoles } = require('../middlewares/auth.handler');
const validationHandler = require('../middlewares/validator.handler');
const {
  createCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema,
} = require('../schemas/customer.schema');

const router = express.Router();
const service = new CustomerService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      res.json(await service.find());
    } catch (error) {
      next(error);
    }
  });

router.get('/customer-id/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validationHandler(getCustomerSchema, 'query'),
  async (req, res, next) => {
    try {
      const { id } = req.query;
      res.json(await service.findOne(id));
    } catch (error) {
      next(error);
    }
  });

router.post('/',
  validationHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validationHandler(getCustomerSchema, 'query'),
  validationHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.query;
      const body = req.body;
      res.status(201).json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validationHandler(getCustomerSchema, 'query'),
  async (req, res, next) => {
    try {
      const { id } = req.query;
      res.status(200).json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
