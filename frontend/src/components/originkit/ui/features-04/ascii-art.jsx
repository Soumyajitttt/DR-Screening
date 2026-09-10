import { useEffect, useRef, useState } from "react";

import AsciiImage from "@/components/originkit/ui/features-04/ascii-reveal";

const PITCH = 1.57;

const REVEAL_RATIO = 6;

export const AsciiArt = ({ src, alt, boxClassName, artClassName }) => {
  const artRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const art = artRef.current;
    if (!art) return;
    const measure = () => setWidth(art.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(art);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`relative max-w-full shrink-0 overflow-hidden ${boxClassName}`}>
      <div ref={artRef} className={`absolute ${artClassName}`}>
        {width > 0 && (
          <AsciiImage
            image={{ src, alt }}
            fit="contain"
            columns={Math.round(width / PITCH)}
            inkColor="#333333"
            revealOptions={{
              size: Math.round(width / REVEAL_RATIO),
              softness: 12
            }}
          />
        )}
      </div>
    </div>
  );
};
