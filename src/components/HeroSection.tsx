import React from "react";
import { ChangeEvent, FormEvent, useState } from "react";
import { SearchResults, searchRepositories } from "../api/github";
import { useDispatch } from "react-redux";
import {
  setRepos,
  setCount,
  setSearchQuery,
} from "../features/repos/repoSlice";

const HeroSection: React.FC = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(false);

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const results = await searchRepositories(query, "best-match", 1);
      dispatch(setRepos(results.items));
      dispatch(setCount(results.total_count));
      dispatch(setSearchQuery(query));
      setResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-900 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Discover trending Github repositories</span>
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-300 lg:mx-auto">
            Find the most popular and fastest-growing repositories on Github,
            and explore their code, stars, forks, and issues.
          </p>
        </div>
        <div className="max-w-3xl mx-auto px-4 py-8">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row md:space-x-2 space-y-4 md:space-y-0">
              <div className="flex-grow">
                <label htmlFor="query" className="sr-only">
                  Search
                </label>
                <input
                  type="text"
                  id="query"
                  className="w-full border border-gray-400 rounded-lg px-4 py-2"
                  placeholder="Search repositories"
                  value={query}
                  onChange={handleQueryChange}
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 w-full"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Search"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
