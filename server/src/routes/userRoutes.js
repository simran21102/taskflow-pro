const express = require('express');
const { body } = require('express-validator');
const { getUsers, getUser, updateUser } = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

const router = express.Router();

router.use(authenticate);
router.get('/', getUsers);
router.get('/:id', getUser);
router.put(
  '/:id',
  [body('name').optional().trim().isLength({ min: 2 }), body('role').optional().isIn(['ADMIN', 'MEMBER'])],
  validate,
  updateUser
);

module.exports = router;
