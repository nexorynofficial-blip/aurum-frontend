'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { Button } from '@/components/common/Button';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { toast } from '@/components/common/Toast';

interface AddToBagButtonProps {
  product: Product;
  quantity?: number;
  variant?: Record<string, string>;
  disabled?: boolean;
  fullWidth?: boolean;
  label?: string;
}

export function AddToBagButton({
  product,
  quantity = 1,
  variant,
  disabled,
  fullWidth = true,
  label = 'Add to bag',
}: AddToBagButtonProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useUIStore((s) => s.openCart);
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    setLoading(true);
    // Simulate the optimistic sync described in the TRD useCart hook.
    await new Promise((r) => setTimeout(r, 420));
    addItem({ product, quantity, variant });
    setLoading(false);
    toast(`${product.name} added to your bag`, 'success');
    openCart();
  };

  const soldOut = product.availability === 'out-of-stock';

  return (
    <Button
      onClick={handle}
      loading={loading}
      disabled={disabled || soldOut}
      fullWidth={fullWidth}
      size="lg"
    >
      {soldOut ? 'Reserved' : label}
    </Button>
  );
}
