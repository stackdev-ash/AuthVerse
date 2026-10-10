import { prisma } from "./prisma";

export async function getBlogBySlug(slug: string) {
  return prisma.blog.findUnique({
    where: {
      slug,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
}