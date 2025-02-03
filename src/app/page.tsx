import { BlogPostsPreview } from "@/components/BlogPostPreview";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { blogs } from "@/lib/constants";

const Page = async (
) => {

  return (
    <div className="container mx-auto px-5 mb-10">
      <Header />
      <BlogPostsPreview posts={blogs} />
      <Footer />
    </div>
  );
};

export default Page;
