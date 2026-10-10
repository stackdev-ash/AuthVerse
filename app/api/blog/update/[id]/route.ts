import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/slug";
import { createBlogSchema } from "@/lib/validations";

import { uploadImage } from "@/lib/upload/uploadImage";
import { deleteImage } from "@/lib/upload/deleteImage";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const { id } = await params;

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    const tags = JSON.parse((formData.get("tags") as string) || "[]");

    const image = formData.get("image") as File | null;

    const result = createBlogSchema.safeParse({
      title,
      content,
      tags,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.error.issues[0].message,
        },
        {
          status: 400,
        },
      );
    }

    const existingBlog = await prisma.blog.findUnique({
      where: {
        id,
      },
    });

    if (!existingBlog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found.",
        },
        {
          status: 404,
        },
      );
    }

    if (existingBlog.authorId !== session.user.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden",
        },
        {
          status: 403,
        },
      );
    }

    let coverImage = existingBlog.coverImage;
    let coverImagePublicId = existingBlog.coverImagePublicId;

    if (image && image.size > 0) {
      const uploaded = await uploadImage(image);

      if (existingBlog.coverImagePublicId) {
        await deleteImage(existingBlog.coverImagePublicId);
      }

      coverImage = uploaded.secure_url;
      coverImagePublicId = uploaded.public_id;
    }

    let slug = generateSlug(result.data.title);

    const duplicateSlug = await prisma.blog.findFirst({
      where: {
        slug,
        NOT: {
          id,
        },
      },
    });

    if (duplicateSlug) {
      slug = `${slug}-${Date.now()}`;
    }

    const updatedBlog = await prisma.blog.update({
      where: {
        id,
      },
      data: {
        title: result.data.title,
        slug,
        content: result.data.content,
        coverImage,
        coverImagePublicId,
        tags: result.data.tags,
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

    return NextResponse.json({
      success: true,
      message: "Blog updated successfully.",
      blog: updatedBlog,
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
      },
    );
  }
}
