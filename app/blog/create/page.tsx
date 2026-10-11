import CreateBlog from "@/components/blog/CreateBlog";

export default function CreateBlogPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Create Blog
        </h1>

        <p className="text-muted-foreground mt-2">
          Share your thoughts with the world.
        </p>
      </div>

      <CreateBlog />
    </main>
  );
}