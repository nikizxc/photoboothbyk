import { usePhotobooth } from "@/contexts/PhotoboothContext";
import { Label } from "../ui/label";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

const LabelSection = () => {
  const { onLabelChange, customization } = usePhotobooth();
  return (
    <section aria-label="Label" className="flex flex-col gap-6">
      <Label className="md:text-sm text-xs font-semibold">🏷️ Label</Label>
      <ToggleGroup
        variant="outline"
        defaultValue={["true"]}
        onValueChange={(value) =>
          onLabelChange({ prop: "isChecked", value: JSON.parse(value[0]) })
        }
      >
        <ToggleGroupItem
          value="true"
          aria-label="With label"
          className="md:text-sm text-xs"
        >
          With Label
        </ToggleGroupItem>
        <ToggleGroupItem
          value="false"
          aria-label="Without label"
          className="md:text-sm text-xs"
        >
          Without Label
        </ToggleGroupItem>
      </ToggleGroup>

      <div className="flex gap-3">
        <Label
          htmlFor="label-color"
          className="text-muted-foreground md:text-xs text-[10px]"
        >
          TEXT COLOR
        </Label>

        <div className="relative w-8 h-8">
          <div
            className="w-8 h-8 rounded-full border shadow-sm"
            style={{ backgroundColor: customization.label.color }}
          />

          <input
            id="label-color"
            type="color"
            value={customization.label.color}
            onChange={(e) =>
              onLabelChange({ prop: "color", value: e.target.value })
            }
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
};

export default LabelSection;
