/* Aqui van los GET , PUT , DELETE , POST */

import { ConnectDB } from "@/lib/config/db";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import BlogModel from "@/lib/models/blogModel";

const LoadDB = async () => {
  try {
    await ConnectDB();
  } catch (error) {
    /* En caso de error */
    console.log(error);
  }
};


/* API Endpoint for get all blogs */
export async function GET(request: NextRequest) {
  LoadDB();
  
  const blogId = request.nextUrl.searchParams.get("id");
  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json({ blog });
  }
  const blogs = await BlogModel.find({});

  return NextResponse.json({blogs});
}


/* API Endpoint for uploading blogs using POST  */
export async function POST(request: NextRequest): Promise<NextResponse> {
  LoadDB();
  const formData = await request.formData();
  const timestamp = Date.now();
  const image = formData.get("image");

  if (image && typeof image !== "string" && "arrayBuffer" in image) {
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;
    fs.writeFileSync(path, buffer);
    const imgUrl = `/${timestamp}_${image.name}`;

    const blogData = {
      title: `${formData.get("title")}`,
      description: `${formData.get("description")}`,
      image: `${imgUrl}`,
      date: timestamp,
      category: `${formData.get("category")}`,
      author: `${formData.get("author")}`,
      author_img: `${formData.get("author_img")}`,
    };

    await BlogModel.create(blogData);

    console.log("blog saved");
    return NextResponse.json({ success: true, msg: "Blog Saved" });
  } else {
    return NextResponse.json({ success: false, msg: "Invalid image" });
  }
}


/* DELETE ENDPOINT */

export async function DELETE(request: NextRequest) {
  LoadDB();
  const blogId =  request.nextUrl.searchParams.get("id");

  const blog = await BlogModel.findById(blogId);
  fs.unlink(`./public/${blog?.image}`, (err) => {
    if (err) {
      console.error(err);
    }
  });
  await BlogModel.findByIdAndDelete(blogId);
  return NextResponse.json({secces:true, msg: "Blog Deleted"});

}