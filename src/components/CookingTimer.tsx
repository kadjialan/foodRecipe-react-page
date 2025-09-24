import React, { useState, useEffect, useCallback } from 'react';
import { Clock, Play, Pause, RotateCcw, Volume2 } from 'lucide-react';

interface CookingTimerProps {
  initialTime?: number; // in seconds
  label?: string;
  onComplete?: () => void;
}

export const CookingTimer: React.FC<CookingTimerProps> = ({
  initialTime = 0,
  label = "Timer",
  onComplete
}) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [inputTime, setInputTime] = useState({
    hours: Math.floor(initialTime / 3600),
    minutes: Math.floor((initialTime % 3600) / 60),
    seconds: initialTime % 60
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            onComplete?.();
            // Play notification sound
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAK4AOABAP2wAABQAAACMBPwAAAAFhAABkYXRhPAIAAAA');
            audio.play().catch(console.error);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, time, onComplete]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (time === 0) {
      const totalSeconds = inputTime.hours * 3600 + inputTime.minutes * 60 + inputTime.seconds;
      if (totalSeconds > 0) {
        setTime(totalSeconds);
        setIsRunning(true);
      }
    } else {
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setInputTime({ hours: 0, minutes: 0, seconds: 0 });
  };

  const updateInputTime = (field: 'hours' | 'minutes' | 'seconds', value: number) => {
    setInputTime(prev => ({
      ...prev,
      [field]: Math.max(0, Math.min(value, field === 'hours' ? 23 : 59))
    }));
  };

  const getTimerColor = () => {
    if (time === 0) return 'text-gray-600';
    if (time <= 60) return 'text-red-600'; // Last minute
    if (time <= 300) return 'text-orange-600'; // Last 5 minutes
    return 'text-green-600';
  };

  const getProgressColor = () => {
    if (time === 0) return 'bg-gray-200';
    if (time <= 60) return 'bg-red-200';
    if (time <= 300) return 'bg-orange-200';
    return 'bg-green-200';
  };

  const getProgressBarColor = () => {
    if (time === 0) return 'bg-gray-400';
    if (time <= 60) return 'bg-red-500';
    if (time <= 300) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const totalSetTime = inputTime.hours * 3600 + inputTime.minutes * 60 + inputTime.seconds;
  const progress = totalSetTime > 0 ? ((totalSetTime - time) / totalSetTime) * 100 : 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{label}</h3>

        <div className={`text-4xl font-mono font-bold mb-4 ${getTimerColor()}`}>
          {formatTime(time)}
        </div>

        {totalSetTime > 0 && (
          <div className={`w-full ${getProgressColor()} rounded-full h-3 mb-4`}>
            <div
              className={`h-3 ${getProgressBarColor()} rounded-full transition-all duration-1000 ease-linear`}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {time === 0 && !isRunning && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hours</label>
              <input
                type="number"
                min="0"
                max="23"
                value={inputTime.hours}
                onChange={(e) => updateInputTime('hours', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Minutes</label>
              <input
                type="number"
                min="0"
                max="59"
                value={inputTime.minutes}
                onChange={(e) => updateInputTime('minutes', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Seconds</label>
              <input
                type="number"
                min="0"
                max="59"
                value={inputTime.seconds}
                onChange={(e) => updateInputTime('seconds', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        <div className="flex justify-center space-x-3">
          {!isRunning ? (
            <button
              onClick={handleStart}
              disabled={time === 0 && totalSetTime === 0}
              className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <Play className="w-5 h-5" />
              <span>Start</span>
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="flex items-center space-x-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Pause className="w-5 h-5" />
              <span>Pause</span>
            </button>
          )}

          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Reset</span>
          </button>
        </div>

        {time > 0 && time <= 60 && (
          <div className="mt-4 flex items-center justify-center space-x-2 text-red-600 animate-pulse">
            <Volume2 className="w-5 h-5" />
            <span className="text-sm font-medium">Time almost up!</span>
          </div>
        )}
      </div>
    </div>
  );
};