const express = require('express');
const { getTasks, getTask, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { authenticate, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { taskRules, statusRules } = require('../validators');

const router = express.Router();

router.use(authenticate);
router.get('/', getTasks);
router.post('/', authorize('ADMIN'), taskRules, validate, createTask);
router.get('/:id', getTask);
router.put('/:id', (req, res, next) => {
  const rules = req.user.role === 'ADMIN' ? taskRules : statusRules;
  Promise.all(rules.map((rule) => rule.run(req))).then(() => next()).catch(next);
}, validate, updateTask);
router.delete('/:id', authorize('ADMIN'), deleteTask);

module.exports = router;
