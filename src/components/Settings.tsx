import { Checkbox } from "./ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CogIcon } from "lucide-react";

const Settings = ({
  settings,
  onSettingsChange,
}: {
  settings: {
    flash: boolean;
    mirror: boolean;
  };
  onSettingsChange: (prop: string, value: boolean) => void;
}) => {
  return (
    <Popover>
      <PopoverTrigger className="bg-popover rounded-md p-2 text-secondary-background-foreground">
        <CogIcon />
      </PopoverTrigger>
      <PopoverContent side="top" align="center" className="w-40">
        <FieldGroup className="gap-3">
          <Field orientation="horizontal">
            <Checkbox
              id="flash"
              name="flash"
              checked={settings.flash}
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
              checked={settings.mirror}
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
  );
};

export default Settings;
