import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const currencies = [
    { code: 'EUR', name: 'Euro', country: 'eu' },
    { code: 'GBP', name: 'British Pound', country: 'gb' },
    { code: 'USD', name: 'US Dollar', country: 'us' },
    { code: 'INR', name: 'Indian Rupee', country: 'in' },
    { code: 'CAD', name: 'Canadian Dollar', country: 'ca' },
    { code: 'AUD', name: 'Australian Dollar', country: 'au' },
    { code: 'CHF', name: 'Swiss Franc', country: 'ch' },
    { code: 'MXN', name: 'Mexican Peso', country: 'mx' },
    { code: 'MYR', name: 'Malaysian Ringgit', country: 'my' },
    { code: 'SGD', name: 'Singapore Dollar', country: 'sg' },
    { code: 'CNY', name: 'Chinese Yuan', country: 'cn' },
    { code: 'JPY', name: 'Japanese Yen', country: 'jp' },
    { code: 'KRW', name: 'South Korean Won', country: 'kr' },
    { code: 'THB', name: 'Thai Baht', country: 'th' },
    { code: 'IDR', name: 'Indonesian Rupiah', country: 'id' },
];

export function CurrencySelect({ isOpen, onClose, onSelect, selectedCurrency, triggerRef }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [position, setPosition] = useState({ bottom: 0, left: 0, width: 300 });
    const dropdownRef = useRef(null);

    // Filter currencies based on search
    const filteredCurrencies = currencies.filter(c =>
        c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate position based on trigger element
    useEffect(() => {
        if (isOpen && triggerRef?.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            // Position above the trigger, aligned right
            setPosition({
                bottom: window.innerHeight - rect.top + 8,
                left: rect.left,
                width: 300
            });
        }
    }, [isOpen, triggerRef]);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                triggerRef.current && !triggerRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose, triggerRef]);

    // Reset search when closed
    useEffect(() => {
        if (!isOpen) setSearchQuery('');
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="fixed z-50 dropdown-box bg-white overflow-hidden flex flex-col"
                    style={{
                        bottom: position.bottom,
                        left: position.left,
                        width: position.width,
                        maxHeight: '400px'
                    }}
                    ref={dropdownRef}
                >
                    {/* Search Bar */}
                    <div className="p-3 border-b border-white/10 sticky top-0 bg-transparent z-10">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-white/20 border-2 border-transparent rounded-lg text-sm focus:outline-none focus:border-black/20 transition-colors text-black placeholder:text-black/40"
                                autoFocus
                            />
                        </div>
                    </div>

                    {/* Currency List */}
                    <div className="overflow-y-auto flex-1 py-1 custom-scrollbar">
                        {filteredCurrencies.length > 0 ? (
                            filteredCurrencies.map((currency) => (
                                <button
                                    key={currency.code}
                                    onClick={() => {
                                        onSelect(currency);
                                        onClose();
                                    }}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-4 py-3 hover:bg-black/5 transition-colors text-left",
                                        selectedCurrency === currency.code && "bg-black/10"
                                    )}
                                >
                                    <div className="w-6 h-6 rounded-full overflow-hidden relative flex-shrink-0 border border-gray-100">
                                        <Image
                                            src={`https://flagcdn.com/w40/${currency.country}.png`}
                                            alt={currency.country}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-gray-900">{currency.code}</span>
                                        <span className="text-xs text-gray-500">{currency.name}</span>
                                    </div>
                                    {selectedCurrency === currency.code && (
                                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-600" />
                                    )}
                                </button>
                            ))
                        ) : (
                            <div className="p-4 text-center text-sm text-gray-500">
                                No currencies found
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
