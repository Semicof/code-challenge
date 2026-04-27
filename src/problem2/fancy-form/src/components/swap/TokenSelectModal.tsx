import { useState, useMemo, useCallback } from 'react';
import type { Token } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search, Check } from 'lucide-react';

interface TokenSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (token: Token) => void;
  tokens: Token[];
  selectedToken?: Token | null;
}

/** Popular tokens shown as quick-select pills at the top */
const POPULAR_CURRENCIES = ['ETH', 'USDC', 'WBTC', 'BUSD', 'ATOM', 'SOL', 'BNB', 'DAI'];

export function TokenSelectModal({
  isOpen,
  onClose,
  onSelect,
  tokens,
  selectedToken,
}: TokenSelectModalProps) {
  const [search, setSearch] = useState('');

  // Filter tokens by search query
  const filteredTokens = useMemo(() => {
    if (!search.trim()) return tokens;
    const query = search.toLowerCase().trim();
    return tokens.filter((t) => t.currency.toLowerCase().includes(query));
  }, [tokens, search]);

  // Popular tokens that exist in our token list
  const popularTokens = useMemo(() => {
    return POPULAR_CURRENCIES.map((c) => tokens.find((t) => t.currency === c)).filter(
      (t): t is Token => t !== undefined,
    );
  }, [tokens]);

  const handleSelect = useCallback(
    (token: Token) => {
      onSelect(token);
      onClose();
    },
    [onSelect, onClose],
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-[#131c31] border-slate-200 dark:border-slate-800 rounded-3xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-5 py-4 border-b border-slate-100 dark:border-slate-700/50">
          <DialogTitle className="text-lg font-bold text-slate-900 dark:text-white">
            Select a token
          </DialogTitle>
        </DialogHeader>

        {/* Search */}
        <div className="px-5 pt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              placeholder="Search by token name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-12 bg-slate-100 dark:bg-[#0a1628] border-transparent focus-visible:ring-1 focus-visible:ring-blue-500 rounded-2xl"
            />
          </div>
        </div>

        {/* Popular tokens */}
        {!search && popularTokens.length > 0 && (
          <div className="px-5 pt-4">
            <div className="flex flex-wrap gap-2">
              {popularTokens.map((token) => (
                <button
                  key={token.currency}
                  type="button"
                  onClick={() => handleSelect(token)}
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-all duration-150 hover:scale-105 active:scale-95 ${
                    selectedToken?.currency === token.currency
                      ? 'border-blue-500 bg-blue-50 text-blue-600 dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-300'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:bg-blue-900/20'
                  }`}
                >
                  {token.hasIcon ? (
                    <img
                      src={token.iconUrl}
                      alt={token.currency}
                      className="h-5 w-5 rounded-full"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 text-[10px] font-bold text-white">
                      {token.currency.slice(0, 2)}
                    </div>
                  )}
                  {token.currency}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="mx-5 mt-4 border-t border-slate-100 dark:border-slate-700/50" />

        {/* Token list */}
        <div className="max-h-[50vh] overflow-y-auto overscroll-contain px-2 py-2 sm:max-h-[40vh]">
          {filteredTokens.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-slate-400 dark:text-slate-500">
              <Search className="mb-3 h-10 w-10 opacity-50" />
              <span className="text-sm">No tokens found</span>
            </div>
          ) : (
            filteredTokens.map((token) => (
              <button
                key={token.currency}
                type="button"
                onClick={() => handleSelect(token)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 transition-colors duration-150 ${
                  selectedToken?.currency === token.currency
                    ? 'bg-blue-50 dark:bg-blue-900/20'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                {/* Icon */}
                {token.hasIcon ? (
                  <img
                    src={token.iconUrl}
                    alt={token.currency}
                    className="h-9 w-9 rounded-full"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 text-sm font-bold text-white">
                    {token.currency.slice(0, 2)}
                  </div>
                )}

                {/* Name */}
                <div className="flex flex-col items-start">
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {token.currency}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    ${token.price < 0.01 ? token.price.toExponential(2) : token.price.toFixed(2)}
                  </span>
                </div>

                {/* Selected indicator */}
                {selectedToken?.currency === token.currency && (
                  <div className="ml-auto">
                    <Check className="h-5 w-5 text-blue-500" />
                  </div>
                )}
              </button>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
