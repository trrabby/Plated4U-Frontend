import ProductCard from "@/components/ui/core/ProductCard";
import { ICustomizableMeal } from "@/types";
import FilterSidebar from "./FilterSidebar";

const AllProducts = ({ products }: { products: ICustomizableMeal[] }) => {
  return (
    <div className="flex gap-8 my-10 mt-20">
      <div className="w-full max-w-sm">
        <FilterSidebar />
      </div>
      <div>
        <div className="grid grid-cols-3 gap-8">
          {products?.map((product: ICustomizableMeal, idx: number) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
