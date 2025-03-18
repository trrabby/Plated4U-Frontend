/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useUser } from "@/context/UserContext";
import { UserInfo } from "@/services/AuthService";
import { ICustomizableMeal } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { FaOpencart, FaRegEdit } from "react-icons/fa";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableCustomerInfo, setEditableCustomerInfo] = useState({
    name: "",
    number: "",
    city: "",
    colony: "",
    postOffice: "",
    subDistrict: "",
  });

  const { user } = useUser();
  const { register, handleSubmit } = useForm<FormData>();

  const fetchUserInfo = async (email: string) => {
    try {
      const response = await UserInfo(email);
      const result = response?.data?.result?.[0] || null;
      setEditableCustomerInfo({
        name: result?.name || "",
        number: result?.number || "",
        city: result?.city || "",
        colony: result?.colony || "",
        postOffice: result?.postOffice || "",
        subDistrict: result?.subDistrict || "",
      });
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchUserInfo(user.email);
    }
  }, [user?.email]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const orderResponse: OrderResponse = {
      email: user?.email as string,
      orderInfo: [
        {
          productId: product._id,
          base: data.base,
          extras: data.extras,
          protein: data.protein,
          orderedQuantity: data.orderedQuantity,
        },
      ],
      totalPrice: product.price * data.orderedQuantity,
      customerInfo: editableCustomerInfo,
    };

    console.log("Order Response:", orderResponse);
  };

  const handleEditCustomerInfo = () => {
    setIsModalOpen(true);
  };

  const handleSaveCustomerInfo = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof editableCustomerInfo
  ) => {
    setEditableCustomerInfo((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
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

        <div className="flex gap-2 justify-center items-center">
          <Button
            type="button"
            onClick={handleEditCustomerInfo}
            variant="outline"
            className="flex justify-center items-center gap-1 cursor-pointer"
          >
            <FaRegEdit /> Delivery Address
          </Button>

          <Button
            type="submit"
            variant="outline"
            className="flex justify-center items-center gap-1 cursor-pointer"
          >
            Proceed <FaOpencart />
          </Button>
        </div>
      </form>

      {/* Customer Info Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              Edit Delivery Information
            </DialogTitle>
          </DialogHeader>
          <Table>
            <TableBody>
              {Object.entries(editableCustomerInfo).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell className="font-medium">
                    {key.toLocaleUpperCase()}
                  </TableCell>
                  <TableCell>
                    <Input
                      value={value}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          key as keyof typeof editableCustomerInfo
                        )
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DialogFooter>
            <Button className="cursor-pointer" onClick={handleSaveCustomerInfo}>
              Save
            </Button>
            <Button
              className="cursor-pointer"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
