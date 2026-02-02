'use client';

import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCw, ZoomIn, ZoomOut, Move } from 'lucide-react';

export default function Model3DViewer({ modelUrl }: { modelUrl: string }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      setRotation((prev) => ({
        x: prev.x,
        y: (prev.y + 0.5) % 360,
      }));
    }, 30);

    return () => clearInterval(interval);
  }, [autoRotate]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setRotation((prev) => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5,
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setRotation({ x: 0, y: 0 });
    setAutoRotate(true);
  };

  return (
    <div className="relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 to-gray-200">
      <div
        ref={containerRef}
        className="relative h-full w-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="relative"
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transformStyle: 'preserve-3d',
              transition: isDragging ? 'none' : 'transform 0.1s ease-out',
            }}
          >
            <div className="relative w-64 h-64">
              <div
                className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl shadow-2xl"
                style={{
                  transform: 'translateZ(32px)',
                }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-xl opacity-80"
                style={{
                  transform: 'rotateY(90deg) translateZ(32px)',
                }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-cyan-300 to-blue-400 rounded-2xl shadow-xl opacity-60"
                style={{
                  transform: 'rotateY(180deg) translateZ(32px)',
                }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-xl opacity-80"
                style={{
                  transform: 'rotateY(-90deg) translateZ(32px)',
                }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-cyan-200 to-blue-300 rounded-2xl shadow-xl opacity-50"
                style={{
                  transform: 'rotateX(90deg) translateZ(32px)',
                }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl shadow-xl opacity-70"
                style={{
                  transform: 'rotateX(-90deg) translateZ(32px)',
                }}
              />
            </div>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Move className="h-5 w-5" />
              <span className="text-sm font-medium">Drag to rotate</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={resetView}
          className="gap-2 backdrop-blur-sm bg-white/90"
        >
          <RotateCw className="h-4 w-4" />
          Reset
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setAutoRotate(!autoRotate)}
          className={`backdrop-blur-sm ${autoRotate ? 'bg-cyan-100' : 'bg-white/90'}`}
        >
          {autoRotate ? 'Stop' : 'Auto'} Rotate
        </Button>
      </div>

      <div className="absolute top-4 right-4 bg-cyan-600 text-white px-3 py-1 rounded-full text-xs font-medium">
        3D Preview
      </div>
    </div>
  );
}
