"use client";
import SubsTableItem from "@/components/adminComponents/SubsTableItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  email: string;
  _id: string;
  date: number;
  mongoId: string;
}

const SubcriptionPage = () => {
  const [subs, setSubs] = useState<Props[]>([]);

  const fetchSubs = async () => {
    const response = await axios.get("/api/email");

    setSubs(response.data.emails);
  };

  const deleteEmail = async (mongoId: string) => {
    try {
      const response = await axios.delete(`/api/email/?id=${mongoId}`);
      toast.success("Email Deleted");
      fetchSubs();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSubs();
  }, []);

  return (
    <div className="f;ex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All Subcriptions</h1>
      <div className="relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-gray-500 ">
          <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">
                email
              </th>
              <th scope="col" className=" hidden sm:block py-3 px-6">
                Date
              </th>
              <th scope="col" className="py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {subs.map((sub) => (
              <SubsTableItem
              key={sub._id}
                email={sub.email}
                date={sub.date}
                mongoId={sub._id}
                deleteEmail={deleteEmail}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubcriptionPage;
