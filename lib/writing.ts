import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type WritingStatus = "draft" | "notes" | "published";

export type WritingFrontmatter = {
  title: string;
  summary: string;
  date: string;
  status: WritingStatus;
  tags?: string[];
};

export type WritingMeta = WritingFrontmatter & {
  slug: string;
};

const writingDir = path.join(process.cwd(), "content", "writing");

export function getWritingSlugs() {
  if (!fs.existsSync(writingDir)) return [];
  return fs
    .readdirSync(writingDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getWritingBySlug(slug: string) {
  const fullPath = path.join(writingDir, `${slug}.mdx`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as WritingFrontmatter;

  return {
    slug,
    ...frontmatter,
    content,
  };
}

export function getAllWriting(): WritingMeta[] {
  return getWritingSlugs()
    .map((slug) => {
      const post = getWritingBySlug(slug);
      return {
        slug: post.slug,
        title: post.title,
        summary: post.summary,
        date: post.date,
        status: post.status,
        tags: post.tags,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
