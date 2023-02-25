import { useRouteError, Link } from "react-router-dom";

interface Error {
  statusText?: string;
  message: string;
}

const ErrorPage = () => {
  const error = useRouteError() as Error;
  console.error(error);

  return (
    <div
      id="error-page"
      className="h-screen flex flex-col justify-center items-center"
    >
      <h1 className="text-2xl text-red-600 font-bold">Oops!</h1>
      <p className="text-xl">Sorry, an unexpected error has occurred.</p>
      <p className="text-lg font-medium text-slate-500">
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to={"/"}>
        <button className="bg-sky-400/25 text-sky-500 p-2 rounded-lg mt-4 hover:scale-105 duration-500 hover:bg-sky-400/40">
          Back to home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
