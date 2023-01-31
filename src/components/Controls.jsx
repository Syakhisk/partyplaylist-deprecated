import { BackwardIcon, ForwardIcon, PlayIcon } from "@heroicons/react/20/solid";

const Controls = () => {
  return (
    <div className="mt-4 flex gap-8 border rounded p-4 px-8 items-center">
      <BackwardIcon className="h-6" />
      <PlayIcon className="h-8" />
      <ForwardIcon className="h-6" />
    </div>
  );
};

export default Controls;
