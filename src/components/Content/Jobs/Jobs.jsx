import React, { useState } from "react";
import { AiOutlineAppstore, AiOutlineBars } from "react-icons/ai";
import JobTable from "./JobTable";
// import BlogGrid from "./BlogGrid";

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
              <div className="text-2xl font-bold">Job List</div>
              <div>
                <div className="flex gap-2">
                  <AiOutlineBars
                    onClick={switchToTable}
                    className={`cursor-pointer ${
                      viewType === "table" ? "text-blue-500" : "text-gray-500"
                    }`}
                  />
                  <AiOutlineAppstore
                    onClick={switchToGrid}
                    className={`cursor-pointer ${
                      viewType === "grid" ? "text-blue-500" : "text-gray-500"
                    }`}
                  />
                </div>
              </div>
              </div>
              {viewType === "table" && <JobTable />}
              {/* {viewType === "grid" && <BlogGrid />} */}
         
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
