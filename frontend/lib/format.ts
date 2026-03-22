function normalizeBigInt(value: string | bigint | number | null | undefined): bigint | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  try {
    return typeof value === 'bigint' ? value : BigInt(value);
  } catch {
    return null;
  }
}

export function shortAddress(value: string | null | undefined, prefix = 6, suffix = 4): string {
  if (!value) {
    return '—';
  }

  if (value.length <= prefix + suffix + 3) {
    return value;
  }

  return `${value.slice(0, prefix)}…${value.slice(-suffix)}`;
}

export function shortHash(value: string | null | undefined, prefix = 10, suffix = 8): string {
  if (!value) {
    return '—';
  }

  if (value.length <= prefix + suffix + 3) {
    return value;
  }

  return `${value.slice(0, prefix)}…${value.slice(-suffix)}`;
}

export function formatEtherLike(value: string | number | bigint | null | undefined, fractionDigits = 4): string {
  const wei = normalizeBigInt(value);
  if (wei === null) {
    return '—';
  }

  const negative = wei < 0n;
  const absValue = negative ? -wei : wei;
  const whole = absValue / 10n ** 18n;
  const fraction = absValue % 10n ** 18n;

  if (fraction === 0n) {
    return `${negative ? '-' : ''}${whole.toString()}`;
  }

  const padded = fraction.toString().padStart(18, '0').slice(0, fractionDigits).replace(/0+$/, '');
  return `${negative ? '-' : ''}${whole.toString()}.${padded}`;
}

export function formatTimestamp(value: string | number | null | undefined): string {
  if (!value) {
    return '—';
  }

  const parsed = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(parsed)) {
    return '—';
  }

  return new Date(parsed).toLocaleString();
}

export function yesNo(value: boolean | null | undefined): string {
  if (value === null || value === undefined) {
    return 'Unknown';
  }

  return value ? 'Yes' : 'No';
}

export function percentSpent(spent: string | number | bigint | null | undefined, allocated: string | number | bigint | null | undefined): number {
  const spentWei = normalizeBigInt(spent);
  const allocatedWei = normalizeBigInt(allocated);

  if (spentWei === null || allocatedWei === null || allocatedWei === 0n) {
    return 0;
  }

  const ratio = Number((spentWei * 10_000n) / allocatedWei) / 100;
  return Math.max(0, Math.min(100, ratio));
}
