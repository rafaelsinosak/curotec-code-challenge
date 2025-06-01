export class PrismaClient {
  task = {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  $disconnect() {
    return Promise.resolve();
  }
}

