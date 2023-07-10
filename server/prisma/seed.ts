import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      id: '1dbf3fec-b876-46fe-b2c4-348cd72649ed',
      email: 'alice@prisma.io',
      password: '$2b$10$Zpai8LYqfW8sVU1n08bSpeJSBm2wSyMAJ7Blw53EtWBIYAX50MeqC',
      firstName: 'Nikita',
      birthday: '1998-12-12T00:00:00.000Z',
      gender: 'man',
      looking: 'man',
      descriptrion: 'Love big and small yes',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      createdAt: new Date('2023-07-09 12:57:46.78'),
      isEmailConfirmed: false,
    },
  });
  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma2.io' },
    update: {},
    create: {
      id: '2dbf3fec-b876-46fe-b2c4-348cd72649ed',
      email: 'bob@prisma2.io',
      password: '$2b$10$Zpai8LYqfW8sVU1n08bSpeJSBm2wSyMAJ7Blw53EtWBIYAX50MeqC',
      firstName: 'Nikita',
      birthday: '1998-12-12T00:00:00.000Z',
      gender: 'man',
      looking: 'man',
      descriptrion: 'Love big and small yes',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      createdAt: new Date('2023-07-09 12:57:46.78'),
      isEmailConfirmed: false,
    },
  });
  const bob3 = await prisma.user.upsert({
    where: { email: 'bob@prisma3.io' },
    update: {},
    create: {
      id: '3dbf3fec-b876-46fe-b2c4-348cd72649ed',
      email: 'bob@prisma3.io',
      password: '$2b$10$Zpai8LYqfW8sVU1n08bSpeJSBm2wSyMAJ7Blw53EtWBIYAX50MeqC',
      firstName: 'Nikita',
      birthday: '1998-12-12T00:00:00.000Z',
      gender: 'man',
      looking: 'man',
      descriptrion: 'Love big and small yes',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      createdAt: new Date('2023-07-09 12:57:46.78'),
      isEmailConfirmed: false,
    },
  });
  const bob5 = await prisma.user.upsert({
    where: { email: 'bob@prisma4.io' },
    update: {},
    create: {
      id: '5dbf3fec-b876-46fe-b2c4-348cd72649ed',
      email: 'bob@prisma4.io',
      password: '$2b$10$Zpai8LYqfW8sVU1n08bSpeJSBm2wSyMAJ7Blw53EtWBIYAX50MeqC',
      firstName: 'Nikita',
      birthday: '1998-12-12T00:00:00.000Z',
      gender: 'man',
      looking: 'man',
      descriptrion: 'Love big and small yes',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      createdAt: new Date('2023-07-09 12:57:46.78'),
      isEmailConfirmed: false,
    },
  });
  const bob6 = await prisma.user.upsert({
    where: { email: 'bob@prisma5.io' },
    update: {},
    create: {
      id: '6dbf3fec-b876-46fe-b2c4-348cd72649ed',
      email: 'bob@prisma5.io',
      password: '$2b$10$Zpai8LYqfW8sVU1n08bSpeJSBm2wSyMAJ7Blw53EtWBIYAX50MeqC',
      firstName: 'Nikita',
      birthday: '1998-12-12T00:00:00.000Z',
      gender: 'man',
      looking: 'man',
      descriptrion: 'Love big and small yes',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      createdAt: new Date('2023-07-09 12:57:46.78'),
      isEmailConfirmed: false,
    },
  });
  console.log({ alice, bob });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
