import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Info, ChevronDown } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { CurrencySelect } from "@/components/CurrencySelect";
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group-1';

// Aurora Background Component
const AuroraBackground = ({ children, className, showRadialGradient = true, ...props }) => {
    return (
        <div
            className={cn(
                "relative flex flex-col items-center justify-center bg-zinc-50 text-slate-950 dark:bg-zinc-900",
                className,
            )}
            {...props}
        >
            <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{
                    "--aurora": "repeating-linear-gradient(100deg,#475569_12%,#64748b_18%,#334155_24%,#1e293b_30%,#0f172a_36%)",
                    "--dark-gradient": "repeating-linear-gradient(100deg,#000_0%,#000_8%,transparent_12%,transparent_16%,#000_20%)",
                    "--white-gradient": "repeating-linear-gradient(100deg,#fff_0%,#fff_8%,transparent_12%,transparent_16%,#fff_20%)",
                    "--slate-600": "#475569",
                    "--slate-500": "#64748b",
                    "--slate-700": "#334155",
                    "--slate-800": "#1e293b",
                    "--slate-900": "#0f172a",
                    "--black": "#000",
                    "--white": "#fff",
                    "--transparent": "transparent",
                }}
            >
                <div
                    className={cn(
                        `after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--white-gradient),var(--aurora)] [background-size:250%,_180%] [background-position:50%_50%,50%_50%] opacity-40 blur-[12px] invert filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--slate-600)_12%,var(--slate-500)_18%,var(--slate-700)_24%,var(--slate-800)_30%,var(--slate-900)_36%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_8%,var(--transparent)_12%,var(--transparent)_16%,var(--black)_20%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_8%,var(--transparent)_12%,var(--transparent)_16%,var(--white)_20%)] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:180%,_120%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""] dark:[background-image:var(--dark-gradient),var(--aurora)] dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,
                        showRadialGradient && `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
                    )}
                ></div>
            </div>
            {children}
        </div>
    );
};

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
                <title>Transfer Calculator - DhalWay</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <AuroraBackground className="relative isolate grid h-dvh grid-rows-[auto,1fr] overflow-x-hidden overflow-y-auto lg:overflow-hidden bg-black">
                <div className="flex items-center justify-center w-full h-full p-4 pt-20">
                    <div className="w-full max-w-md bg-[#1c1c1e] rounded-3xl p-6 shadow-2xl border border-white/5">
                        <h1 className="text-2xl font-bold text-white mb-6">Transfer calculator</h1>

                        {/* Time Range Toggle */}
                        <div className="flex mb-6">
                            <ToggleGroup
                                type="single"
                                value={timeRange}
                                onValueChange={(newValue) => {
                                    if (newValue) setTimeRange(newValue);
                                }}
                                className="bg-[#2c2c2e] p-1 rounded-lg"
                            >
                                <ToggleGroupItem value="1D" className="data-[state=on]:bg-[#3a3a3c] data-[state=on]:text-white text-gray-400 hover:text-white transition-colors rounded-md px-3 py-1 text-xs">1D</ToggleGroupItem>
                                <ToggleGroupItem value="1W" className="data-[state=on]:bg-[#3a3a3c] data-[state=on]:text-white text-gray-400 hover:text-white transition-colors rounded-md px-3 py-1 text-xs">1W</ToggleGroupItem>
                                <ToggleGroupItem value="1M" className="data-[state=on]:bg-[#3a3a3c] data-[state=on]:text-white text-gray-400 hover:text-white transition-colors rounded-md px-3 py-1 text-xs">1M</ToggleGroupItem>
                                <ToggleGroupItem value="6M" className="data-[state=on]:bg-[#3a3a3c] data-[state=on]:text-white text-gray-400 hover:text-white transition-colors rounded-md px-3 py-1 text-xs">6M</ToggleGroupItem>
                                <ToggleGroupItem value="1Y" className="data-[state=on]:bg-[#3a3a3c] data-[state=on]:text-white text-gray-400 hover:text-white transition-colors rounded-md px-3 py-1 text-xs">1Y</ToggleGroupItem>
                            </ToggleGroup>
                        </div>

                        {/* Chart Section */}
                        <div className="mb-6">
                            <div className="h-32 w-full relative">
                                {isMounted && (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={data}>
                                            <Line
                                                type="monotone"
                                                dataKey="value"
                                                stroke="#86efac"
                                                strokeWidth={2}
                                                dot={false}
                                            />
                                            <YAxis domain={['dataMin', 'dataMax']} hide />
                                        </LineChart>
                                    </ResponsiveContainer>
                                )}
                                {/* Current Rate Indicator */}
                                <div className="absolute top-0 right-0 flex flex-col items-end">
                                    <div className="bg-[#2c2c2e] text-[#86efac] text-xs px-2 py-1 rounded-full mb-1">
                                        0.316
                                    </div>
                                    <div className="w-2 h-2 bg-[#86efac] rounded-full ring-4 ring-[#86efac]/20"></div>
                                </div>
                            </div>

                            <div className="flex justify-between text-xs text-gray-500 mt-2">
                                <span>Oct 24</span>
                                <span>Today</span>
                            </div>

                            <div className="mt-4 text-white font-medium">
                                1 {fromCurrency.code} = 0.3149 {toCurrency.code}
                            </div>
                        </div>

                        {/* Input Section */}
                        <div className="relative space-y-2">
                            {/* From Input */}
                            <div className="bg-[#2c2c2e] rounded-2xl p-4 flex items-center justify-between group focus-within:ring-1 focus-within:ring-white/20 transition-all">
                                <input
                                    type="text"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="bg-transparent text-white text-2xl font-semibold outline-none w-full"
                                />
                                <button
                                    ref={fromTriggerRef}
                                    onClick={() => setIsFromOpen(!isFromOpen)}
                                    className="flex items-center gap-2 text-white font-medium hover:bg-white/5 px-2 py-1 rounded-lg transition-colors"
                                >
                                    <div className="w-6 h-6 rounded-full overflow-hidden relative flex items-center justify-center bg-white">
                                        <Image
                                            src={`https://flagcdn.com/w40/${fromCurrency.country}.png`}
                                            alt={fromCurrency.code}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    {fromCurrency.code}
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
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
                                <button className="bg-[#2c2c2e] border-4 border-[#1c1c1e] rounded-full p-2 hover:bg-[#3a3a3c] transition-colors">
                                    <ArrowUpDown className="w-4 h-4 text-gray-400" />
                                </button>
                            </div>

                            {/* To Input */}
                            <div className="bg-[#2c2c2e] rounded-2xl p-4 flex items-center justify-between group focus-within:ring-1 focus-within:ring-white/20 transition-all">
                                <input
                                    type="text"
                                    value={convertedAmount}
                                    onChange={(e) => setConvertedAmount(e.target.value)}
                                    className="bg-transparent text-white text-2xl font-semibold outline-none w-full"
                                />
                                <button
                                    ref={toTriggerRef}
                                    onClick={() => setIsToOpen(!isToOpen)}
                                    className="flex items-center gap-2 text-white font-medium hover:bg-white/5 px-2 py-1 rounded-lg transition-colors"
                                >
                                    <div className="w-6 h-6 rounded-full overflow-hidden relative flex items-center justify-center bg-white">
                                        <Image
                                            src={`https://flagcdn.com/w40/${toCurrency.country}.png`}
                                            alt={toCurrency.code}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    {toCurrency.code}
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
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
                                <div className="flex items-center gap-1 text-gray-400 text-xs">
                                    Includes fees <Info className="w-3 h-3" />
                                </div>
                                <div className="text-white text-sm">26.08 {fromCurrency.code}</div>
                            </div>
                            <div className="w-px h-8 bg-white/10"></div>
                            <div className="flex flex-col gap-1 text-right">
                                <div className="text-gray-400 text-xs">Should arrive</div>
                                <div className="text-white text-sm">In seconds</div>
                            </div>
                        </div>

                        {/* Send Button */}
                        <Button className="w-full mt-6 bg-[#a3e635] hover:bg-[#8cd32a] text-black font-semibold h-12 rounded-2xl text-base">
                            Send
                        </Button>

                    </div>
                </div>
            </AuroraBackground>
        </>
    );
}
