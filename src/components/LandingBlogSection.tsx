// src/components/LandingBlogSection.tsx
import React from 'react';
import BlogCardList from './blog/BlogCardList';
import { getBlogPosts } from '@/lib/blog';
import Link from 'next/link'

const LandingBlogSection = async () => {
  const posts = await getBlogPosts();
  const recentPosts = posts.slice(0, 3);

  return (
    <section id="blog" className="snap-start min-h-screen flex items-center justify-center bg-white py-20">
      <div className="max-w-6xl w-full px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">Noticias</h2>
        <BlogCardList posts={recentPosts} />
        <div className="text-center mt-12">
          <Link href="/blog" className="text-blue-500 underline font-medium">
            Ver todas las publicaciones
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LandingBlogSection;
