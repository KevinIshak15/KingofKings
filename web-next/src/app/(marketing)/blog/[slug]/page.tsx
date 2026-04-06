import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { BlogContent } from "@/components/BlogContent";
import { getPostBySlug, getAllSlugs, getCategorySlug } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE_EMAIL, SITE_PHONE, SITE_PHONE_TEL } from "@/lib/site";
import { JsonLd } from "@/lib/seo/schema";
import { buildBlogPostingSchema, buildBreadcrumbSchema } from "@/lib/seo/schema";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: `${post.title} | King of Kings Group`,
    description: post.excerpt.slice(0, 160),
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.category, url: `/blog/category/${getCategorySlug(post.category)}` },
    { name: post.title, url: `/blog/${slug}` },
  ];

  return (
    <>
      <JsonLd
        data={buildBlogPostingSchema({
          title: post.title,
          description: post.excerpt,
          slug: post.slug,
          datePublished: post.date,
          dateModified: post.date,
          author: post.author,
          image: post.coverImage,
        })}
      />
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs.map((b) => ({ name: b.name, url: b.url })))} />

      <article className="pt-32 pb-16">
        <div className="container-wide">
          <nav className="text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
            <ol className="flex flex-wrap gap-2">
              {breadcrumbs.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  {i > 0 && <span>/</span>}
                  {i < breadcrumbs.length - 1 ? (
                    <Link href={item.url} className="hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  ) : (
                    <span className="text-gray-700">{item.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <header className="max-w-3xl mb-12">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-secondary mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-CA", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <Link
                href={`/blog/category/${getCategorySlug(post.category)}`}
                className="text-primary font-medium hover:underline"
              >
                {post.category}
              </Link>
              <span>{post.readingTime} min read</span>
              {post.author && <span>{post.author}</span>}
            </div>
          </header>

          {post.coverImage && (
            <div className="mb-12 relative w-full aspect-[21/9] overflow-hidden">
              <Image
                src={post.coverImage}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-3">
              <div className="max-w-3xl">
                <BlogContent body={post.body} />
              </div>
            </div>
            <aside className="lg:col-span-1">
              {post.takeaways.length > 0 && (
                <div className="bg-muted p-8 border border-transparent sticky top-32">
                  <h3 className="font-serif text-lg text-secondary mb-4">Key Takeaways</h3>
                  <ul className="space-y-2">
                    {post.takeaways.map((takeaway, i) => (
                      <li key={i} className="flex items-start text-gray-600 text-sm">
                        <span className="w-2 h-2 bg-primary mr-3 rounded-full mt-2 shrink-0" />
                        {takeaway}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </article>

      <section className="py-24 bg-secondary text-white text-center">
        <div className="container-wide">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Let&apos;s Build a Clear Plan for Your Next Move</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
            Whether you&apos;re buying, selling, managing, or investing—we provide strategic guidance tailored to your goals in Mississauga and the GTA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="bg-primary text-white hover:bg-white hover:text-secondary transition-all duration-300 px-10 py-4 font-bold uppercase tracking-widest text-sm border border-primary">Book a Consultation</button>
            </Link>
            <a href={SITE_PHONE_TEL}>
              <button className="bg-white text-secondary hover:bg-primary hover:text-white transition-all duration-300 px-10 py-4 font-bold uppercase tracking-widest text-sm">{SITE_PHONE}</button>
            </a>
          </div>
          <p className="mt-10 text-gray-500 text-sm">
            <a href={SITE_PHONE_TEL} className="text-primary hover:underline">{SITE_PHONE}</a>
            {" · "}
            <a href={`mailto:${SITE_EMAIL}`} className="text-primary hover:underline">{SITE_EMAIL}</a>
          </p>
          <p className="mt-6 text-gray-500 text-sm">
            <Link href="/blog" className="text-primary hover:underline">← Back to Blog</Link>
            {" · "}
            <Link href="/services" className="text-primary hover:underline">Services</Link>
            {" · "}
            <Link href="/property-management" className="text-primary hover:underline">Property Management</Link>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
