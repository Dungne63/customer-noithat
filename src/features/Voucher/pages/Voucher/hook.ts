import axios from "axios";
import { useEffect, useState } from "react";

export type ReceivedProps = Record<string, any>;

export interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
  status: string;
  images: string[];
  statusLabel: string;
}

export interface Props {
  blogs: Blog[];
  loading: boolean;
}

const useBlog = (props: ReceivedProps): Props => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiUrlWithoutVersion = import.meta.env.VITE_API_URL_WITHOUT_VERSION;

    const token = localStorage.getItem('user_my_secret_key_24_@@@');
    if (!token) {
      console.error("Token không tồn tại.");
    }

    axios
      .get(`${apiUrl}/blog`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          const blogsData = res.data.data.data.map((blog: Blog) => ({
            ...blog,
            image: `${apiUrlWithoutVersion}${blog.image}`,
            images: blog.images.map((image: string) => `${apiUrlWithoutVersion}${image}`),
          }));
          setBlogs(blogsData);
        }
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu blog: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    blogs,
    loading,
  };
};

export default useBlog;
