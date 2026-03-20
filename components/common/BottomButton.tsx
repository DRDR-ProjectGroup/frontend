'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import { MdKeyboardArrowDown } from 'react-icons/md';

type Props = {
  containerRef: React.RefObject<HTMLDivElement | null>;
};

export default function BottomButton({ containerRef }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 50;

      setVisible(!isAtBottom);
    };

    el.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      el.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef]);

  if (!visible) return null;

  return (
    <div className="absolute bottom-3 right-1/2 translate-x-1/2 z-50">
      <Button
        className="rounded-full border border-primitive-grayPrimary bg-primitive-white shadow-[0_0_5px_0_rgba(0,0,0,0.2)]"
        variant="icon"
        size="lg"
        onClick={() => {
          const el = containerRef.current;
          if (!el) return;

          el.scrollTo({
            top: el.scrollHeight,
            behavior: 'smooth',
          });
        }}
      >
        <MdKeyboardArrowDown className="w-[60%] h-[60%]" />
      </Button>
    </div>
  );
}
