import { BACKGROUND_OPTIONS } from "@/constants/background-options.constant";
import { Label } from "../ui/label";
import Options from "./Options";
import { Fragment } from "react/jsx-runtime";

const BackgroundSection = ({ onBackgroundChange, selectedColor }: any) => {
  return (
    <section aria-label="Background" className="flex flex-col gap-3">
      <Label className="text-sm font-semibold">🎨 Background</Label>
      <div className="flex flex-wrap gap-3">
        <div className="relative w-10 h-10">
          <div
            className="w-10 h-10 rounded-full shadow-lg ring-2 ring-white hover:scale-110 transition-transform "
            style={{ backgroundColor: selectedColor }}
          />

          <input
            type="color"
            value={selectedColor}
            onChange={(e) => onBackgroundChange(e.target.value, "color")}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        {Object.values(BACKGROUND_OPTIONS).map((value, index) => (
          <Fragment key={index}>
            <Options
              src={`/backgrounds/${value}`}
              onClick={() => onBackgroundChange(value, "bg")}
              backgroundSize="200%"
            />
          </Fragment>
        ))}
      </div>
    </section>
  );
};

export default BackgroundSection;
