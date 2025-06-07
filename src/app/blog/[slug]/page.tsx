// src/app/blog/[slug]/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';
import Header from '@/components/Header';

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ''),
  }));
}

export default async function PostPage({
  params,
}: {
  // params may be a Promise in Next.js 14+
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  // ✅ Await it before use
  const { slug } = await params;

  const postsDirectory = path.join(process.cwd(), 'posts');
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return (
      <div className="text-center pt-40">
        <h1 className="text-3xl font-bold">404 - Post not found</h1>
      </div>
    );
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return (
    <>
      <Header />
      <article className="max-w-5xl mx-auto p-4 pt-32">
        <Link href="/blog" className="text-blue-500 underline block mb-4">
          ← Volver a Noticias
        </Link>
        <h1 className="text-5xl font-bold mb-4">{data.title}</h1>
        <p className="text-sm text-gray-500 mb-8">
          {new Date(data.date).toLocaleDateString()}
        </p>
        <div className="prose" dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </>
  );
}
