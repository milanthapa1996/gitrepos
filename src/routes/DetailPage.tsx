import React from "react";
import { useLocation } from "react-router-dom";
import { GoIssueOpened } from "react-icons/go";
import { IoOpenOutline } from "react-icons/io5";
import Navbar from "../components/Navbar";

interface DetailProps {
  owner_name: string;
  owner_url: string;
  owner_avatar: string;
  repo_name: string;
  repo_url: string;
  repo_description: string;
  open_issues_count: number;
  default_branch: string;
}

const DetailPage = () => {
  let { state } = useLocation();
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8  h-screen">
        <div className="rounded-lg p-6">
          <div className="flex items-center mb-6">
            <img
              className="w-36 h-36 rounded-2xl mr-4"
              src={state.owner_avatar}
              alt={`${state.owner_name}'s avatar`}
            />
          </div>
          <h2 className="text-2xl font-bold mt-2">{state.repo_name}</h2>
          <div className="mb-6 flex items-center space-x-4">
            <span className="text-gray-700 text-lg font-medium flex items-center">
              {state.owner_name} (
              <a
                href={state.owner_url}
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IoOpenOutline />
              </a>
              )
            </span>
            <span className="text-gray-700 text-lg font-medium flex items-center">
              <GoIssueOpened className="mr-1" />
              {state.open_issues_count} open issues
            </span>
            <span className="text-gray-700 text-lg font-medium">
              Default branch: {state.default_branch}
            </span>
          </div>
          <div>
            <p className="text-gray-500 font-medium text-lg">
              {state.repo_description}
            </p>
          </div>

          <div className="mt-4">
            <a
              href={state.repo_url}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              target="_blank"
              rel="noopener noreferrer"
            >
              Go to repository
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;

// import React from "react";

// interface RepositoryProps {
//   fullName: string;
//   htmlUrl: string;
//   name: string;
//   openIssuesCount: number;
//   defaultBranch: string;
// }

// const DetailPage: React.FC<RepositoryProps> = ({
//   fullName,
//   htmlUrl,
//   name,
//   openIssuesCount,
//   defaultBranch,
// }) => {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="bg-white rounded-lg shadow-lg p-6">
//         <div className="flex items-center mb-6">
//           <img
//             className="w-12 h-12 rounded-full mr-4"
//             src={owner.avatar_url}
//             alt={`${owner.login}'s avatar`}
//           />
//           <h2 className="text-2xl font-bold">{full_name}</h2>
//         </div>
//         <div className="mb-6">
//           <p className="text-gray-600">
//             {owner.login} (
//             <a
//               href={owner.html_url}
//               className="underline"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               {owner.html_url}
//             </a>
//             )
//           </p>
//         </div>
//         <div className="mb-6">
//           <p className="text-gray-600">{open_issues_count} open issues</p>
//           <p className="text-gray-600">Default branch: {default_branch}</p>
//         </div>
//         <div>
//           <a
//             href={html_url}
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Go to repository
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetailPage;
