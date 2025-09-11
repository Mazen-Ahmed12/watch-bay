const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

// For backdrop images (typically larger, used in banners/hero sections)
export const imageBackdrop = (path, size = 'original') => {
  return path ? `${IMAGE_BASE_URL}${size}${path}` : null;
};

// For poster images (movie posters, typically 500x750)
export const image500 = (path) => {
  return path ? `${IMAGE_BASE_URL}w500${path}` : null;
};

// For profile images (actor/crew photos)
export const imageProfile = (path, size = 'w185') => {
  return path ? `${IMAGE_BASE_URL}${size}${path}` : null;
};

// For still images (episode stills, behind the scenes, etc.)
export const imageStill = (path, size = 'w300') => {
  return path ? `${IMAGE_BASE_URL}${size}${path}` : null;
};

// For YouTube thumbnails
export const youtubeThumbnail = (key) => {
  return `https://img.youtube.com/vi/${key}/maxresdefault.jpg`;
};

export default {
  imageBackdrop,
  image500,
  imageProfile,
  imageStill,
  youtubeThumbnail,
};
