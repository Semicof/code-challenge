import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowDown } from 'lucide-react';

interface SwapDirectionButtonProps {
  onFlip: () => void;
  disabled?: boolean;
}

export function SwapDirectionButton({ onFlip, disabled = false }: SwapDirectionButtonProps) {
  const [rotation, setRotation] = useState(0);

  const handleClick = () => {
    if (disabled) return;
    setRotation((prev) => prev + 180);
    onFlip();
  };

  return (
    <div className="relative z-10 flex justify-center -my-3">
      <motion.button
        id="swap-direction-button"
        type="button"
        onClick={handleClick}
        disabled={disabled}
        animate={{ rotate: rotation }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="flex h-10 w-10 items-center justify-center rounded-xl border-4 border-white bg-slate-100 text-slate-500 transition-colors duration-200 hover:bg-slate-200 active:bg-slate-300 dark:border-[#131c31] dark:bg-[#1a2740] dark:text-slate-300 dark:hover:bg-[#1e3050] disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Swap token direction"
      >
        <ArrowDown className="h-5 w-5" strokeWidth={2.5} />
      </motion.button>
    </div>
  );
}
