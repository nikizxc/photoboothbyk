import { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { Application, Sprite, Texture } from "pixi.js";

import { useSettings } from "@/contexts/SettingsContext";
import { FILTERS_OPTIONS } from "@/constants/filter-options.constant";

export default function PixiCam({
  filter,
  webcamRef,
  appRef,
  flash,
  spriteRef,
  countdown,
  isTimerRunning,
  isStreaming,
  setIsStreaming,
}: any) {
  const hostRef = useRef<HTMLDivElement>(null);

  const { isMirrored } = useSettings();

  useEffect(() => {
    const app = new Application();
    let initialized = false;
    let cancelled = false;

    const start = async () => {
      await app.init({
        width: 640,
        height: 480,
        background: "#000",
      });
      appRef.current = app;

      initialized = true;

      if (cancelled) {
        app.destroy(true, { children: true });
        return;
      }

      hostRef?.current?.appendChild(app.canvas);

      const video = webcamRef.current?.video;
      if (!video) return;
      if (video.readyState < 2) {
        await new Promise((r) =>
          video.addEventListener("loadeddata", r, { once: true }),
        );
      }
      if (cancelled) return;

      const sprite = new Sprite(Texture.from(video));
      sprite.width = 640;
      sprite.height = 480;
      sprite.scale.x *= -1;
      sprite.x = 640;

      app.stage.addChild(sprite);

      spriteRef.current = sprite;
      sprite.filters = FILTERS_OPTIONS[filter]();
    };

    start();

    return () => {
      cancelled = true;
      spriteRef.current = null;

      if (initialized) {
        app.destroy(true, { children: true });
      }
    };
  }, []);

  useEffect(() => {
    if (spriteRef.current)
      spriteRef.current.filters = FILTERS_OPTIONS[filter]();
  }, [filter]);

  useEffect(() => {
    const sprite = spriteRef.current;
    if (!sprite) return;
    sprite.scale.x = isMirrored
      ? -Math.abs(sprite.scale.x)
      : Math.abs(sprite.scale.x);
    sprite.x = isMirrored ? 640 : 1;
  }, [isMirrored]);

  return (
    <div className="rounded-md p-3 bg-secondary-background">
      <Webcam
        ref={webcamRef}
        style={{ display: "none" }}
        onUserMediaError={() => {
          console.error("Camera not found");
          setIsStreaming(false);
        }}
      />
      <div
        ref={hostRef}
        className="w-full mx-auto aspect-4/3 [&>canvas]:w-full [&>canvas]:h-full relative"
      >
        {!isStreaming && (
          <p className="flex items-center md:text-sm text-xs justify-center absolute inset-0 ">
            Waiting for camera...
          </p>
        )}

        {isTimerRunning && (
          <div className="absolute inset-0 flex items-center justify-center ">
            <p className="w-30 h-30 flex items-center justify-center text-6xl text-white bg-background/20 rounded-full">
              {countdown}
            </p>
          </div>
        )}
      </div>

      <div
        className={`pointer-events-none absolute inset-0 bg-white transition-opacity ${
          flash ? "opacity-100 duration-75" : "opacity-0 duration-300"
        }`}
      />
    </div>
  );
}
