// import { PrismaClient, Prisma } from '@prisma/client'

// const prisma = new PrismaClient()

// // const catagoryData : Prisma.

// const userData: Prisma.UserCreateInput[] = [
//   {
//     name: 'Alice',
//     email: 'alice1@prisma.io',
//     password: '$2a$10$TLtC603wy85MM./ot/pvEec0w2au6sjPaOmLpLQFbxPdpJH9fDwwS', // myPassword42
//     // posts: {
//     //   create: [
//     //     {
//     //       title: 'Join the Prisma Slack',
//     //       content: 'https://slack.prisma.io',
//     //       published: true,
//     //     },
//     //   ],
//     // },
//   },
//   {
//     name: 'Nilu',
//     email: 'nilu1@prisma111.io',
//     password: '$2a$10$k2rXCFgdmO84Vhkyb6trJ.oH6MYLf141uTPf81w04BImKVqDbBivi', // random42
//   },
  
// ]

// async function main() {
//   console.log(`Start seeding ...`)
//   for (const u of userData) {
//     const user = await prisma.user.create({
//       data: u,
//     })
//     console.log(`Created user with id: ${user.id}`)
//   }
//   console.log(`Seeding finished.`)
// }

// main()
//   .catch((e) => {
//     console.error(e)
//     process.exit(1)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })
