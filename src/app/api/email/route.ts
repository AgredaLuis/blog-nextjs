import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextRequest, NextResponse } from "next/server";

const LoadDB = async () => {
    try {
      await ConnectDB();
    } catch (error) {
      /* En caso de error */
      console.log(error);
    }
  };

export async function POST(request: NextRequest): Promise<NextResponse> {

    LoadDB();
    const formData = await request.formData();
    const emailData= {
        email: `${formData.get("email")}`,
    }
    await EmailModel.create(emailData);
    return NextResponse.json({secces:true, msg: "Email Saved"});

}

export async function GET(request: NextRequest) {
    LoadDB();
    const emails = await EmailModel.find({});
    return NextResponse.json({emails});
}

export async function DELETE(request: NextRequest) {
    LoadDB();
    const emailId =  request.nextUrl.searchParams.get("id");
    await EmailModel.findByIdAndDelete(emailId);
    return NextResponse.json({secces:true, msg: "Email Deleted"});
}