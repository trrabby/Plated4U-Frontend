"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { addProduct } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";

import { ICustomizableMeal } from "@/types";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RiShoppingCartFill } from "react-icons/ri";

const ProductCard = ({ product }: { product: ICustomizableMeal }) => {
  const dispatch = useAppDispatch();

  const handleAddProduct = (product: ICustomizableMeal) => {
    dispatch(addProduct(product));
  };

  return (
    <div>
      <Card className="p-3 w-64">
        <Link href={`/meals/${product?._id}`} passHref>
          <CardHeader className="relative p-0 h-48">
            <Image
              src={
                product?.imgUrl[0] ||
                "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
              }
              width={500}
              height={500}
              alt="product image"
              className="rounded-sm h-48 object-cover"
            />
          </CardHeader>

          <CardContent className=" p-0 mt-2">
            <CardTitle
              title={product?.name}
              className="font-semibold cursor-pointer text-sm"
            >
              {product?.name.length > 20
                ? product?.name?.slice(0, 20) + "..."
                : product?.name}
            </CardTitle>

            <div className="flex items-center justify-between my-2">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">
                  $ {product?.price.toFixed(2)}
                </span>
              </p>

              <div className="flex items-center justify-center gap-1">
                <Star className="w-4 h-4" fill="orange" stroke="orange" />
              </div>
              <p></p>
            </div>
          </CardContent>

          <CardFooter className="block p-0">
            <div className="flex gap-2 items-center justify-between">
              <Button
                size="sm"
                variant="outline"
                className="w-32 cursor-pointer"
              >
                Buy Now
              </Button>
              <Button
                onClick={() => handleAddProduct(product)}
                variant="outline"
                size="sm"
                className="w-8 h-8 p-0 flex items-center justify-center rounded-full"
              >
                <RiShoppingCartFill />
              </Button>
            </div>
          </CardFooter>
        </Link>
      </Card>
    </div>
  );
};

export default ProductCard;
