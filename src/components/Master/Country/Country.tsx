import CountryTable from "./CountryTable";

const Country = () => {
  return (
    <>
      <div className="h-auto w-full">
        <hr />
        <div className="px-4 pt-4">
          <div className="bg-white rounded-lg p-4 flex flex-col gap-3">
            <div className="text-2xl font-bold">Country</div>

            <CountryTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Country;
