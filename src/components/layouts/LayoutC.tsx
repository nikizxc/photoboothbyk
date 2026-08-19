export const LayoutC = ({ shots }: { shots: string[] }) => {
  return (
    <div
      className="grid grid-cols-2 gap-1 w-full flex-1 min-h-0 bg-black"
      style={{
        width: "4in",
        height: "6in",
        padding: "5px",
      }}
    >
      {shots.map((image: string, i: number) => (
        <div key={i} className="h-44 w-auto overflow-hidden">
          <img src={image} className="w-full h-full object-cover" />
        </div>
      ))}

      <p className="col-span-full font-bold w-full text-center text-white text-[10px] ">
        photoboothbyk
      </p>
    </div>
  );
};
