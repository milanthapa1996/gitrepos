import axios from "axios";
const API_URL = "https://api.github.com";
export interface Repository {
  id: number;
  name: string;
  stargazers_count: number;
  forks: number;
  html_url: string;
  watchers: number;
  description: string;
  updated_at: string;
  full_name: string;
  open_issues_count: number;
  default_branch: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

export interface SearchResults {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
}

export const searchRepositories = async (
  query: string,
  sort: string,
  page : number,
  perPage = 20,
): Promise<SearchResults> => {
  const response = await axios.get<SearchResults>(
    `${API_URL}/search/repositories`,
    {
      params: {
        q: query,
        sort,
        page: page,
        per_page: perPage,
      },
    }
  );
  return response.data;
};
