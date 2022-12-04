import { useState } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [showModal, setShowModal] = useState<boolean>(true);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {showModal && (
        <div id="modal-overlay">
          <div id="modal-content" className="text-gray-900 p-10 text-md">
            <div className="">
              <h2 className="text-gray-900 text-2xl mb-4">
                ディレクトリ構成：「未振り分け」
              </h2>
              <p className="mb-2">
                このサイトはReactのディレクトリ構成を検証するための
                <span className="font-bold">デモサイトです。</span>
              </p>
              <p className="mb-2">
                レンダリング時に要素が
                <span className="border-b-4 border-yellow-500">黄色く</span>
                なります。
              </p>
              <p className="mb-6">
                技術記事のリンクはハッカーニュースのAPIを使用しています。
              </p>
              <p className="mb-1">詳しくは下記サイトをご覧ください。</p>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="text-pink-400 hover:border-b hover:border-pink-400"
              >
                改めてReactのディレクトリ構成を検証する【atomicデザイン編】
              </a>
            </div>
            <button
              onClick={closeModal}
              className="border border-gray-700 text-gray-900 bg-white mt-5 px-4 py-2 text-md font-bold"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default Layout;
