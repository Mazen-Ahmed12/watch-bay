import { useCounts } from "api/queries";
import { FaRegListAlt } from "react-icons/fa";
import { HiViewGridAdd } from "react-icons/hi";
import Table from "../../../components/Table";
import { Movies } from "../../../Data/MovieData";
import SideBar from "../SideBar";
import { useMovieHandler } from "../../../utils/MovieHandler";
import { useEffect, useState } from "react";

function Dashboard() {
  const { data, isLoading, error } = useCounts();
  const [dashboardMovieId, setDashboardMovieId] = useState(null);

  // Check for movie to add from localStorage
  useEffect(() => {
    const movieToAdd = localStorage.getItem("dashboardMovieToAdd");
    if (movieToAdd) {
      setDashboardMovieId(movieToAdd);
      // Clear it immediately to prevent duplicate processing
      localStorage.removeItem("dashboardMovieToAdd");
    }
  }, []);

  const { movies: recentMovies } = useMovieHandler({
    type: 'dashboard',
    movieId: dashboardMovieId,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading counts</p>;

  console.log("Counts data:", data);

  const DashboardData = [
    {
      bg: "bg-orange-600",
      icon: FaRegListAlt,
      title: "Total Movies",
      total: data?.totalMovies ?? 0,
    },
    {
      bg: "bg-blue-700",
      icon: HiViewGridAdd,
      title: "Total Categories",
      total: data?.totalCategories ?? 0,
    },
  ];

  return (
    <SideBar>
      <h2 className="text-xl font-bold">Dashboard</h2>
      <div className="flex gap-6 mt-4 w-full flex-colo md:flex-row">
        {DashboardData.map((data, index) => (
          <div key={index} className="flex items-center p-4 w-full rounded bg-main border-border">
            <div
              className={`rounded-full h-12 w-12 flex items-center justify-center ${data.bg}`}
            >
              <data.icon />
            </div>
            <div className="flex-1 text-center">
              <h2>{data.title}</h2>
              <p className="mt-2 font-bold">{data.total}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 className="my-6 font-medium text-md text-border">Recent Movies</h3>
      <Table data={recentMovies.length > 0 ? recentMovies : Movies.slice(0, 5)} admin={true} />
    </SideBar>
  );
}

export default Dashboard;
