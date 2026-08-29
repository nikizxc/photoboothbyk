import { CircleCheck } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { BACKGROUND_OPTIONS } from "@/constants/background-options.constant";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const CustomizeFrameDialog = ({ layoutId, shots }: any) => {
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    "#000000",
  );
  const [selectedBg, setSelectedBg] = useState<string | undefined>(undefined);
  const [label, setLabel] = useState({
    isChecked: true,
    color: "#FFFFFF",
  });

  const Component = layoutId;
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="default" className="h-full">
            <CircleCheck strokeWidth={3} />
            Done
          </Button>
        }
      />
      <DialogContent className="max-w-5xl!">
        <div className="flex gap-4">
          <div className="flex-1 flex justify-center items-center overflow-hidden">
            <div
              style={{
                transform: "scale(0.9)",
              }}
            >
              <Component
                shots={shots}
                selectedBg={selectedBg}
                selectedColor={selectedColor}
                label={label}
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col py-10 gap-3">
            <p className="font-medium">Background</p>
            <div className="flex flex-wrap gap-3">
              <div className="relative w-10 h-10">
                <div
                  className="w-10 h-10 rounded-full shadow-lg ring-2 ring-white"
                  style={{ backgroundColor: selectedColor }}
                />

                <input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => {
                    setSelectedBg(undefined);
                    setSelectedColor(e.target.value);
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              {Object.values(BACKGROUND_OPTIONS).map((value, index) => (
                <div
                  key={index}
                  className="w-10 h-10 rounded-full overflow-hidden shadow-lg ring-2 ring-white cursor-pointer "
                  onClick={() => {
                    setSelectedColor(undefined);
                    setSelectedBg(value);
                  }}
                  style={{
                    backgroundImage: `url("/backgrounds/${value}")`,
                    backgroundSize: "200%",
                    backgroundPosition: "center",
                  }}
                />
              ))}
            </div>

            <div className="space-y-4">
              <Label className="text-sm font-medium">Label</Label>

              <RadioGroup
                defaultValue={true}
                className="flex gap-4"
                onValueChange={(value) =>
                  setLabel((prev) => ({
                    ...prev,
                    isChecked: value === true,
                  }))
                }
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value={true} id="with-label" />
                  <Label htmlFor="with-label">With Label</Label>
                </div>

                <div className="flex items-center gap-2">
                  <RadioGroupItem value={false} id="without-label" />
                  <Label htmlFor="without-label">Without Label</Label>
                </div>
              </RadioGroup>

              <div className="flex items-center justify-between">
                <Label htmlFor="label-color">Text Color</Label>

                <div className="relative w-8 h-8">
                  <div
                    className="w-8 h-8 rounded-full border shadow-sm"
                    style={{ backgroundColor: label.color }}
                  />

                  <input
                    id="label-color"
                    type="color"
                    value={label.color}
                    onChange={(e) =>
                      setLabel((prev) => ({
                        ...prev,
                        color: e.target.value,
                      }))
                    }
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomizeFrameDialog;
