//TODO: THIS IS JUST AN EXAMPLE TEST FILE USING JEST... NEED TO TEST AUTH
import goalController from '../controllers/goalController.js';
import { prisma } from '../db/prismaClient.js';

jest.mock('../db/prismaClient.js');

describe('Goal Controller', () => {
  let res;
  beforeEach(() => {
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllGoals', () => {
    it('should return all goals', async () => {
      const mockGoals = [{ id: '1', name: 'Goal 1' }];
      prisma.goal.findMany.mockResolvedValue(mockGoals);

      await goalController.getAllGoals({}, res);

      expect(prisma.goal.findMany).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockGoals);
    });

    it('should handle errors', async () => {
      prisma.goal.findMany.mockRejectedValue(new Error('DB error'));

      await goalController.getAllGoals({}, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Could not fetch goals' });
    });
  });

  describe('getGoalById', () => {
    it('should return a goal by ID', async () => {
      const mockGoal = { id: '1', name: 'Goal 1' };
      prisma.goal.findUnique.mockResolvedValue(mockGoal);

      const req = { params: { id: '1' } };
      await goalController.getGoalById(req, res);

      expect(prisma.goal.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(res.json).toHaveBeenCalledWith(mockGoal);
    });

    it('should return 404 if goal not found', async () => {
      prisma.goal.findUnique.mockResolvedValue(null);

      const req = { params: { id: '1' } };
      await goalController.getGoalById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Goal not found' });
    });
  });

  describe('createGoal', () => {
    it('should create a new goal', async () => {
      const req = {
        body: {
          name: 'Goal 1',
          notes: '',
          target: 10,
          current: 0,
          deadline: '2025-12-31',
        },
      };
      const mockGoal = { id: '1', ...req.body };
      prisma.goal.create.mockResolvedValue(mockGoal);

      await goalController.createGoal(req, res);

      expect(prisma.goal.create).toHaveBeenCalledWith({ data: req.body });
      expect(res.json).toHaveBeenCalledWith(mockGoal);
    });
  });

  describe('updateGoal', () => {
    it('should update a goal', async () => {
      const req = {
        params: { id: '1' },
        body: {
          name: 'Updated Goal',
          notes: '',
          target: 20,
          current: 5,
          deadline: '2025-12-31',
        },
      };
      const mockGoal = { id: '1', ...req.body };
      prisma.goal.update.mockResolvedValue(mockGoal);

      await goalController.updateGoal(req, res);

      expect(prisma.goal.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: req.body,
      });
      expect(res.json).toHaveBeenCalledWith(mockGoal);
    });
  });

  describe('deleteGoal', () => {
    it('should delete a goal', async () => {
      const req = { params: { id: '1' } };
      prisma.goal.delete.mockResolvedValue({});

      await goalController.deleteGoal(req, res);

      expect(prisma.goal.delete).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(res.json).toHaveBeenCalledWith({
        message: 'Goal deleted successfully',
      });
    });
  });
});
