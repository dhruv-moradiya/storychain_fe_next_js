'use client';

import * as React from 'react';

import { useQuery } from '@tanstack/react-query';
import { Row } from '@tanstack/react-table';
import { ArrowDownUp, Loader2, Receipt } from 'lucide-react';

import { DataTable } from '@/components/ui/data-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

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

  const renderTransactionHistory = ({ row }: { row: Row<UserStats> }) => {
    const user = row.original;

    if (!user.transactions || user.transactions.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center gap-2 p-8 text-center">
          <div className="bg-muted/40 flex h-9 w-9 items-center justify-center rounded-full">
            <Receipt className="text-text-secondary-50 h-4 w-4" />
          </div>
          <p className="text-text-secondary-50 text-xs">No transactions recorded for this user.</p>
        </div>
      );
    }

    return (
      <div className="border-border/30 bg-muted/5 w-full border-b">
        {/* Inner panel header */}
        <div className="border-border/20 flex items-center gap-2.5 border-b px-6 py-3">
          <div className="bg-primary/10 flex h-6 w-6 items-center justify-center rounded-md">
            <ArrowDownUp className="text-primary h-3 w-3" />
          </div>
          <h3 className="text-text-primary text-xs font-semibold tracking-tight">
            Transaction History
          </h3>
          <span className="bg-muted/50 text-text-secondary-65 ml-1 rounded-full px-2 py-0.5 text-[10px] font-semibold">
            {user.transactions.length}
          </span>
        </div>

        {/* Inner scrollable table */}
        <div className="overflow-x-auto px-6 py-4">
          <div className="border-border/30 overflow-hidden rounded-xl border shadow-xs">
            <Table className="w-full border-collapse text-left text-xs">
              <TableHeader className="bg-muted/20">
                <TableRow className="border-border/20 border-b hover:bg-transparent">
                  <TableHead className="text-text-secondary-50 h-9 px-3 text-[10px] font-semibold tracking-widest uppercase">
                    Date &amp; Time
                  </TableHead>
                  <TableHead className="text-text-secondary-50 h-9 px-3 text-[10px] font-semibold tracking-widest uppercase">
                    Transaction ID
                  </TableHead>
                  <TableHead className="text-text-secondary-50 h-9 px-3 text-[10px] font-semibold tracking-widest uppercase">
                    Type
                  </TableHead>
                  <TableHead className="text-text-secondary-50 h-9 px-3 text-[10px] font-semibold tracking-widest uppercase">
                    Description
                  </TableHead>
                  <TableHead className="text-text-secondary-50 h-9 px-3 text-right text-[10px] font-semibold tracking-widest uppercase">
                    Coins
                  </TableHead>
                  <TableHead className="text-text-secondary-50 h-9 px-3 text-right text-[10px] font-semibold tracking-widest uppercase">
                    Amount
                  </TableHead>
                  <TableHead className="text-text-secondary-50 h-9 px-3 text-[10px] font-semibold tracking-widest uppercase">
                    Payment
                  </TableHead>
                  <TableHead className="text-text-secondary-50 h-9 px-3 text-[10px] font-semibold tracking-widest uppercase">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {user.transactions.map((txn, idx) => {
                  const isPurchase = txn.type === 'Purchase';
                  return (
                    <TableRow
                      key={idx}
                      className="border-border/20 hover:bg-muted/10 border-b transition-colors duration-100 last:border-0"
                    >
                      <TableCell className="text-text-secondary-65 px-3 py-2.5 font-normal whitespace-nowrap">
                        {txn.dateTime}
                      </TableCell>
                      <TableCell className="text-text-secondary-65 px-3 py-2.5 font-mono text-[11px]">
                        {txn.transactionId}
                      </TableCell>
                      <TableCell className="px-3 py-2.5">
                        <span
                          className={cn(
                            'rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase',
                            isPurchase
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                              : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                          )}
                        >
                          {txn.type}
                        </span>
                      </TableCell>
                      <TableCell className="text-text-primary px-3 py-2.5 font-medium">
                        {txn.description}
                      </TableCell>
                      <TableCell
                        className={cn(
                          'px-3 py-2.5 text-right font-mono font-bold',
                          isPurchase ? 'text-emerald-500' : 'text-rose-500'
                        )}
                      >
                        {txn.coins}
                      </TableCell>
                      <TableCell className="text-text-primary px-3 py-2.5 text-right font-semibold">
                        {txn.amount}
                      </TableCell>
                      <TableCell className="text-text-secondary-65 px-3 py-2.5">
                        {txn.paymentMethod}
                      </TableCell>
                      <TableCell className="px-3 py-2.5">
                        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-emerald-600 uppercase dark:text-emerald-400">
                          {txn.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    );
  };

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
      <DataTable
        columns={columns}
        data={users || []}
        pageSize={10}
        renderSubComponent={renderTransactionHistory}
        className="bg-transparent"
      />
    </div>
  );
};
