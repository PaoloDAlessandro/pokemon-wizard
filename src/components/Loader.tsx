import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Loader2 className="animate-spin" />
      <p className="mb-4">Loading...</p>
    </div>
  );
};

export default Loader;
