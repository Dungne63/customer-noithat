import { FC } from "react";
import useBlog, { Props, ReceivedProps } from "./hook";
import { ROUTE_PATHS } from "@constants/route.const";
import AppLoading from "@components/common/AppLoading";

const BlogLayout: FC<Props> = ({ navigate, blogs, loading }) => {
  if (loading) {
    return <AppLoading isLoading />;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Danh sách bài viết</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="border rounded-lg p-4 shadow-lg cursor-pointer hover:shadow-xl transition"
            onClick={() => navigate(`/${ROUTE_PATHS.BLOG}/${blog._id}`)}
            data-aos="fade-up"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-2">{blog.title}</h3>
            <p className="text-gray-700 text-sm line-clamp-2">{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Blog: FC<ReceivedProps> = (props) => <BlogLayout {...useBlog(props)} />;

export default Blog;
