import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import EditBlog from "@/components/blog/EditBlog";
import { auth } from "@/lib/auth";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditBlogPage({
  params,
}: PageProps) {
  const session = await auth();

  if (!session?.user) {
    notFound();
  }

  const { id } = await params;

  const blog = await prisma.blog.findUnique({
    where: {
      id,
    },
  });

  if (!blog) {
    notFound();
  }

  if (blog.authorId !== session.user.id) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold">
        Edit Blog
      </h1>

      <EditBlog blog={blog} />
    </main>
  );
}