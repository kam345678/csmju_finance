'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Transaction } from '@/types';
import DailyExpenseChart from '@/components/DailyExpenseChart';
import YearlyComparisonChart from '@/components/YearlyComparisonChart';

export default function GraphPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<number | null>(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('transactions')
                .select('*')
                .order('created_at', { ascending: true });

            if (error) {
                console.error('Error fetching transactions:', error.message);
            } else {
                setTransactions(data || []);
            }
            setLoading(false);
        };
        fetchTransactions();
    }, []);

    const monthOptions = useMemo(() => {
        if (transactions.length === 0) return [];
        const monthSet = new Set<string>();
        transactions.forEach(t => {
            const date = new Date(t.created_at);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            monthSet.add(`${year}-${month}`);
        });
        return Array.from(monthSet).sort((a, b) => b.localeCompare(a));
    }, [transactions]);
    
    const yearOptions = useMemo(() => {
        if (transactions.length === 0) return [];
        const yearSet = new Set<number>();
        transactions.forEach(t => {
            yearSet.add(new Date(t.created_at).getFullYear());
        });
        return Array.from(yearSet).sort((a, b) => b - a);
    }, [transactions]);

    useEffect(() => {
        if (monthOptions.length > 0 && !selectedMonth) {
            setSelectedMonth(monthOptions[0]);
        }
        if (yearOptions.length > 0 && !selectedYear) {
            setSelectedYear(yearOptions[0]);
        }
    }, [monthOptions, selectedMonth, yearOptions, selectedYear]);

    if (loading) {
        return <div className="flex items-center justify-center h-screen font-sans text-gray-500">Loading data from Supabase...</div>;
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">ภาพรวมการเงิน</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <DailyExpenseChart 
                    transactions={transactions}
                    selectedMonth={selectedMonth}
                    setSelectedMonth={setSelectedMonth}
                    monthOptions={monthOptions}
                />
                <YearlyComparisonChart 
                    transactions={transactions}
                    selectedYear={selectedYear}
                    setSelectedYear={setSelectedYear}
                    yearOptions={yearOptions}
                />
            </div>
        </div>
    );
}

