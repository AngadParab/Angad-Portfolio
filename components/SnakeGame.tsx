import React, { useEffect, useRef, useState, useCallback } from 'react';

const GRID_SIZE = 20;
const CELL_SIZE = 15;
const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 300;

const SnakeGame: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Game state refs to avoid closure staleness in loop
  const snakeRef = useRef([{ x: 10, y: 10 }]);
  const foodRef = useRef({ x: 15, y: 15 });
  const directionRef = useRef({ x: 0, y: 0 });
  const nextDirectionRef = useRef({ x: 0, y: 0 });
  const speedRef = useRef(150);

  const spawnFood = useCallback(() => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * (CANVAS_WIDTH / CELL_SIZE)),
        y: Math.floor(Math.random() * (CANVAS_HEIGHT / CELL_SIZE)),
      };
      // Ensure food doesn't spawn on snake
      // eslint-disable-next-line no-loop-func
      const onSnake = snakeRef.current.some(segment => segment.x === newFood.x && segment.y === newFood.y);
      if (!onSnake) break;
    }
    foodRef.current = newFood;
  }, []);

  const resetGame = useCallback(() => {
    snakeRef.current = [{ x: 10, y: 10 }];
    directionRef.current = { x: 1, y: 0 }; // Start moving right
    nextDirectionRef.current = { x: 1, y: 0 };
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
    spawnFood();
  }, [spawnFood]);

  // Input handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (!gameStarted && e.key === 'Enter') {
        resetGame();
        return;
      }

      if (gameOver && e.key === 'Enter') {
        resetGame();
        return;
      }

      const current = directionRef.current;
      
      switch (e.key) {
        case 'ArrowUp':
          if (current.y === 0) nextDirectionRef.current = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
          if (current.y === 0) nextDirectionRef.current = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
          if (current.x === 0) nextDirectionRef.current = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
          if (current.x === 0) nextDirectionRef.current = { x: 1, y: 0 };
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver, gameStarted, onClose, resetGame]);

  // Game Loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const moveSnake = () => {
      directionRef.current = nextDirectionRef.current;
      const head = { ...snakeRef.current[0] };
      head.x += directionRef.current.x;
      head.y += directionRef.current.y;

      // Collision Detection (Walls)
      if (
        head.x < 0 ||
        head.x >= CANVAS_WIDTH / CELL_SIZE ||
        head.y < 0 ||
        head.y >= CANVAS_HEIGHT / CELL_SIZE ||
        snakeRef.current.some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true);
        return;
      }

      snakeRef.current.unshift(head);

      // Eat Food
      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        setScore((s) => s + 10);
        spawnFood();
      } else {
        snakeRef.current.pop();
      }
    };

    const intervalId = setInterval(moveSnake, speedRef.current);
    return () => clearInterval(intervalId);
  }, [gameStarted, gameOver, spawnFood]);

  // Rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear
    ctx.fillStyle = '#05011a';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw Grid (Subtle)
    ctx.strokeStyle = '#1a1a2e';
    ctx.lineWidth = 0.5;
    /*
    for (let x = 0; x <= CANVAS_WIDTH; x += CELL_SIZE) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CANVAS_HEIGHT); ctx.stroke();
    }
    for (let y = 0; y <= CANVAS_HEIGHT; y += CELL_SIZE) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CANVAS_WIDTH, y); ctx.stroke();
    }
    */

    if (!gameStarted) {
      ctx.fillStyle = '#9ef06a';
      ctx.font = '14px "Press Start 2P"';
      ctx.textAlign = 'center';
      ctx.fillText('PRESS ENTER', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 10);
      ctx.fillText('TO START', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 15);
      return;
    }

    // Draw Food
    ctx.fillStyle = '#f23f6d';
    ctx.beginPath();
    ctx.arc(
      foodRef.current.x * CELL_SIZE + CELL_SIZE / 2,
      foodRef.current.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 2,
      0,
      2 * Math.PI
    );
    ctx.fill();

    // Draw Snake
    snakeRef.current.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#ffd15d' : '#9ef06a'; // Head is yellow
      ctx.fillRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      );
    });

    if (gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      
      ctx.fillStyle = '#f23f6d';
      ctx.font = '20px "Press Start 2P"';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 10);
      
      ctx.fillStyle = '#9ef06a';
      ctx.font = '12px monospace';
      ctx.fillText(`Score: ${score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 15);
      ctx.fillText('Press Enter to Restart', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 35);
    }

  }, [gameStarted, gameOver, score, snakeRef.current, foodRef.current]); // Add dependencies carefully

  return (
    <div className="flex flex-col items-center justify-center p-4 border border-divider bg-pageBg/50 rounded mb-4 animate-fade-in">
      <div className="flex justify-between w-full max-w-[300px] mb-2 text-xs font-mono">
        <span className="text-neonGreen">SNAKE.EXE</span>
        <span className="text-mustard">SCORE: {score}</span>
      </div>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="border border-termBorder shadow-lg rounded-sm cursor-none"
      />
      <div className="mt-2 text-[10px] text-gray-400 font-mono">
        Use Arrow Keys to move. ESC to close.
      </div>
    </div>
  );
};

export default SnakeGame;
