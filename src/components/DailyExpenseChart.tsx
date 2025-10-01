'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Transaction } from '@/types';

// Define the props this component will receive
interface DailyExpenseChartProps {
    transactions: Transaction[];
    selectedMonth: string;
    setSelectedMonth: (month: string) => void;
    monthOptions: string[];
}

// Helper function to format numbers into Thai Baht currency
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
};

export default function DailyExpenseChart({ transactions, selectedMonth, setSelectedMonth, monthOptions }: DailyExpenseChartProps) {
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    // Memoized calculation for daily expense data
    const dailyData = useMemo(() => {
        if (!selectedMonth || transactions.length === 0) return { labels: [], expense: [] };
        const [year, month] = selectedMonth.split('-').map(Number);
        const selectedMonthIndex = month - 1;
        const currentMonthExpenses = transactions.filter(t => {
            const tDate = new Date(t.created_at);
            return t.type === 'expense' && tDate.getMonth() === selectedMonthIndex && tDate.getFullYear() === year;
        });
        const daysInMonth = new Date(year, month, 0).getDate();
        const labels = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);
        const expenseData = Array(daysInMonth).fill(0);
        currentMonthExpenses.forEach(t => {
            const day = new Date(t.created_at).getDate();
            expenseData[day - 1] += t.amount;
        });
        return { labels, expense: expenseData };
    }, [transactions, selectedMonth]);

    const totalMonthlyExpense = dailyData.expense.reduce((sum, current) => sum + current, 0);

    // Effect to draw the chart
    useEffect(() => {
        let chartInstance: Chart | null = null;
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                chartInstance = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: dailyData.labels,
                        datasets: [{
                            label: 'รายจ่าย (บาท)',
                            data: dailyData.expense,
                            borderColor: '#ef4444',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            fill: true,
                            tension: 0.4
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false } }
                    }
                });
            }
        }
        return () => {
            if (chartInstance) chartInstance.destroy();
        };
    }, [dailyData]);

    return (
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-700">สรุปรายจ่ายรายวัน</h2>
                <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="border border-gray-300 rounded-md p-1 text-sm text-gray-600">
                    {monthOptions.map(monthValue => {
                        const date = new Date(monthValue + '-02');
                        const displayText = date.toLocaleDateString('th-TH', { month: 'long', year: 'numeric' });
                        return <option key={monthValue} value={monthValue}>{displayText}</option>
                    })}
                </select>
            </div>
            <div className="my-4">
                <p className="text-sm text-gray-500">ยอดรวมรายจ่ายเดือนนี้</p>
                <p className="text-3xl md:text-4xl font-bold text-red-600">{formatCurrency(totalMonthlyExpense)}</p>
            </div>
            <div className="flex-grow h-80 border-t pt-4">
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
}
