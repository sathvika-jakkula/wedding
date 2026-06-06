"use client";

interface Props {
  label: string;
  fromColor?: string; /* tailwind bg color token, e.g. "from-burgundy-950" */
}

export default function SectionTeaser({ label, fromColor = "from-[#091a0d]" }: Props) {
  return (
    <div className={`absolute bottom-0 left-0 right-0 h-28 flex flex-col items-center justify-end pb-5 pointer-events-none bg-gradient-to-t ${fromColor} to-transparent`}>
      <div className="flex flex-col items-center gap-1.5 animate-bounce-hint">
        <span className="font-sans text-[9px] tracking-[0.45em] text-sage/70 uppercase">
          {label}
        </span>
        <svg width="12" height="18" viewBox="0 0 12 18" fill="none" className="text-sage/50">
          <path d="M6 0v14M1 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}
