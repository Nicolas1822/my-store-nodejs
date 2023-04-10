const express = require('express');
const passport = require('passport');
const OrderService = require('../services/order.service.js');
const UserService = require('../services/user.service.js');
const { checkRoles } = require('../middlewares/auth.handler');
const validationHandler = require('../middlewares/validator.handler');
const { createOrderSchema, getOrderSchema, addItemSchema } = require('../schemas/order.schema');

const router = express.Router();

const service = new OrderService()
const userService = new UserService();

router.get('/orders-id/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validationHandler(getOrderSchema, 'query'),
  async (req, res, next) => {
    try {
      const { id } = req.query;
      res.json(await service.findOne(id));
    } catch (error) {
      next(error);
    }
  });

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const orders = await service.find();
      res.json(orders);
    } catch (error) {
      next(error);
    }
  });

router.post('/add-item',
  passport.authenticate('jwt', { session: false }),
  checkRoles('customer'),
  validationHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.addItem(body));
    } catch (error) {
      next(error);
    }
  });

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('customer'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const orderUser = await userService.findOne(user.sub);
      const data = { customerId: orderUser.customer.id };
      res.status(201).json(await service.create(data));
    } catch (error) {
      next(error);
    }
  });

router.patch('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  validationHandler(getOrderSchema, 'query'),
  validationHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.query;
      const body = req.body;
      const updateOrder = await service.update(id, body);
      res.json(updateOrder);
    } catch (error) {
      next(error);
    }
  });

router.delete('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  validationHandler(getOrderSchema, 'query'),
  async (req, res, next) => {
    try {
      const { id } = req.query;
      const deleteOrder = await service.delete(id);
      res.json(deleteOrder);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
