import { BlogPostContent } from "@/components/BlogPostContent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { blogs } from "@/lib/constants";
import { notFound } from "next/navigation";
import type { BlogPosting, WithContext } from "schema-dts";

export async function generateMetadata(props: { params: Promise<Params> }) {
  const params = await props.params;

  const { slug } = params;

  const post = blogs.find((post: BlogPost)=> post.slug == slug);
  if (!post) {
    return {
      title: "Blog post not found",
    };
  }

  const { title, description, image } = post;
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image,
    },
  };
}
interface Params {
  slug: string;
}

const Page = async (props: { params: Promise<Params> }) => {
  const params = await props.params;

  const { slug } = params;

  const post = blogs.find((post: BlogPost)=> post.slug == slug);
  
  if (!post) {
    return notFound();
  }

  const { title, publishedAt, updatedAt, image, author } = post;

  const jsonLd: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    image: image ? image : undefined,
    datePublished: publishedAt ? publishedAt.toString() : undefined,
    dateModified: updatedAt.toString(),
    author: {
      "@type": "Person",
      name: author.name ?? undefined,
      image: author.image ?? undefined,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-5">
        <Header />
       <div className="max-w-prose mx-auto text-xl">
          <BlogPostContent post={post} />
          {/* <RelatedPosts posts={posts} />
          <CommentSection slug={slug} /> */}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Page;
