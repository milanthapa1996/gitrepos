import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Repo {
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

export interface RepoState {
  total_count: number;
  search_query: string;
  repos: Repo[];
}

const initialState: RepoState = {
  total_count: 0,
  search_query: "",
  repos: [],
};

export const repoSlice = createSlice({
  name: "repo",
  initialState,
  reducers: {
    setRepos: (state, action: PayloadAction<Repo[]>) => {
      state.repos = action.payload;
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.total_count = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.search_query = action.payload;
    },
  },
});

export default repoSlice.reducer;
export const { setRepos, setCount,setSearchQuery } = repoSlice.actions;
