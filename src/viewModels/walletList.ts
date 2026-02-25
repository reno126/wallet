export interface WalletViewModel {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type WalletListViewModel = WalletViewModel[];
