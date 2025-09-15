// src/app/blog/BlogList.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  content: string;
  tags?: string[];
}

interface BlogListProps {
  posts: BlogPost[];
}

// Helper: extract a plain text excerpt from HTML
const getExcerpt = (htmlContent: string, maxLength: number = 200): string => {
  const plainText = htmlContent.replace(/<[^>]+>/g, '');
  if (plainText.length <= maxLength) return plainText;
  return plainText.slice(0, maxLength) + '...';
};

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Unique tags
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags ?? [])));

  // Filters
  let filteredPosts = posts;
  if (selectedTags.length > 0) {
    filteredPosts = filteredPosts.filter((post) =>
      post.tags?.some((tag) => selectedTags.includes(tag))
    );
  }
  if (searchTerm.trim() !== '') {
    const term = searchTerm.toLowerCase();
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(term) ||
        post.content.toLowerCase().includes(term)
    );
  }

  return (
    <div className="flex flex-col md:flex-row text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="md:w-1/4 p-4 border-r border-gray-300 dark:border-gray-700">
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Buscar:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Escribe para buscar..."
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
          />
        </div>
        <div>
          <span className="block mb-2 font-semibold">Filtrar por etiquetas:</span>
          <div className="space-y-2">
            {allTags.map((tag) => (
              <label key={tag} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={tag}
                  checked={selectedTags.includes(tag)}
                  onChange={(e) => {
                    if (e.target.checked) setSelectedTags([...selectedTags, tag]);
                    else setSelectedTags(selectedTags.filter((t) => t !== tag));
                  }}
                  className="accent-blue-600"
                />
                <span className="text-gray-800 dark:text-gray-200">{tag}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Posts */}
      <div className="md:w-3/4 p-4">
        {filteredPosts.length === 0 && (
          <p className="text-center text-gray-700 dark:text-gray-300">
            No se encontraron publicaciones.
          </p>
        )}

        <div className="space-y-8">
          {filteredPosts.map((post) => {
            const excerpt = getExcerpt(post.content);
            return (
              <article
                key={post.id}
                className="border border-gray-300 dark:border-gray-700 p-4 rounded bg-white dark:bg-gray-800"
              >
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-blue-700 dark:text-blue-400 hover:underline"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {new Date(post.date).toLocaleDateString()}
                  </p>

                  {post.tags && post.tags.length > 0 && (
                    <div className="mb-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-xs font-semibold px-2 py-1 mr-2 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="blog-content text-gray-700 dark:text-gray-300">
                  <p>{excerpt}</p>
                </div>

                <div className="mt-2">
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-blue-700 dark:text-blue-400 underline"
                  >
                    Leer más
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
