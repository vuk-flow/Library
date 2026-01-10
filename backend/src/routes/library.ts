import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { UpdateLibraryScheme } from '../schemas/library.js';

const libraryRouter = Router();

// GET
libraryRouter.get('/', async (req: Request, res: Response) => {
  try {
    const libraries = await prisma.library.findMany();
    res.json(libraries).status(200);
  } catch (err) {
    res.status(500).json({ error: `Error occured while getting all libraries: ${err}` });
  }
});

// POST
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
    res.status(500).json({ error: `Error occured while adding a library: ${err}` });
  }
});

// DELETE
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
    res.status(500).json({ error: `Error occured while deleting a library ${err}` });
  }
});

// PATCH
libraryRouter.patch('/edit-library/:id', async (req: Request, res:Response) => {

  const { id } = req.params;
  const  body  = req.body;

  const { name, address } = body;

  const updatedData:UpdateLibraryScheme = {};

  if (name) updatedData.name = name;
  if(address) updatedData.address = address;

  try {
    const result = await prisma.library.update({
      where : {
        id: String(id)
      },
      data: updatedData
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: `Error occured while updating a library ${err}` });
  }
})

export default libraryRouter;
