import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const dir = path.join(process.cwd(), "content", "blog");

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  html: string;
};

export function getPosts(): Post[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: f.replace(/\.md$/, ""),
        title: data.title as string,
        description: (data.description as string) || "",
        date: (data.date as string) || "",
        html: marked.parse(content) as string,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string) {
  return getPosts().find((p) => p.slug === slug);
}
