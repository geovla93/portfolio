import { cn } from "@/lib/utils";

export const MICROTEXT =
  "George Vlassis · Chief Technology Officer & Vice President, Product · Cyberscope · Ioannina, Greece · geovla.dev · ";

type MicroprintProps = {
  className?: string;
};

/** A hairline rule set in tiny repeating text. Decorative, so hidden from assistive tech. */
export function Microprint({ className }: MicroprintProps) {
  return (
    <div aria-hidden="true" className={cn("microprint", className)}>
      {MICROTEXT.repeat(14)}
    </div>
  );
}
