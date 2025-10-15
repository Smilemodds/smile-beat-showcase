import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface Track {
  title: string;
  artist: string;
  url: string;
}

interface MusicPlayerProps {
  onAudioElementReady: (audio: HTMLAudioElement) => void;
  onPlayStateChange: (isPlaying: boolean) => void;
}

const tracks: Track[] = [
  {
    title: "Epic Gaming Anthem",
    artist: "Mr Smile Modders ™",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    title: "Code Flow",
    artist: "Mr Smile Modders ™",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  }
];

export const MusicPlayer = ({ onAudioElementReady, onPlayStateChange }: MusicPlayerProps) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState([70]);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      onAudioElementReady(audioRef.current);
    }
  }, [onAudioElementReady]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => handleNext();

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
      onPlayStateChange(!isPlaying);
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(false);
    onPlayStateChange(false);
  };

  const handlePrevious = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(false);
    onPlayStateChange(false);
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const currentTrack = tracks[currentTrackIndex];

  return (
    <div className="w-full max-w-md space-y-4">
      <audio ref={audioRef} src={currentTrack.url} />
      
      <div className="text-center space-y-1">
        <h3 className="text-lg font-semibold text-foreground">{currentTrack.title}</h3>
        <p className="text-sm text-muted-foreground">{currentTrack.artist}</p>
      </div>

      <div className="space-y-2">
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={0.1}
          onValueChange={handleSeek}
          className="cursor-pointer"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrevious}
          className="hover:text-primary transition-colors"
        >
          <SkipBack className="h-5 w-5" />
        </Button>
        
        <Button
          size="icon"
          onClick={togglePlay}
          className="h-12 w-12 rounded-full bg-gradient-primary shadow-glow hover:shadow-glow-secondary transition-all"
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNext}
          className="hover:text-primary transition-colors"
        >
          <SkipForward className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Volume2 className="h-4 w-4 text-muted-foreground" />
        <Slider
          value={volume}
          max={100}
          step={1}
          onValueChange={setVolume}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};
