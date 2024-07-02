import { assets } from "@/assets/assets";
import Image, { StaticImageData } from "next/image";

interface Props {
    title: string;
    authorImg?: StaticImageData;
    author: string;
    date: number;
    mongoId : string
    deleteBlog: (id: string) => void;

}

const BlogTableItem = ({title, authorImg, author , date, mongoId ,deleteBlog} : Props) => {

  const blodDate = new Date(date)
  return (
    <tr className="bg-white border-b ">
      <th
        scope="row"
        className="py-4 px-6 font-medium gap-3 hidden sm:flex text-gray-900 whitespace-nowrap"
      >
        <Image src={authorImg? authorImg : assets.profile_icon} alt="Profile" width={40} height={40} />
        <p>{author ? author : "No Author"}</p>
      </th>
      <td className="px-6 py-4">
        {title ? title:"No Title"}
      </td>
      <td className="px-6 py-4">
        {blodDate.toDateString()}
      </td>
      <td className="px-6 py-4 cursor-pointer" onClick={() => deleteBlog(mongoId)}>
        x
      </td>
    </tr>
  );
};

export default BlogTableItem;
