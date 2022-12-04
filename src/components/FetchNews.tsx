import { useState, useEffect, FormEvent } from "react";
// import format from "date-fns/format"
// You can use the import above or the one below
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface News {
  author: string | null;
  comment_text: string | null;
  created_at: string;
  objectID: string;
  story_text: string | null;
  title: string | null;
  url: string | null;
}

interface Article extends News {
  url: string;
}

interface Story extends News {
  story_text: string;
}

const defaultNews = {
  author: null,
  comment_text: null,
  created_at: "",
  objectID: "",
  story_text: null,
  title: null,
  url: null,
};

export default function FetchNews() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [query, setQuery] = useState("programming");
  const [text, setText] = useState("");
  const [topNews, setTopNews] = useState<News>(defaultNews);
  const [isLoading, setIsLoading] = useState<boolean>(true); // loading state

  useEffect(() => {
    setIsLoading(true);

    const fetchNews = async () => {
      const url = `https://hn.algolia.com/api/v1/search?query=${query}`;
      const res = await fetch(url);
      const data = await res.json();

      setTopNews(data.hits[0]);
      data.hits.shift();

      setArticles(data.hits.filter((item: News) => item.url));
      setStories(data.hits.filter((item: News) => item.story_text));
    };

    fetchNews();
    setIsLoading(false);
  }, [query]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) {
      return;
    }
    setQuery(text);
    setText("");
  };

  const createStoryText = (text: string) => {
    return { __html: text };
  };

  return (
    <div>
      <main className="w-full h-full m-auto">
        {isLoading ? (
          <div className="spinner"></div>
        ) : (
          <div>
            {/* Search form */}
            <form
              onSubmit={handleSubmit}
              className="container mx-auto mt-16 flex place-items-center px-5 lg:max-w-4xl"
            >
              <input
                type="text"
                name="text"
                id="text"
                placeholder="Search for something..."
                autoComplete="off"
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="mr-5 w-full rounded border border-gray-700 bg-transparent py-2 px-4 text-xl text-gray-200 placeholder-gray-400 outline-none transition-all duration-150 focus:border-gray-600 lg:pb-4 lg:text-4xl"
              />
              <button
                type="submit"
                className="rounded border border-gray-700 bg-white py-2 px-6 text-xl text-gray-700 transition-all duration-150 hover:bg-pink-400 hover:text-white lg:pb-4 lg:text-4xl"
              >
                Search
              </button>
            </form>
            {/* End of search form */}
            <div className="container mx-auto mt-10 flex place-items-center px-5 lg:max-w-4xl">
              <div className="border border-white text-gray-900 bg-white px-4 py-2 text-xl font-bold">
                English
              </div>
              <Link to="/ja">
                <div className="border border-white px-4 py-2 text-xl font-bold hover:bg-pink-400">
                  日本語
                </div>
              </Link>
            </div>
            <article className="container my-10 mx-auto flex flex-col items-center justify-center px-5 lg:max-w-4xl">
              <h1 className="my-5 text-center text-4xl font-bold text-white lg:text-6xl">
                {topNews.title}
              </h1>
              {topNews.url && (
                <a
                  href={topNews.url}
                  target="_blank"
                  rel="noreferrer"
                  className="border-b border-gray-700 text-lg text-gray-600 hover:border-pink-400 hover:text-pink-400"
                >
                  Read Full Story
                </a>
              )}
              {topNews.story_text && (
                <div
                  dangerouslySetInnerHTML={createStoryText(topNews.story_text)}
                  className="text-lg text-gray-400 "
                ></div>
              )}
            </article>

            <article className="container mx-auto px-5 lg:max-w-4xl">
              <p className="text-gray-600">
                Category:{" "}
                <span className="font-bold capitalize text-gray-400">
                  {query}
                </span>
              </p>
            </article>
            {articles.length > 0 && (
              <section className="container mx-auto mt-10">
                <h3 className="text-center text-white text-3xl font-bold">
                  ARTICLE
                </h3>
                <div className="mx-auto grid grid-cols-1 gap-5 p-5 md:grid-cols-2 lg:max-w-4xl">
                  {articles.map((item) => {
                    const { author, created_at, objectID, title, url } = item;

                    return (
                      <article
                        key={objectID}
                        className="rounded bg-gray-800 p-3 transition-all duration-150"
                      >
                        <h3 className="mb-3 text-lg font-bold text-white">
                          {title}
                        </h3>
                        <article className="">
                          <div className="flex items-center justify-between">
                            <p className="text-gray-600">
                              By <em>{author}</em>
                            </p>
                            {url && (
                              <a
                                href={url}
                                target="_blank"
                                rel="noopenner noreferrer"
                                className="border-b border-gray-700 text-lg text-gray-400 hover:border-pink-400 hover:text-pink-400"
                              >
                                Read More
                              </a>
                            )}
                          </div>
                        </article>
                        <p className="mt-10 text-gray-400">
                          {/* Format date using the `format` method from `date-fns` */}
                          {format(new Date(created_at), "dd MMM yyyy")}
                        </p>
                      </article>
                    );
                  })}
                </div>
              </section>
            )}

            {stories.length > 0 && (
              <section className="container mx-auto mt-20">
                <h3 className="text-center text-white text-3xl font-bold">
                  STORY
                </h3>
                <div className="mx-auto grid grid-cols-1 gap-5 p-5 lg:max-w-4xl">
                  {stories.map((item) => {
                    const { author, created_at, objectID, title, story_text } =
                      item;

                    return (
                      <article
                        key={objectID}
                        className="rounded bg-gray-800 p-3 transition-all duration-150"
                      >
                        <h3 className="mb-3 text-lg font-bold text-white">
                          {title}
                        </h3>
                        <article className="">
                          {story_text && (
                            <div
                              dangerouslySetInnerHTML={createStoryText(
                                story_text
                              )}
                              className="text-lg text-gray-200"
                            ></div>
                          )}
                          <div className="flex items-center justify-between">
                            <p className="text-gray-600">
                              By <em>{author}</em>
                            </p>
                          </div>
                        </article>
                        <p className="mt-10 text-gray-400">
                          {/* Format date using the `format` method from `date-fns` */}
                          {format(new Date(created_at), "dd MMM yyyy")}
                        </p>
                      </article>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
