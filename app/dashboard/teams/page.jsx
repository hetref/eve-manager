import Cards from "@/components/Cards";

const page = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="max-w-7xl w-full my-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold tracking-wide">Teams</h1>
          {/* <button className="px-6 py-2 bg-black/90 text-white hover:bg-black/80 hover:text-white duration-200 rounded">
            Create Community 6/10
          </button> */}
        </div>
        <div className="grid grid-cols-3 max-w-7xl gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Cards key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
