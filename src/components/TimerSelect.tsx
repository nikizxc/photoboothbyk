import { TIMER_OPTIONS } from "@/constants/timer-options.constant";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const TimerSelect = ({
  setTimer,
}: {
  setTimer: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <Select
      items={TIMER_OPTIONS}
      defaultValue={3}
      onValueChange={(value) => {
        if (value != null) setTimer(Number(value));
      }}
    >
      <SelectTrigger className=" h-full!">
        <SelectValue />
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
