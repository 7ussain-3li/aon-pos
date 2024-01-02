import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function DELETE(req, {params}) {
  try {
    const {id} = params;
    const category = await prisma.category.delete({
      where: { id: parseInt(id) },
    });

    return Response.json({
      success: true,
      category,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error,
    });
  }
}