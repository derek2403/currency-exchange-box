import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Info, ChevronDown } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { CurrencySelect } from "@/components/CurrencySelect";
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group-1';



// Mock Data for Chart
const data = [
  { value: 0.306 },
  { value: 0.307 },
  { value: 0.306 },
  { value: 0.308 },
  { value: 0.308 },
  { value: 0.309 },
  { value: 0.310 },
  { value: 0.310 },
  { value: 0.311 },
  { value: 0.311 },
  { value: 0.312 },
  { value: 0.314 },
  { value: 0.315 },
  { value: 0.314 },
  { value: 0.314 },
  { value: 0.313 },
  { value: 0.315 },
  { value: 0.315 },
  { value: 0.316 },
  { value: 0.316 },
];

export default function TransferPage() {
  const [amount, setAmount] = useState("3,130.09");
  const [convertedAmount, setConvertedAmount] = useState("977.55");
  const [timeRange, setTimeRange] = useState('1W');

  const [fromCurrency, setFromCurrency] = useState({ code: 'MYR', country: 'my' });
  const [toCurrency, setToCurrency] = useState({ code: 'SGD', country: 'sg' });

  const [isFromOpen, setIsFromOpen] = useState(false);
  const [isToOpen, setIsToOpen] = useState(false);

  const fromTriggerRef = useRef(null);
  const toTriggerRef = useRef(null);

  const [isMounted, setIsMounted] = useState(false);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  useEffect(() => {
    setIsMounted(true);
    const updateOverflow = () => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
      document.documentElement.style.overflow = isDesktop ? 'hidden' : '';
      document.body.style.overflow = isDesktop ? 'hidden' : '';
    };

    updateOverflow();
    window.addEventListener('resize', updateOverflow);
    return () => {
      window.removeEventListener('resize', updateOverflow);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <Head>
        <title>Transfer Calculator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="relative isolate grid h-dvh grid-rows-[auto,1fr] overflow-x-hidden overflow-y-auto lg:overflow-hidden bg-white">
        <div className="flex items-center justify-center w-full h-full p-4 pt-20">
          <div className="w-full max-w-md bg-[#F8BC06] rounded-3xl p-6 shadow-2xl border border-black/5">
            <h1 className="text-2xl font-bold text-black mb-6">Transfer calculator</h1>

            {/* Time Range Toggle */}
            <div className="flex mb-6">
              <ToggleGroup
                type="single"
                value={timeRange}
                onValueChange={(newValue) => {
                  if (newValue) setTimeRange(newValue);
                }}
                className="glass p-1 rounded-lg"
              >
                <ToggleGroupItem value="1D" className="data-[state=on]:bg-white/20 data-[state=on]:text-black text-black/60 hover:text-black transition-colors rounded-md px-3 py-1 text-xs">1D</ToggleGroupItem>
                <ToggleGroupItem value="1W" className="data-[state=on]:bg-white/20 data-[state=on]:text-black text-black/60 hover:text-black transition-colors rounded-md px-3 py-1 text-xs">1W</ToggleGroupItem>
                <ToggleGroupItem value="1M" className="data-[state=on]:bg-white/20 data-[state=on]:text-black text-black/60 hover:text-black transition-colors rounded-md px-3 py-1 text-xs">1M</ToggleGroupItem>
                <ToggleGroupItem value="6M" className="data-[state=on]:bg-white/20 data-[state=on]:text-black text-black/60 hover:text-black transition-colors rounded-md px-3 py-1 text-xs">6M</ToggleGroupItem>
                <ToggleGroupItem value="1Y" className="data-[state=on]:bg-white/20 data-[state=on]:text-black text-black/60 hover:text-black transition-colors rounded-md px-3 py-1 text-xs">1Y</ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Chart Section */}
            <div className="mb-6 glass rounded-2xl p-4">
              <div className="h-32 w-full relative">
                {isMounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#1c1c1e"
                        strokeWidth={2.5}
                        dot={false}
                      />
                      <YAxis domain={['dataMin', 'dataMax']} hide />
                    </LineChart>
                  </ResponsiveContainer>
                )}
                {/* Current Rate Indicator */}
                <div className="absolute top-0 right-0 flex flex-col items-end">
                  <div className="glass text-black text-xs px-2 py-1 rounded-full mb-1 font-medium">
                    0.316
                  </div>
                  <div className="w-2 h-2 bg-black rounded-full ring-4 ring-black/10"></div>
                </div>
              </div>

              <div className="flex justify-between text-xs text-black/60 mt-2">
                <span>Oct 24</span>
                <span>Today</span>
              </div>

              <div className="mt-4 text-black font-medium">
                1 {fromCurrency.code} = 0.3149 {toCurrency.code}
              </div>
            </div>

            {/* Input Section */}
            <div className="relative space-y-2">
              {/* From Input */}
              <div className="glass rounded-2xl p-4 flex items-center justify-between group focus-within:ring-1 focus-within:ring-black/20 transition-all">
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-transparent text-black text-2xl font-semibold outline-none w-full placeholder:text-black/40"
                />
                <button
                  ref={fromTriggerRef}
                  onClick={() => setIsFromOpen(!isFromOpen)}
                  className="flex items-center gap-2 text-black font-medium hover:bg-black/5 px-2 py-1 rounded-lg transition-colors"
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden relative flex items-center justify-center bg-white border border-black/10">
                    <Image
                      src={`https://flagcdn.com/w40/${fromCurrency.country}.png`}
                      alt={fromCurrency.code}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {fromCurrency.code}
                  <ChevronDown className="w-4 h-4 text-black/60" />
                </button>

                <CurrencySelect
                  isOpen={isFromOpen}
                  onClose={() => setIsFromOpen(false)}
                  onSelect={setFromCurrency}
                  selectedCurrency={fromCurrency.code}
                  triggerRef={fromTriggerRef}
                />
              </div>

              {/* Swap Button */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <button
                  onClick={handleSwap}
                  className="bg-white rounded-full p-3 shadow-lg hover:scale-105 transition-all border border-black/5"
                >
                  <ArrowUpDown className="w-5 h-5 text-[#F8BC06]" />
                </button>
              </div>

              {/* To Input */}
              <div className="glass rounded-2xl p-4 flex items-center justify-between group focus-within:ring-1 focus-within:ring-black/20 transition-all">
                <input
                  type="text"
                  value={convertedAmount}
                  onChange={(e) => setConvertedAmount(e.target.value)}
                  className="bg-transparent text-black text-2xl font-semibold outline-none w-full placeholder:text-black/40"
                />
                <button
                  ref={toTriggerRef}
                  onClick={() => setIsToOpen(!isToOpen)}
                  className="flex items-center gap-2 text-black font-medium hover:bg-black/5 px-2 py-1 rounded-lg transition-colors"
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden relative flex items-center justify-center bg-white border border-black/10">
                    <Image
                      src={`https://flagcdn.com/w40/${toCurrency.country}.png`}
                      alt={toCurrency.code}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {toCurrency.code}
                  <ChevronDown className="w-4 h-4 text-black/60" />
                </button>

                <CurrencySelect
                  isOpen={isToOpen}
                  onClose={() => setIsToOpen(false)}
                  onSelect={setToCurrency}
                  selectedCurrency={toCurrency.code}
                  triggerRef={toTriggerRef}
                />
              </div>
            </div>

            {/* Info Section */}
            <div className="flex justify-between items-center mt-6 px-2">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1 text-black/60 text-xs">
                  Includes fees <Info className="w-3 h-3" />
                </div>
                <div className="text-black text-sm">26.08 {fromCurrency.code}</div>
              </div>
              <div className="w-px h-8 bg-black/10"></div>
              <div className="flex flex-col gap-1 text-right">
                <div className="text-black/60 text-xs">Should arrive</div>
                <div className="text-black text-sm">In seconds</div>
              </div>
            </div>

            {/* Send Button */}
            <Button className="w-full mt-6 bg-white hover:bg-white/90 text-black font-bold h-12 rounded-2xl text-base shadow-lg border border-black/5">
              Send
            </Button>

          </div>
        </div>
      </div>
    </>
  );
}
