export const Image = {
  async capture(
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

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/jpeg");
    });

    if (!blob) return;

    const image = URL.createObjectURL(blob);

    return image;
  },
};
