import React, { useState, useRef, useEffect } from 'react';
import { Music, VolumeX, Volume2 } from 'lucide-react';
import audio from '../audio/ssvid.net--Mere-Hi-Liye-feat-Aditya-Rikhari_128kbps.m4a.mp3'

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying, onToggle }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false); // NEW

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      if (isPlaying) {
        if (!hasStarted) {
          setHasStarted(true);
        }
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume, isMuted, hasStarted]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : newVolume;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-white/20 backdrop-blur-md rounded-full p-3 shadow-lg">
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src={audio} type="audio/mpeg" />
        <source src={audio.replace('.mp3', '.ogg')} type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>
      
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggle}
          className="text-white hover:text-pink-300 transition-colors duration-300 transform hover:scale-110"
          title={isPlaying ? "Pause Music" : "Play Music"}
        >
          <Music 
            size={24} 
            className={`${isPlaying ? 'animate-pulse text-pink-400' : 'text-white'}`}
          />
        </button>
        
        <button
          onClick={toggleMute}
          className="text-white hover:text-pink-300 transition-colors duration-300 transform hover:scale-110"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="w-16 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
          title="Volume Control"
        />
      </div>
      
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ec4899;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
        }
        
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ec4899;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;