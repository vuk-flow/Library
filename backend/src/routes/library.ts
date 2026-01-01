import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';

const libraryRouter = Router();

// GET
libraryRouter.get('/', async (req: Request, res: Response) => {
  try {
    const libraries = await prisma.library.findMany();
    res.json(libraries);
  } catch (err) {
    console.error({ err });
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default libraryRouter;
