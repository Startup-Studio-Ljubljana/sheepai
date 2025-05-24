
import React, { useMemo } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronRight, TrendingUp, TrendingDown } from "lucide-react";
import SpendingChart from '../analytics/SpendingChart';
import { isAfter, subDays } from 'date-fns';
import { parseISO } from 'date-fns';
import data from "../../../bank_account_data.json";

const topGainers = [
    { symbol: "DOUG", percentage: 32.71, logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop&crop=center" },
    { symbol: "MRUS", percentage: 32.00, logo: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=100&h=100&fit=crop&crop=center" },
    { symbol: "NNE", percentage: 29.85, logo: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=100&h=100&fit=crop&crop=center" },
    { symbol: "UEC", percentage: 25.97, logo: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100&h=100&fit=crop&crop=center" },
];

const mostTraded = [
    { symbol: "IS3K", price: "77,89 €", percentage: -0.49, buys: 90, sells: 10, logo: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=100&h=100&fit=crop&crop=center" },
    { symbol: "IS3Q", price: "61,48 €", percentage: -1.47, buys: 90, sells: 10, logo: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100&h=100&fit=crop&crop=center" },
];

const popularStocks = [
    { symbol: "DBXJ", percentage: -0.84, logo: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=100&h=100&fit=crop&crop=center" },
    { symbol: "VUAA", percentage: null, logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop&crop=center" },
    { symbol: "IS3C", percentage: 0.20, logo: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=100&h=100&fit=crop&crop=center" },
    { symbol: "IUSU", percentage: null, logo: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=100&h=100&fit=crop&crop=center" },
];

const cardStyle = "bg-white/5 border border-white/10 backdrop-blur-md shadow-md transition-all duration-200 gap-4 pt-3 pb-4";

const InvestmentPage = () => {
    const last30DaysData = useMemo(() => {
        const today = new Date();
        const cutoff = subDays(today, 30);
        const dailyTotals: Record<number, number> = {};

        data.transactions.forEach(tx => {
            const date = parseISO(tx.date);
            if (tx.amount < 0 && isAfter(date, cutoff)) {
                const day = date.getDate();
                dailyTotals[day] = (dailyTotals[day] || 0) + Math.abs(tx.amount);
            }
        });

        return Object.entries(dailyTotals).map(([day, amount]) => ({
            day: Number(day),
            amount: Number(amount.toFixed(2))
        }));
    }, []);

    return (
        <div className="min-h-screen text-white p-4 space-y-6">

<SpendingChart data={last30DaysData} title="Balance"/>

            <Card className={cardStyle}>
                <CardHeader className="flex flex-row items-center pl-4 pr-3">
                    <CardTitle className="font-medium text-gray-300">Our Recommended Funds</CardTitle>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                </CardHeader>
                <CardContent className='px-4'>
                    <div className="grid grid-cols-4 gap-x-2">
                        {[
                            {
                                symbol: "EGF",
                                logo: "https://images.unsplash.com/photo-1581092919555-3c7b9f09fca2?w=100&h=100&fit=crop&crop=center",
                                percentage: 1.62,
                            },
                            {
                                symbol: "GTF",
                                logo: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop&crop=center",
                                percentage: -0.45,
                            },
                            {
                                symbol: "DYF",
                                logo: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=100&h=100&fit=crop&crop=center",
                                percentage: 0.88,
                            },
                            {
                                symbol: "EMF",
                                logo: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=100&h=100&fit=crop&crop=center",
                                percentage: -1.02,
                            },
                        ].map((fund) => (
                            <div
                                key={fund.symbol}
                                className="flex flex-col items-center p-2 rounded-lg text-sm"
                            >
                                <div className="w-10 h-10 rounded-full overflow-hidden mb-1 border border-gray-600">
                                    <img src={fund.logo} alt={fund.symbol} className="w-full h-full object-cover" />
                                </div>
                                <div className="text-xs font-medium text-gray-200">{fund.symbol}</div>
                                <div
                                    className={`text-xs flex items-center ${
                                        fund.percentage > 0 ? 'text-green-400' : 'text-red-400'
                                    }`}
                                >
                                    {fund.percentage > 0 ? (
                                        <TrendingUp className="w-3 h-3 mr-1" />
                                    ) : (
                                        <TrendingDown className="w-3 h-3 mr-1" />
                                    )}
                                    {Math.abs(fund.percentage).toFixed(2)}%
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className={cardStyle}>
                <CardHeader className="flex flex-row items-center pl-4 pr-3">
                    <CardTitle className="font-medium text-gray-300">Today's top movers</CardTitle>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                </CardHeader>
                <CardContent className='px-4'>
                    <Tabs defaultValue="gainers" className="w-full">
                        <TabsContent value="gainers">
                            <div className="grid grid-cols-4 gap-x-2">
                                {topGainers.map((stock) => (
                                    <div key={stock.symbol} className="flex flex-col items-center p-2 text-sm">
                                        <div className="w-10 h-10 rounded-full overflow-hidden mb-1 border border-gray-600">
                                            <img
                                                src={stock.logo}
                                                alt={stock.symbol}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="text-xs font-medium text-gray-200">{stock.symbol}</div>
                                        <div className="text-xs text-green-400 flex items-center">
                                            <TrendingUp className="w-3 h-3 mr-1" />
                                            {stock.percentage}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            <Card className={cardStyle}>
                <CardHeader className="flex flex-row items-center pb-2 pl-4 pr-3">
                    <CardTitle className="font-medium text-gray-300">Most traded this week</CardTitle>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                </CardHeader>
                <CardContent className="space-y-1 -mt-2 px-4">
                    {mostTraded.map((stock) => (
                        <div key={stock.symbol} className="flex items-center justify-between p-2 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-600">
                                    <img
                                        src={stock.logo}
                                        alt={stock.symbol}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="font-medium text-gray-100">{stock.symbol}</div>
                                    <div className="text-xs text-gray-400">
                                        {stock.buys}% Buys • {stock.sells}% Sells
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-medium text-gray-100">{stock.price}</div>
                                <div className="text-sm text-red-400 flex items-center justify-end">
                                    <TrendingDown className="w-3 h-3 mr-1" />
                                    {Math.abs(stock.percentage)}%
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card className={cardStyle}>
                <CardHeader className="flex flex-row items-center pl-4 pr-3">
                    <CardTitle className="font-medium text-gray-300">Popular first time buys</CardTitle>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                </CardHeader>
                <CardContent className="-mt-2 px-4">
                    <Tabs defaultValue="stocks" className="w-full">
                        <TabsContent value="stocks">
                            <div className="grid grid-cols-4 gap-x-2">
                                {popularStocks.map((stock) => (
                                    <div key={stock.symbol} className="flex flex-col items-center p-2 rounded-lg text-sm">
                                        <div className="w-10 h-10 rounded-full overflow-hidden mb-1 border border-gray-600">
                                            <img
                                                src={stock.logo}
                                                alt={stock.symbol}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="text-xs font-medium text-gray-200">{stock.symbol}</div>
                                        {stock.percentage !== null && (
                                            <div className={`text-xs flex items-center ${stock.percentage > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                {stock.percentage > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                                                {Math.abs(stock.percentage)}%
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
};

export default InvestmentPage;
