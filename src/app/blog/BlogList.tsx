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

interface BlogListProps {
  posts: BlogPost[];
}

// Helper function to extract a plain text excerpt from HTML
const getExcerpt = (htmlContent: string, maxLength: number = 200): string => {
  const plainText = htmlContent.replace(/<[^>]+>/g, '');
  if (plainText.length <= maxLength) return plainText;
  return plainText.slice(0, maxLength) + '...';
};

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Extract unique tags from all posts
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags ?? [])));

  // Filter posts based on selected tags and search term
  let filteredPosts = posts;
  if (selectedTags.length > 0) {
    filteredPosts = filteredPosts.filter((post) =>
      post.tags?.some((tag) => selectedTags.includes(tag))
    );
  }
  if (searchTerm.trim() !== '') {
    const term = searchTerm.toLowerCase();
    filteredPosts = filteredPosts.filter((post) =>
      post.title.toLowerCase().includes(term) ||
      post.content.toLowerCase().includes(term)
    );
  }

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar for filters (1/4 width) */}
      <aside className="md:w-1/4 p-4 border-r border-gray-300">
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Buscar:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Escribe para buscar..."
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <span className="block mb-2 font-semibold">Filtrar por etiquetas:</span>
          <div className="space-y-2">
            {allTags.map((tag) => (
              <label key={tag} className="flex items-center">
                <input
                  type="checkbox"
                  value={tag}
                  checked={selectedTags.includes(tag)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedTags([...selectedTags, tag]);
                    } else {
                      setSelectedTags(selectedTags.filter((t) => t !== tag));
                    }
                  }}
                  className="mr-2"
                />
                <span>{tag}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Posts List (3/4 width) */}
      <div className="md:w-3/4 p-4">
        {filteredPosts.length === 0 && (
          <p className="text-center text-gray-700">No se encontraron publicaciones.</p>
        )}
        <div className="space-y-8">
          {filteredPosts.map((post) => {
            const excerpt = getExcerpt(post.content);
            return (
              <article key={post.id} className="border border-gray-300 p-4 rounded bg-white">
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    {/* Title is a clickable link to the post's unique URL */}
                    <Link href={`/blog/${post.id}`} className="text-black-500">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="mb-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="inline-block bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 mr-2 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="blog-content text-gray-700">
                  <p>{excerpt}</p>
                </div>
                <div className="mt-2">
                  <Link href={`/blog/${post.id}`} className="text-black-500 underline">
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
