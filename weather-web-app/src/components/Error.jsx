import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="font-bold text-6xl">Oops!</h1>
      <p className="text-lg my-6">The page you’re looking for doesn’t exist.</p>
      <p>
        <i className="text-[rgba(0,0,0,.5)] font-bold">{error.statusText || error.message}</i>
      </p>
      <Link to={`/`} className="text-lg font-bold hover:text-white hover:bg-primary transition-colors duration-300 mt-8 py-2 px-4 border-[3px] border-solid border-primary rounded-2xl">weather forecast</Link>
    </div>
  );
}