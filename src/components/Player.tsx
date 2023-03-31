import YouTube, { YouTubeEvent } from "react-youtube";
import useSessionStore from "@/stores/session-store";
import useQueueStore, { nextSongInQueue } from "@/stores/queue-store";
import {
  YTPlaybackStatus,
  setPlayingStatus,
  setPlayer,
  usePlayerStore,
} from "@/stores/player-store";
import { useEffect } from "react";

const Player = () => {
  const player = usePlayerStore((s) => s.player);
  const playerStatus = usePlayerStore((s) => s.playingStatus);
  const currentSong = useSessionStore((s) => s.session.current_song);
  const handleStateChange = async (
    event: YouTubeEvent<number>
  ): Promise<void> => {
    const { queue } = useQueueStore.getState();
    if (event.data === YTPlaybackStatus.Ended) {
      if (queue.length > 0) {
        await nextSongInQueue();
      }

      setPlayingStatus(YTPlaybackStatus.Unstarted);
    }
  };

  const update = () => {
    // console.log(playerStatus)
    // switch(playerStatus) {
    //   case YTPlaybackStatus.Playing:
    //     player.playVideo()
    //     break;
    //   case YTPlaybackStatus.Paused:
    //     player.PauseVideo()
    //     break;
    //   case YTPlaybackStatus.Ended:
    //     player.StopVideo()
    // }
  };
  useEffect(() => {
    if (player) {
      switch (playerStatus) {
        case YTPlaybackStatus.Playing:
          player.playVideo();
          break;
        case YTPlaybackStatus.Paused:
          player.pauseVideo();
          break;
        case YTPlaybackStatus.Ended:
          player.stopVideo();
      }
    }
  }, [playerStatus, player]);

  // useEffect(() => {
  //   const _isMuted = usePlayerStore.getState().isMuted;
  //   setIsMuted(_isMuted);
  // }, []);

  // Update player state every second
  useEffect(() => {
    const interval = setInterval(() => {
      update();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-96 border /opacity-0 /absolute">
      {typeof currentSong?.id === "string" ? (
        <YouTube
          videoId={currentSong.id}
          className={"youtubeContainer"}
          opts={{
            playerVars: {
              // autoplay: currentSong.status === YTPlaybackStatus.Playing ? 1 : 0,
              autoplay: 1,
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
      ) : (
        <p>Currently no song in the queue</p>
      )}
    </div>
  );
};

export default Player;
