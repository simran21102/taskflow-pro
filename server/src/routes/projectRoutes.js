const express = require('express');
const { getProjects, getProject, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const { authenticate, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { projectRules } = require('../validators');

const router = express.Router();

router.use(authenticate);
router.get('/', getProjects);
router.post('/', authorize('ADMIN'), projectRules, validate, createProject);
router.get('/:id', getProject);
router.put('/:id', authorize('ADMIN'), projectRules, validate, updateProject);
router.delete('/:id', authorize('ADMIN'), deleteProject);

module.exports = router;
