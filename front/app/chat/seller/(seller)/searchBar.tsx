import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  return (
    <div className="bg-white border border-solid border-gray-300 shadow-none hover:shadow-md rounded-full mx-auto mb-3">
      <div className="flex flex-wrap items-center p-5">
        <div className="flex items-center">
          <span>
            <CiSearch className="w-6 h-6 text-black" />
          </span>
        </div>
        <input type="text" title="Search" placeholder="Search For Client " />
      </div>
    </div>
  );
};

export default SearchBar;
