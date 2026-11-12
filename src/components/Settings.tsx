import { useSettings } from "@/contexts/SettingsContext";
import { Checkbox } from "./ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CogIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { TIMER_OPTIONS } from "@/constants/timer-options.constant";

const Settings = ({
  onTimerChange,
}: {
  onTimerChange: (value: number) => void;
}) => {
  const { isFlashEnabled, isMirrored, onSettingsChange, timer } = useSettings();
  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger className="bg-popover rounded-md p-2 text-secondary-background-foreground">
          <CogIcon className="size-5" />
        </PopoverTrigger>
        <PopoverContent side="top" align="center" className="w-40">
          <FieldGroup className="gap-3">
            <Field orientation="horizontal">
              <Checkbox
                id="flash"
                name="flash"
                checked={isFlashEnabled}
                onCheckedChange={(checked) => {
                  onSettingsChange("flash", checked === true);
                }}
              />
              <FieldLabel htmlFor="flash" className="font-normal">
                Flash
              </FieldLabel>
            </Field>

            <Field orientation="horizontal">
              <Checkbox
                id="mirror"
                name="mirror"
                checked={isMirrored}
                onCheckedChange={(checked) => {
                  onSettingsChange("mirror", checked === true);
                }}
              />
              <FieldLabel htmlFor="mirror" className="font-normal">
                Mirror
              </FieldLabel>
            </Field>
          </FieldGroup>
        </PopoverContent>
      </Popover>

      <Select
        items={TIMER_OPTIONS}
        value={timer}
        onValueChange={(value) => {
          if (value != null) {
            onSettingsChange("timer", Number(value));
            onTimerChange(Number(value));
          }
        }}
      >
        <SelectTrigger className="h-full!">
          <SelectValue className="md:text-base text-sm" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {TIMER_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Settings;
