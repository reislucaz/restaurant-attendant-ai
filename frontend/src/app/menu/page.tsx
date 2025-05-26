import { Pizza, GlassWater, IceCream, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cardápio | Atendimento Virtual",
  description: "Veja o menu do restaurante por categorias.",
};

interface Product {
  id: number;
  name: string;
  category: 'PIZZA' | 'BEVERAGE' | 'DESSERT';
  price: number;
}

type ProductsByCategory = {
  [category: string]: Product[];
};

function categoryHeader(category: 'PIZZA' | 'BEVERAGE' | 'DESSERT') {
  switch (category) {
    case 'PIZZA':
      return <span className="flex items-center gap-2"><Pizza className="w-6 h-6" />Pizzas</span>;
    case 'BEVERAGE':
      return <span className="flex items-center gap-2"><GlassWater className="w-6 h-6" />Bebidas</span>;
    case 'DESSERT':
      return <span className="flex items-center gap-2"><IceCream className="w-6 h-6" />Sobremesas</span>;
    default:
      return '';
  }
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Erro ao carregar o menu.");
  return res.json();
}

export default async function MenuPage() {
  let products: Product[] = [];
  let error: string | null = null;
  try {
    products = await getProducts();
  } catch {
    error = "Erro ao carregar o menu.";
  }

  // Agrupa produtos por categoria
  const productsByCategory: ProductsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {} as ProductsByCategory);

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-slate-50 rounded-lg shadow p-4">
      <div className="flex items-center mb-4">
        <Link href="/" className="mr-2 px-3 py-1 bg-slate-200 text-slate-800 rounded-md text-sm font-medium hover:bg-slate-300 transition-colors flex items-center">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold text-center flex-1">Cardápio</h1>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {!error && (
        <div className="space-y-6 overflow-y-auto">
          {Object.entries(productsByCategory).map(([category, items]) => (
            <div key={category}>
              <h2 className="text-xl font-semibold mb-2 capitalize">{categoryHeader(category as 'PIZZA' | 'BEVERAGE' | 'DESSERT')}</h2>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.id} className="flex justify-between bg-white rounded-lg shadow p-3">
                    <span>{item.name}</span>
                    <span className="font-semibold">R$ {item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 