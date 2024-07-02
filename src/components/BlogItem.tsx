import Image, { StaticImageData } from "next/image";
import { assets, blog_data } from "@/assets/assets";
import Link from "next/link";

interface BlogItemProps {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
  date: number;
  category: string;
  author: string;
  author_img: StaticImageData;
}

const BlogItem = ({title, description, image, date, category, author, author_img, id}: BlogItemProps) => {
  return (
    <div className="max-w-[330px] sm:max-w-[300px] bg-white border border-black hover:shadow-[-7px_7px_0px_#000000]">
      <Link href={`/blogs/${id}`}>
      <Image
        src={image}
        alt="Blog Image"
        width={1280}
        height={720}
        className="border-b border-black "
      />
      <p className="ml-5 mt-5 px-1 inline-block bg-black text-white text-sm">
        {category}
      </p>
      <div className="p-5">
        <h4 className="mb-2 text-lg font-medium tracking-tight text-gray-900">
          {title}
        </h4>
        <p className="mb-3 font-normal tracking-tight text-gray-700"
        dangerouslySetInnerHTML={{__html: description.slice(0, 120)}}>
          
        </p>
        <div className="inline-flex items-center py-2 font-semibold text-center">
          read more <Image src={assets.arrow} alt="Arrow Right" width={20} height={20} className="ml-2" />
        </div>
      </div>
      </Link>
    </div>
  );
};

export default BlogItem;
