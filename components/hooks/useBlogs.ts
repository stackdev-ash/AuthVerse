"use client";

import { useEffect, useState } from "react";
import { Blog } from "@/components/types/blog";

export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const [loading, setLoading] = useState(true);

  async function fetchBlogs() {
    try {
      const res = await fetch("/api/blog/all");

      const data = await res.json();

      setBlogs(data.blogs);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  return {
    blogs,
    loading,
    refetch: fetchBlogs,
  };
}