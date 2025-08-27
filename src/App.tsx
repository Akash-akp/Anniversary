import React, { useState, useEffect } from 'react';
import { Heart, Star, Sparkles, Gift, Camera, Music } from 'lucide-react';
import MusicPlayer from './components/MusicPlayer';
import QuizGame from './components/QuizGame';
import PuzzleGame from './components/PuzzleGame';
import photo2 from './img/BoccaCafe1.jpeg'
import photo3 from './img/UsInCollegeClass2.jpg';
import photo7 from './img/IconicPic.jpeg';
import photo4 from './img/Park1.jpeg'
import photo1 from './img/Mall.jpeg'
import photo5 from './img/Khandagiri2.jpeg'
import photo6 from './img/MovieDate.jpeg';
import photo8 from './img/Park2.jpeg'
import photo9 from './img/CollegePark.jpeg'
import photo10 from './img/InAnnaRestruant.jpeg'
import photo11 from './img/InCBlock.jpeg'
import photo12 from './img/Cafe1.jpeg'
import photo13 from './img/Cafe2.jpeg'
import photo14 from './img/Cafe3.jpeg'
import photo15 from './img/Cafe4.jpeg'
import photo16 from './img/Lingaraj.jpeg'
import photo17 from './img/Park3.jpeg'
import photo18 from './img/Park4.jpeg'
import photo19 from './img/Funny.jpeg'
import photo20 from './img/JaydevBatika1.jpeg'
import photo21 from './img/JaydevBatika2.jpeg'
import vdo from './vdo/InShot_20250827_130354504.mp4'

function App() {
  const [stage, setStage] = useState(0);
  const [showHearts, setShowHearts] = useState(false);
  const [showStars, setShowStars] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    if (stage > 0) {
      setShowHearts(true);
    }
    if (stage > 2) {
      setShowStars(true);
    }
  }, [stage]);

  const photos = [photo1,photo2,photo3,photo4,photo5,photo6,photo7,photo8,photo9,photo10,photo11,photo12,photo13,photo14,photo15,photo16,photo17,photo18,photo19,photo20,photo21];

  const nextStage = () => {
    setStage(prev => Math.min((prev + 1)%9, 8));
  };

  const startJourney = () => {
    nextStage();
    // Start music with direct user interaction
    setIsMusicPlaying(true);
  };

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 relative overflow-hidden">
      {/* Music Player */}
      <MusicPlayer isPlaying={isMusicPlaying} onToggle={toggleMusic} />

      {/* Floating Hearts Background */}
      {showHearts && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <Heart 
              key={`heart-${i}`}
              className={`absolute text-pink-400 opacity-30 animate-float-${(i % 3) + 1}`}
              size={20 + (i % 3) * 10}
              style={{
                left: `${10 + (i * 8) % 80}%`,
                top: `${10 + (i * 12) % 80}%`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Floating Stars Background */}
      {showStars && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <Star 
              key={`star-${i}`}
              className={`absolute text-yellow-400 opacity-40 animate-twinkle`}
              size={15 + (i % 2) * 5}
              style={{
                left: `${15 + (i * 12) % 70}%`,
                top: `${15 + (i * 15) % 70}%`,
                animationDelay: `${i * 0.7}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        
        {/* Stage 0: Welcome */}
        {stage === 0 && (
          <div className="text-center animate-fade-in">
            <div className="mb-8 animate-pulse">
              <Heart className="mx-auto text-red-500 mb-4" size={80} />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 bg-clip-text text-transparent mb-6 animate-bounce-slow">
              Happy Anniversary
            </h1>
            <p className="text-2xl text-gray-700 mb-4 animate-slide-up">
              Today is such a special day for us, my love.✨
            </p>
            <p className="text-lg text-gray-600 mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              Let’s make this day even more special for us
            </p>
            <button 
              onClick={startJourney}
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-12 py-4 rounded-full text-xl font-semibold transform transition-all duration-300 hover:scale-110 hover:shadow-2xl animate-glow"
            >
              Start Our Journey 💕
            </button>
          </div>
        )}

        {/* Stage 1: Love Declaration */}
        {stage === 1 && (
          <div className="text-center max-w-4xl animate-fade-in">
            <div className="mb-8 flex justify-center space-x-4 animate-bounce-hearts">
              <Heart className="text-red-500 animate-pulse" size={60} />
              <Heart className="text-pink-500 animate-pulse" size={70} style={{ animationDelay: '0.2s' }} />
              <Heart className="text-red-500 animate-pulse" size={60} style={{ animationDelay: '0.4s' }} />
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text mb-8 animate-slide-down">
              You Are My Everything
            </h2>
            <p className="text-2xl text-gray-800 leading-relaxed mb-8 animate-slide-up" style={{ animationDelay: '0.5s' }}>
              Since the day we met, you’ve brought me joy, smiles, and so much love. Every moment with you feels like a wonderful journey.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 transform transition-all duration-500 hover:scale-105 animate-slide-up" style={{ animationDelay: '0.7s' }}>
                <Sparkles className="text-yellow-500 mx-auto mb-4" size={40} />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Magic Moments</h3>
                <p className="text-gray-600">Every moment with you feels like pure magic.</p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 transform transition-all duration-500 hover:scale-105 animate-slide-up" style={{ animationDelay: '0.9s' }}>
                <Music className="text-purple-500 mx-auto mb-4" size={40} />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">My Favourite Song</h3>
                <p className="text-gray-600">Your laughter is the sweetest melody my heart knows.</p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 transform transition-all duration-500 hover:scale-105 animate-slide-up" style={{ animationDelay: '1.1s' }}>
                <Gift className="text-red-500 mx-auto mb-4" size={40} />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Best Gift</h3>
                <p className="text-gray-600">You are the most precious gift life has ever given me.</p>
              </div>
            </div>
            <button 
              onClick={nextStage}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-10 py-3 rounded-full text-lg font-semibold transform transition-all duration-300 hover:scale-110 animate-glow"
            >
              See Our Memories 📸
            </button>
          </div>
        )}

        {/* Stage 2: Photo Memories */}
       {stage === 2 && (
  <div className="text-center max-w-6xl animate-fade-in">
    <div className="mb-8 animate-bounce">
      <Camera className="mx-auto text-blue-500 mb-4" size={60} />
    </div>
    <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-8 animate-slide-down">
      Our Beautiful Memories
    </h2>
    <p className="text-xl text-gray-700 mb-8 animate-slide-up">
      Each photo is a little chapter of our story—filled with love, smiles, and memories.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {photos.map((photo, index) => (
        <div 
          key={index} 
          className="relative bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl aspect-square overflow-hidden transform transition-all duration-500 hover:scale-105 hover:rotate-1 animate-slide-up"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <img 
            src={photo} 
            alt={`Memory ${index + 1}`} 
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      ))}
    </div>
    <button 
      onClick={nextStage}
      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-10 py-3 rounded-full text-lg font-semibold transform transition-all duration-300 hover:scale-110 animate-glow"
    >
      Read Love Notes 💌
    </button>
  </div>
)}

        {/* Stage 3: Love Messages */}
        {stage === 3 && (
          <div className="text-center max-w-4xl animate-fade-in">
            <div className="mb-8 animate-bounce">
              <div className="flex justify-center space-x-2">
                <Heart className="text-red-500 animate-pulse" size={50} />
                <Sparkles className="text-yellow-500 animate-spin-slow" size={40} />
                <Heart className="text-pink-500 animate-pulse" size={50} style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text mb-8 animate-slide-down">
              Words From My Heart
            </h2>
            <div className="space-y-6 mb-8">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 transform transition-all duration-500 hover:scale-105 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <p className="text-2xl text-gray-800 italic font-light leading-relaxed">
                  "I will always be by your side, no matter what. I am, and always will be, your helping hand."
                </p>
                <p className="text-lg text-gray-600 mt-4">— My promise to you always</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 transform transition-all duration-500 hover:scale-105 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <p className="text-2xl text-gray-800 italic font-light leading-relaxed">
                  "You are my today and every tomorrow. My love for you will never end—it starts at forever and goes on forever."
                </p>
                <p className="text-lg text-gray-600 mt-4">— Until the end of time</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 transform transition-all duration-500 hover:scale-105 animate-slide-up" style={{ animationDelay: '0.9s' }}>
                <p className="text-2xl text-gray-800 italic font-light leading-relaxed">
                  "Thank you for always being my support and understanding. Every moment with you makes me happier, and I want to be with you, loving and laughing, till the end."
                </p>
                <p className="text-lg text-gray-600 mt-4">— Happy Anniversary, my love</p>
              </div>
            </div>
            <button 
              onClick={nextStage}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-10 py-3 rounded-full text-lg font-semibold transform transition-all duration-300 hover:scale-110 animate-glow"
            >
              The Grand Finale 🎉
            </button>
          </div>
        )}

        {/* Stage 4: Grand Finale */}
        {stage === 4 && (
          <div className="text-center max-w-5xl animate-fade-in">
            <div className="mb-8 animate-celebration">
              <div className="flex justify-center space-x-4 mb-4">
                <Sparkles className="text-yellow-500 animate-spin" size={40} />
                <Heart className="text-red-500 animate-bounce" size={60} />
                <Gift className="text-purple-500 animate-pulse" size={50} />
                <Heart className="text-pink-500 animate-bounce" size={60} style={{ animationDelay: '0.2s' }} />
                <Sparkles className="text-yellow-500 animate-spin" size={40} style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600 bg-clip-text text-transparent mb-8 animate-rainbow">
              HAPPY ANNIVERSARY!
            </h1>
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 mb-8 transform transition-all duration-500 hover:scale-105 animate-slide-up">
              <p className="text-3xl text-gray-800 font-light leading-relaxed mb-6">
                To the love of my life, my best friend, my everything...
              </p>
              <p className="text-2xl text-gray-700 leading-relaxed mb-6">
                A year of laughter, love, and unforgettable moments. You make every day brighter just by being you. Happy 1st anniversary, my love!
              </p>
              <p className="text-xl text-gray-600 italic">
                I love you more today than yesterday, but not as much as I will tomorrow. ❤️
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-pink-400 to-red-500 text-white rounded-2xl p-6 transform transition-all duration-500 hover:scale-105 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <Heart className="mx-auto mb-4" size={40} />
                <h3 className="text-2xl font-bold mb-2">Forever & Always</h3>
                <p className="text-lg">My heart belongs to you</p>
              </div>
              <div className="bg-gradient-to-br from-purple-400 to-pink-500 text-white rounded-2xl p-6 transform transition-all duration-500 hover:scale-105 animate-slide-up" style={{ animationDelay: '0.5s' }}>
                <Sparkles className="mx-auto mb-4" size={40} />
                <h3 className="text-2xl font-bold mb-2">Many More Years</h3>
                <p className="text-lg">To creating beautiful memories</p>
              </div>
            </div>
            <button 
              onClick={nextStage}
              className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 hover:shadow-2xl text-white px-12 py-4 rounded-full text-xl font-bold transform transition-all duration-300 hover:scale-110 animate-rainbow-glow"
            >
              One More Surprise 🎁
            </button>
          </div>
        )}

        {/* Stage 5: Final Surprise */}
        {stage === 5 && (
          <QuizGame onComplete={nextStage} />
        )}

        {/* Stage 6: Puzzle Game */}
        {stage === 6 && (
          <PuzzleGame onComplete={nextStage} />
        )}

        {/* Stage 7: Final Surprise */}
        {stage === 7 && (
          <div className="text-center max-w-4xl animate-fade-in">
            <div className="mb-8">
              <div className="animate-bounce-celebration">
                {[...Array(8)].map((_, i) => (
                  <Heart 
                    key={i}
                    className="inline-block text-red-500 mx-2 animate-pulse"
                    size={30 + (i % 3) * 10}
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text mb-8 animate-pulse-glow">
              I Love You
            </h2>
            <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl p-12 transform transition-all duration-500 hover:scale-105 animate-slide-up">
              <p className="text-4xl text-gray-800 font-light leading-relaxed mb-6 animate-type">
                You mean the world to me... 💕
              </p>
              <p className="text-2xl text-gray-700 leading-relaxed">
                Thank you for being my partner in this beautiful journey called life. 
                Here's to us, to our love, and to many more anniversaries to come!
              </p>
            </div>
            <div className="mt-8 animate-float">
              <p className="text-xl text-gray-600 italic">
                With all my love, always and forever ✨
              </p>
            </div>
            <div className='mt-10'>
                <button 
                onClick={()=>{nextStage(); setIsMusicPlaying(false);}}
                className="bg-gradient-to-r from-pink-400 via-red-500 to-pink-500 hover:shadow-2xl text-white px-12 py-4 rounded-full text-xl font-bold transform transition-all duration-300 hover:scale-110 animate-rainbow-glow"
              >
                One Last Surprise 🎁
              </button>
            </div>
            
          </div>
        )}

        {/* Stage 8: Video Surprise */}
{stage === 8 && (
  <div className="text-center max-w-3xl mx-auto animate-fade-in">
    <h2 className="text-3xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text mb-8 animate-slide-down">
      Our Special Video Memory 🎬
    </h2>
    <div className="flex justify-center rounded-2xl overflow-hidden shadow-lg mb-5">
      <video
      src={vdo}
        controls
        className="h-[80vh] w-auto"
      >
      </video>
    </div>
    <p className="text-3xl text-gray-700 mb-8">
      I made this just for you. Hope you love it! 💖
    </p>
     <div className='mt-10'>
        <button 
          onClick={()=>{nextStage(); setIsMusicPlaying(true);}}
          className="bg-gradient-to-r from-pink-400 via-violet-500 to-violet-900 hover:shadow-2xl text-white px-12 py-4 rounded-full text-xl font-bold transform transition-all duration-300 hover:scale-110 animate-rainbow-glow"
        >
          Start Over 🔄
        </button>
      </div>
  </div>
  
)}


      </div>
    </div>
  );
}

export default App;