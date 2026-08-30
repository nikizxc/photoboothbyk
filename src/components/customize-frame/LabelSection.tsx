import { Label } from "../ui/label";

import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
const LabelSection = ({ onLabelChange, label }: any) => {
  return (
    <div className="flex flex-col gap-3">
      <Label className="text-sm font-semibold">🏷️ Label</Label>
      <ToggleGroup
        variant="outline"
        defaultValue={["true"]}
        onValueChange={(value) => onLabelChange("isChecked", value[0])}
      >
        <ToggleGroupItem value="true" aria-label="With label">
          With Label
        </ToggleGroupItem>
        <ToggleGroupItem value="false" aria-label="Without label">
          Without Label
        </ToggleGroupItem>
      </ToggleGroup>

      {label.isChecked && (
        <div className="flex gap-3">
          <Label
            htmlFor="label-color"
            className="text-muted-foreground text-xs"
          >
            TEXT COLOR
          </Label>

          <div className="relative w-8 h-8">
            <div
              className="w-8 h-8 rounded-full border shadow-sm"
              style={{ backgroundColor: label.color }}
            />

            <input
              id="label-color"
              type="color"
              value={label.color}
              onChange={(e) => onLabelChange("color", e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LabelSection;
