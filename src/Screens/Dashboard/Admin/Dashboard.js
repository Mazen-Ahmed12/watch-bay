import React from "react";
import { FaRegListAlt, FaUser } from "react-icons/fa";
import SideBar from "../SideBar";
import { HiViewGridAdd } from "react-icons/hi";
import Table from "../../../components/Table";
import { Movies } from "../../../Data/MovieData";
import { useCounts } from "api/queries";

function Dashboard() {
  const { data, isLoading, error } = useCounts();
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
      <Table data={Movies.slice(0, 5)} admin={true} />
    </SideBar>
  );
}

export default Dashboard;
