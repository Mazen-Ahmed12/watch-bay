import React from "react";
import MainModal from "./MainModal";
import { Typography } from "@mui/material";
import { Facebook, X, WhatsApp } from "@mui/icons-material";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

function ShareMovieModal({ modalOpen, setModalOpen, movie }) {
  const shareData = [
    {
      icon: Facebook,
      shareButton: FacebookShareButton,
    },
    {
      icon: X,
      shareButton: TwitterShareButton,
    },
    {
      icon: WhatsApp,
      shareButton: WhatsappShareButton,
    },
  ];
  const url = `${window.location.protocol}//${window.location.host}/movie/${movie.id}`;
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
        <Typography variant="h5">
          Share{" "}
          <Typography component="span" variant="h6" fontWeight="bold">
            "{movie?.name}"
          </Typography>
        </Typography>
        <form className="flex-rows flex-wrap gap-6 mt-6">
          {shareData.map((data, index) => (
            <data.shareButton key={index} url={url}>
              <div className="w-12 transitions hover:bg-subMain flex-colo text-lg h-12 bg-white rounded bg-opacity-30">
                <data.icon />
              </div>
            </data.shareButton>
          ))}
        </form>
      </div>
    </MainModal>
  );
}

export default ShareMovieModal;
