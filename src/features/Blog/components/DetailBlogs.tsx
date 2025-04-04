import { FC } from "react";
import { Blog } from "../pages/Blog/hook";

interface DetailBlogProps {
  blog: Blog | null;
  onBack: () => void;
}

const DetailBlog: FC<DetailBlogProps> = ({ blog, onBack }) => {
  if (!blog) return <p className="text-center">Không tìm thấy blog!</p>;

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded"
      >
        Quay lại
      </button>
      <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-80 object-cover rounded-md mb-4"
      />
      <p className="text-gray-700">{blog.content}</p>
    </div>
  );
};

export default DetailBlog;
