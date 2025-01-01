import React from "react";
import MainModal from "./MainModal";
import { Facebook, Twitter, LinkedIn } from "@mui/icons-material";
import { Tooltips } from "../../components/Tooltips";

function ShareMovieModal({ modalOpen, setModalOpen, movie }) {
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
        <h2 className="text-2xl">
          {" "}
          share <span className="text-xl font-bold">"{movie?.name}"</span>{" "}
        </h2>
        <form className="flex-rows flex-wrap gap-6 mt-6">
          <div className="share-bar">
            <Tooltips
              platform="Facebook"
              icon={<Facebook />}
              link="https://www.facebook.com"
            />
            <Tooltips
              platform="Twitter"
              icon={<Twitter />}
              link="https://www.twitter.com"
            />
            <Tooltips
              platform="LinkedIn"
              icon={<LinkedIn />}
              link="https://www.linkedin.com"
            />
          </div>
        </form>
      </div>
    </MainModal>
  );
}

export default ShareMovieModal;
