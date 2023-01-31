import { useEffect } from "react";
import YouTube from "react-youtube";
import usePlayerStore from "../lib/stores/player-store";
import useSessionStore from "../lib/stores/session-store";

const Player = () => {
  const setPlayer = usePlayerStore((s) => s.setPlayer);
  const update = usePlayerStore((s) => s.update);
  const handleStateChange = usePlayerStore((s) => s.handleStateChange);
  const currentSong = useSessionStore((s) => s.currentSong);

  // Update player state every second
  useEffect(() => {
    const interval = setInterval(() => {
      update();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-96 border">
      <YouTube
        // videoId={"2g811Eo7K8U"}
        videoId={currentSong?.id}
        className={"youtubeContainer"}
        opts={{
          playerVars: {
            // autoplay: 1,
            mute: 1,
            autoplay: 0,
            controls: 0,
            modestbranding: 1,
            enablejsapi: 1,
            origin: window.location.origin,
          },
        }}
        onReady={(event) => setPlayer(event.target)}
        onStateChange={handleStateChange}
        // id={string} // defaults -> ''
        // className={string} // defaults -> ''
        // iframeClassName={string} // defaults -> ''
        // style={object} // defaults -> {}
        // title={string} // defaults -> ''
        // loading={string} // defaults -> undefined
        // opts={obj} // defaults -> {}
        // onReady={func} // defaults -> noop
        // onPlay={func} // defaults -> noop
        // onPause={func} // defaults -> noop
        // onEnd={func} // defaults -> noop
        // onError={func} // defaults -> noop
        // onStateChange={func} // defaults -> noop
        // onPlaybackRateChange={func} // defaults -> noop
        // onPlaybackQualityChange={func} // defaults -> noop
      />
    </div>
  );
};

export default Player;
