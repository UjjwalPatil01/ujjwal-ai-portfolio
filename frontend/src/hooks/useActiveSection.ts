import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds: string[], offset = 140): string {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || 'about');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(id);
          return;
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
}
