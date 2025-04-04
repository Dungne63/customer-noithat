import { FC } from "react";
import { Blog } from "../pages/Voucher/hook";

interface AllBlogsProps {
    blogs: Blog[];
    loading: boolean;
    onSelectBlog: (blog: Blog) => void;
}

const AllBlog: FC<AllBlogsProps> = ({ blogs, loading, onSelectBlog }) => {
    if (loading) return <p className="text-center">Đang tải danh sách blog...</p>;
  
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Danh sách Blog</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="border rounded-lg p-4 shadow-lg cursor-pointer hover:shadow-xl transition"
              onClick={() => onSelectBlog(blog)}
            >
              <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover rounded-md" />
              <h3 className="text-lg font-semibold mt-2">{blog.title}</h3>
              <p className="text-gray-700 text-sm line-clamp-2">{blog.content}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default AllBlog;
  