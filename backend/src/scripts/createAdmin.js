require('dotenv').config();
const bcrypt = require('bcrypt');
const prisma = require('../db/prisma');

async function main() {
  const email = 'admin@example.com';
  const plainPassword = 'julian123';
  const passwordHash = await bcrypt.hash(plainPassword, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash, role: 'admin' },
  });

  console.log('Admin user ready:', user.email);
  process.exit(0);
}

main();