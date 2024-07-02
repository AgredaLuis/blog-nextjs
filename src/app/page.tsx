import Image from "next/image";
import BlogItem from "../components/BlogItem";
import Navbar from "@/components/Navbar";
import BlogList from "@/components/BlogList";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <BlogList />
      <Footer />
    </>
  );
}
