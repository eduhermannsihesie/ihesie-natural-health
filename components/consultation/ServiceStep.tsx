import { ArrowRight } from "lucide-react";
import { ChevronDown } from "lucide-react";

interface Props{
    onNext:()=>void;
}

export default function ServiceStep({
    onNext
}:Props){
return(
<>

<p className="text-xl text-primary-hover">
Please select service
</p>

<p className="mt-6 font-medium">
Treatment*
</p>

<div className="relative mt-2">
  <select
    className="
      w-full
      appearance-none
      rounded-md
      border-2
      border-primary-100
      px-4
      py-3
      pr-14
      text-sm
      text-muted
      shadow-sm
      outline-none
      transition
      focus:border-primary-hover
      focus:ring-2
      focus:ring-primary/20
    "
  >
    <option>Select treatment</option>
    <option>Detox Consultation</option>
    <option>Liver Health</option>
    <option>Gut Health</option>
    <option>Women's Wellness</option>
  </select>

  <ChevronDown
    size={18}
    className="
      pointer-events-none
      absolute
      right-5
      top-1/2
      -translate-y-1/2
      text-primary-hover
    "
  />
</div>



<div className="mt-40 flex justify-between">
    <button className="rounded-md border-2 border-secondary-hover cursor-pointer hover:text-secondary hover:bg-secondary-burnt-100 hover:border-secondary-burnt-200 bg-secondary-burnt-hover font-medium text-surface-burnt-dark  px-10 py-2">
            Cancel
    </button>

    <button onClick={onNext} className="rounded-md border-2 border-primary  bg-primary px-8 cursor-pointer py-2 font-medium hover:bg-primary-50 hover:text-primary hover:border-primary-200 text-white flex items-center gap-1 transition duration-300">
        Continue 
         <ArrowRight size={16} strokeWidth={2.5} />
    </button>
</div>

<p className="mt-10 text-xs text-center text-muted">
            Your information is safe and secure. We respect your privacy.
     </p>

</>

)

}