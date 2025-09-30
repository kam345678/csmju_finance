'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

// ฟังก์ชันสำหรับจำลองข้อมูลรายเดือน 2 ปี
const generateTwoYearsOfData = () => {
    const labels: string[] = [];
    const income: number[] = [];
    const expense: number[] = [];
    const endDate = new Date();

    for (let i = 23; i >= 0; i--) {
        const date = new Date(endDate);
        date.setMonth(date.getMonth() - i);
        
        const label = date.toLocaleDateString('th-TH', { month: 'short', year: '2-digit' });
        labels.push(label);

        const baseIncome = 30000;
        const incomeFluctuation = (Math.random() - 0.5) * 10000;
        const incomeTrend = (24 - i) * 200;
        income.push(Math.round(baseIncome + incomeFluctuation + incomeTrend));

        const baseExpense = 22000;
        const expenseFluctuation = (Math.random() - 0.5) * 8000;
        const isBonusMonth = date.getMonth() === 11 || date.getMonth() === 3;
        const seasonalSpike = isBonusMonth ? 7000 : 0;
        expense.push(Math.round(baseExpense + expenseFluctuation + seasonalSpike));
    }

    return { labels, income, expense };
};


export default function GraphPage() {
    const dailyChartRef = useRef<HTMLCanvasElement | null>(null);
    const monthlyChartRef = useRef<HTMLCanvasElement | null>(null);
    
    const [fullMonthlyData, setFullMonthlyData] = useState<{ labels: string[], income: number[], expense: number[] } | null>(null);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const data = generateTwoYearsOfData();
        setFullMonthlyData(data);
    }, []);

    const itemsPerPage = 6;
    const totalPages = fullMonthlyData ? Math.ceil(fullMonthlyData.labels.length / itemsPerPage) : 0;

    const paginatedMonthlyData = useMemo(() => {
        if (!fullMonthlyData) return null;

        const startIndex = fullMonthlyData.labels.length - (currentPage + 1) * itemsPerPage;
        const endIndex = fullMonthlyData.labels.length - currentPage * itemsPerPage;
        const safeStartIndex = Math.max(0, startIndex);
        return {
            labels: fullMonthlyData.labels.slice(safeStartIndex, endIndex),
            income: fullMonthlyData.income.slice(safeStartIndex, endIndex),
            expense: fullMonthlyData.expense.slice(safeStartIndex, endIndex),
        };
    }, [currentPage, fullMonthlyData]);

    // ย้าย useEffect มาไว้ก่อนเงื่อนไขการ return
    useEffect(() => {
        let dailyChartInstance: Chart | null = null;
        let monthlyChartInstance: Chart | null = null;
        
        if (dailyChartRef.current) { 
            const dailyCtx = dailyChartRef.current.getContext('2d'); 
            if (dailyCtx) { 
                dailyChartInstance = new Chart(dailyCtx, { type: 'line', data: { labels: dailyExpensesData.labels, datasets: [{ label: 'รายจ่าย (บาท)', data: dailyExpensesData.expenses, borderColor: '#4f46e5', backgroundColor: 'rgba(79, 70, 229, 0.1)', fill: true, tension: 0.4 }] }, options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } }, plugins: { legend: { display: false } } } }); 
            } 
        }
        
        if (monthlyChartRef.current && paginatedMonthlyData) {
            const monthlyCtx = monthlyChartRef.current.getContext('2d');
            if (monthlyCtx) {
                monthlyChartInstance = new Chart(monthlyCtx, {
                    type: 'bar',
                    data: {
                        labels: paginatedMonthlyData.labels,
                        datasets: [
                            { label: 'รายรับ', data: paginatedMonthlyData.income, backgroundColor: '#3b82f6', borderRadius: 6 },
                            { label: 'รายจ่าย', data: paginatedMonthlyData.expense, backgroundColor: '#a78bfa', borderRadius: 6 }
                        ]
                    },
                    options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } }, plugins: { legend: { position: 'top', align: 'end' } } }
                });
            }
        }
        return () => {
            if (dailyChartInstance) dailyChartInstance.destroy();
            if (monthlyChartInstance) monthlyChartInstance.destroy();
        };
    }, [paginatedMonthlyData]);

    if (!fullMonthlyData || !paginatedMonthlyData) {
        return <div className="flex items-center justify-center h-screen font-sans text-gray-500">Loading charts...</div>;
    }
    
    const dailyExpensesData = {
        labels: Array.from({ length: 30 }, (_, i) => i + 1),
        expenses: [300, 450, 200, 500, 800, 150, 600, 320, 410, 250, 780, 50, 900, 120, 450, 680, 230, 890, 400, 100, 300, 500, 620, 150, 200, 750, 480, 320, 560, 210]
    };

    const totalMonthlyExpense = dailyExpensesData.expenses.reduce((s, c) => s + c, 0);
    const lastMonthExpense = 12550;
    const expenseChangePercentage = ((totalMonthlyExpense - lastMonthExpense) / lastMonthExpense) * 100;
    const isExpenseIncrease = expenseChangePercentage >= 0;

    const totalIncome = paginatedMonthlyData.income.reduce((s, c) => s + c, 0);
    const totalExpense = paginatedMonthlyData.expense.reduce((s, c) => s + c, 0);
    const netBalance = totalIncome - totalExpense;
    
    const formatCurrency = (amount: number) => new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">ภาพรวมการเงิน</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* === กราฟที่ 1: รายจ่ายประจำเดือน === */}
                <div className="bg-white p-6 rounded-xl shadow-md flex flex-col">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-700">รายจ่ายประจำเดือน</h2>
                        <select className="border border-gray-300 rounded-md p-1 text-sm text-gray-600">
                            <option>กันยายน 2568</option>
                        </select>
                    </div>
                    <div className="my-4">
                        <p className="text-3xl md:text-4xl font-bold text-gray-800">{formatCurrency(totalMonthlyExpense)}</p>
                        <div className={`flex items-center mt-1 text-sm font-semibold ${isExpenseIncrease ? 'text-red-500' : 'text-green-500'}`}>
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">{isExpenseIncrease ? (<path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />) : (<path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />)}</svg>
                            <span>{expenseChangePercentage.toFixed(1)}% vs last month</span>
                        </div>
                    </div>
                    <div className="flex-grow h-64 border-t pt-4"><canvas ref={dailyChartRef}></canvas></div>
                </div>

                {/* === กราฟที่ 2: สรุปรายเดือน (แบ่งหน้า) === */}
                <div className="bg-white p-6 rounded-xl shadow-md flex flex-col">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-700">สรุปรายเดือน</h2>
                        <div className="flex items-center space-x-2">
                            <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage >= totalPages - 1} className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300">ย้อนกลับ</button>
                            <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage <= 0} className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300">ถัดไป</button>
                        </div>
                    </div>
                    <div className="my-4 grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-sm text-gray-500">รายรับรวม</p>
                            <p className="text-xl md:text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">รายจ่ายรวม</p>
                            <p className="text-xl md:text-2xl font-bold text-red-600">{formatCurrency(totalExpense)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">คงเหลือ</p>
                            <p className={`text-xl md:text-2xl font-bold ${netBalance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>{formatCurrency(netBalance)}</p>
                        </div>
                    </div>
                    <div className="flex-grow h-64 border-t pt-4"><canvas ref={monthlyChartRef}></canvas></div>
                </div>
            </div>
        </div>
    );
}