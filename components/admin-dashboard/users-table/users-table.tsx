'use client';

import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

import { DataTable } from '@/components/ui/data-table';

import { UserStats, columns } from './columns';

const mockUsersData: UserStats[] = [
  {
    id: '#USR-1001',
    name: 'Arjun Mehta',
    email: 'arjun.mehta@example.com',
    role: 'User',
    coinsBalance: '1,250',
    totalSpent: '₹1,250.00',
    joinedOn: 'May 16, 2024',
    status: 'Active',
    transactions: [
      {
        dateTime: 'May 16, 2024, 10:30 AM',
        transactionId: 'TXN-2001',
        type: 'Purchase',
        description: 'Purchased 600 Coins (Starter Pack)',
        coins: '+600',
        amount: '₹199.00',
        paymentMethod: 'UPI',
        status: 'Completed',
      },
      {
        dateTime: 'May 14, 2024, 08:15 PM',
        transactionId: 'TXN-1987',
        type: 'Purchase',
        description: 'Purchased 1,500 Coins (Pro Pack)',
        coins: '+1,500',
        amount: '₹399.00',
        paymentMethod: 'Razorpay',
        status: 'Completed',
      },
      {
        dateTime: 'May 13, 2024, 11:20 AM',
        transactionId: 'TXN-1950',
        type: 'Spend',
        description: 'Unlocked Chapter: The Hidden Cargo',
        coins: '-40',
        amount: '₹0.00',
        paymentMethod: '—',
        status: 'Completed',
      },
      {
        dateTime: 'May 12, 2024, 09:05 PM',
        transactionId: 'TXN-1932',
        type: 'Spend',
        description: 'Unlocked Chapter: Whispers at Docks',
        coins: '-30',
        amount: '₹0.00',
        paymentMethod: '—',
        status: 'Completed',
      },
      {
        dateTime: 'May 11, 2024, 04:45 PM',
        transactionId: 'TXN-1901',
        type: 'Purchase',
        description: 'Purchased 250 Coins (Mini Pack)',
        coins: '+250',
        amount: '₹99.00',
        paymentMethod: 'Google Pay',
        status: 'Completed',
      },
    ],
  },
  {
    id: '#USR-1002',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    role: 'User',
    coinsBalance: '850',
    totalSpent: '₹850.00',
    joinedOn: 'May 15, 2024',
    status: 'Active',
    transactions: [],
  },
  {
    id: '#USR-1003',
    name: 'Rahul Verma',
    email: 'rahul.verma@example.com',
    role: 'Author',
    coinsBalance: '2,300',
    totalSpent: '₹2,300.00',
    joinedOn: 'May 14, 2024',
    status: 'Active',
    transactions: [],
  },
  {
    id: '#USR-1004',
    name: 'Sneha Iyer',
    email: 'sneha.iyer@example.com',
    role: 'User',
    coinsBalance: '120',
    totalSpent: '₹120.00',
    joinedOn: 'May 13, 2024',
    status: 'Inactive',
    transactions: [],
  },
  {
    id: '#USR-1005',
    name: 'Vikram Singh',
    email: 'vikram.singh@example.com',
    role: 'Editor',
    coinsBalance: '1,050',
    totalSpent: '₹1,050.00',
    joinedOn: 'May 12, 2024',
    status: 'Active',
    transactions: [],
  },
];

const fetchMockUsers = async (): Promise<UserStats[]> => {
  // Simulate standard network delay (300ms) for realistic TanStack Query action
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockUsersData;
};

export const UsersTable = () => {
  const { data: users, isLoading } = useQuery<UserStats[]>({
    queryKey: ['admin-dashboard-users'],
    queryFn: fetchMockUsers,
  });

  if (isLoading) {
    return (
      <div className="text-text-secondary-65 flex h-48 w-full items-center justify-center gap-2 text-sm">
        <Loader2 className="text-primary h-5 w-5 animate-spin" />
        <span>Loading users...</span>
      </div>
    );
  }

  return (
    <div className="w-full p-6 pt-0">
      <DataTable columns={columns} data={users || []} pageSize={10} className="bg-transparent" />
    </div>
  );
};
