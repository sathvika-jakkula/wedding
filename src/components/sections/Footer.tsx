import { coupleData } from "@/app/constants";

export default function Footer() {
  return (
    <footer className="bg-beige text-burgundy-950 py-14 border-t border-sage/15 text-center">
      <div className="container mx-auto px-4 flex flex-col items-center gap-5">
        <div className="font-serif text-gold tracking-[0.25em]" style={{ fontSize: "2.5rem" }}>
          S &amp; H
        </div>
        <p className="font-sans text-burgundy-950/50 text-xs tracking-[0.4em] uppercase">
          {coupleData.weddingDate}
        </p>
        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-sage/30 to-transparent" />
        <p className="font-sans text-burgundy-950/35 text-xs tracking-wider">
          Crafted with love for {coupleData.names}
        </p>
      </div>
    </footer>
  );
}
