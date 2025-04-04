import { FC, useState } from "react";
import { Blog, Props } from "./Voucher/hook";
import DetailBlog from "../components/DetailBlogs";
import AllBlog from "../components/AllBlogs";

const BlogLayout: FC<Props> = ({ blogs, loading }) => {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  return selectedBlog ? (
    <DetailBlog blog={selectedBlog} onBack={() => setSelectedBlog(null)} />
  ) : (
    <AllBlog blogs={blogs} loading={loading} onSelectBlog={setSelectedBlog} />
  );
};

export default BlogLayout;
