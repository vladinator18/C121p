import { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '../generated/prisma.js';

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { artworkId } = req.body;

  try {
    const updatedArtwork = await prisma.artwork.update({
      where: { id: Number(artworkId) },
      data: {
        likes: { increment: 1 }
      }
    });

    return res.status(200).json(updatedArtwork);
  } catch (error) {
    return res.status(500).json({ error: "Could not update likes" });
  }
}