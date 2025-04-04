import AppImage from "@components/AppImage";
import AppLoading from "@components/common/AppLoading";
import { ArrowLeftIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import SysFetch from "@services/axios";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const BlogDetail: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState<any>(null);

  useEffect(() => {
    const getBlogDetail = async () => {
      try {
        setLoading(true);
        const response: any = await SysFetch.get(`/blog/${id}`);
        if (response.statusCode === 200) {
          setBlog(response.data);
        } else {
          throw new Error("Failed to fetch blog details");
        }
      } catch (error) {
        console.error("Failed to fetch blog details");
        setBlog(undefined);
      } finally {
        setLoading(false);
      }
    };
    getBlogDetail();
  }, [id]);

  if (loading) return <AppLoading isLoading />;
  if (blog === undefined)
    return <p className="text-center">Không tìm thấy blog!</p>;

  return (
    blog && (
      <div className="container mx-auto p-4">
        <div>
          <div
            className="mb-6 cursor-pointer text-lg flex items-center text-gray-500 hover:text-gray-700 hover:underline"
            onClick={() => navigate(-1)}
          >
            <ChevronLeftIcon className="size-5" />
            Quay lại
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>
        <AppImage
          src={blog?.image}
          alt={blog?.title}
          className="w-full h-80 object-cover rounded-md mb-4"
        />
        <p className="text-gray-700">{blog.content}</p>
      </div>
    )
  );
};

export default BlogDetail;
