import type { LayoutProps } from "@/types/layout.type";

export const LayoutC = ({ shots, selectedBg, selectedColor }: LayoutProps) => {
  return (
    <div
      className="flex flex-col bg-cover bg-center box-border p-1 "
      style={{
        width: "4in",
        height: "6in",
        ...(selectedBg && {
          backgroundImage: `url("/backgrounds/${selectedBg}")`,
        }),
        ...(selectedColor && {
          backgroundColor: selectedColor,
        }),
      }}
    >
      <div
        className="grid grid-cols-2 gap-1 flex-1"
        style={{
          gridTemplateRows: `repeat(${Math.ceil(shots.length / 2)}, 1fr)`,
        }}
      >
        {shots.map((image: string, i: number) => (
          <div key={i} className="w-full h-full overflow-hidden">
            <img src={image} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <div className="w-full shrink-0 py-1">
        <p className="text-center font-bold text-white text-[10px]">
          photoboothbyk
        </p>
      </div>
    </div>
  );
};
