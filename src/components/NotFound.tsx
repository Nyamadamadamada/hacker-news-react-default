import { useEffect } from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="w-screen h-screen">
      <h1 className="flex my-10 text-5xl text-center">
        ページがみつかりません
      </h1>
      <Link
        to={"/"}
        className="block w-44 m-auto  text-center border-b border-gray-50 py-2 px-6 text-xl text-white transition-all duration-150 hover:bg-white hover:text-gray-500"
      >
        Topへ戻る
      </Link>
    </div>
  );
}

export default NotFound;
