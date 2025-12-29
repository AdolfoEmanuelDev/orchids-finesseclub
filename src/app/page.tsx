import Header from "@/components/sections/Header";
import ProductGrid from "@/components/sections/ProductGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Header />
      <ProductGrid />
    </div>
  );
}
