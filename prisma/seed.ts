import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "admin@ems.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@ems.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin user created: admin@ems.com / admin123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());