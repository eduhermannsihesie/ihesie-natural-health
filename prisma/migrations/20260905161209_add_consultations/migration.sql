-- CreateEnum
CREATE TYPE "ConsultationPaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED');

-- CreateEnum
CREATE TYPE "ConsultationBookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Consultation" (
    "id" TEXT NOT NULL,
    "consultationNumber" TEXT NOT NULL,
    "treatment" TEXT NOT NULL,
    "appointmentDate" TIMESTAMP(3) NOT NULL,
    "appointmentTime" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "healthConcern" TEXT,
    "communication" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'NGN',
    "paymentStatus" "ConsultationPaymentStatus" NOT NULL DEFAULT 'PENDING',
    "bookingStatus" "ConsultationBookingStatus" NOT NULL DEFAULT 'PENDING',
    "paymentReference" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Consultation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Consultation_consultationNumber_key" ON "Consultation"("consultationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Consultation_paymentReference_key" ON "Consultation"("paymentReference");
