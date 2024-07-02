import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-5 items-center">
      <Image src={assets.logo_light} alt="Company Logo" width={180} height={180} />
      <p className="text-white text-base ">© 2023 Company. All rights reserved</p>
      {/* Add social media links */}
    </div>
  );
};

export default Footer;
