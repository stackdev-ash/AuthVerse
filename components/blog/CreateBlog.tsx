"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "../ui/card";

export default function CreateBlogForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      const form = new FormData();

      form.append("title", formData.title);
      form.append("content", formData.content);

      form.append(
        "tags",
        JSON.stringify(
          formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        ),
      );

      if (image) {
        form.append("image", image);
      }

      const res = await fetch("/api/blog/create", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Blog published successfully.");

      router.push("/");

      router.refresh();
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="p-6">
      <h1 className="text-4xl">What's on Your Mind..</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <Label>Title</Label>

          <Input
            placeholder="Blog title"
            value={formData.title}
            required
            disabled={loading}
            maxLength={120}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Content</Label>

          <Textarea
            rows={12}
            placeholder="Write your blog..."
            required
            disabled={loading}
            maxLength={5000}
            value={formData.content}
            onChange={(e) =>
              setFormData({
                ...formData,
                content: e.target.value,
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Tags</Label>

          <Input
            placeholder="nextjs, prisma, auth"
            value={formData.tags}
            required
            disabled={loading}
            onChange={(e) =>
              setFormData({
                ...formData,
                tags: e.target.value,
              })
            }
          />

          <p className="text-xs text-muted-foreground">
            Separate tags using commas.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Cover Image</Label>

          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] ?? null)}
          />
        </div>

        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? "Publishing..." : "Publish Blog"}
        </Button>
      </form>
    </Card>
  );
}
