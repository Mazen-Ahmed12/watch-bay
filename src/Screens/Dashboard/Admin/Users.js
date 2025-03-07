import React from "react";
import Table2 from "../../../components/Table2.js";
import SideBar from "../SideBar";
import { UsersData } from "../../../Data/MovieData";

function Users() {
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Users</h2>

        <Table2 data={UsersData} users={true} />
      </div>
    </SideBar>
  );
}

export default Users;
