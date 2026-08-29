export const Vintage = ({ shots }: { shots: string[] }) => {
  return (
    <div
      className="grid gap-1 w-full min-h-0 bg-black"
      style={{
        width: "2in",
        height: "6in",

        gridTemplateRows: "1fr 1fr auto 1fr 1fr",
      }}
    >
      {shots.slice(0, 2).map((image, i) => (
        <div key={i} className="w-full h-full overflow-hidden">
          <img src={image} className="w-full h-full object-cover" />
        </div>
      ))}

      <div className="flex justify-center items-center border">
        <p className="font-bold text-white text-[10px] ">photoboothbyk</p>
      </div>

      {shots.slice(2).map((image, i) => (
        <div key={i + 2} className="w-full h-full overflow-hidden">
          <img src={image} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
};
