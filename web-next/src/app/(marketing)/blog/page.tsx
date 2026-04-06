import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { getAllPosts, getCategorySlug, BLOG_CATEGORIES } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE_EMAIL, SITE_PHONE, SITE_PHONE_TEL } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Blog | Real Estate Insights for GTA Investors | King of Kings Group",
  description: "Market updates, investment strategies, rental advice, and development insights for property owners and investors in Mississauga and the GTA.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <Hero
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1974"
        title="Blog"
        subtitle="Market Authority · Investor Education · GTA & Mississauga"
        primaryCta={{ label: "Book a Consultation", href: "/contact" }}
        secondaryCta={{ label: SITE_PHONE, href: SITE_PHONE_TEL }}
        large={false}
      />

      <section className="section-padding bg-white">
        <div className="container-wide">
          <p className="text-gray-600 leading-relaxed max-w-3xl mb-12">
            Insights for property owners and investors in Mississauga and the Greater Toronto Area. Market updates, investment frameworks, rental advice, and development perspectives—designed to support informed decisions.
          </p>

          <div className="flex flex-wrap gap-3 mb-12">
            <Link
              href="/blog"
              className="px-5 py-2.5 font-medium text-sm uppercase tracking-wider bg-secondary text-white"
            >
              All
            </Link>
            {BLOG_CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/blog/category/${getCategorySlug(cat)}`}
                className="px-5 py-2.5 font-medium text-sm uppercase tracking-wider bg-muted text-gray-600 hover:border-primary/20 border border-transparent transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <div className="bg-muted p-10 border border-transparent hover:border-primary/20 transition-all duration-300 h-full flex flex-col">
                  <span className="text-primary font-bold tracking-widest uppercase text-xs mb-3 block">
                    {post.category}
                  </span>
                  <h2 className="font-serif text-xl md:text-2xl text-secondary mb-4 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-sm mb-6 flex-grow line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-CA", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <span>{post.readingTime} min read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 pt-16 border-t border-gray-200">
            <p className="text-gray-600 mb-4">
              Explore our <Link href="/services" className="text-primary hover:underline font-medium">services</Link> and{" "}
              <Link href="/property-management" className="text-primary hover:underline font-medium">property management</Link> across the GTA.
            </p>
          </div>
        </div>
      </section>

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
        </div>
      </section>

      <Footer />
    </>
  );
}
