// components/blog/BlogCardList.tsx
import React from 'react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  content: string;
  tags?: string[];
}

interface BlogCardListProps {
  posts: BlogPost[];
}

const BlogCardList: React.FC<BlogCardListProps> = ({ posts }) => {
  return (
    <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-1">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col justify-between">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{new Date(post.date).toLocaleDateString()}</p>
            <div
              className="text-gray-700 text-sm mb-4 overflow-hidden text-ellipsis"
              style={{ maxHeight: '7em' }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <Link href={`/blog/${post.id}`} className="text-blue-500 font-medium hover:underline">
              Leer más →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogCardList;
