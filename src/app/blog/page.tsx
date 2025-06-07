import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import React from 'react';
import BlogList from './BlogList';
import Link from 'next/link'
import Header from '@/components/Header';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  tags?: string[];
}

const postsDirectory = path.join(process.cwd(), 'posts');

async function getBlogPosts(): Promise<BlogPost[]> {
  const filenames = fs.readdirSync(postsDirectory);
  const posts: BlogPost[] = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      const processedContent = await remark().use(html).process(content);
      return {
        id: filename.replace(/\.md$/, ''),
        title: data.title,
        date: data.date,
        tags: data.tags || [],
        content: processedContent.toString(),
      };
    })
  );
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto p-4 mt-32">
        <h1 className="text-5xl font-bold mb-8 text-center">Noticias</h1>
        <BlogList posts={posts} />

      </div>
      <br></br>
      <footer id="footer" className="snap-start text-white py-10" style={{ backgroundColor: '#343432' }}>
          
          <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8">
            {/* Company Information */}
            <div>
              <h3 className="text-xl font-bold mb-4">Contacto</h3>
              <p>¿Tienes preguntas o deseas más información sobre nuestros servicios? Contáctanos y uno de nuestros expertos
              se pondrá en contacto contigo para ayudarte a transformar tu negocio.</p>
              <br></br>
              <p>gestion@airdexa.com</p>
              <p>Madrid, España</p>
            </div>
            {/* Contact Form */}
            <div>

            </div>
          </div>
          <p className="mt-4 text-center">
            &copy; {new Date().getFullYear()} Airdexa. Todos los derechos reservados. <Link href="/terminos" className="text-white underline">Términos y Política</Link>
          </p>
        </footer>
    </>
  );
}
