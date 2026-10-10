import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const skip = (page - 1) * limit;

    const [blogs, totalBlogs] = await Promise.all([
      prisma.blog.findMany({
        where: {
          published: true,
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

        orderBy: {
          createdAt: "desc",
        },

        skip,
        take: limit,
      }),

      prisma.blog.count({
        where: {
          published: true,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      page,
      limit,
      totalBlogs,
      totalPages: Math.ceil(totalBlogs / limit),
      blogs,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}