/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useUser } from "@/context/UserContext";
import { ICustomizableMeal } from "@/types";
import Image from "next/image";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  base: string;
  protein: string;
  extras: string[];
  orderedQuantity: number;
}

interface OrderResponse {
  email: string;
  orderInfo: {
    productId: string;
    base: string;
    extras: string[];
    protein: string;
    orderedQuantity: number;
  }[];
  totalPrice: number;
  customerInfo: {
    name: string;
    number: string;
    city: string;
    colony: string;
    postOffice: string;
    subDistrict: string;
  };
}

export default function ProductDetails({
  product,
}: {
  product: ICustomizableMeal;
}) {
  const { user } = useUser();
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const orderResponse: OrderResponse = {
      email: user?.email || "trrabby1@gmail.com",
      orderInfo: [
        {
          productId: product._id,
          base: data.base,
          extras: data.extras || product.extras,
          protein: data.protein,
          orderedQuantity: data.orderedQuantity,
        },
      ],
      totalPrice: product.price * data.orderedQuantity,
      customerInfo: {
        name: "John Doe",
        number: "0123456789",
        city: "Dhaka",
        colony: "Green Valley",
        postOffice: "Gulshan",
        subDistrict: "Banani",
      },
    };

    console.log("Order Response:", orderResponse);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Image
        width={900}
        height={500}
        src={product.imgUrl[0]}
        alt={product.name}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-lg font-semibold">Price: ${product.price}</p>
      <p className="text-gray-500">Calories: {product.calories} kcal</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <div>
          <label className="font-semibold">Choose Base:</label>
          <select
            {...register("base")}
            className="block w-full p-2 border rounded"
          >
            {product.baseOptions.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold">Choose Protein:</label>
          <select
            {...register("protein")}
            className="block w-full p-2 border rounded"
          >
            {product.proteinOptions.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="font-semibold">Extras:</h3>
          {product.extras.map((extra: string) => (
            <label key={extra} className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register("extras")}
                value={extra}
                className="mr-2"
              />
              {extra}
            </label>
          ))}
        </div>

        <div>
          <label className="font-semibold">Quantity:</label>
          <input
            type="number"
            {...register("orderedQuantity", { valueAsNumber: true })}
            className="block w-full p-2 border rounded"
            min="1"
            defaultValue={1}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
}
