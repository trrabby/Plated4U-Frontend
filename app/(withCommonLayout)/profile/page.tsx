"use client";

import { useUser } from "@/context/UserContext";
import Image from "next/image";
import React, { useState } from "react";

interface CustomerInfo {
  name: string;
  email: string;
  number: string;
  city: string;
  colony: string;
  postOffice: string;
  subDistrict: string;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    email: "",
    number: "",
    city: "",
    colony: "",
    postOffice: "",
    subDistrict: "",
  });
  const { user } = useUser();
  if (!user) return <p>Loading...</p>;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // You can add logic here to save the updated info to your backend or state management
    console.log("Updated Customer Info:", customerInfo);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col items-center justify-center gap-5">
      <h1 className="text-3xl font-bold mb-6 flex justify-center items-center gap-2">
        Profile Page
        <span className="bg-amber-400 rounded-4xl p-1 text-xs">
          {user.role}
        </span>
      </h1>
      <Image
        className="rounded-3xl"
        src={user.imgUrl}
        alt="profile"
        height={100}
        width={100}
      />

      <div className="space-y-4 grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              defaultValue={user.name}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border rounded"
            />
          ) : (
            <p className="mt-1 text-lg">{user.name}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <p className="mt-1 text-lg">{user.email}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          {isEditing ? (
            <input
              type="text"
              name="number"
              value={customerInfo.number}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border rounded"
            />
          ) : (
            <p className="mt-1 text-lg">{customerInfo.number}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            City
          </label>
          {isEditing ? (
            <input
              type="text"
              name="city"
              value={customerInfo.city}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border rounded"
            />
          ) : (
            <p className="mt-1 text-lg">{customerInfo.city}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Colony
          </label>
          {isEditing ? (
            <input
              type="text"
              name="colony"
              value={customerInfo.colony}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border rounded"
            />
          ) : (
            <p className="mt-1 text-lg">{customerInfo.colony}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Post Office
          </label>
          {isEditing ? (
            <input
              type="text"
              name="postOffice"
              value={customerInfo.postOffice}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border rounded"
            />
          ) : (
            <p className="mt-1 text-lg">{customerInfo.postOffice}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sub District
          </label>
          {isEditing ? (
            <input
              type="text"
              name="subDistrict"
              value={customerInfo.subDistrict}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border rounded"
            />
          ) : (
            <p className="mt-1 text-lg">{customerInfo.subDistrict}</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}
