import { Prisma } from '@prisma/client';
import prisma from '../config/prismaClient.js';

const getAllGoals = async (userId) => {
  const goal = await prisma.goal.findMany({
    where: { userId: userId },
  });

  if (!goal) {
    const err = new Error('Goals not found');
    err.status = 404;
    throw err;
  }

  return goal;
};

const getGoalById = async (userId, goalId) => {
  const goal = await prisma.goal.findUnique({
    where: { id: goalId, userId },
  });

  if (!goal) {
    const err = new Error('Goal not found');
    err.status = 404;
    throw err;
  }

  return goal;
};

const createGoal = async (data) => {
  const { targetAmount, userId } = data;
  let { title } = data;

  if (targetAmount <= 0) {
    const err = new Error('target amount  must be greater than zero');
    err.status = 400;
    throw err;
  }

  // if user did not enter a title
  if (!title) {
    // count total number of goals titled 'New Goal'
    const totalUnnamedGoals = (
      await prisma.goal.findMany({
        select: { id: true },
        where: { fieldName: { startsWith: 'NewGoal' } },
      })
    ).length;

    if (totalUnnamedGoals === 0) {
      title = 'New Goal';
    } else {
      title = `New Goal (${totalUnnamedGoals + 1})`;
    }
  }

  const target = new Prisma.Decimal(targetAmount);

  const result = await prisma.goal.create({
    data: {
      title,
      targetAmount: target,
      userId,
    },
  });

  return result;
};

const addMoney = async (goalId, userId, amount) => {
  if (Number(amount) <= 0) {
    throw new Error('Amount must be greater than 0');
  }

  const goal = await prisma.goal.findUnique({
    where: { id: goalId },
    select: {
      currentAmount: true,
      targetAmount: true,
      achieved: true,
      userId: true,
    },
  });

  if (!goal) throw new Error('Goal not found');
  if (goal.userId !== userId) throw new Error('Forbidden');

  const current = new Prisma.Decimal(goal.currentAmount);
  const target = new Prisma.Decimal(goal.targetAmount);
  const deposit = new Prisma.Decimal(amount);

  if (goal.achieved || current.greaterThanOrEqualTo(target)) {
    const err = new Error('Goal already reached');
    err.status = 409;
    throw err;
  }

  const newTotal = current.add(deposit);

  if (newTotal.greaterThan(target)) {
    const added = target.minus(current);
    const overflow = newTotal.minus(target);

    const updatedGoal = await prisma.goal.update({
      where: { id: goalId },
      data: { currentAmount: target, achieved: true },
    });

    return {
      deposited: added.toFixed(2),
      overflowed: overflow.toFixed(2),
      message: `Goal completed. ${overflow.toFixed(2)} was not added.`,
      goal: updatedGoal,
    };
  }

  const updatedGoal = await prisma.goal.update({
    where: { id: goalId },
    data: {
      currentAmount: newTotal,
      achieved: newTotal.equals(target),
    },
  });

  return {
    deposited: deposit.toFixed(2),
    overflowed: '0.00',
    message: `Deposited ${deposit.toFixed(2)} successfully.`,
    goal: updatedGoal,
  };
};

const withdraw = async (goalId, userId, amount) => {
  if (Number(amount) <= 0) {
    throw new Error('Amount must be greater than 0');
  }

  const goal = await prisma.goal.findUnique({
    where: { id: goalId },
    select: {
      currentAmount: true,
      achieved: true,
      userId: true,
    },
  });

  if (!goal) throw new Error('Goal not found');
  if (goal.userId !== userId) throw new Error('Forbidden');

  const current = new Prisma.Decimal(goal.current);
  const withdrawAmount = new Prisma.Decimal(amount).toFixed(2);
  const newTotal = current.minus(withdrawAmount);

  if (newTotal < 0) {
    throw new Error(`You cannot withdraw more than $${current}`);
  }

  const data = { currentAmount: newTotal, achieved: false };

  const updatedGoal = await prisma.goal.update({
    where: { id: goalId, userId },
    data,
  });

  return {
    withdrew: withdrawAmount,
    message: `Withdrew ${withdrawAmount} successfully.`,
    goal: updatedGoal,
  };
};

//TODO: new target amount less than current amount, new current amount greater than target amount, etc
const updateGoal = async () => {};

const deleteGoal = async (goalId, userId) => {
  const result = await prisma.goal.delete({
    where: { id: goalId, userId },
  });
  if (!result) {
    const err = new Error('Goal not found');
    err.status = 404;
    throw err;
  }
  return { message: 'Goal deleted successfully' };
};

export default {
  getAllGoals,
  getGoalById,
  createGoal,
  addMoney,
  withdraw,
  deleteGoal,
};
