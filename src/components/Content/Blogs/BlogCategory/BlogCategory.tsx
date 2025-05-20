import BlogCategoryTable from "./BlogCategoryTable";

const BlogCategory = () => {
  return (
    <>
      <div className="w-full h-auto">
        <hr />
        <div className="px-4 pt-4">
          <div className="bg-white rounded-lg p-4 flex flex-col gap-3">
            <div className="flex justify-between">
              <div className="text-2xl font-bold">Blog Category</div>
            </div>
            <BlogCategoryTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCategory;
