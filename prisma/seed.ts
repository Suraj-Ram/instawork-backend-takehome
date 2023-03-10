import { PrismaClient, Prisma, Role } from "@prisma/client";

const prisma = new PrismaClient();


const EXAMPLE_USERS: Prisma.MemberCreateInput[] = [
	{
		"firstName": "Suraj",
		"lastName": "Ramchandran",
		"phone": "8572778814",
		"email": "ramchandran.s@northeastern.edu",
		"role": Role.ADMIN
	},
	{
		"firstName": "Bob",
		"lastName": "Rogers",
		"phone": "7298374989",
		"email": "rogers.b@gmail.com",
		"role": Role.REGULAR
	},
	{
		"firstName": "Dave",
		"lastName": "Brown",
		"phone": "6173737000",
		"email": "dave.br@outlook.com",
		"role": Role.REGULAR
	},
	{
		"firstName": "Michelle",
		"lastName": "McEntee",
		"phone": "5074812341",
		"email": "mcentee.m@northeastern.edu",
		"role": Role.ADMIN
	},
	{
		"firstName": "Jane",
		"lastName": "Doe",
		"phone": "5439891737",
		"email": "jane.d@northeastern.edu",
		"role": Role.REGULAR
	}
]

async function main() {
  console.log(`Start seeding ...`);

  for(const user of EXAMPLE_USERS) {
    const response = await prisma.member.create({data: user})
    console.log(`Created user with id: ${response.id}`);
  }
  console.log("Seeding complete.");
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
