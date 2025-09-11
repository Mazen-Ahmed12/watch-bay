import React from "react";
import MainModal from "./MainModal";
import { Input } from "../UsedInputs";

function CategoryModal({ modalOpen, setModalOpen, category }) {
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block border border-border w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
        <h2 className="text-3xl flex-colo font-bold p-4">{category ? "Update" : "Create"}</h2>
        <form className="flex flex-col gap-6 text-left mt-6">
          <Input
            label="Category Name"
            placeholder={category ? category.title : "Actions"}
            type="text"
            bg={false}
          />
          <button
            onClick={() => setModalOpen(false)}
            className="w-full flex-rows gap-4 py-3 mt-4 text-lg transitions hover:bg-dry border-3 border-subMain rounded bg-subMain text-white"
          >
            {category ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </MainModal>
  );
}

export default CategoryModal;
