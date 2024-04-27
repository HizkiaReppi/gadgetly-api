import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  transactionOptions: {
    maxRetries: 3,
    maxWait: 3000,
    isolationLevel: 'Serializable',
  },
});

export default prisma;
