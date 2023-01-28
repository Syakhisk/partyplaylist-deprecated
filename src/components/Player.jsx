import { useState } from "react";
import YouTube from "react-youtube";
import { useSessionStore } from "../lib/store";

const Player = () => {
  const [player, setPlayer] = useState();
  const queue = useSessionStore((s) => s.session.queue);

  return (
    <div className="w-96 border">
      <YouTube
        // videoId={"2g811Eo7K8U"}
        videoId={queue.at(0).id}
        className={"youtubeContainer"}
        opts={{
          playerVars: {
            // autoplay: 1,
            autoplay: 0,
            controls: 0,
            modestbranding: 1,
            enablejsapi: 1,
            origin: window.location.origin,
          },
        }}
        onReady={(event) => setPlayer(event.target)}
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
