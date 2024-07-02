"use client";
import { blog_data } from "@/assets/assets";
import BlogItem from "./BlogItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { StaticImageData } from "next/image";

type BlogItemProps = {
  _id: number;
  title: string;
  description: string;
  image: StaticImageData;
  date: number;
  category: string;
  author: string;
  author_img: StaticImageData;
};

const BlogList = () => {
  const [menu, setMenu] = useState<string>("All");
  const [blogs, setBlogs] = useState<BlogItemProps[]>([]);

  const fecthData = async () => {
    const response = await axios.get("/api/blog");
    setBlogs(response.data.blogs);
  }

  useEffect(() => {
    fecthData();
  }, [])



  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
        <button
          onClick={() => setMenu("All")}
          className={
            menu === "All" ? `bg-black text-white py-1 px-4 rounded-sm` : ""
          }
        >
          All
        </button>
        <button
          onClick={() => setMenu("Technology")}
          className={
            menu === "Technology"
              ? `bg-black text-white py-1 px-4 rounded-sm`
              : ""
          }
        >
          technology
        </button>
        <button
          onClick={() => setMenu("Startup")}
          className={
            menu === "Startup" ? `bg-black text-white py-1 px-4 rounded-sm` : ""
          }
        >
          Startup
        </button>
        <button
          onClick={() => setMenu("Lifestyle")}
          className={
            menu === "Lifestyle"
              ? `bg-black text-white py-1 px-4 rounded-sm`
              : ""
          }
        >
          Lifestyle
        </button>
      </div>
      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {blogs
          .filter((item) => menu === "All" || item.category === menu)
          .map((item) => (
            <BlogItem
              key={item.title}
              title={item.title}
              description={item.description}
              image={item.image}
              date={item.date}
              category={item.category}
              author={item.author}
              author_img={item.author_img}
              id={item._id}
            />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
