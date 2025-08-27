import React, { useState, useEffect } from 'react';
import { Heart, RotateCcw, Trophy, Sparkles, Navigation } from 'lucide-react';

interface PuzzleGameProps {
  onComplete: () => void;
}

interface Position {
  x: number;
  y: number;
}

const PuzzleGame: React.FC<PuzzleGameProps> = ({ onComplete }) => {
  const [boyPosition, setBoyPosition] = useState<Position>({ x: 0, y: 0 });
  const [girlPosition, setGirlPosition] = useState<Position>({ x: 7, y: 7 });
  const [currentPlayer, setCurrentPlayer] = useState<'boy' | 'girl'>('boy');
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // 8x8 grid with obstacles (1 = obstacle, 0 = free path)
  const [maze] = useState([
    [0, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [1, 1, 0, 1, 1, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 0, 1, 0, 0]
  ]);

  const resetGame = () => {
    setBoyPosition({ x: 0, y: 0 });
    setGirlPosition({ x: 7, y: 7 });
    setCurrentPlayer('boy');
    setMoves(0);
    setGameWon(false);
    setShowCelebration(false);
  };

  const isValidMove = (newX: number, newY: number): boolean => {
    return newX >= 0 && newX < 8 && newY >= 0 && newY < 8 && maze[newY][newX] === 0;
  };

  const movePlayer = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (gameWon) return;

    const currentPos = currentPlayer === 'boy' ? boyPosition : girlPosition;
    let newX = currentPos.x;
    let newY = currentPos.y;

    switch (direction) {
      case 'up':
        newY = newY - 1;
        break;
      case 'down':
        newY = newY + 1;
        break;
      case 'left':
        newX = newX - 1;
        break;
      case 'right':
        newX = newX + 1;
        break;
    }

    if (isValidMove(newX, newY)) {
      if (currentPlayer === 'boy') {
        setBoyPosition({ x: newX, y: newY });
      } else {
        setGirlPosition({ x: newX, y: newY });
      }
      setMoves(moves + 1); // Only increment on valid move
      setCurrentPlayer(currentPlayer === 'boy' ? 'girl' : 'boy');
    }
  };

//   // Backtracking (DFS) path finder: returns a path of Positions from start to goal (inclusive)
// function findPathBacktracking(start: Position, goal: Position, maze: number[][]): Position[] | null {
//   const rows = 8, cols = 8;
//   const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));
//   const path: Position[] = [];

//   const dirs = [
//     { dx: 1, dy: 0 },  // right
//     { dx: -1, dy: 0 }, // left
//     { dx: 0, dy: 1 },  // down
//     { dx: 0, dy: -1 }, // up
//   ];

//   function dfs(x: number, y: number): boolean {
//     // bounds & walls & visited
//     if (x < 0 || x >= cols || y < 0 || y >= rows) return false;
//     if (maze[y][x] === 1 || visited[y][x]) return false;

//     // choose
//     visited[y][x] = true;
//     path.push({ x, y });

//     // goal
//     if (x === goal.x && y === goal.y) return true;

//     // explore neighbors (fixed order => true backtracking, not greedy)
//     for (const { dx, dy } of dirs) {
//       if (dfs(x + dx, y + dy)) return true;
//     }

//     // backtrack
//     path.pop();
//     return false;
//   }

//   return dfs(start.x, start.y) ? path : null;
// }

function findShortestPathBacktracking(start: Position, goal: Position, maze: number[][]): Position[] | null {
  const rows = 8, cols = 8;
  const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));
  let shortestPath: Position[] | null = null;

  const dirs = [
    { dx: 1, dy: 0 },  // right
    { dx: -1, dy: 0 }, // left
    { dx: 0, dy: 1 },  // down
    { dx: 0, dy: -1 }, // up
  ];

  function dfs(x: number, y: number, path: Position[]) {
    // bounds & walls & visited
    if (x < 0 || x >= cols || y < 0 || y >= rows) return;
    if (maze[y][x] === 1 || visited[y][x]) return;

    // add current
    visited[y][x] = true;
    path.push({ x, y });

    // reached goal
    if (x === goal.x && y === goal.y) {
      if (shortestPath === null || path.length < shortestPath.length) {
        shortestPath = [...path]; // copy
      }
    } else {
      // Order directions dynamically to bias search toward girl
      dirs.sort((a, b) => {
        const distA = Math.abs((x + a.dx) - goal.x) + Math.abs((y + a.dy) - goal.y);
        const distB = Math.abs((x + b.dx) - goal.x) + Math.abs((y + b.dy) - goal.y);
        return distA - distB;
      });

      for (const { dx, dy } of dirs) {
        dfs(x + dx, y + dy, path);
      }
    }

    // backtrack
    path.pop();
    visited[y][x] = false;
  }

  dfs(start.x, start.y, []);
  return shortestPath;
}

 function findRandomPath(start: Position, goal: Position, maze: number[][]): Position[] | null {
  const rows = maze.length;
  const cols = maze[0].length;
  const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));
  let bestPath: Position[] | null = null;

  const dirs = [
    { dx: 1, dy: 0 },  // right
    { dx: -1, dy: 0 }, // left
    { dx: 0, dy: 1 },  // down
    { dx: 0, dy: -1 }, // up
  ];

  function shuffle<T>(array: T[]): T[] {
    // Fisher-Yates shuffle
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function dfs(x: number, y: number, path: Position[]) {
    // Out of bounds or obstacle or visited
    if (x < 0 || x >= cols || y < 0 || y >= rows) return;
    if (maze[y][x] === 1 || visited[y][x]) return;

    // Add current
    visited[y][x] = true;
    path.push({ x, y });

    // Check goal
    if (x === goal.x && y === goal.y) {
      if (bestPath === null || path.length < bestPath.length) {
        bestPath = [...path]; // save shortest found
      }
    } else {
      // Randomize move order
      for (const { dx, dy } of shuffle([...dirs])) {
        dfs(x + dx, y + dy, path);
      }
    }

    // Backtrack
    path.pop();
    visited[y][x] = false;
  }

  dfs(start.x, start.y, []);
  return bestPath;
}


  useEffect(() => {
  if (gameWon) return;
  if (currentPlayer !== 'boy') return;

  const timer = setTimeout(() => {
    const path = findRandomPath(boyPosition, girlPosition, maze);
    if (path && path.length >= 2) {
      const next = path[1]; // move one step
      setBoyPosition({ x: next.x, y: next.y });
      setMoves((m) => m + 1);
      setCurrentPlayer('girl');
    } else {
      // no path available, just give turn to girl
      setCurrentPlayer('girl');
    }
  }, 500);

  return () => clearTimeout(timer);
}, [currentPlayer, boyPosition, girlPosition, gameWon]);
  
  
 // Automate boy's movement using backtracking path; move 1 step with a small delay (visible)
// useEffect(() => {
//   if (gameWon) return;
//   if (currentPlayer !== 'boy') return;

//   const timer = setTimeout(() => {
//     const path = findPathBacktracking(boyPosition, girlPosition, maze);
//     // path includes current tile as index 0; next step is index 1
//     if (path && path.length >= 2) {
//       const next = path[1];
//       if (isValidMove(next.x, next.y)) {
//         setBoyPosition({ x: next.x, y: next.y });
//         setMoves((m) => m + 1);
//         setCurrentPlayer('girl'); // switch turn after the boy moves
//       }
//     } else {
//       // no path found (boxed in) — just hand turn to girl
//       setCurrentPlayer('girl');
//     }
//   }, 450); // delay so movement is visible

//   return () => clearTimeout(timer);
// }, [currentPlayer, boyPosition, girlPosition, gameWon]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          movePlayer('up');
          break;
        case 'ArrowDown':
          e.preventDefault();
          movePlayer('down');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          movePlayer('left');
          break;
        case 'ArrowRight':
          e.preventDefault();
          movePlayer('right');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPlayer, boyPosition, girlPosition, gameWon]);

  useEffect(() => {
    if (boyPosition.x === girlPosition.x && boyPosition.y === girlPosition.y && !gameWon) {
      setGameWon(true);
      setShowCelebration(true);
    }
  }, [boyPosition, girlPosition, gameWon]);

  if (showCelebration) {
    return (
      <div className="text-center animate-fade-in">
        <div className="mb-8 animate-celebration">
          <div className="flex justify-center space-x-4 mb-6">
            <Heart className="text-red-500 animate-bounce" size={60} />
            <Trophy className="text-yellow-500 animate-pulse" size={80} />
            <Heart className="text-pink-500 animate-bounce" size={60} style={{ animationDelay: '0.3s' }} />
          </div>
          <div className="flex justify-center space-x-2 mb-4">
            {[...Array(8)].map((_, i) => (
              <Sparkles 
                key={i}
                className="text-yellow-400 animate-twinkle"
                size={25}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
        
        <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 bg-clip-text mb-6 animate-rainbow">
          Love Conquers All! 💕
        </h2>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-8 transform transition-all duration-500 hover:scale-105">
          <p className="text-3xl text-gray-800 mb-4 animate-pulse-glow">
            We Found Each Other! 🎉
          </p>
          <p className="text-xl text-gray-600 mb-4">
            Completed in <span className="font-bold text-pink-600">{moves}</span> moves
          </p>
          <p className="text-lg text-gray-500 italic">
            "True love always finds a way, no matter the obstacles!" 💖
          </p>
        </div>
        
        <div className="space-y-4">
          <button 
            onClick={resetGame}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full text-lg font-semibold transform transition-all duration-300 hover:scale-110 mr-4"
          >
            Play Again 🔄
          </button>
          <button 
            onClick={onComplete}
            className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold transform transition-all duration-300 hover:scale-110"
          >
            Continue Journey 💕
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center max-w-6xl animate-fade-in">
      <div className="mb-8">
        <Navigation className="mx-auto text-blue-500 mb-4 animate-pulse" size={60} />
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-4">
          Help Love Find Its Way 💕
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          Guide Akash and Aakriti to each other through the maze of life!
        </p>
        <div className="flex justify-center items-center space-x-6 mb-4">
          <div className="text-center">
            <div className="text-2xl mb-1">👦</div>
            <p className="text-sm text-gray-600">Akash</p>
          </div>
          <Heart className="text-red-500 animate-pulse" size={30} />
          <div className="text-center">
            <div className="text-2xl mb-1">👧</div>
            <p className="text-sm text-gray-600">Aakriti</p>
          </div>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold text-gray-700">
            Current Turn: <span className="text-pink-600">{currentPlayer === 'boy' ? '👦 Akash' : '👧 Aakriti'}</span>
          </p>
          <p className="text-lg font-semibold text-gray-700">
            Moves: <span className="text-blue-600">{moves}</span>
          </p>
        </div>
        
        {/* Game Grid */}
        <div className="grid grid-cols-8 gap-1 max-w-md mx-auto mb-6 bg-gray-200 p-4 rounded-xl">
          {maze.map((row, y) =>
            row.map((cell, x) => {
              const isBoy = boyPosition.x === x && boyPosition.y === y;
              const isGirl = girlPosition.x === x && girlPosition.y === y;
              const isObstacle = cell === 1;
              
              return (
                <div
                  key={`${x}-${y}`}
                  className={`
                    aspect-square flex items-center justify-center text-lg font-bold rounded transition-all duration-300
                    ${isObstacle 
                      ? 'bg-gray-600' 
                      : 'bg-white hover:bg-gray-50'
                    }
                    ${(isBoy || isGirl) ? 'animate-pulse' : ''}
                  `}
                >
                  {isBoy && isGirl ? (
                    <Heart className="text-red-500 animate-bounce" size={20} />
                  ) : isBoy ? (
                    <span className="animate-bounce">👦</span>
                  ) : isGirl ? (
                    <span className="animate-bounce">👧</span>
                  ) : isObstacle ? (
                    '🧱'
                  ) : (
                    ''
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            Use arrow keys or click buttons to move the {currentPlayer === 'boy' ? 'Akash 👦' : 'Aakriti 👧'}
          </p>
          
          <div className="flex flex-col items-center space-y-2">
            <button
              onClick={() => movePlayer('up')}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg transform transition-all duration-300 hover:scale-110"
            >
              ↑
            </button>
            <div className="flex space-x-2">
              <button
                onClick={() => movePlayer('left')}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg transform transition-all duration-300 hover:scale-110"
              >
                ←
              </button>
              <button
                onClick={() => movePlayer('right')}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg transform transition-all duration-300 hover:scale-110"
              >
                →
              </button>
            </div>
            <button
              onClick={() => movePlayer('down')}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg transform transition-all duration-300 hover:scale-110"
            >
              ↓
            </button>
          </div>
        </div>
      </div>

      <button 
        onClick={resetGame}
        className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-2 rounded-full text-sm font-semibold transform transition-all duration-300 hover:scale-110 flex items-center mx-auto"
      >
        <RotateCcw size={16} className="mr-2" />
        Reset Game
      </button>
    </div>
  );
};

export default PuzzleGame;