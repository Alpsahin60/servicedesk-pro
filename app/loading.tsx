import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <Loader2 size={48} className="text-primary animate-spin mb-4" />
      <p className="text-muted-foreground font-medium animate-pulse">Loading experience...</p>
    </div>
  );
}
