const prisma = require('../prisma');

const getStats = async (req, res, next) => {
  try {
    const taskWhere = req.user.role === 'ADMIN' ? {} : { assignedToId: req.user.id };
    const projectWhere = req.user.role === 'ADMIN' ? {} : { members: { some: { id: req.user.id } } };
    const now = new Date();

    const [totalProjects, totalTasks, completedTasks, overdueTasks, statusGroups, priorityGroups] = await Promise.all([
      prisma.project.count({ where: projectWhere }),
      prisma.task.count({ where: taskWhere }),
      prisma.task.count({ where: { ...taskWhere, status: 'COMPLETED' } }),
      prisma.task.count({ where: { ...taskWhere, dueDate: { lt: now }, status: { not: 'COMPLETED' } } }),
      prisma.task.groupBy({ by: ['status'], where: taskWhere, _count: true }),
      prisma.task.groupBy({ by: ['priority'], where: taskWhere, _count: true }),
    ]);

    res.json({
      totalProjects,
      totalTasks,
      completedTasks,
      overdueTasks,
      tasksByStatus: statusGroups.map((item) => ({ name: item.status, value: item._count })),
      tasksByPriority: priorityGroups.map((item) => ({ name: item.priority, value: item._count })),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getStats };
