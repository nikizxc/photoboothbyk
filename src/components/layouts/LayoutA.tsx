export const LayoutA = ({ shots }: { shots: string[] }) => {
  return (
    <div
      className="grid grid-rows-4 gap-1 w-full flex-1 min-h-0 bg-black "
      style={{
        width: "2in",
        height: "6in",
        padding: "5px",
      }}
    >
      {shots.map((image: string, i: number) => (
        <div key={i} className="w-full h-full overflow-hidden">
          <img src={image} className="w-full h-full object-cover" />
        </div>
      ))}

      <p className="text-center font-bold text-white text-[10px] tracking-wide shrink-0 pt-1">
        photoboothbyk
      </p>
    </div>
  );
};
