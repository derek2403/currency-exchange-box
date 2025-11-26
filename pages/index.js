import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Info, ChevronDown } from "lucide-react";
import {
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Line,
} from 'recharts';
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
        <div className="flex items-center justify-center w-full h-full p-4 pt-8 scale-90 origin-top">
          <div className="w-full max-w-md bg-white">
            <h1 className="text-3xl font-bold text-black mb-4">Transfer Calculator</h1>

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
                <ToggleGroupItem value="1D" className="data-[state=on]:bg-white/20 data-[state=on]:text-[#F8BC06] data-[state=on]:font-bold text-black/60 hover:text-black transition-colors rounded-md px-3 py-1 text-xs">1D</ToggleGroupItem>
                <ToggleGroupItem value="1W" className="data-[state=on]:bg-white/20 data-[state=on]:text-[#F8BC06] data-[state=on]:font-bold text-black/60 hover:text-black transition-colors rounded-md px-3 py-1 text-xs">1W</ToggleGroupItem>
                <ToggleGroupItem value="1M" className="data-[state=on]:bg-white/20 data-[state=on]:text-[#F8BC06] data-[state=on]:font-bold text-black/60 hover:text-black transition-colors rounded-md px-3 py-1 text-xs">1M</ToggleGroupItem>
                <ToggleGroupItem value="6M" className="data-[state=on]:bg-white/20 data-[state=on]:text-[#F8BC06] data-[state=on]:font-bold text-black/60 hover:text-black transition-colors rounded-md px-3 py-1 text-xs">6M</ToggleGroupItem>
                <ToggleGroupItem value="1Y" className="data-[state=on]:bg-white/20 data-[state=on]:text-[#F8BC06] data-[state=on]:font-bold text-black/60 hover:text-black transition-colors rounded-md px-3 py-1 text-xs">1Y</ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Chart Section */}
            <div className="mb-4 rounded-2xl p-3">
              <div className="h-24 w-full relative">
                {isMounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#F8BC06',
                          border: 'none',
                          borderRadius: '8px',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '12px',
                          padding: '4px 8px'
                        }}
                        itemStyle={{ color: 'white' }}
                        cursor={{ stroke: 'black', strokeWidth: 1, strokeDasharray: '4 4' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#F8BC06"
                        strokeWidth={4}
                        dot={false}
                        activeDot={{ r: 6, fill: '#F8BC06', stroke: 'white', strokeWidth: 2 }}
                      />
                      <YAxis domain={['dataMin', 'dataMax']} hide />
                    </LineChart>
                  </ResponsiveContainer>
                )}
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
            <div className="relative space-y-6">
              {/* From Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600 ml-1">You send exactly</label>
                <div className="glass rounded-2xl p-4 flex items-center justify-between group focus-within:ring-2 focus-within:ring-[#F8BC06]/50 transition-all">
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-transparent text-black text-xl font-bold outline-none w-full placeholder:text-black/40"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      ref={fromTriggerRef}
                      onClick={() => setIsFromOpen(!isFromOpen)}
                      className="flex items-center gap-2 text-black font-bold hover:bg-black/5 px-2 py-1 rounded-lg transition-colors"
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
                  </div>
                  <CurrencySelect
                    isOpen={isFromOpen}
                    onClose={() => setIsFromOpen(false)}
                    onSelect={setFromCurrency}
                    selectedCurrency={fromCurrency.code}
                    triggerRef={fromTriggerRef}
                  />
                </div>
              </div>

              {/* Fee Breakdown / Timeline */}
              <div className="pl-6 border-l-2 border-gray-100 ml-8 space-y-4 py-2 relative">
                {/* Fee */}
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-[10px] text-gray-600 font-bold">-</div>
                    <span className="text-gray-500">Total fees</span>
                  </div>
                  <span className="font-semibold text-gray-700">26.08 {fromCurrency.code}</span>
                </div>

                {/* Amount to Convert */}
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-[10px] text-gray-600 font-bold">=</div>
                    <span className="text-gray-500">Amount we'll convert</span>
                  </div>
                  <span className="font-semibold text-gray-700">3,104.01 {fromCurrency.code}</span>
                </div>

                {/* Rate */}
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-[10px] text-gray-600 font-bold">×</div>
                    <span className="text-gray-500">Guaranteed rate</span>
                  </div>
                  <span className="font-semibold text-[#F8BC06]">0.3149</span>
                </div>
              </div>

              {/* To Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600 ml-1">Recipient gets</label>
                <div className="glass rounded-2xl p-4 flex items-center justify-between group focus-within:ring-2 focus-within:ring-[#F8BC06]/50 transition-all">
                  <input
                    type="text"
                    value={convertedAmount}
                    onChange={(e) => setConvertedAmount(e.target.value)}
                    className="bg-transparent text-black text-xl font-bold outline-none w-full placeholder:text-black/40"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      ref={toTriggerRef}
                      onClick={() => setIsToOpen(!isToOpen)}
                      className="flex items-center gap-2 text-black font-bold hover:bg-black/5 px-2 py-1 rounded-lg transition-colors"
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
                  </div>
                  <CurrencySelect
                    isOpen={isToOpen}
                    onClose={() => setIsToOpen(false)}
                    onSelect={setToCurrency}
                    selectedCurrency={toCurrency.code}
                    triggerRef={toTriggerRef}
                  />
                </div>
              </div>
            </div>



            {/* Savings Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-xl text-sm text-gray-600 flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold mt-0.5">!</div>
              <p>You could save up to <span className="font-bold text-black">119.45 MYR</span> vs banks</p>
            </div>

            {/* Send Button */}
            <Button className="w-full mt-4 bg-[#F8BC06] hover:bg-[#E5AD05] text-white font-bold h-10 rounded-xl text-md shadow-lg transition-colors duration-300">
              Send
            </Button>

          </div>
        </div>
      </div>
    </>
  );
}
