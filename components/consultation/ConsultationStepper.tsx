interface ConsultationStepperProps {
  currentStep: number;
}

const steps = [
  "Service",
  "Date & Time",
  "Details",
  "Payment",
  "Done",
];

export default function ConsultationStepper({
  currentStep,
}: ConsultationStepperProps) {
  return (
    <div className="mt-8">
      <div className="flex justify-between">

        {steps.map((label, index) => {
          const number = index + 1;
          const completed = currentStep >= number;
          const connectorCompleted = currentStep > number;

          return (
            <div
              key={label}
              className="relative flex flex-1 flex-col items-center"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className="
                    absolute
                    top-4.5
                    left-1/2
                    h-0.5
                    w-full
                    translate-x-0
                  "
                >
                  {/* Grey line */}
                  <div className="absolute inset-0 bg-neutral-200" />

                  {/* Green line */}
                  <div
                    className={`
                      absolute
                      inset-y-0
                      left-0
                      transition-all
                      duration-300
                      ${
                        connectorCompleted
                          ? "w-full bg-primary"
                          : "w-0 bg-primary"
                      }
                    `}
                  />
                </div>
              )}

              {/* Circle */}
              <div
                className={`
                  relative
                  z-10
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  text-sm
                  font-medium
                  transition-all
                  duration-300

                  ${
                    completed
                      ? "bg-primary border-primary text-white"
                      : "bg-white border-neutral-300 text-muted"
                  }
                `}
              >
                {number}
              </div>

              {/* Label */}
              <span className="mt-2 text-center text-xs text-muted font-heading">
                {label}
              </span>
            </div>
          );
        })}

      </div>
    </div>
  );
}