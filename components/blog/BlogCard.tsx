import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Eye, ArrowRight } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { Blog } from "@/components/types/blog";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({
  blog,
}: BlogCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <Link href={`/blog/${blog.slug}`}>

        {blog.coverImage ? (
          <div className="relative h-56 w-full">

            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="object-cover"
            />

          </div>
        ) : (
          <div className="flex h-56 items-center justify-center bg-muted text-muted-foreground">
            No Cover Image
          </div>
        )}

      </Link>

      <div className="space-y-5 p-6">

        <div>

          <Link href={`/blog/${blog.slug}`}>
            <h2 className="line-clamp-2 text-2xl font-bold hover:text-primary">
              {blog.title}
            </h2>
          </Link>

          <p className="mt-3 line-clamp-3 text-muted-foreground">
            {blog.content}
          </p>

        </div>

        <div className="flex flex-wrap gap-2">

          {blog.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
            >
              #{tag}
            </Badge>
          ))}

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Avatar>

              <AvatarImage
                src={blog.author.image ?? ""}
              />

              <AvatarFallback>
                {blog.author.name?.charAt(0)}
              </AvatarFallback>

            </Avatar>

            <div>

              <p className="font-medium">
                {blog.author.name}
              </p>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">

                <div className="flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {new Date(blog.createdAt).toLocaleDateString()}
                </div>

                <div className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" />
                  {blog.views}
                </div>

              </div>

            </div>

          </div>

          <Link
            href={`/blog/${blog.slug}`}
            className="flex items-center gap-1 text-sm font-medium text-primary"
          >
            Read
            <ArrowRight className="h-4 w-4" />
          </Link>

        </div>

      </div>

    </article>
  );
}