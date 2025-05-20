import React, { useState } from "react";
import { AiOutlineAppstore, AiOutlineBars } from "react-icons/ai";
import BlogTable from "./BlogTable";
import BlogGrid from "./BlogGrid";

const Blogs = () => {
  const [viewType, setViewType] = useState("table");

  const switchToTable = () => {
    setViewType("table");
  };

  const switchToGrid = () => {
    setViewType("grid");
  };

  return (
    <>
      <div className="h-auto w-full">
        <hr />
        <div className="px-4 pt-4">
          <div className="bg-white rounded-lg p-4 flex flex-col gap-3">
            <div className="flex justify-between">
              <div className="text-2xl font-bold">Blog List</div>
              <div>
      
              </div>
              </div>
              {viewType === "table" && <BlogTable />}
              {viewType === "grid" && <BlogGrid />}
         
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
