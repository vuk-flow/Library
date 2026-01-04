import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';

const libraryRouter = Router();

// GET
libraryRouter.get('/', async (req: Request, res: Response) => {
  try {
    const libraries = await prisma.library.findMany();
    res.json(libraries).status(200);
  } catch (err) {
    console.error({ err });
    res.status(500).json({ error: `Internal server error ${err}` });
  }
});

libraryRouter.post('/add-library', async (req:Request, res: Response) => {

  const {name, address} = req.body;

  try {
    const result = await prisma.library.create({
      // todo : TIPIZIRAJ DATA
      data: {
        name,
        address
      },
    });

    res.status(201).json(result);
  } catch (err) {
    console.error({ err });
    res.status(500).json({ error: `Internal server error ${err}` });
  }
})

export default libraryRouter;
