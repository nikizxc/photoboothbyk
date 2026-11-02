import { TIMER_OPTIONS } from "@/constants/timer-options.constant";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useSettings } from "@/contexts/SettingsContext";

const TimerSelect = () => {
  const { timer, onSettingsChange } = useSettings();
  return (
    <Select
      items={TIMER_OPTIONS}
      value={timer}
      onValueChange={(value) => {
        if (value != null) onSettingsChange("timer", Number(value));
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
  );
};

export default TimerSelect;
