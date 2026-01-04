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
libraryRouter.delete('/delete-library/:id', async (req:Request, res: Response) => {

   const { id } = req.params;


  try {
    const result = await prisma.library.delete({
      where: {
        id: String(id)
      }
    });

    res.status(200).json(result);
  } catch (err) {
    console.error({ err });
    res.status(500).json({ error: `Internal server error ${err}` });
  }
})

export default libraryRouter;
