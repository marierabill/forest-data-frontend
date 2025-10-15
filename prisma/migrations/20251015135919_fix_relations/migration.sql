-- CreateTable
CREATE TABLE "Record" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "forest_station" TEXT NOT NULL,
    "officer_name" TEXT NOT NULL,
    "activity_type" TEXT NOT NULL,
    "activity_date" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "txHash" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Verification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "permit_id" TEXT NOT NULL,
    "forest_station" TEXT NOT NULL,
    "officer_name" TEXT NOT NULL,
    "activity_type" TEXT NOT NULL,
    "activity_date" DATETIME NOT NULL,
    "permit_number" TEXT NOT NULL,
    "txHash" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verification_status" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recordId" TEXT,
    CONSTRAINT "Verification_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Verification_permit_id_key" ON "Verification"("permit_id");

-- CreateIndex
CREATE UNIQUE INDEX "Verification_recordId_key" ON "Verification"("recordId");
