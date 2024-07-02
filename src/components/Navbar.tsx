"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
const Navbar = () => {

  const [email, setEmail] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    const response = await axios.post('/api/email', formData);
    if (response.status === 200) {
      toast.success("Email Saved");
      setEmail("");
    } else {
      toast.error("Something went wrong")
    }
  };

  
  return (
    <nav className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <Image
          src="/logos/logoipsum-290.svg"
          alt="Company Logo" // Descriptive alt text for accessibility
          width={180}
          height={180}
          layout="fixed" // Maintain aspect ratio and prevent layout shifts
          className="w-[130px] sm:w-auto" // Responsive width adjustments
        />

        <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]">
          Get Started
        </button>
      </div>

      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>
        <p className="mt-10 max-w-[740px] m-auto text-base sm:text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est eum
          tenetur dolor autem quibusdam pariatur quae incidunt! Corporis, fugit
          eos recusandae aspernatur quisquam explicabo, ipsum laboriosam dicta
          perferendis sint magni?
        </p>
        <form className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]"
        onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email"
            className="w-full pl-4 outline-none"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <button type="submit" className= "border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white">Subscribe</button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
