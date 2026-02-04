'use client';

import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import { MdKeyboardArrowUp } from 'react-icons/md';

export default function TopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.4;
      setVisible(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        className="rounded-full shadow-md bg-primitive-white"
        variant="icon"
        size="lg"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <MdKeyboardArrowUp className="w-[60%] h-[60%]" />
      </Button>
    </div>
  );
}
