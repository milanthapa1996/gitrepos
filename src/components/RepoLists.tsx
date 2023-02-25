import React, { useState } from "react";
import type { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineStar, AiOutlineFork, AiOutlineEye } from "react-icons/ai";
import { BsCalendar } from "react-icons/bs";
import { FaFilter } from "react-icons/fa";
import { FiGrid, FiList } from "react-icons/fi";
import Pagination from "./Pagination";
import { FcDeleteDatabase } from "react-icons/fc";
import FilterDropDown from "./FilterDropDown";

const RepoLists = () => {
  const repos = useSelector((state: RootState) => state.repo.repos);
  const total_count = useSelector((state: RootState) => state.repo.total_count);
  const search_query = useSelector(
    (state: RootState) => state.repo.search_query
  );
  const [view, setView] = useState<"list" | "grid">("grid");

  console.log(repos);
  return (
    <div>
      {repos.length > 0 ? (
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pb-8">
          <div className="flex items-center justify-between my-6">
            <div className="flex items-center justify-center">
              <span>
                {total_count} results found for "{search_query}".
              </span>
            </div>
            <div className="flex items-center">
              <FiList
                className={`mr-2 cursor-pointer ${
                  view === "list" ? "text-gray-800" : "text-gray-400"
                }`}
                onClick={() => setView("list")}
              />
              <FiGrid
                className={`mr-2 cursor-pointer ${
                  view === "grid" ? "text-gray-800" : "text-gray-400"
                }`}
                onClick={() => setView("grid")}
              />
              <FilterDropDown search_query={search_query} />
            </div>
          </div>
          <div
            className={`grid ${
              view === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : ""
            } gap-6`}
          >
            {repos.map((item) => (
              <div key={item.id}>
                <Link
                  to={`/details/${item.id}`}
                  state={{
                    owner_name: item.owner.login,
                    owner_url: item.owner.html_url,
                    owner_avatar: item.owner.avatar_url,
                    repo_name: item.name,
                    repo_url: item.html_url,
                    repo_description: item.description,
                    open_issues_count: item.open_issues_count,
                    default_branch: item.default_branch,
                  }}
                >
                  <div className="bg-white shadow-lg shadow-green-300 rounded-lg p-4 flex flex-col justify-between border">
                    <div>
                      <h2 className="text-xl font-medium">{item.name}</h2>
                      <div className="flex items-center text-gray-500 text-sm mt-1">
                        <span className="flex items-center">
                          <AiOutlineStar className="mr-1" />{" "}
                          {item.stargazers_count}
                        </span>
                        <span className="flex items-center ml-4">
                          <AiOutlineFork className="mr-1" /> {item.forks}
                        </span>
                        <span className="flex items-center ml-4">
                          <AiOutlineEye className="mr-1" /> {item.watchers}
                        </span>
                        <span className="flex items-center ml-4">
                          <BsCalendar className="mr-1" /> {item.updated_at}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-2">{item.description}</p>
                    </div>
                    <div className="mt-4 flex items-center">
                      <img
                        src={item.owner.avatar_url}
                        alt={item.owner.login}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="ml-2 text-blue-600 hover:text-blue-800">
                        {item.full_name}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <Pagination total_count={total_count} search_query={search_query} />
        </div>
      ) : (
        <div className="flex items-center justify-center mt-14">
          <div className="text-center">
            <h1 className="text-5xl font-bold">
              <FcDeleteDatabase className="inline-block mr-2" />
            </h1>
            <p className="text-gray-500 mt-2">
              Try searching for repositories.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepoLists;
