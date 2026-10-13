import BlogList from "@/components/blog/BlogList";

export default function Home() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
      <h1 className="text-5xl font-bold flex items-center justify-center">
        Welcome to AuthVerse
      </h1>

      <p className="text-muted-foreground text-center text-xl flex items-center justify-center ">
        Share your thoughts with the world. Publish blogs or browse what others
        have written.
      </p>

      <BlogList />
    </main>
  );
}
