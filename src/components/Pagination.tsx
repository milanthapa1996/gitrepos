import React from "react";
import { useDispatch } from "react-redux";
import { searchRepositories } from "../api/github";
import { setRepos } from "../features/repos/repoSlice";

interface Props {
  total_count: number;
  search_query: string;
}

const Pagination = ({ total_count, search_query }: Props) => {
  const [pages, setInitialPages] = React.useState([1, 2, 3, 4, 5]);
  const total_pages = Math.ceil(total_count / 30);
  const [currentPage, setCurrentPage] = React.useState(pages[0]);
  const dispatch = useDispatch();
  //set current page number

  const handlePageChange = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const page = Number(e.currentTarget.textContent);
    setCurrentPage(page);
    try {
      const results = await searchRepositories(search_query, "best-match", page);
      dispatch(setRepos(results.items));
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrevisous = () => {
    // chec if first element value is 1 if not then decrement all the values by 1
    console.log("Previous");

    if (pages[0] >= 2) {
      const newPages = pages.map((page) => page - 1);
      console.log(newPages);
      setInitialPages(newPages);
    }
  };

  const handleNext = () => {
    // chec if last element value is 100 if not then increment all the values by 1
    console.log("Next");

    if (pages[pages.length - 1] <= total_pages) {
      const newPages = pages.map((page) => page + 1);
      console.log(newPages);
      setInitialPages(newPages);
    }
  };

  return (
    <div className="py-2 mt-5 flex justify-end">
      <nav className="flex flex-col space-y-2">
        <span>Total {total_pages} pages</span>
        <div className="inline-flex -space-x-px">
          <button
            className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
            onClick={handlePrevisous}
          >
            Previous
          </button>

          {pages.map((page) => (
            <button
              className={`z-10 px-3 py-2 leading-tight ${
                currentPage === page
                  ? "text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                  : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              } cursor-pointer`}
              key={page}
              onClick={handlePageChange}
            >
              {page}
            </button>
          ))}
          <button
            className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Pagination;
