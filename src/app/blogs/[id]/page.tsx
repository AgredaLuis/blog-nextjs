"use client";
import { assets, blog_data } from "@/assets/assets";
import Footer from "@/components/Footer";
import axios from "axios";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Props {
  params: {
    id: string;
  };
}

interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
  date: number;
  category: string;
  author: string;
  author_img: StaticImageData;
}

const BlogById = ({ params }: Props) => {
  const [data, setData] = useState<BlogPost>({} as BlogPost);

  useEffect(() => {
    fectchBlogData();
  }, []);

  const fectchBlogData = async () => {
    const response = await axios.get('/api/blog', {params:{
      id: params.id
      }});
    setData(response.data.blog);
    console.log(data)
  };

  return (
    <>
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28 ">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src={assets.logo}
              width={180}
              alt="Company Logo"
              className="w-[130px] sm:w-auto"
            />
          </Link>
          <button className="flex items-center gap-2  font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">
            Get Started{" "}
            <Image
              src={assets.arrow}
              alt="Arrow Right"
              width={20}
              height={20}
              className="ml-2"
            />
          </button>
        </div>
        <div className="text-center my-24">
          <h1 className="text-3xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
            {data.title}
          </h1>
          <Image
            src={data.author_img}
            alt="Author"
            width={60}
            height={60}
            className="mx-auto mt-6 border border-white rounded-full"
          />
          <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
            By {data.author}
          </p>
        </div>
      </div>
      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image
          src={data.image}
          className="border-4 border-white"
          alt="Blog Image"
          width={1280}
          height={720}
        />
        <div className="blog-content" dangerouslySetInnerHTML={{__html: data.description}}>
          
        </div>



        <div className="my-24">
          <p className="text-3xl font-semibold my-4">
            Share this article on social media
          </p>
          <div className="flex">
            <Image
              src={assets.facebook_icon}
              alt="Facebook"
              width={40}
              height={40}
            ></Image>
            <Image
              src={assets.twitter_icon}
              alt="twitter"
              width={40}
              height={40}
            ></Image>
            <Image
              src={assets.googleplus_icon}
              alt="googleplus"
              width={40}
              height={40}
            ></Image>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogById;
