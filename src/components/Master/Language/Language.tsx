import LanguageTable from "./LanguageTable";

const Language = () => {
  return (
    <>
      <div className="w-full h-auto">
        <hr />
        <div className="px-4 pt-4">
          <div className="bg-white rounded-lg p-4 flex flex-col gap-3">
            <div className="text-2xl font-bold">Language</div>

            <LanguageTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Language;
