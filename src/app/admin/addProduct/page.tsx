"use client";

import { assets } from "@/assets/assets";
import axios from "axios";
import { set } from "mongoose";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { clearScreenDown } from "readline";

const AddPrudctPage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [data, setData] = useState({
    title : "",
    description: "",
    category: "Startup",
    author: "Alex Bennett",
    author_img: "/profile_icon.png",
  });

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("author_img", data.author_img);
    formData.append("image", image!);

    const response = await axios.post("/api/blog", formData);

    if (response.status === 200) {
      toast.success("Product Added");
    }else {
      toast.error("Something went wrong")
    }

    setImage(null);
    setData({title : "", description: "", category: "Startup", author: "Alex Bentley", author_img: "/profile_icon.png"});
  }

  return (
    <>
      <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
        <p className="text-2xl">Upload Thumbnail</p>
        <label htmlFor="image" className="cursor-pointer">
          <Image
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            width={140}
            height={70}
            alt="Product Thumbnail"
            className="mt-5 object-cover w-[140px] h-[70px] "
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files![0])}
          type="file"
          id="image"
          hidden
          required
        />
        <p className="text-2xl mt-5">Blog Title</p>
        <input
          type="text"
          className="w-full sm:w-[500px] border border-black py-2 px-5 mt-3"
          placeholder="Product Name"
          name="title"
          onChange={onChangeHandler}
          value={data.title}
          required
        />
        <p className="text-2xl mt-5">Blog Description</p>
        <textarea
          className="w-full border border-black py-2 px-5 mt-3"
          placeholder="Product content"
          required
          name="description"
          onChange={onChangeHandler}
          value={data.description}
          rows={6}
        ></textarea>
        <p className="text-2xl mt-5">Blog category</p>
        <select
          name="category"
          id=""
          className="w-40 mt-4 px-4 py-3 border text-gray-500"
          onChange={(e) => onChangeHandler(e)}
          value={data.category}
        >
          <option value="startup">Startup</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="technology">Technology</option>
        </select>
        <br />
        <button type="submit" className="mt-8 w-40 h-12 bg-black text-white ">
          Add Product
        </button>
      </form>
    </>
  );
};

export default AddPrudctPage;
