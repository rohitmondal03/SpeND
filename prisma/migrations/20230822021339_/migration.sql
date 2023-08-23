/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "VerificationToken";

-- CreateTable
CREATE TABLE "Query" (
    "QueryId" TEXT NOT NULL,
    "CustomerID" TEXT NOT NULL,
    "query" TEXT NOT NULL,

    CONSTRAINT "Query_pkey" PRIMARY KEY ("QueryId")
);

-- CreateTable
CREATE TABLE "Order" (
    "OrderID" TEXT NOT NULL,
    "CustomerName" TEXT NOT NULL,
    "CustomerEmail" TEXT NOT NULL,
    "CustomerPh" TEXT NOT NULL,
    "CustomerAddress" TEXT NOT NULL,
    "CustomerID" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("OrderID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Query_CustomerID_key" ON "Query"("CustomerID");

-- CreateIndex
CREATE UNIQUE INDEX "Order_CustomerEmail_key" ON "Order"("CustomerEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Order_CustomerID_key" ON "Order"("CustomerID");

-- AddForeignKey
ALTER TABLE "Query" ADD CONSTRAINT "Query_CustomerID_fkey" FOREIGN KEY ("CustomerID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_CustomerID_fkey" FOREIGN KEY ("CustomerID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
