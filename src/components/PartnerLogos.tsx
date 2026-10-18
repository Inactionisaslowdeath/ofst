import { PARTNER_LOGOS } from "../data/content"

export function PartnerLogos() {
  return (
    <div className="relative z-30 -mt-6 sm:-mt-10 md:-mt-12 grid grid-cols-4 items-center gap-3 rounded-[10px] bg-[#f2f2f2] px-5 py-6 transition-colors duration-300 dark:bg-[#18181b]">
      {PARTNER_LOGOS.map((image) => (
        <div key={image} className="flex justify-center overflow-hidden">
          <img
            src={`/assets/${image}`}
            alt="Partner studio"
            className="max-w-full dark:invert"
          />
        </div>
      ))}
    </div>
  )
}

export default PartnerLogos
