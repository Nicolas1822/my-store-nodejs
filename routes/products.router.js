const express = require('express');
const passport = require('passport');

const ProductsService = require('./../services/product.service');
const { checkRoles } = require('../middlewares/auth.handler');
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema } = require('./../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

router.get('/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
  });

router.get('/product-id/',
  validatorHandler(getProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const { id } = req.query;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getProductSchema, 'query'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.query;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const { id } = req.query;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
