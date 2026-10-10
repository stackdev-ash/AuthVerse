import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

interface Params {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { slug } = await params;

    const blog = await prisma.blog.findUnique({
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

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found.",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.blog.update({
      where: {
        id: blog.id,
      },

      data: {
        views: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({
      success: true,
      blog: {
        ...blog,
        views: blog.views + 1,
      },
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