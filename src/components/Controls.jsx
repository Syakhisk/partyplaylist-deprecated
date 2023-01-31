import {
  BackwardIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import usePlayerStore from "../lib/stores/player-store";
import useSessionStore from "../lib/stores/session-store";

const Controls = () => {
  const currentSong = useSessionStore((s) => s.currentSong);

  const player = usePlayerStore((s) => s.player);
  const progress = usePlayerStore((s) => s.progress);

  if (!player) {
    return <Skeleton />;
  }

  return (
    <div>
      <div className="flex gap-8 border rounded p-4 px-8 items-center relative overflow-hidden">
        {currentSong?.title}

        <PrevButton />
        <PlayPauseButton />
        <NextButton />

        <div
          className="w-full h-1 absolute bottom-0 left-0 bg-primary z-10"
          style={{
            transformOrigin: "center left",
            transform: `scaleX(${progress})`,
          }}
        />
        <div className="w-full h-1 absolute bottom-0 left-0 bg-dim" />
      </div>
    </div>
  );
};

const PlayPauseButton = () => {
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const playerAction = usePlayerStore((s) => s.action);

  if (isPlaying) {
    return <PauseIcon onClick={playerAction.pause} className="h-8" />;
  }

  return <PlayIcon onClick={playerAction.play} className="h-8" />;
};

const PrevButton = () => {
  const isFirstSong = useSessionStore((s) => s.isFirstSong);
  const cn = clsx(["h-6", isFirstSong() && "opacity-50"]);
  return <BackwardIcon className={cn} />;
};

const NextButton = () => {
  const isLastSong = useSessionStore((s) => s.isLastSong);
  const cn = clsx(["h-6", isLastSong() && "opacity-50"]);
  return <ForwardIcon className={cn} />;
};

const Skeleton = () => (
  <div className="w-full max-w-lg">
    <div className="flex gap-8 border rounded p-4 px-8 items-center">
      <div className="h-3 w-full rounded bg-dim animate-pulse"></div>
      <BackwardIcon className="h-6" />
      <PlayIcon className="h-8" />
      <ForwardIcon className="h-6" />
    </div>
  </div>
);

export default Controls;
