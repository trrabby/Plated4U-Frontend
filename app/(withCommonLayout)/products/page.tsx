import Banner from "@/components/Shared/CustomBanner";
import CategoryCard from "@/components/ui/core/CategoryCard";
import CustomContainer from "@/components/ui/core/CustomContainer";
import { getAllCategories } from "@/services/Category";
import { getAllProducts } from "@/services/Product";
import { ICategory } from "@/types";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const AllProductsPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const query = await searchParams;

  const { data: categories } = await getAllCategories();
  const { data: products } = await getAllProducts(undefined, undefined, query);

  return (
    <CustomContainer>
      {/* Use inline styles for the background */}
      <div>
        <Banner heading="Customized Meals" description="Enjoy our meals" />

        <h2 className="text-xl font-bold my-5">Featured Collection </h2>
        <div className="grid grid-cols-6 gap-6">
          {categories?.slice(0, 6).map((category: ICategory, idx: number) => (
            <CategoryCard key={idx} category={category} />
          ))}
        </div>
        {/* <AllProducts products={products} /> */}
      </div>
    </CustomContainer>
  );
};

export default AllProductsPage;
