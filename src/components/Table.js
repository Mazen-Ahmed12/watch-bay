import React from "react";
import { FaCloudDownloadAlt, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { GoEye } from "react-icons/go";

const Head = "text-xs text-left text-main font-semibold px-4 py-2 uppercase";
const Text = "text-xs text-left leading-6 whitespace-nowrap px-2 py-3";

function Table({ data, admin }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border divide-y table-auto table-layout-fixed border-border divide-border">
        <thead>
          <tr className="bg-dryGray">
            <th className={Head}>Image</th>
            <th className={Head}>Name</th>
            <th className={Head}>Category</th>
            <th className={Head}>Language</th>
            <th className={Head}>Year</th>
            <th className={Head}>Runtime</th>
            <th className={`text-center ${Head}`}>Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800 bg-main">
          {data.map((movie) => (
            <tr key={movie.id}>
              <td className={Text}>
                <div className="overflow-hidden p-1 w-12 h-12 rounded border bg-dry border-border">
                  {movie.image ? (
                    <img
                      className="object-cover w-full h-full"
                      src={movie.image}
                      alt={movie?.name}
                    />
                  ) : (
                    <span className="text-xs text-gray-400">No image</span>
                  )}
                </div>
              </td>
              <td className={`truncate ${Text}`}>{movie.name}</td>
              <td className={Text}>{movie.category}</td>
              <td className={`text-center ${Text}`}>{movie.language}</td>
              <td className={Text}>{movie.year}</td>
              <td className={Text}>{movie.time}</td>
              <td className={`gap-2 ${Text} flex-rows`}>
                {admin ? (
                  <>
                    <button className="gap-2 px-2 py-1 rounded border border-border bg-dry flex-rows text-border">
                      Edit <FaEdit className="text-green-500" />
                    </button>
                    <button
                      className="w-6 h-6 text-white rounded bg-subMain flex-colo"
                    >
                      <MdDelete />
                    </button>
                  </>
                ) : (
                  <>
                    <button className="gap-2 px-2 py-1 rounded border border-border bg-dry flex-rows text-border">
                      Download <FaCloudDownloadAlt className="text-green-500" />
                    </button>
                    <Link
                      to={`/movie/${movie?.id}`}
                      className="w-6 h-6 text-white rounded bg-subMain flex-colo"
                    >
                      <GoEye />
                    </Link>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
