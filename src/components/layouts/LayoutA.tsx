import type { LayoutProps } from "@/types/layout.type";

export const LayoutA = ({
  shots,
  selectedBg,
  selectedColor,
  label,
}: LayoutProps) => {
  return (
    <div
      className="grid gap-1 w-full flex-1 min-h-0 bg-cover bg-center"
      style={{
        width: "2in",
        height: "6in",
        padding: "5px",
        gridTemplateRows: "1fr 1fr 1fr 0.5fr",
        ...(selectedBg && {
          backgroundImage: `url("/backgrounds/${selectedBg}")`,
        }),
        ...(selectedColor && {
          backgroundColor: selectedColor,
        }),
      }}
    >
      {shots.map((image: string, i: number) => (
        <div key={i} className="w-full h-full overflow-hidden">
          <img src={image} className="w-full h-full object-cover" />
        </div>
      ))}

      <div className=" flex justify-center items-center">
        {label?.isChecked && (
          <p
            className={`text-center font-bold text-[${label.color}] text-[10px] tracking-wide shrink-0 pt-1`}
          >
            photoboothbyk
          </p>
        )}
      </div>
    </div>
  );
};
