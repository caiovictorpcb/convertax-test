export interface Investment {
  id: number;
  name: string;
  createdAt: string;
  initialValue: number;
  withdrawals: Withdrawal[];
  currentValue: number;
  income: Income[];
}

export interface Income {
  id: number;
  value: number;
  createdAt: string;
  afterValue: number;
}

export interface Withdrawal {
  id: number;
  requestedValue: number;
  netValue: number;
  createdAt: string;
  previousValue: number;
  afterValue: number;
  tax: number;
}
