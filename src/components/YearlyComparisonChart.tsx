'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Transaction } from '@/types';

interface YearlyComparisonChartProps {
    transactions: Transaction[];
    selectedYear: number | null;
    setSelectedYear: (year: number) => void;
    yearOptions: number[];
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
};

export default function YearlyComparisonChart({ transactions, selectedYear, setSelectedYear, yearOptions }: YearlyComparisonChartProps) {
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    const yearlyData = useMemo(() => {
        const labels = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
        const income = Array(12).fill(0);
        const expense = Array(12).fill(0);
        if (!selectedYear || transactions.length === 0) return { labels, income, expense };
        
        transactions
            .filter(t => new Date(t.created_at).getFullYear() === selectedYear)
            .forEach(t => {
                const monthIndex = new Date(t.created_at).getMonth();
                if (t.type === 'income') {
                    income[monthIndex] += t.amount;
                } else {
                    expense[monthIndex] += t.amount;
                }
            });
        return { labels, income, expense };
    }, [transactions, selectedYear]);

    const totalYearlyIncome = yearlyData.income.reduce((sum, current) => sum + current, 0);
    const totalYearlyExpense = yearlyData.expense.reduce((sum, current) => sum + current, 0);
    const netBalance = totalYearlyIncome - totalYearlyExpense;

    useEffect(() => {
        let chartInstance: Chart | null = null;
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                chartInstance = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: yearlyData.labels,
                        datasets: [
                            { label: 'รายรับ', data: yearlyData.income, backgroundColor: '#3b82f6', borderRadius: 6 },
                            { label: 'รายจ่าย', data: yearlyData.expense, backgroundColor: '#a78bfa', borderRadius: 6 }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { position: 'top', align: 'end' } }
                    }
                });
            }
        }
        return () => {
            if (chartInstance) chartInstance.destroy();
        };
    }, [yearlyData]);

    return (
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-700">เปรียบเทียบรายรับ-รายจ่ายประจำปี</h2>
                <select value={selectedYear || ''} onChange={(e) => setSelectedYear(Number(e.target.value))} className="border border-gray-300 rounded-md p-1 text-sm text-gray-600">
                    {yearOptions.map(year => (
                        <option key={year} value={year}>{year + 543}</option>
                    ))}
                </select>
            </div>
            <div className="my-4 grid grid-cols-3 gap-4 text-center">
                <div>
                    <p className="text-sm text-gray-500">รายรับรวม</p>
                    <p className="text-xl md:text-2xl font-bold text-green-600">{formatCurrency(totalYearlyIncome)}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">รายจ่ายรวม</p>
                    <p className="text-xl md:text-2xl font-bold text-red-600">{formatCurrency(totalYearlyExpense)}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">คงเหลือ</p>
                    <p className={`text-xl md:text-2xl font-bold ${netBalance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                        {formatCurrency(netBalance)}
                    </p>
                </div>
            </div>
            <div className="flex-grow h-80 border-t pt-4">
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
}
