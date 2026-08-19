export const Vintage = ({ shots }: { shots: string[] }) => {
  return (
    <div
      className="grid gap-1 w-full flex-1 min-h-0 bg-black"
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

      <p className="font-bold text-center text-white text-[10px]  m-0">
        photoboothbyk
      </p>

      {shots.slice(2).map((image, i) => (
        <div key={i + 2} className="w-full h-full overflow-hidden">
          <img src={image} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
};
