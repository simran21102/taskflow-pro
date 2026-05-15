const prisma = require('../prisma');

const getProjects = async (req, res, next) => {
  try {
    const where = req.user.role === 'ADMIN' ? {} : { members: { some: { id: req.user.id } } };
    const projects = await prisma.project.findMany({
      where,
      include: {
        createdBy: { select: { id: true, name: true, email: true } },
        members: { select: { id: true, name: true, email: true } },
        tasks: true,
      },
      orderBy: { updatedAt: 'desc' },
    });
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

const getProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        createdBy: { select: { id: true, name: true } },
        members: { select: { id: true, name: true, email: true } },
        tasks: true
      }
    });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (req.user.role !== 'ADMIN' && !project.members.some((member) => member.id === req.user.id)) {
      return res.status(403).json({ message: 'You do not have access to this project' });
    }
    res.json(project);
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    const { name, description, status, dueDate, memberIds = [] } = req.body;
    const project = await prisma.project.create({
      data: {
        name,
        description,
        status,
        dueDate: new Date(dueDate),
        createdById: req.user.id,
        members: { connect: memberIds.map((id) => ({ id })) }
      },
      include: { members: true }
    });
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, status, dueDate, memberIds = [] } = req.body;
    const data = {};
    if (name !== undefined) data.name = name;
    if (description !== undefined) data.description = description;
    if (status !== undefined) data.status = status;
    if (dueDate !== undefined) data.dueDate = new Date(dueDate);
    if (memberIds !== undefined) data.members = { set: memberIds.map((memberId) => ({ id: memberId })) };
    const project = await prisma.project.update({
      where: { id },
      data,
      include: { members: true }
    });
    res.json(project);
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.project.delete({ where: { id } });
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
