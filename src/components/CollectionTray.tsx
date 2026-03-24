import { AnimatePresence } from 'framer-motion';
import { HexagonTile } from './HexagonCell';
import type { TileData } from '../App';

interface CollectionTrayProps {
  tiles: TileData[];
  maxSlots: number;
}

export function CollectionTray({ tiles, maxSlots }: CollectionTrayProps) {
  const slots = Array.from({ length: maxSlots });

  return (
    <div className="fixed bottom-6 w-full flex justify-center z-50 pointer-events-none px-4">
      {/* Dock Background */}
      <div className="glass-premium px-4 sm:px-6 py-4 rounded-[2rem] flex items-center gap-3 sm:gap-5 min-w-[320px] justify-center pointer-events-auto">
        {slots.map((_, i) => {
          const tile = tiles[i];

          return (
            <div 
              key={i} 
              className="relative w-16 h-18 sm:w-[76px] sm:h-[86px] flex items-center justify-center shrink-0"
            >
              {/* Empty placeholder slot with gentle inner shadow */}
              <div className="absolute inset-0 hex-clip bg-black/30 border border-white/5 shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)]"></div>
              
              <AnimatePresence>
                {tile && (
                  <HexagonTile key={tile.id} tile={tile} />
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
