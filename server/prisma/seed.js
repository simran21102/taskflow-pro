const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const daysFromNow = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

async function main() {
  await prisma.task.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  const [adminPassword, memberPassword] = await Promise.all([
    bcrypt.hash('Admin123!', 10),
    bcrypt.hash('Member123!', 10),
  ]);

  const admin = await prisma.user.create({
    data: {
      name: 'Avery Admin',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'ADMIN',
      avatar: 'https://ui-avatars.com/api/?name=Avery+Admin&background=4F46E5&color=fff',
    },
  });

  const member = await prisma.user.create({
    data: {
      name: 'Mira Member',
      email: 'member@example.com',
      password: memberPassword,
      role: 'MEMBER',
      avatar: 'https://ui-avatars.com/api/?name=Mira+Member&background=10B981&color=fff',
    },
  });

  const designer = await prisma.user.create({
    data: {
      name: 'Nolan Designer',
      email: 'nolan@example.com',
      password: memberPassword,
      role: 'MEMBER',
      avatar: 'https://ui-avatars.com/api/?name=Nolan+Designer&background=F59E0B&color=111827',
    },
  });

  const launch = await prisma.project.create({
    data: {
      name: 'Website Launch',
      description: 'Coordinate launch tasks for the new marketing site.',
      status: 'ACTIVE',
      dueDate: daysFromNow(21),
      createdById: admin.id,
      members: { connect: [{ id: member.id }, { id: designer.id }] },
    },
  });

  const mobile = await prisma.project.create({
    data: {
      name: 'Mobile App Sprint',
      description: 'Plan, build, and polish the next mobile release.',
      status: 'ON_HOLD',
      dueDate: daysFromNow(45),
      createdById: admin.id,
      members: { connect: [{ id: member.id }] },
    },
  });

  await prisma.task.createMany({
    data: [
      {
        title: 'Create project brief',
        description: 'Write launch brief with scope, owners, and milestones.',
        priority: 'HIGH',
        status: 'COMPLETED',
        dueDate: daysFromNow(-2),
        assignedToId: member.id,
        projectId: launch.id,
        createdById: admin.id,
      },
      {
        title: 'Design dashboard visuals',
        description: 'Prepare chart, card, and empty state treatments.',
        priority: 'MEDIUM',
        status: 'IN_PROGRESS',
        dueDate: daysFromNow(5),
        assignedToId: designer.id,
        projectId: launch.id,
        createdById: admin.id,
      },
      {
        title: 'QA responsive navigation',
        description: 'Validate sidebar and mobile drawer across breakpoints.',
        priority: 'HIGH',
        status: 'REVIEW',
        dueDate: daysFromNow(3),
        assignedToId: member.id,
        projectId: launch.id,
        createdById: admin.id,
      },
      {
        title: 'Draft release checklist',
        description: 'Create deployment checklist for backend and frontend.',
        priority: 'LOW',
        status: 'TODO',
        dueDate: daysFromNow(12),
        assignedToId: member.id,
        projectId: mobile.id,
        createdById: admin.id,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Database seeded');
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
