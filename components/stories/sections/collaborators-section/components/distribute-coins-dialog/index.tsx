import { ChangeEvent, useState } from 'react';

import type { ICollaboratorRecord } from '@/type/story/story-response.type';
import { Coins, Shield } from 'lucide-react';

import { createBadge } from '@/components/common/badge';
import { ROLE_DISPLAY } from '@/components/common/badge/colors';
import { TipBanner } from '@/components/common/tip-banner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from '@/components/ui/responsive-dialog';
import { cn } from '@/lib/utils';

interface DistributeCoinsDialogProps {
  collaborators: ICollaboratorRecord[];
}

const TOTAL_AVAILABLE = 2450;

export default function DistributeCoinsDialog({ collaborators }: DistributeCoinsDialogProps) {
  const [coinDistribution, setCoinDistribution] = useState<Record<string, number>>({});

  const totalDistributed = Object.values(coinDistribution).reduce(
    (sum, val) => sum + (val || 0),
    0
  );

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
    collaborator: ICollaboratorRecord
  ) => {
    const valStr = e.target.value;
    let val = parseInt(valStr, 10);
    if (isNaN(val)) val = 0;

    setCoinDistribution((prev) => {
      const currentDistributed = Object.entries(prev).reduce(
        (sum, [key, v]) => sum + (key === collaborator.user.clerkId ? 0 : v || 0),
        0
      );

      if (currentDistributed + val > TOTAL_AVAILABLE) {
        val = TOTAL_AVAILABLE - currentDistributed;
      }

      return {
        ...prev,
        [collaborator.user.clerkId]: val,
      };
    });
  };

  const handleDistribute = () => {
    const payload = collaborators.map((c) => ({
      collaboratorId: c.user.clerkId,
      coin: coinDistribution[c.user.clerkId] || 0,
    }));
    console.log(payload);
  };

  return (
    <ResponsiveDialog>
      <ResponsiveDialogTrigger asChild>
        <Button>Distribute coins</Button>
      </ResponsiveDialogTrigger>
      <ResponsiveDialogContent
        className="max-h-[calc(100vh-5rem)] p-5 sm:max-w-xl"
        sheetHeight="70%"
      >
        <ResponsiveDialogHeader className="space-y-3 pb-2 text-left">
          <ResponsiveDialogTitle className="text-text-primary flex items-center gap-3 text-xl font-bold">
            <div className="bg-badge-warning-bg flex h-8 w-8 items-center justify-center rounded-lg">
              <Coins className="text-brand-orange h-5 w-5" />
            </div>
            Distribute Coins
          </ResponsiveDialogTitle>
          <p className="text-text-secondary-65 text-sm font-medium">
            You can distribute the collected coins among your collaborators.
          </p>
        </ResponsiveDialogHeader>
        <div
          className={cn(
            'flex items-center justify-between rounded-xl border p-4 transition-colors',
            'border-badge-warning-border bg-badge-warning-bg'
          )}
        >
          <span className="text-text-secondary text-sm font-medium">Total Available Coins</span>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2">
              <div className="bg-badge-warning-bg flex h-6 w-6 items-center justify-center rounded-md">
                <Coins className="text-brand-orange h-4 w-4" />
              </div>
              <span className="text-text-primary text-2xl font-bold">{TOTAL_AVAILABLE}</span>
            </div>
            <span className="text-text-secondary-65 text-xs font-medium">
              ≈ ₹{TOTAL_AVAILABLE}.00 INR
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-6 pt-4">
          {/* Collaborators List */}
          <div className="flex max-h-[40vh] flex-col gap-4 overflow-y-auto pr-2 sm:max-h-[350px]">
            {collaborators.map((c) => {
              const config = ROLE_DISPLAY[c.role];
              return (
                <div key={c._id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="border-border/50 h-10 w-10 border">
                      <AvatarImage src={c.user.avatarUrl} alt={c.user.username} />
                      <AvatarFallback>{c.user.username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-text-primary text-sm font-semibold">
                          {c.user.username}
                        </span>
                        {createBadge({
                          label: config.label,
                          icon: config.icon,
                          color: config.color,
                          size: 'xs',
                          shape: 'pill',
                          style: 'soft',
                        })}
                      </div>
                      <span className="text-text-secondary-65 text-xs">@{c.user.username}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <InputGroup className="max-w-[100px]">
                      <InputGroupInput
                        placeholder="0"
                        type="number"
                        min={0}
                        value={coinDistribution[c.user.clerkId] || ''}
                        onChange={(e) => handleInputChange(e, c)}
                      />
                      <InputGroupAddon align="inline-end">
                        <Coins className="text-badge-warning h-3.5 w-3.5" />
                      </InputGroupAddon>
                    </InputGroup>
                    <span className="text-text-secondary w-10 text-right text-sm font-medium">
                      {Math.round(
                        ((coinDistribution[c.user.clerkId] || 0) / TOTAL_AVAILABLE) * 100
                      )}
                      %
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-border/50 h-px w-full" />

          {/* Total Row */}
          <div className="flex items-center justify-between">
            <span className="text-text-primary text-sm font-semibold">Total</span>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-text-primary text-lg font-bold">
                  {totalDistributed} / {TOTAL_AVAILABLE}
                </span>
                <div className="bg-badge-warning-bg flex h-5 w-5 items-center justify-center rounded-full">
                  <Coins className="text-badge-warning h-3.5 w-3.5" />
                </div>
              </div>
              <div className="flex w-10 justify-end">
                <span className="bg-badge-success-bg text-badge-success rounded px-1.5 py-0.5 text-xs font-semibold">
                  {Math.round((totalDistributed / TOTAL_AVAILABLE) * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Tip Banner */}
          <TipBanner
            icon={<Shield className="h-4 w-4" />}
            title="Once distributed, collaborators will receive their coins in their wallet. This action cannot be undone."
            className="border-badge-warning-border bg-badge-warning-bg text-text-secondary mt-2"
          />

          {/* Actions */}
          <div className="mt-2 flex items-center justify-end gap-3">
            <Button variant="outline" className="text-text-secondary px-6 font-semibold">
              Cancel
            </Button>
            <Button
              className="bg-brand-pink-500 hover:bg-brand-pink-600 px-6 font-semibold text-white shadow-sm"
              onClick={handleDistribute}
            >
              Distribute Coins
            </Button>
          </div>
        </div>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
