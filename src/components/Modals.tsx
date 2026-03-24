import { useEffect, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface BaseModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
}

function Modal({ isOpen, title, children }: BaseModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Fragment>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0A1128]/80 backdrop-blur-md z-[100]"
          />
          <div className="fixed inset-0 flex items-center justify-center z-[101] pointer-events-none p-4">
            <motion.div
              initial={{ scale: 0.95, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="glass-modal rounded-3xl p-8 sm:p-10 max-w-md w-full pointer-events-auto text-center relative overflow-hidden text-white border-t border-white/20 shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
              <h2 className="text-2xl sm:text-3xl font-black mb-6 tracking-wider text-[var(--color-kozo-gold)] drop-shadow-md">{title}</h2>
              {children}
            </motion.div>
          </div>
        </Fragment>
      )}
    </AnimatePresence>
  );
}

export function GiftModal({ isOpen, onClaim, onContinue }: { isOpen: boolean, onClaim: () => void, onContinue: () => void }) {
  return (
    <Modal isOpen={isOpen} title="PHẦN THƯỞNG 🎁">
      <p className="text-lg mb-8 text-gray-300 font-medium">Bạn đã tìm thấy ô Quà! Dừng lại để nhận quà hay tiếp tục để săn giải Đặc Biệt?</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button onClick={onClaim} className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform active:scale-95 transition-all outline-none border border-pink-400/50">
          Nhận quà
        </button>
        <button onClick={onContinue} className="flex-1 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold py-3 px-6 rounded-xl transition-all transform active:scale-95 outline-none">
          Tiếp tục
        </button>
      </div>
      <p className="text-xs text-gray-400 mt-6 italic">* Lưu ý: Nếu tiếp tục và trúng mìn, phần quà này sẽ bị hủy.</p>
    </Modal>
  );
}

export function LoseModal({ isOpen, type, onRestart }: { isOpen: boolean, type: 'boom' | 'outOfTurns' | null, onRestart: () => void }) {
  return (
    <Modal isOpen={isOpen} title={type === 'boom' ? "RẤT TIẾC 💥" : "RẤT TIẾC 🍀"}>
      <div className="mb-6 flex justify-center">
        <div className={`text-6xl ${type === 'boom' ? 'animate-pulse drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]' : 'animate-bounce drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]'}`}>
          {type === 'boom' ? '💥' : '😢'}
        </div>
      </div>
      <p className={`text-xl font-bold mb-8 text-center px-4 ${type === 'boom' ? 'text-red-400' : 'text-gray-300'}`}>
        {type === 'boom' ? 'Bạn đã dẫm phải mìn!' : 'Bạn đã hết lượt. Chúc bạn may mắn lần sau nhé!'}
      </p>
      <button onClick={onRestart} className={`w-full ${type === 'boom' ? 'bg-[#1e293b] hover:bg-[#334155] border-red-900/50' : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 border-indigo-400/50'} border text-white font-black py-4 px-6 rounded-xl shadow-lg transform active:scale-95 transition-all text-lg tracking-widest`}>
        CHƠI LẠI
      </button>
    </Modal>
  );
}

export function WinModal({ isOpen, onRestart }: { isOpen: boolean, onRestart: () => void }) {
  useEffect(() => {
    if (isOpen) {
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 200, colors: ['#D4AF37', '#ffffff', '#2563EB'] };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} title="CHIẾN THẮNG 🏆">
      <div className="mb-6 flex justify-center">
        <div className="text-6xl animate-bounce drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]">✨</div>
      </div>
      <p className="text-xl font-bold mb-8 text-gray-200">Chúc mừng bạn đã hoàn thành thử thách KOZOCOM!</p>
      <button onClick={onRestart} className="w-full bg-gradient-to-r from-[var(--color-kozo-gold)] to-[#FDE047] hover:brightness-110 text-[var(--color-kozo-navy)] font-black py-4 px-6 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.3)] transform active:scale-95 transition-all text-lg tracking-widest border border-white/40">
        CHƠI LẠI
      </button>
    </Modal>
  );
}
