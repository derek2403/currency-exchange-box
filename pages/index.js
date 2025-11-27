import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Info, ChevronDown } from "lucide-react";

import { CurrencySelect } from "@/components/CurrencySelect";






export default function TransferPage() {
  const [amount, setAmount] = useState("3,130.09");
  const [convertedAmount, setConvertedAmount] = useState("977.55");


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
        <div className="flex items-center justify-center w-full h-full p-4 pt-8">
          <div className="w-full max-w-md bg-white">
            <h1 className="text-3xl font-bold text-black mb-2">Transfer Calculator</h1>

            {/* Exchange Rate Display */}
            <div className="mb-4 text-black font-medium">
              1 {fromCurrency.code} = 0.3149 {toCurrency.code}
            </div>

            {/* Input Section */}
            <div className="relative space-y-4">
              {/* From Input */}
              <div className="space-y-2">
                <div className="glass rounded-2xl p-3 group focus-within:ring-2 focus-within:ring-[#F8BC06]/50 transition-all">
                  <label className="text-sm font-medium text-gray-600 mb-2 block">You send exactly</label>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        ref={fromTriggerRef}
                        onClick={() => setIsFromOpen(!isFromOpen)}
                        className="flex items-center gap-2 text-black text-xl font-bold hover:bg-black/5 px-2 py-1 rounded-lg transition-colors"
                      >
                        <div className="w-9 h-9 rounded-full overflow-hidden relative flex items-center justify-center bg-white border border-black/10">
                          <Image
                            src={`https://flagcdn.com/w40/${fromCurrency.country}.png`}
                            alt={fromCurrency.code}
                            fill
                            className="object-cover"
                          />
                        </div>
                        {fromCurrency.code}
                        <ChevronDown className="w-5 h-5 text-black/60" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="bg-transparent text-black text-3xl font-bold outline-none w-full placeholder:text-black/40 text-right"
                    />
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
              <div className="pl-6 border-l-2 border-gray-100 ml-8 space-y-2 py-1 relative">
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
                <div className="glass rounded-2xl p-3 group focus-within:ring-2 focus-within:ring-[#F8BC06]/50 transition-all">
                  <label className="text-sm font-medium text-gray-600 mb-2 block">Recipient gets</label>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        ref={toTriggerRef}
                        onClick={() => setIsToOpen(!isToOpen)}
                        className="flex items-center gap-2 text-black text-xl font-bold hover:bg-black/5 px-2 py-1 rounded-lg transition-colors"
                      >
                        <div className="w-9 h-9 rounded-full overflow-hidden relative flex items-center justify-center bg-white border border-black/10">
                          <Image
                            src={`https://flagcdn.com/w40/${toCurrency.country}.png`}
                            alt={toCurrency.code}
                            fill
                            className="object-cover"
                          />
                        </div>
                        {toCurrency.code}
                        <ChevronDown className="w-5 h-5 text-black/60" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={convertedAmount}
                      onChange={(e) => setConvertedAmount(e.target.value)}
                      className="bg-transparent text-black text-3xl font-bold outline-none w-full placeholder:text-black/40 text-right"
                    />
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
            <div className="mt-3 p-4 bg-gray-50 rounded-xl text-sm text-gray-600 flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold mt-0.5">!</div>
              <p>You could save up to <span className="font-bold text-black">119.45 MYR</span> vs banks</p>
            </div>

            {/* Send Button */}
            <Button className="w-full mt-3 bg-[#F8BC06] hover:bg-[#E5AD05] text-white font-bold h-10 rounded-xl text-md shadow-lg transition-colors duration-300">
              Send
            </Button>

          </div>
        </div>
      </div>
    </>
  );
}
