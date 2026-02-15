import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary text-white">
      <h1 className="font-serif text-4xl md:text-6xl mb-4">404</h1>
      <p className="text-gray-400 mb-8">Page not found</p>
      <Link href="/" className="bg-primary text-secondary hover:bg-white px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors">
        Return Home
      </Link>
    </div>
  );
}
