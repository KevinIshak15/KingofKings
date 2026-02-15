import { Navigation } from "@/components/Navigation";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      {children}
    </div>
  );
}
