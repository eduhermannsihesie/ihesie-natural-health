'use client';
import { useState } from "react";
import { HeartHandshake } from "lucide-react";
import ConsultationStepper from "./ConsultationStepper";
import ServiceStep from "./ServiceStep";
import DateTimeStep from "./DateTimeStep";
import DetailsStep from "./DetailsStep";
import PaymentStep from "./PaymentStep";
import SuccessStep from "./SuccessStep";
import BookingSummary from "./BookingSummary";
import { useRouter } from "next/navigation";

export default function ConsultationWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };
  const booking = {
        consultationId: "IHN-240726-001",
        treatment: "Gut Disorder",
        date: "22 July 2026",
        time: "10:00 AM",
        fullName: "John Doe",
        age: "34",
        email: "johndoe@gmail.com",
        phone: "+23491872564",
        communication: "WhatsApp",
        amount: "₦15,000",
};

  return (
    <section className="relative mt-8 max-w-270 mx-auto">
        
        {/* Background */}
        <div className="absolute inset-0">
            <img
              src="/images/wellnesspath.svg"
              alt="Wellness background"
              className="h-full w-full rounded-xl object-cover"
            />
          </div>

        {/* Content */}
        
        <div className="px-8 py-10 relative z-10 grid lg:grid-cols-2">
          
          {/* Left */}
          <div 
           className={`
                p-8
                bg-white
                backdrop-blur-sm
                rounded-sm
                shadow-2xl
                max-w-2xl
                self-start
                ${step === 3 ? "min-h-205" : "min-h-150"}
              `}
          >
            <h1 className="font-heading  text-3xl lg:text-4xl leading-tight font-medium text-foreground">
              Book Your Consultation
            </h1>

            <p className="mt-3 text-muted">
              Receive personalized guidance from our certified natural health specialists.
            </p>

            <ConsultationStepper currentStep={step} />

           

            <div className="mt-10">
              {step === 1 && (
                  <ServiceStep 
                  onNext={nextStep}/>
                )}

                {step === 2 && (
                  <DateTimeStep
                      onBack={prevStep}
                      onNext={nextStep}
                    />
                )}

                {step === 3 && (
                  <DetailsStep
                    onBack={prevStep}
                    onNext={nextStep}
                  />
                )}

                {step === 4 && (
                  <PaymentStep
                    onBack={prevStep}
                    onNext={nextStep}
                  />
                )}

                {step === 5 && (
                 <SuccessStep
                      consultationId={booking.consultationId}
                      treatment={booking.treatment}
                      date={booking.date}
                      time={booking.time}
                      onDownloadReceipt={() => {window.print()}}
                      onBackHome={() => {router.push("/")}}
                    />
                )}
                            </div>



                          </div>

          {/* Right */}

<div className="relative hidden lg:block">

  {/* Steps 1-3 */}
  {step <= 3 && (
    <div className="absolute bottom-0 left-25 max-w-80 bg-white border-2 border-primary-200 rounded-lg shadow-xl px-6 py-5 flex items-center gap-4">

      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
        <HeartHandshake className="text-primary" />
      </div>

      <div className="h-12 border-l border-border"></div>

      <div>
        <p className="text-md font-medium">
          Consultation Fee
        </p>

        <div className="flex items-center gap-2">
          <p className="font-heading text-xl font-semibold text-primary">
            ₦15,000
          </p>

          <p className="text-sm text-primary-hover">
            (30 mins)
          </p>
        </div>
      </div>

    </div>
  )}

  {/* Step 4 */}
  {step === 4 && (
    <div className="absolute top-30 right-15">
      <BookingSummary
        treatment={booking.treatment}
        date={booking.date}
        time={booking.time}
        fullName={booking.fullName}
        age={booking.age}
        email={booking.email}
        phone={booking.phone}
        communication={booking.communication}
        amount={booking.amount}
      />
    </div>
  )}

  {/* Step 5 intentionally renders nothing */}

</div>
    </div>
    </section>
  );
}