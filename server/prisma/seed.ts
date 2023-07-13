import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const evgen = await prisma.user.upsert({
    where: { email: 'yevgenchikk@mail.ru' },
    update: {},
    create: {
      id: '0ca3698f-6ae0-4ed0-8a10-7835f60c94be',
      email: 'yevgenchikk@mail.ru',
      password: '$2b$10$Zpai8LYqfW8sVU1n08bSpeJSBm2wSyMAJ7Blw53EtWBIYAX50MeqC',
      firstName: 'Evgen',
      birthday: '1998-12-12T00:00:00.000Z',
      gender: 'man',
      looking: 'man',
      descriptrion: 'Love big and small yes',
      avatar:
        'http://res.cloudinary.com/djjdjf40s/image/upload/v1689238138/zdlqhgdfcfbjwwl3s5ji.jpg',
      createdAt: new Date('2023-07-09 12:57:46.78'),
      isEmailConfirmed: false,
    },
  });
  const nikita = await prisma.user.upsert({
    where: { email: 'brus-li_007@mail.ru' },
    update: {},
    create: {
      id: 'acd6df29-792c-44b4-98c2-26c8bfe8f659',
      email: 'brus-li_007@mail.ru',
      password: '$2b$10$Zpai8LYqfW8sVU1n08bSpeJSBm2wSyMAJ7Blw53EtWBIYAX50MeqC',
      firstName: 'Nikita',
      birthday: '1998-12-12T00:00:00.000Z',
      gender: 'man',
      looking: 'man',
      descriptrion: 'Love big and small yes',
      avatar:
        'https://res.cloudinary.com/du15umpuk/image/upload/v1677654060/tt9i2bqqv8np0oalpvzw.png',
      createdAt: new Date('2023-07-09 12:57:46.78'),
      isEmailConfirmed: false,
    },
  });
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      id: 'c13b553e-5d2a-49e3-be4d-49c490708419',
      email: 'alice@prisma.io',
      password: '$2b$10$Zpai8LYqfW8sVU1n08bSpeJSBm2wSyMAJ7Blw53EtWBIYAX50MeqC',
      firstName: 'Oleg',
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
      id: 'd4c1a110-ef80-403d-8994-575202f74fdf',
      email: 'bob@prisma2.io',
      password: '$2b$10$Zpai8LYqfW8sVU1n08bSpeJSBm2wSyMAJ7Blw53EtWBIYAX50MeqC',
      firstName: 'Alena',
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
      firstName: 'Alina',
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
      firstName: 'Mark',
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
      firstName: 'Moysha',
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
