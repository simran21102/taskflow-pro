const prisma = require('../prisma');

const taskInclude = {
  assignedTo: { select: { id: true, name: true, email: true, avatar: true } },
  createdBy: { select: { id: true, name: true, email: true } },
  project: { select: { id: true, name: true, status: true } },
};

const buildTaskWhere = (req) => {
  const { projectId, status, priority, assignedToId, dueDate, search } = req.query;
  const where = req.user.role === 'ADMIN' ? {} : { assignedToId: req.user.id };

  if (projectId) where.projectId = projectId;
  if (status) where.status = status;
  if (priority) where.priority = priority;
  if (assignedToId && req.user.role === 'ADMIN') where.assignedToId = assignedToId;
  if (dueDate) {
    const start = new Date(dueDate);
    const end = new Date(dueDate);
    end.setDate(end.getDate() + 1);
    where.dueDate = { gte: start, lt: end };
  }
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { project: { name: { contains: search } } },
    ];
  }

  return where;
};

const getTasks = async (req, res, next) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Math.min(Number(req.query.limit || 10), 50);
    const skip = (page - 1) * limit;
    const where = buildTaskWhere(req);
    const [tasks, total] = await Promise.all([
      prisma.task.findMany({ where, include: taskInclude, orderBy: { updatedAt: 'desc' }, skip, take: limit }),
      prisma.task.count({ where }),
    ]);

    res.json({ data: tasks, pagination: { page, limit, total, pages: Math.ceil(total / limit) || 1 } });
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    const task = await prisma.task.findUnique({ where: { id: req.params.id }, include: taskInclude });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (req.user.role !== 'ADMIN' && task.assignedToId !== req.user.id) {
      return res.status(403).json({ message: 'You do not have access to this task' });
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { title, description, priority, status, dueDate, assignedToId, projectId } = req.body;
    const task = await prisma.task.create({
      data: { title, description, priority, status, dueDate: new Date(dueDate), assignedToId, projectId, createdById: req.user.id },
      include: taskInclude,
    });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const existing = await prisma.task.findUnique({ where: { id: req.params.id } });
    if (!existing) return res.status(404).json({ message: 'Task not found' });

    if (req.user.role !== 'ADMIN') {
      if (existing.assignedToId !== req.user.id) return res.status(403).json({ message: 'You can only update assigned tasks' });
      const task = await prisma.task.update({
        where: { id: req.params.id },
        data: { status: req.body.status },
        include: taskInclude,
      });
      return res.json(task);
    }

    const { title, description, priority, status, dueDate, assignedToId, projectId } = req.body;
    const data = {};
    if (title !== undefined) data.title = title;
    if (description !== undefined) data.description = description;
    if (priority !== undefined) data.priority = priority;
    if (status !== undefined) data.status = status;
    if (dueDate !== undefined) data.dueDate = new Date(dueDate);
    if (assignedToId !== undefined) data.assignedToId = assignedToId;
    if (projectId !== undefined) data.projectId = projectId;

    const task = await prisma.task.update({ where: { id: req.params.id }, data, include: taskInclude });
    res.json(task);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    await prisma.task.delete({ where: { id: req.params.id } });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTasks, getTask, createTask, updateTask, deleteTask };
