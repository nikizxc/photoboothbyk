export const Image = {
  capture(
    video: HTMLVideoElement,
    isMirrored: boolean,
    selectedFilter: string,
  ) {
    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.filter = selectedFilter;
    if (isMirrored) {
      ctx.scale(-1, 1);
      ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
    } else {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
    const image = canvas.toDataURL("image/jpeg", 0.92);

    return image;
  },
};
