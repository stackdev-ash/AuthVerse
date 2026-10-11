"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Blog } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  blog: Blog;
}

export default function EditBlogForm({ blog }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [tags, setTags] = useState(blog.tags.join(", "));
  const [image, setImage] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      const form = new FormData();

      form.append("title", title);
      form.append("content", content);

      form.append(
        "tags",
        JSON.stringify(
          tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        ),
      );

      if (image) {
        form.append("image", image);
      }

      const res = await fetch(`/api/blog/update/${blog.id}`, {
        method: "PUT",
        body: form,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Blog updated successfully.");

      router.push(`/blog/${data.blog.slug}`);
      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label>Title</Label>

        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div>
        <Label>Content</Label>

        <Textarea
          rows={12}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div>
        <Label>Tags</Label>

        <Input value={tags} onChange={(e) => setTags(e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Cover Image</Label>

        {blog.coverImage && (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="h-48 w-full rounded-lg object-cover"
          />
        )}

        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] ?? null)}
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update Blog"}
      </Button>
    </form>
  );
}
