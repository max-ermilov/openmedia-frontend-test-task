import React, { useState, useRef, useEffect } from "react";
import "./Player.css";

export default function Player({link, goBack}) {
  const [isPlay, setIsPlay] = useState(false);
  const [audioDuration, setAudioDuration] = useState(null);
  const [audioTime, setAudioTime] = useState(0);
  const [audioVolume, setAudioVolume] = useState(1);
  const [minute, setMinute] = useState();
  const [second, setSecond] = useState();
  const [timer, setTimer] = useState(null);
  const [timeValue, setTimeValue] = useState(0);
  const [player, setPlayer] = useState();

  const playerRef = useRef(null);

  let timeInterval;

  const handleProgress = () => {
    const loaded = player.buffered.end(0);
    const total = player.duration || player.buffered.end(0);
    const progress = (loaded / total) * 100;
    setTimeValue(progress);
  };

  const loadedHandler = () => {
    if (player.readyState > 1) {
      setAudioDuration(player.duration);
      setAudioVolume(player.volume);
      playHandler();
    }
  }

  const endedHandler = () => {
    setIsPlay(false);
  }

  const playHandler = () => {
    player.play();
    setIsPlay(true);
  };

  const pauseHandler = () => {
    player.pause();
    setIsPlay(false);
  };

  const timeHandler = (e) => {
    setAudioTime(e.target.value);
    player.currentTime = e.target.value;
  };

  const volumeHandler = (e) => {
    setAudioVolume(e.target.value);
    player.volume = e.target.value;
  };

  useEffect(() => {
    if (playerRef.current) {
      setPlayer(playerRef.current);
    }
  }, []);

  useEffect(() => {
    if (player) {
      // player.volume = 1;
      player.addEventListener("progress", handleProgress);
      player.addEventListener("loadeddata", loadedHandler);
      player.addEventListener("ended", endedHandler);

      return () => {
        player.removeEventListener("progress", handleProgress);
        player.removeEventListener("loadeddata", loadedHandler);
        player.removeEventListener("ended", endedHandler);
      };
    }
    // console.log('player);
  }, [player]);

  useEffect(() => {
    if (isPlay) {
      timeInterval = setInterval(() => {
        setAudioTime(player.currentTime);
        setMinute(
          Math.trunc(player.currentTime / 60)
            .toString()
            .padStart(2, "0")
        );
        setSecond(
          Math.round(player.currentTime % 60)
            .toString()
            .padStart(2, "0")
        );
      }, 1000);
      setTimer(timeInterval);
    }
    return clearInterval(timer);
  }, [isPlay]);

  return (
    <div className="media__wrapper">
      <h2
        className="media__label button"
        onClick={goBack}
      >
        ← Back</h2>
      <div className="player__container">
        {!isPlay ? (
          <button className="player__button" onClick={playHandler}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 40V0H4.34286L40 18.7952V20.9639L4.34286 40H0Z" fill="white" />
            </svg>
          </button>
        ) : (
          <button className="player__button" onClick={pauseHandler}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" width="4" height="40" fill="white" />
              <rect x="32" width="4" height="40" fill="white" />
            </svg>
          </button>
        )}
        <label className="player__progress-bar">
          <audio src={link} ref={playerRef} />
          <span style={{ backgroundSize: `${timeValue || 0}% 100%` }}></span>
          <input
            type="range"
            min={0}
            max={audioDuration}
            style={{ backgroundSize: `${(audioTime / audioDuration) * 100 || audioTime}% 100%` }}
            step="0.1"
            value={audioTime}
            onChange={timeHandler}
          />
        </label>
        <div className="player__volume-row">
          <div className="player__timer">
						<span>
							{minute || "00"}:{second || "00"}
						</span>
          </div>
          <div>
            <label className="player__volume-control">
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                style={{ backgroundSize: `${audioVolume * 100}% 100%` }}
                value={audioVolume}
                onChange={volumeHandler}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
