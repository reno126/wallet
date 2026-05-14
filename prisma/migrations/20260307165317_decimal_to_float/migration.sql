/*
  Warnings:

  - You are about to alter the column `lastPrice` on the `Asset` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,8)` to `DoublePrecision`.
  - You are about to alter the column `totalQuantity` on the `Asset` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,8)` to `DoublePrecision`.
  - You are about to alter the column `purchaseValue` on the `Asset` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,8)` to `DoublePrecision`.
  - You are about to alter the column `currentValue` on the `Asset` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,8)` to `DoublePrecision`.
  - You are about to alter the column `price` on the `AssetHistory` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,8)` to `DoublePrecision`.
  - You are about to alter the column `quantity` on the `AssetHistory` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,8)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Asset" ALTER COLUMN "lastPrice" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "totalQuantity" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "purchaseValue" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "currentValue" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "AssetHistory" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "quantity" SET DATA TYPE DOUBLE PRECISION;
