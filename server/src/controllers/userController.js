const prisma = require('../prisma');

const getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, avatar: true }
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, role: true, avatar: true }
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, role } = req.body;
    if (req.user.role !== 'ADMIN' && req.user.id !== id) {
      return res.status(403).json({ message: 'You can only update your own profile' });
    }
    if (role && req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Only admins can change roles' });
    }
    const updated = await prisma.user.update({
      where: { id },
      data: { name, role }
    });
    res.json({ id: updated.id, name: updated.name, email: updated.email, role: updated.role, avatar: updated.avatar });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, getUser, updateUser };
