import { useState } from 'react';
import { AudioVisualizer } from './AudioVisualizer';
import { MusicPlayer } from './MusicPlayer';
import profileImage from '@/assets/profile.jpg';

export const Hero = () => {
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          {/* Profile Picture with Audio Visualizer */}
          <div className="relative animate-fade-in">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              {/* Audio Visualizer */}
              <div className="absolute inset-0 flex items-center justify-center">
                <AudioVisualizer audioElement={audioElement} isPlaying={isPlaying} />
              </div>
              
              {/* Profile Picture */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-4 border-primary shadow-glow">
                  <img
                    src={profileImage}
                    alt="Mr Smile Modders Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-8 text-center lg:text-left max-w-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Mr Smile Modders ™
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground">
                Creative Modders & Developers
              </p>
              <p className="text-base lg:text-lg text-muted-foreground max-w-lg">
                Crafting innovative mods and projects that push the boundaries of creativity and technical excellence.
              </p>
            </div>

            {/* Music Player */}
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border shadow-card">
              <MusicPlayer 
                onAudioElementReady={setAudioElement}
                onPlayStateChange={setIsPlaying}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
