import React, {memo, useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changePlayingState,
  changeCurrentIndex,
  changeCurrentSong,
  changePlayList,
  changePlayMode,
  changeSpeed
} from "./store/actions"
import { isEmptyObject, shuffle, findIndex, getSongUrl } from "../../utils";
import PlayList from "./play-list/index";
import Toast from "./../../baseUI/toast/index";
import Lyric from "../../apis/lyric-parser";
import MiniPlayer from "./mini-player";
import NormalPlayer from "./normal-player";
import { playMode } from "./../../utils";
import { getLyricRequest } from "./../../apis";


function Player() {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentPlayingLyric, setPlayingLyric] = useState("");
  const [modeText, setModeText] = useState("");

  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;
 
  const fullScreen =useSelector(({player})=>player.fullScreen)
  const playing = useSelector(({player})=>player.playing)
  const currentSong = useSelector(({player})=>player.currentSong)
  const mode = useSelector(({player})=>player.mode)
  const speed = useSelector(({player})=>player.speed)
  const currentIndex = useSelector(({player})=>player.currentIndex)
  const playList = useSelector(({player})=>player.playList)
  const sequencePlayList = useSelector(({player})=>player.sequencePlayList)


  const dispatch = useDispatch()


  const [preSong, setPreSong] = useState({}); 

  const audioRef = useRef();
  const toastRef = useRef();

  const currentLyric = useRef();
  const currentLineNum = useRef(0);
  const songReady = useRef(true);
 
  useEffect(() => {
    if (
      !playList.length ||
      currentIndex === -1 ||
      !playList[currentIndex] ||
      playList[currentIndex].id === preSong.id ||
      !songReady.current
    )
    return;
    songReady.current = false;
    let current = playList[currentIndex];
    dispatch(changeCurrentSong(current));
    setPreSong(current);
    setPlayingLyric("");
    audioRef.current.src = getSongUrl(current.id);
    audioRef.current.autoplay = true;
    audioRef.current.playbackRate = speed;
    dispatch(changePlayingState(true));
    getLyric(current.id);
    setCurrentTime(0);
    setDuration((current.dt / 1000) | 0);
    // eslint-disable-next-line
  }, [currentIndex, playList,dispatch]);

  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause();
  }, [playing]);

  useEffect(() => {
    if (!fullScreen) return;
    if (currentLyric.current && currentLyric.current.lines.length) {
      handleLyric({
        lineNum: currentLineNum.current,
        txt: currentLyric.current.lines[currentLineNum.current].txt
      });
    }
  }, [fullScreen]);

  const handleLyric = ({ lineNum, txt }) => {
    if(!currentLyric.current)return;
    currentLineNum.current = lineNum;
    setPlayingLyric(txt);
  };

  const getLyric = id => {
    let lyric = "";
    if (currentLyric.current) {
      currentLyric.current.stop();
    }
    // 避免songReady恒为false的情况
    setTimeout(() => {
      songReady.current = true;
    }, 3000);
    getLyricRequest(id)
      .then(data => {
        lyric = data.lrc.lyric; 
        if(!lyric) {
          currentLyric.current = null;
          return;
        }
        currentLyric.current = new Lyric(lyric, handleLyric, speed);
        currentLyric.current.play();
        currentLineNum.current = 0;
        currentLyric.current.seek(0);
      })
      .catch(() => {
        songReady.current = true;
        audioRef.current.play();
      });
  };

  const clickPlaying = (e, state) => {
    e.stopPropagation();
    dispatch(changePlayingState(state));
    if(currentLyric.current) {
      currentLyric.current.togglePlay(currentTime*1000);
    }
  };

  const onProgressChange = curPercent => {
    const newTime = curPercent * duration;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
    if (!playing) {
      dispatch(changePlayingState(true));
    }
    if (currentLyric.current) {
      currentLyric.current.seek(newTime * 1000);
    }
  };

  const updateTime = e => {
    setCurrentTime(e.target.currentTime);
  };

  const handleLoop = () => {
    audioRef.current.currentTime = 0;
    dispatch(changePlayingState(true));
    audioRef.current.play();
    if (currentLyric.current) {
      currentLyric.current.seek(0);
    }
  };

  const handlePrev = () => {
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex - 1;
    if (index === 0) index = playList.length - 1;
    if (!playing) dispatch(changePlayingState(true));
    dispatch(changeCurrentIndex(index));
  };

  const handleNext = () => {
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex + 1;
    if (index === playList.length) index = 0;
    if (!playing) dispatch(changePlayingState(true));
    dispatch(changeCurrentIndex(index));
  };

  const handleEnd = () => {
    if (mode === playMode.loop) {
      handleLoop();
    } else {
      handleNext();
    }
  };

  const changeMode = () => {
    let newMode = (mode + 1) % 3;
    if (newMode === 0) {
      //顺序模式
      dispatch(changePlayList(sequencePlayList));
      let index = findIndex(currentSong, sequencePlayList);
      dispatch(changeCurrentIndex(index));
      setModeText("顺序循环");
    } else if (newMode === 1) {
      //单曲循环
      dispatch(changePlayList(sequencePlayList));
      setModeText("单曲循环");
    } else if (newMode === 2) {
      //随机播放
      let newList = shuffle(sequencePlayList);
      let index = findIndex(currentSong, newList);
      dispatch(changePlayList(newList));
      dispatch(changeCurrentIndex(index));
      setModeText("随机播放");
    }
    dispatch(changePlayMode(newMode));
    toastRef.current.show();
  };
  const handleError = () => {
    songReady.current = true;
    handleNext();
    alert("播放出错");
  };

  const clickSpeed = (newSpeed) => {
    dispatch(changeSpeed(newSpeed));
    audioRef.current.playbackRate = newSpeed;
    currentLyric.current.changeSpeed(newSpeed);
    currentLyric.current.seek(currentTime*1000);
  }

  return (
    <div>
      {isEmptyObject(currentSong) ? null : (
        <NormalPlayer
          percent={percent}
          modeText={modeText}
          duration={duration}
          currentTime={currentTime}
          currentLyric={currentLyric.current}
          currentPlayingLyric={currentPlayingLyric}
          changeMode={changeMode}
          handlePrev={handlePrev}
          handleNext={handleNext}
          onProgressChange={onProgressChange}
          currentLineNum={currentLineNum.current}
          clickPlaying={clickPlaying}
          clickSpeed={clickSpeed}
        />
      )}
      {isEmptyObject(currentSong) ? null : (
        <MiniPlayer
          percent={percent}
          clickPlaying={clickPlaying}
        />
      )}

      <PlayList 
        clearPreSong={setPreSong.bind(null, {})}
      />
      
      <audio
        ref={audioRef}
        onTimeUpdate={updateTime}
        onEnded={handleEnd}
        onError={handleError}
      ></audio>
      <Toast text={modeText} ref={toastRef} />
    </div>
  );
}
export default React.memo(Player)
