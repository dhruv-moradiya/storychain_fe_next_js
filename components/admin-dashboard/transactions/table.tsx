'use client';

import * as React from 'react';

import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

import { DataTable } from '@/components/ui/data-table';

import { type Transaction, columns } from './columns';

const mockTransactionsData: Transaction[] = [
  {
    id: 'TXN-2024-001245',
    dateTime: 'May 16, 2024, 10:30 AM',
    user: {
      name: 'Arjun Mehta',
      email: 'arjun.mehta@exemple.com',
      avatarUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    type: 'Purchase',
    description: 'Starter Pack',
    coins: '+600',
    amount: '₹199.00',
    paymentMethod: 'UPI',
    status: 'Completed',
  },
  {
    id: 'TXN-2024-001244',
    dateTime: 'May 16, 2024, 09:15 AM',
    user: {
      name: 'Priya Sharma',
      email: 'priya.sharma@exemple.com',
      avatarUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    },
    type: 'Purchase',
    description: 'The Hidden Cargo - Ch. 8',
    coins: '-10',
    amount: '₹0.00',
    paymentMethod: 'Coins',
    status: 'Completed',
  },
  {
    id: 'TXN-2024-001243',
    dateTime: 'May 16, 2024, 08:20 AM',
    user: {
      name: 'Rahul Verma',
      email: 'rahul.verma@exemple.com',
      avatarUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    },
    type: 'Purchase',
    description: 'Mini Pack',
    coins: '+250',
    amount: '₹99.00',
    paymentMethod: 'Card',
    status: 'Completed',
  },
  {
    id: 'TXN-2024-001242',
    dateTime: 'May 15, 2024, 07:45 PM',
    user: {
      name: 'Sneha Iyer',
      email: 'sneha.iyer@exemple.com',
      avatarUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
    },
    type: 'Purchase',
    description: 'Pro Pack',
    coins: '+1,500',
    amount: '₹399.00',
    paymentMethod: 'UPI',
    status: 'Completed',
  },
  {
    id: 'TXN-2024-001241',
    dateTime: 'May 15, 2024, 06:10 PM',
    user: {
      name: 'Vikram Singh',
      email: 'vikram.singh@exemple.com',
      avatarUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    },
    type: 'Spend',
    description: 'Whispers at Docks - Ch. 3',
    coins: '-10',
    amount: '₹0.00',
    paymentMethod: 'Coins',
    status: 'Completed',
  },
  {
    id: 'TXN-2024-001240',
    dateTime: 'May 15, 2024, 05:30 PM',
    user: {
      name: 'Ananya Patel',
      email: 'ananya.patel@exemple.com',
      avatarUrl:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    },
    type: 'Purchase',
    description: 'Mega Pack',
    coins: '+3,000',
    amount: '₹699.00',
    paymentMethod: 'Card',
    status: 'Completed',
  },
  {
    id: 'TXN-2024-001239',
    dateTime: 'May 14, 2024, 04:15 PM',
    user: {
      name: 'Rohit Mehra',
      email: 'rohit.mehra@exemple.com',
      avatarUrl:
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    },
    type: 'Refund',
    description: 'Refund - Pro Pack',
    coins: '-1,500',
    amount: '₹399.00',
    paymentMethod: 'UPI',
    status: 'Refunded',
  },
  {
    id: 'TXN-2024-001238',
    dateTime: 'May 14, 2024, 03:05 PM',
    user: {
      name: 'Kavya Nair',
      email: 'kavya.nair@exemple.com',
      avatarUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    type: 'Withdraw',
    description: 'Withdrawal to Bank',
    coins: '-2,000',
    amount: '₹1,200.00',
    paymentMethod: 'Bank Transfer',
    status: 'Completed',
  },
  {
    id: 'TXN-2024-001237',
    dateTime: 'May 14, 2024, 02:20 PM',
    user: {
      name: 'Aditya Soni',
      email: 'aditya.soni@exemple.com',
      avatarUrl:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    },
    type: 'Purchase',
    description: 'Reader Pack',
    coins: '+800',
    amount: '₹249.00',
    paymentMethod: 'UPI',
    status: 'Completed',
  },
  {
    id: 'TXN-2024-001236',
    dateTime: 'May 13, 2024, 11:45 AM',
    user: {
      name: 'Meera Joshi',
      email: 'meera.joshi@exemple.com',
      avatarUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    },
    type: 'Spend',
    description: 'The Crown of Eldoria - Ch. 5',
    coins: '-10',
    amount: '₹0.00',
    paymentMethod: 'Coins',
    status: 'Completed',
  },
];

const fetchMockTransactions = async (): Promise<Transaction[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockTransactionsData;
};

export const TransactionTable = () => {
  const { data: transactions, isLoading } = useQuery<Transaction[]>({
    queryKey: ['admin-dashboard-transactions'],
    queryFn: fetchMockTransactions,
  });

  if (isLoading) {
    return (
      <div className="text-text-secondary-65 flex h-48 w-full items-center justify-center gap-2 text-sm">
        <Loader2 className="text-primary h-5 w-5 animate-spin" />
        <span>Loading transactions...</span>
      </div>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={transactions || []}
      pageSize={10}
      className="bg-transparent"
    />
  );
};
