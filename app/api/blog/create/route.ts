import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/slug";
import { createBlogSchema } from "@/lib/validations";
import { uploadImage } from "@/lib/upload/uploadImage";
import { deleteImage } from "@/lib/upload/deleteImage";

export async function POST(req: Request) {
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

    let slug = generateSlug(title);

    // Make slug unique
    const existingBlog = await prisma.blog.findUnique({
      where: {
        slug,
      },
    });

    if (existingBlog) {
      slug = `${slug}-${Date.now()}`;
    }

    let coverImage: string | null = null;
    let coverImagePublicId: string | null = null;

    if (image && image.size > 0) {

      console.log({
    name: image.name,
    type: image.type,
    size: image.size,
  });

      const uploaded = await uploadImage(image);

  console.log(uploaded);

      coverImage = uploaded.secure_url;
      coverImagePublicId = uploaded.public_id;
    }

    try {
      const blog = await prisma.blog.create({
        data: {
          title,
          slug,
          content,
          tags,
          coverImage,
          coverImagePublicId,
          authorId: session.user.id,
        },
      });

      return NextResponse.json({
        success: true,
        data: blog,
      });
    } catch (error) {
      if (coverImagePublicId) {
        await deleteImage(coverImagePublicId);
      }

      console.error(error);

      return NextResponse.json(
        {
          success: false,
          message: "Failed to create blog.",
        },
        {
          status: 500,
        },
      );
    }
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
