// BlogCardList.tsx
import React from 'react';
import Link from 'next/link';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  tags?: string[];
}

interface Props {
  posts: BlogPost[];
}

const BlogCardList: React.FC<Props> = ({ posts }) => {
  return (
    <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-1">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col justify-between border border-transparent dark:border-gray-700"
        >
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {new Date(post.date).toLocaleDateString()}
            </p>
            <div
              className="text-gray-700 dark:text-gray-300 text-sm mb-4 overflow-hidden text-ellipsis"
              style={{ maxHeight: '7em' }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <Link
              href={`/blog/${post.id}`}
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              Leer más →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogCardList;
