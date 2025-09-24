import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

function Course() {
  const [book, setBook] = useState([]);
  const location = useLocation();

  // extract ?search= query
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search") || "";

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  const filteredBooks = book.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <div className="mt-28 items-center justify-center text-center">
        <h1 className="text-2xl md:text-4xl font-bold">
          We're delighted to have you{" "}
          <span className="text-pink-500">Here! :)</span>
        </h1>
        <p className="mt-6 text-gray-600 dark:text-gray-300">
          Browse through our collection of books.
        </p>
        <Link to="/">
          <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
            Back
          </button>
        </Link>
      </div>

      {/* Book Grid */}
      <div className="mt-16">
        <h2 className="text-xl md:text-2xl font-semibold mb-6">Available Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((item) => <Cards key={item.id} item={item} />)
          ) : (
            <p className="col-span-full text-center text-gray-500">No books found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Course;
