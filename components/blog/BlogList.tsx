"use client";

import BlogCard from "./BlogCard";
import { useBlogs } from "@/components/hooks/useBlogs";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import Link from "next/link";

export default function BlogList() {
  const { blogs, loading } = useBlogs();

  if (loading) {
    return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

      {Array.from({ length: 6 }).map((_, index) => (

        <Skeleton
          key={index}
          className="h-107.5 rounded-xl"
        />

      ))}

    </div>
  );

  }

  if (blogs.length === 0) {
    return (
      <div className="flex min-h-[55vh] flex-col items-center justify-center rounded-2xl border border-dashed px-6 text-center backdrop-blur-lg shadow-lg border-white/20 bg-white/20">
        <h2 className="text-4xl font-bold">No blogs yet</h2>

        <p className="mt-4 max-w-md text-muted-foreground">
          Be the first person to publish one.
        </p>

         <Button className="mt-8" size='lg'>
        <Link href="/blog/create">
          Create Blog
        </Link>
      </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
