import { SwapStatus } from '@/types/swap';
import { Spinner } from '@/components/ui/Spinner';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

interface SwapButtonProps {
  label: string;
  canSwap: boolean;
  status: SwapStatus;
  onSwap: () => void;
}

export function SwapButton({ label, canSwap, status, onSwap }: SwapButtonProps) {
  const isProcessing = status === SwapStatus.PROCESSING;
  const isSuccess = status === SwapStatus.SUCCESS;

  return (
    <Button
      id="swap-execute-button"
      type="button"
      onClick={onSwap}
      disabled={!canSwap || isProcessing}
      size="lg"
      className={`relative mt-1 flex w-full items-center justify-center gap-2 rounded-2xl py-6 text-base font-bold transition-all duration-300 sm:text-lg ${
        isSuccess
          ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/30'
          : canSwap && !isProcessing
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-blue-700/40'
            : 'bg-slate-100 text-slate-400 dark:bg-[#0f1d32] dark:text-slate-600'
      }`}
    >
      {isProcessing && <Spinner size="sm" className="border-white border-t-transparent" />}
      {isSuccess && <CheckCircle2 className="h-5 w-5" />}
      {label}
    </Button>
  );
}
