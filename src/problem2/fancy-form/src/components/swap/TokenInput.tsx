import { useCallback } from 'react';
import type { Token } from '@/types';
import type { SwapDirection } from '@/types/swap';
import { sanitizeAmountInput, formatUsd } from '@/utils/format';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface TokenInputProps {
  direction: SwapDirection;
  token: Token | null;
  amount: string;
  usdValue: number;
  onAmountChange: (amount: string) => void;
  onTokenSelect: () => void;
  disabled?: boolean;
}

export function TokenInput({
  direction,
  token,
  amount,
  usdValue,
  onAmountChange,
  onTokenSelect,
  disabled = false,
}: TokenInputProps) {
  const label = direction === 'sell' ? 'You pay' : 'You receive';

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const sanitized = sanitizeAmountInput(e.target.value);
      if (sanitized !== null) {
        onAmountChange(sanitized);
      }
    },
    [onAmountChange],
  );

  return (
    <div
      className={`rounded-2xl p-4 transition-colors duration-200 ${
        direction === 'sell'
          ? 'bg-slate-100 dark:bg-[#0f1d32]'
          : 'bg-slate-50 dark:bg-[#0a1628]'
      }`}
    >
      {/* Label */}
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</span>
      </div>

      {/* Input + Token Selector Row */}
      <div className="flex items-center gap-3">
        {/* Amount Input using Shadcn Input but styling it essentially to look seamless */}
        <Input
          id={`${direction}-amount`}
          type="text"
          inputMode="decimal"
          placeholder="0"
          value={amount}
          onChange={handleInputChange}
          disabled={disabled}
          autoComplete="off"
          className="min-w-0 flex-1 border-0 bg-transparent px-0 text-3xl font-semibold text-slate-900 shadow-none outline-none focus-visible:ring-0 placeholder:text-slate-300 dark:text-white dark:placeholder:text-slate-600 sm:text-4xl"
        />

        {/* Token Selector Pill */}
        <Button
          id={`${direction}-token-selector`}
          variant="outline"
          onClick={onTokenSelect}
          className={`flex h-9 shrink-0 items-center gap-2 rounded-full px-3 py-5 font-semibold transition-all duration-200 hover:scale-105 active:scale-95 ${
            token
              ? 'bg-white shadow-sm hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white dark:border-slate-700'
              : 'bg-blue-600 text-white shadow-md hover:bg-blue-700 border-transparent hover:text-white'
          }`}
        >
          {token ? (
            <>
              {token.hasIcon ? (
                <img
                  src={token.iconUrl}
                  alt={token.currency}
                  className="h-6 w-6 rounded-full"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 text-[10px] font-bold text-white">
                  {token.currency.slice(0, 2)}
                </div>
              )}
              <span className="text-sm">{token.currency}</span>
              <ChevronDown className="h-4 w-4" />
            </>
          ) : (
            <>
              <span className="text-sm">Select token</span>
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      {/* USD Value */}
      <div className="mt-1.5 h-5 text-sm text-slate-400 dark:text-slate-500">
        {amount && parseFloat(amount) > 0 && token ? formatUsd(usdValue) : ''}
      </div>
    </div>
  );
}
