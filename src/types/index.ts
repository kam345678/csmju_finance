export type Transaction = {
    id: number;
    created_at: string;
    amount: number;
    type: 'income' | 'expense';
    description: string;
};
