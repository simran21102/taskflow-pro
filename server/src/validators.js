const { body } = require('express-validator');

const registerRules = [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().normalizeEmail().withMessage('A valid email is required'),
  body('password').isStrongPassword({ minLength: 8, minSymbols: 1 }).withMessage('Password must be strong'),
  body('role').optional().isIn(['ADMIN', 'MEMBER']).withMessage('Role must be admin or member'),
];

const loginRules = [
  body('email').isEmail().normalizeEmail().withMessage('A valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

const projectRules = [
  body('name').trim().isLength({ min: 2 }).withMessage('Project name is required'),
  body('description').trim().isLength({ min: 5 }).withMessage('Description is required'),
  body('status').optional().isIn(['ACTIVE', 'COMPLETED', 'ON_HOLD']),
  body('dueDate').isISO8601().withMessage('A valid due date is required'),
  body('memberIds').optional().isArray(),
];

const taskRules = [
  body('title').trim().isLength({ min: 2 }).withMessage('Task title is required'),
  body('description').trim().isLength({ min: 5 }).withMessage('Description is required'),
  body('priority').optional().isIn(['LOW', 'MEDIUM', 'HIGH']),
  body('status').optional().isIn(['TODO', 'IN_PROGRESS', 'REVIEW', 'COMPLETED']),
  body('dueDate').isISO8601().withMessage('A valid due date is required'),
  body('assignedToId').notEmpty().withMessage('Assigned user is required'),
  body('projectId').notEmpty().withMessage('Project is required'),
];

const statusRules = [
  body('status').isIn(['TODO', 'IN_PROGRESS', 'REVIEW', 'COMPLETED']).withMessage('Valid status is required'),
];

module.exports = { registerRules, loginRules, projectRules, taskRules, statusRules };
