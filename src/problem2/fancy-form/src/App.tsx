import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/context/ThemeContext';
import { SwapCard } from '@/components/swap/SwapCard';
import { Background } from '@/components/layout/Background';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="relative flex min-h-dvh flex-col items-center justify-center bg-slate-50 px-4 py-8 transition-colors duration-300 dark:bg-[#0b1120]">
          <Background />

          {/* Theme toggle - top right */}
          <div className="fixed right-4 top-4 z-30">
            <ThemeToggle />
          </div>

          {/* Swap Form */}
          <main className="relative z-10 w-full max-w-[480px]">
            <SwapCard />
          </main>

          {/* Toast notifications */}
          <Toaster position="bottom-center" />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
