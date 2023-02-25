import { VideoMetadata } from "@/services/youtube";
import {
  BackwardIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

type Props = {
  video?: VideoMetadata;
};

const Controls = ({ video }: Props) => {
  if (!video)
    return (
      <div className="flex max-md:flex-col border w-full p-4 gap-4 h-[250px]">
        <div className="my-auto mx-auto">🎵 Pick a song to play!</div>
      </div>
    );

  return (
    <div className="flex max-md:flex-col border w-full p-4 gap-4 bg-backdrop z-10">
      <div className="max-md:w-full h-[250px] w-[250px] aspect-square border rounded-xl overflow-hidden flex-shrink-0 mx-auto">
        <img src={video.thumbnail_url} className="h-full w-full object-cover" />
      </div>

      <div className="w-full mt-4 flex flex-col">
        <div className="text-white">{video.video_title}</div>
        <div className="text-sm">{video.channel_name}</div>

        <div className="w-full h-1 relative bg-muted mt-auto">
          <div
            className="w-full h-1 absolute bottom-0 left-0 bg-primary z-10"
            style={{
              transformOrigin: "center left",
              transform: `scaleX(0.5)`,
            }}
          />
        </div>

        <div className="flex items-center justify-around mt-4 max-w-[50%] mx-auto w-full">
          <PrevButton />
          <PlayPauseButton />
          <NextButton />
        </div>
      </div>
    </div>
  );
};

const PlayPauseButton = () => {
  // const isPlaying = usePlayerStore((s) => s.isPlaying);
  // const playerAction = usePlayerStore((s) => s.action);

  // if (isPlaying) {
  //   return <PauseIcon onClick={() => null} className="h-8" />;
  // }

  return <PlayIcon onClick={() => null} className="h-8" />;
};

const PrevButton = () => {
  // const isFirstSong = useSessionStore((s) => s.isFirstSong);
  // const playerAction = usePlayerStore((s) => s.action);
  // const cn = clsx(["h-6", isFirstSong() && "opacity-50"]);
  const cn = clsx(["h-6", false && "opacity-50"]);

  return <BackwardIcon className={cn} onClick={() => null} />;
};

const NextButton = () => {
  // const isLastSong = useSessionStore((s) => s.isLastSong);
  // const playerAction = usePlayerStore((s) => s.action);
  // const cn = clsx(["h-6", isLastSong() && "opacity-50"]);
  const cn = clsx(["h-6", false && "opacity-50"]);

  return <ForwardIcon className={cn} onClick={() => null} />;
};

export default Controls;
