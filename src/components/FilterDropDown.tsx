import React from "react";
import { ChangeEvent, useState } from "react";
import { setRepos } from "../features/repos/repoSlice";
import { useDispatch } from "react-redux";
import { searchRepositories } from "../api/github";

interface Props {
  search_query: string;
}

const options = [
  { value: "best-match", label: "Best Match" },
  { value: "stars", label: "Most Stars" },
  { value: "forks", label: "Most Forks" },
  { value: "updated", label: "Recently Updated" },
];

const FilterDropDown = ({ search_query }: Props) => {
  const [sort, setSort] = useState("");
  const dispatch = useDispatch();

  const handleSortChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    try {
      const results = await searchRepositories(search_query, sort, 1);
      dispatch(setRepos(results.items));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <select
          className="bg-gray-200 text-gray-500 rounded-md px-2 py-1"
          value={sort}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => handleSortChange(e)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default FilterDropDown;
