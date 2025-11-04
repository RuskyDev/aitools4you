import { Loader2 } from "lucide-react";

export default function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <Loader2
        size={42}
        strokeWidth={2.5}
        className="text-primary animate-spin"
      />
    </div>
  );
}
