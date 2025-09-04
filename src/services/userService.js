import prisma from '../db/client.js';

export const deleteUser = async (id, requesterId) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error('User not found');
  if (id === requesterId && user.role === 'ADMIN') {
    throw new Error('Admin cannot delete themselves');
  }
  return prisma.user.delete({ where: { id } });
};
