import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getBlogBySlug } from "@/lib/blog";
import { auth } from "@/lib/auth";
import Link from "next/link";

import DeleteBlogButton from "@/components/blog/DeleteBlog";
import { Button } from "@/components/ui/button";
import { Blog } from "@/components/types/blog";
import Image from "next/image";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);

  const session = await auth();

  if (!blog) {
    notFound();
  }
  
  const isOwner = session?.user?.id === blog?.authorId;

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

  blog.views += 1;

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <article>
        <h1 className="text-5xl font-bold">{blog.title}</h1>

        <div className="mt-5 flex items-center gap-3 text-sm text-muted-foreground">
          <span>{blog.author.name}</span>

          <span>•</span>

          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>

          <span>•</span>

          <span>{blog.views} views</span>
        </div>

        {isOwner && (
          <div className="mt-6 flex gap-3">
            <Button>
              <Link href={`/blog/edit/${blog.id}`}>Edit</Link>
            </Button>

            <DeleteBlogButton id={blog.id} />
          </div>
        )}

        {blog.coverImage && (
          <div className="relative mt-8 h-112.5 w-full overflow-hidden rounded-2xl">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        <div className="mt-10 whitespace-pre-wrap leading-8 text-lg">
          {blog.content}
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {blog.tags.map((tag) => (
            <span key={tag} className="rounded-full border px-3 py-1 text-sm">
              #{tag}
            </span>
          ))}
        </div>
      </article>
    </main>
  );
}
