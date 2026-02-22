interface Wallet {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type WalletList = Wallet[];
