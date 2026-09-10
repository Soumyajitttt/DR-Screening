import ScrollReveal from "@/components/ScrollReveal";
import { AsciiArt } from "@/components/originkit/ui/features-04/ascii-art";

export const Plate = ({ children, outerClassName = "", innerClassName }) => (
  <div className={`flex flex-col rounded-[20px] bg-[#ebebeb] p-[8px] ${outerClassName}`}>
    <div className={`flex rounded-[16px] bg-[#f5f5f5] drop-shadow-[0px_0px_6px_#ddd] ${innerClassName}`}>
      {children}
    </div>
  </div>
);

const CardText = ({ title, body }) => (
  <div className="flex w-full flex-col gap-[12px] font-tight leading-[1.2] text-black">
    <ScrollReveal as="h3" blur={8} y={16} className="text-[18px] font-medium desktop-sm:text-[20px]">
      {title}
    </ScrollReveal>
    <ScrollReveal as="p" blur={8} y={16} delay={0.05} className="text-[14px] opacity-60 desktop-sm:text-[16px]">
      {body}
    </ScrollReveal>
  </div>
);

export const FeatureCard = ({ title, body, art }) => (
  <ScrollReveal as="div" y={40}>
    <Plate
      outerClassName="ipad:h-[373px]"
      innerClassName="flex-col gap-[10px] px-[20px] pt-[12px] pb-[20px] ipad:min-h-px ipad:flex-1 ipad:justify-end"
    >
      <div className="flex w-full flex-col items-center justify-center pb-[20px]">
        <AsciiArt {...art} />
      </div>
      <CardText title={title} body={body} />
    </Plate>
  </ScrollReveal>
);

export const WideCard = ({ title, body, art }) => (
  <ScrollReveal as="div" y={40} className="desktop-sm:h-full">
    <Plate
      outerClassName="desktop-sm:h-full"
      innerClassName="flex-col items-center gap-[10px] px-[20px] pt-[12px] pb-[20px] ipad:pt-[20px] desktop-sm:min-h-px desktop-sm:flex-1 desktop-sm:justify-between desktop-sm:pt-[32px]"
    >
      <div className="flex w-full flex-col items-center justify-center pb-[20px]">
        <AsciiArt {...art} />
      </div>
      <CardText title={title} body={body} />
    </Plate>
  </ScrollReveal>
);
