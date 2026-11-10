import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="inset-0 absolute z-10 backdrop-blur-sm flex items-center justify-center">
      <LoaderCircle className="md:size-12 size-8 animate-spin text-secondary-background-foreground" />
    </div>
  );
}
