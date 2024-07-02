'use client'

import BlogTableItem from "@/components/adminComponents/BlogTableItem"
import axios from "axios"
import { StaticImageData } from "next/image"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"


interface BlogListProps {
  _id: string
  title: string
  description: string
  image: StaticImageData
  date: number
  category: string
  author: string
  author_img: StaticImageData
  mongoId: string
}

const BlogList = () => {

  const [blogs, setblogs] = useState<BlogListProps[]>([])


  const fetchBlogs = async () => {
    const response = await axios.get("/api/blog")
    setblogs(response.data.blogs)
  }

  const deleteBlog = async (id: string) => {
    const response =await axios.delete(`/api/blog?id=${id}`)
    toast.success("Blog Deleted")
    fetchBlogs()
  }

  useEffect(() => {
    fetchBlogs()
  }, [])
  
  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All Blogs </h1>
      <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="hidden sm:block py-3 px-6">
                author name
              </th>
              <th scope="col" className=" py-3 px-6">
                Blog Title
              </th>
              <th scope="col" className="py-3 px-6">
                Date
              </th>
              <th scope="col" className="hidden sm:block py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <BlogTableItem
                key={blog.title}
                title={blog.title}
                authorImg={blog.author_img}
                author={blog.author}
                date={blog.date}
                deleteBlog={deleteBlog}
                mongoId={blog._id}
              />
            ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default BlogList