import React, { useEffect, useRef, useState } from 'react';

type PikaMood = 'walk' | 'idle' | 'wave' | 'dizzy' | 'happy' | 'sleep' | 'drag';

interface SparkParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
}

const SECTION_DIALOGUES: Record<string, { text: string; mood: PikaMood }> = {
  hero: {
    text: "Hey! I'm Pika, Ujjwal's AI engineering companion. Try dragging or clicking me!",
    mood: 'wave',
  },
  projects: {
    text: 'Check out MoodMate, DocuChat & CodeNova! Real FastAPI + RAG architecture.',
    mood: 'walk',
  },
  about: {
    text: 'Ujjwal is a 2026 Computer Engineering grad focused on Applied AI & Python backends.',
    mood: 'wave',
  },
  skills: {
    text: 'Python, FastAPI, LangChain & XLM-RoBERTa — all systems charged! ⚡',
    mood: 'happy',
  },
  experience: {
    text: '50+ Git commits & REST API integrations during the CodSoft internship!',
    mood: 'walk',
  },
  research: {
    text: 'Published in IJSCI (May 2026) — 84.80% Marathi NLP accuracy with XLM-RoBERTa!',
    mood: 'happy',
  },
  certifications: {
    text: '93.99% in TCS iON Python NQT! Click any card to verify the official credentials.',
    mood: 'wave',
  },
  contact: {
    text: 'Hiring an entry-level AI/ML or Python Engineer? Send Ujjwal a message!',
    mood: 'wave',
  },
};

const CLICK_REACTIONS: { text: string; mood: PikaMood }[] = [
  { text: 'Pika-Pika! ⚡ FastAPI & RAG pipelines running at 100%!', mood: 'happy' },
  { text: 'Whoa! Careful with the high-voltage debugging! ⚡', mood: 'dizzy' },
  { text: 'Need Ujjwal’s resume? Click "Preview Resume" in the top bar!', mood: 'wave' },
  { text: 'I can walk and carry Ujjwal’s AI briefcase all day!', mood: 'walk' },
];

export const RoamingPikachu: React.FC = () => {
  const [enabled, setEnabled] = useState<boolean>(true);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 240, y: -120 });
  const [facingRight, setFacingRight] = useState<boolean>(false);
  const [mood, setMood] = useState<PikaMood>('walk');
  const [walkPhase, setWalkPhase] = useState<number>(0);
  const [isBlinking, setIsBlinking] = useState<boolean>(false);
  const [eyeOffset, setEyeOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dialogue, setDialogue] = useState<string>(
    'Argh, 2 seconds! Just finished compiling the AI pipeline.'
  );
  const [showBubble, setShowBubble] = useState<boolean>(true);
  const [sparks, setSparks] = useState<SparkParticle[]>([]);

  // Physics refs for 60fps requestAnimationFrame loop
  const physRef = useRef({
    x: typeof window !== 'undefined' ? Math.max(180, window.innerWidth - 260) : 320,
    y: 160, // Drops from ledge on load
    vx: -1.15,
    vy: 0,
    onGround: false,
    isDragging: false,
    dragOffsetX: 0,
    dragOffsetY: 0,
    mood: 'walk' as PikaMood,
    moodTimer: 0,
    walkTick: 0,
    idleTimer: 0,
    lastMouseX: 0,
    lastMouseY: 0,
    clickCount: 0,
  });

  const bubbleTimeoutRef = useRef<number | null>(null);
  const lastSectionRef = useRef<string>('');

  const triggerSpeech = (text: string, durationMs = 5200) => {
    setDialogue(text);
    setShowBubble(true);
    if (bubbleTimeoutRef.current) {
      window.clearTimeout(bubbleTimeoutRef.current);
    }
    bubbleTimeoutRef.current = window.setTimeout(() => {
      setShowBubble(false);
    }, durationMs);
  };

  const spawnSparks = () => {
    const batch: SparkParticle[] = Array.from({ length: 8 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 8;
      return {
        id: Date.now() + i,
        x: 60,
        y: 55,
        vx: Math.cos(angle) * 3.2,
        vy: Math.sin(angle) * 3.2 - 1.5,
        color: i % 2 === 0 ? '#facc15' : '#22d3ee',
      };
    });
    setSparks(batch);
    window.setTimeout(() => setSparks([]), 650);
  };

  // Natural eye-blinking timer
  useEffect(() => {
    const blinkInterval = window.setInterval(() => {
      setIsBlinking(true);
      window.setTimeout(() => setIsBlinking(false), 150);
    }, 3600);
    return () => window.clearInterval(blinkInterval);
  }, []);

  // Mouse tracking for pupil gaze + drag-and-drop handling
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const p = physRef.current;
      p.lastMouseX = e.clientX;
      p.lastMouseY = e.clientY;
      p.idleTimer = 0;

      if (p.mood === 'sleep') {
        p.mood = 'walk';
        setMood('walk');
      }

      if (p.isDragging) {
        const nextX = Math.max(20, Math.min(window.innerWidth - 130, e.clientX - p.dragOffsetX));
        const nextY = Math.max(
          0,
          Math.min(window.innerHeight - 160, window.innerHeight - e.clientY - p.dragOffsetY)
        );
        p.x = nextX;
        p.y = nextY;
        p.vy = 0;
        p.onGround = false;
        setPos({ x: p.x, y: p.y });
      } else {
        // Compute subtle eye pupil tracking offset (-1.8px to +1.8px)
        const avatarScreenX = p.x + 60;
        const avatarScreenY = window.innerHeight - p.y - 75;
        const dx = e.clientX - avatarScreenX;
        const dy = e.clientY - avatarScreenY;
        const dist = Math.hypot(dx, dy) || 1;
        const maxShift = 1.9;
        setEyeOffset({
          x: (dx / dist) * Math.min(maxShift, dist / 45),
          y: (dy / dist) * Math.min(maxShift, dist / 45),
        });
      }
    };

    const handleMouseUp = () => {
      const p = physRef.current;
      if (p.isDragging) {
        p.isDragging = false;
        p.mood = 'walk';
        setMood('walk');
        triggerSpeech('Wheee! Gravity check passed! ⚡', 3800);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Contextual section awareness (Nero-style)
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = [
        'contact',
        'certifications',
        'research',
        'experience',
        'skills',
        'about',
        'projects',
        'hero',
      ];
      const scrollMid = window.scrollY + window.innerHeight * 0.45;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollMid) {
          if (lastSectionRef.current !== id) {
            lastSectionRef.current = id;
            const info = SECTION_DIALOGUES[id];
            if (info && !physRef.current.isDragging) {
              physRef.current.mood = info.mood;
              physRef.current.moodTimer = 150;
              setMood(info.mood);
              triggerSpeech(info.text, 4800);
            }
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Main 60fps skeletal animation & physics loop
  useEffect(() => {
    if (!enabled) return;
    let rafId: number;

    const tick = () => {
      const p = physRef.current;
      if (!p.isDragging) {
        // Gravity when above floor (y > 0 means above bottom edge)
        if (p.y > 0 || p.vy !== 0) {
          p.vy -= 0.58; // downward acceleration
          p.y += p.vy;

          if (p.y <= 0) {
            p.y = 0;
            if (Math.abs(p.vy) > 2.2) {
              p.vy = -p.vy * 0.32; // bounce
            } else {
              p.vy = 0;
              p.onGround = true;
            }
          }
        } else {
          p.onGround = true;
        }

        // Inactivity sleep check
        p.idleTimer += 1;
        if (p.idleTimer > 1800 && p.mood !== 'sleep') {
          p.mood = 'sleep';
          setMood('sleep');
          triggerSpeech('Zzz... resting my neural weights. Move the mouse to wake me!', 4500);
        }

        // Mood timer countdown
        if (p.moodTimer > 0) {
          p.moodTimer -= 1;
          if (p.moodTimer === 0 && p.mood !== 'sleep') {
            p.mood = Math.random() < 0.72 ? 'walk' : 'idle';
            setMood(p.mood);
          }
        } else if (p.mood === 'walk' && Math.random() < 0.004) {
          p.mood = 'wave';
          p.moodTimer = 110;
          setMood('wave');
        } else if (p.mood === 'idle' && Math.random() < 0.012) {
          p.mood = 'walk';
          setMood('walk');
        }

        // Horizontal walking & screen-edge bonk
        if (p.onGround && p.mood === 'walk') {
          p.x += p.vx;
          p.walkTick += 0.16;
          setFacingRight(p.vx > 0);

          const minX = 24;
          const maxX = Math.max(180, window.innerWidth - 150);

          if (p.x <= minX) {
            p.x = minX;
            p.vx = Math.abs(p.vx);
            p.mood = 'dizzy';
            p.moodTimer = 115;
            setMood('dizzy');
            setFacingRight(true);
            triggerSpeech('Bonk! Who put a firewall on the left edge?', 4200);
          } else if (p.x >= maxX) {
            p.x = maxX;
            p.vx = -Math.abs(p.vx);
            p.mood = 'dizzy';
            p.moodTimer = 115;
            setMood('dizzy');
            setFacingRight(false);
            triggerSpeech('Ouch! Hit the right viewport boundary!', 4200);
          }
        } else {
          p.walkTick += 0.08;
        }

        setPos({ x: p.x, y: p.y });
        setWalkPhase(p.walkTick);
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [enabled]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    const p = physRef.current;
    p.isDragging = true;
    p.dragOffsetX = e.clientX - p.x;
    p.dragOffsetY = window.innerHeight - e.clientY - p.y;
    p.mood = 'drag';
    setMood('drag');
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const p = physRef.current;
    p.clickCount += 1;
    const reaction = CLICK_REACTIONS[p.clickCount % CLICK_REACTIONS.length];
    p.mood = reaction.mood;
    p.moodTimer = 140;
    p.vy = 6.2; // cheerful hop!
    p.onGround = false;
    setMood(reaction.mood);
    spawnSparks();
    triggerSpeech(reaction.text, 4800);
  };

  const handleMouseEnter = () => {
    const p = physRef.current;
    if (!p.isDragging && p.mood === 'walk') {
      p.mood = 'wave';
      p.moodTimer = 95;
      setMood('wave');
    }
  };

  // Articulated limb kinematics derived from walkPhase & mood
  const isWalking = mood === 'walk';
  const isDizzy = mood === 'dizzy';
  const isHappy = mood === 'happy';
  const isSleep = mood === 'sleep';
  const isWave = mood === 'wave';
  const isDrag = mood === 'drag';

  const sinWalk = Math.sin(walkPhase);
  const cosWalk = Math.cos(walkPhase);

  const bodyBobY = isWalking ? Math.abs(sinWalk) * -3.2 : isHappy ? Math.sin(walkPhase * 3) * -4 : 0;
  const leftFootY = isWalking ? Math.max(0, sinWalk) * -5.5 : isDrag ? 4 : 0;
  const rightFootY = isWalking ? Math.max(0, -sinWalk) * -5.5 : isDrag ? -3 : 0;
  const leftFootX = isWalking ? cosWalk * 2.5 : 0;
  const rightFootX = isWalking ? -cosWalk * 2.5 : 0;

  const leftEarRot = isDizzy
    ? -18 + Math.sin(walkPhase * 3) * 6
    : isHappy
    ? -12 + Math.sin(walkPhase * 4) * 5
    : -5 + Math.sin(walkPhase * 0.8) * 3;

  const rightEarRot = isDizzy
    ? 16 - Math.sin(walkPhase * 3) * 6
    : isHappy
    ? 12 - Math.sin(walkPhase * 4) * 5
    : 6 - Math.sin(walkPhase * 0.8) * 3;

  const rightArmRot =
    isWave || isHappy
      ? -125 + Math.sin(walkPhase * 3.2) * 18
      : isDizzy
      ? -142 + Math.sin(walkPhase * 2.5) * 8
      : isWalking
      ? sinWalk * 22
      : 12;

  const tailRot = isHappy ? 14 + Math.sin(walkPhase * 4) * 14 : 6 + Math.sin(walkPhase * 1.4) * 8;

  // Position speech bubble cleanly to the left or right of Pikachu (like Nero) so it NEVER covers his face
  const placeBubbleOnLeft = pos.x > 290;

  return (
    <>
      {enabled && (
        <div
          style={{
            position: 'fixed',
            left: `${Math.round(pos.x)}px`,
            bottom: `${Math.round(pos.y + 6)}px`,
            zIndex: 45,
          }}
          className="select-none pointer-events-none"
        >
          {/* Nero-Style Dark Speech Bubble (Offset above & beside Pikachu — never overlapping the avatar!) */}
          {showBubble && (
            <div
              style={{
                position: 'absolute',
                bottom: '118px',
                ...(placeBubbleOnLeft ? { right: '92px' } : { left: '92px' }),
              }}
              className={`pointer-events-auto w-[235px] sm:w-[255px] bg-[#181926]/95 backdrop-blur-md border border-slate-700/80 px-4 py-3 shadow-[0_18px_38px_rgba(0,0,0,0.6)] transition-all duration-200 ${
                placeBubbleOnLeft ? 'rounded-2xl rounded-br-sm' : 'rounded-2xl rounded-bl-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold tracking-wide text-violet-400">Pika</span>
                <span className="text-[10px] font-mono text-amber-400/90">
                  {mood === 'dizzy'
                    ? '★ Dizzy'
                    : mood === 'happy'
                    ? '⚡ Charged'
                    : mood === 'sleep'
                    ? '💤 Sleeping'
                    : '⚡ AI Mascot'}
                </span>
              </div>
              <p className="text-[13px] font-medium text-slate-100 leading-snug">{dialogue}</p>
            </div>
          )}

          {/* Articulated Rigged Developer Pikachu SVG Avatar */}
          <div
            role="button"
            tabIndex={0}
            data-cursor="pika"
            aria-label="Interactive Developer Pikachu Avatar — Click to pet or drag to move"
            onMouseDown={handleMouseDown}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            style={{
              transform: `scaleX(${facingRight ? -1 : 1})`,
            }}
            className="pointer-events-auto cursor-grab active:cursor-grabbing relative group"
          >
            <svg
              width="122"
              height="136"
              viewBox="0 0 120 135"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="overflow-visible drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
            >
              <defs>
                <radialGradient id="pikaHeadGrad" cx="45%" cy="38%" r="60%">
                  <stop offset="0%" stopColor="#FEF08A" />
                  <stop offset="55%" stopColor="#FACC15" />
                  <stop offset="100%" stopColor="#EAB308" />
                </radialGradient>
                <linearGradient id="pikaHoodieGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2E3244" />
                  <stop offset="100%" stopColor="#1B1D29" />
                </linearGradient>
                <radialGradient id="pikaCheekGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#F87171" stopOpacity="0.95" />
                  <stop offset="70%" stopColor="#EF4444" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Dynamic Floor Shadow (Shrinks when Pikachu jumps or is lifted) */}
              <ellipse
                cx="58"
                cy="127"
                rx={Math.max(12, 28 - pos.y * 0.08)}
                ry={Math.max(2.5, 5.5 - pos.y * 0.02)}
                fill="rgba(0,0,0,0.52)"
              />

              {/* Articulated Upper Body & Limbs Group (bobs with walk cycle) */}
              <g transform={`translate(0, ${bodyBobY.toFixed(2)})`}>
                {/* Iconic Lightning-Bolt Tail (Pivots at base) */}
                <g transform={`rotate(${tailRot.toFixed(2)} 66 96)`}>
                  <path
                    d="M 65 98 L 78 86 L 73 84 L 89 69 L 82 67 L 101 50 L 96 74 L 85 75 L 91 90 L 74 91 L 67 103 Z"
                    fill="#FACC15"
                    stroke="#18181B"
                    strokeWidth="2.1"
                    strokeLinejoin="round"
                  />
                  <path d="M 65 98 L 75 89 L 72 87 L 67 103 Z" fill="#92400E" />
                </g>

                {/* Articulated Left & Right Paws/Feet (Stepping walk cycle) */}
                <g transform={`translate(${leftFootX.toFixed(2)}, ${leftFootY.toFixed(2)})`}>
                  <ellipse cx="45" cy="121" rx="8.5" ry="5" fill="#EAB308" stroke="#18181B" strokeWidth="2" />
                  <line x1="43" y1="118" x2="43" y2="123" stroke="#18181B" strokeWidth="1.3" strokeLinecap="round" />
                  <line x1="47" y1="118" x2="47" y2="123" stroke="#18181B" strokeWidth="1.3" strokeLinecap="round" />
                </g>
                <g transform={`translate(${rightFootX.toFixed(2)}, ${rightFootY.toFixed(2)})`}>
                  <ellipse cx="69" cy="121" rx="8.5" ry="5" fill="#EAB308" stroke="#18181B" strokeWidth="2" />
                  <line x1="67" y1="118" x2="67" y2="123" stroke="#18181B" strokeWidth="1.3" strokeLinecap="round" />
                  <line x1="71" y1="118" x2="71" y2="123" stroke="#18181B" strokeWidth="1.3" strokeLinecap="round" />
                </g>

                {/* Developer Hoodie Torso */}
                <path
                  d="M 35 76 C 33 90, 32 106, 34 118 L 80 118 C 82 106, 81 90, 79 76 Z"
                  fill="url(#pikaHoodieGrad)"
                  stroke="#18181B"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />
                <path d="M 38 76 Q 57 84 76 76" fill="none" stroke="#3F445B" strokeWidth="3" strokeLinecap="round" />
                <rect x="44" y="103" width="26" height="10" rx="3.5" fill="#151720" stroke="#33384D" strokeWidth="1.2" />

                {/* Right Arm (Waves hello, swings when walking, or rubs head when bonked) */}
                <g transform={`rotate(${rightArmRot.toFixed(2)} 37 82)`}>
                  <path
                    d="M 37 79 C 28 84, 24 94, 26 101 C 28 104, 34 103, 37 97 Z"
                    fill="#272A3A"
                    stroke="#18181B"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <circle cx="27" cy="101" r="5" fill="#FACC15" stroke="#18181B" strokeWidth="1.8" />
                </g>

                {/* Left Arm + Developer Briefcase (Swings gently with walk cycle) */}
                <g transform={`rotate(${(-sinWalk * 10).toFixed(2)} 77 82)`}>
                  <path
                    d="M 77 79 C 85 84, 88 94, 85 101 C 83 104, 78 102, 76 96 Z"
                    fill="#272A3A"
                    stroke="#18181B"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <circle cx="84" cy="100" r="5" fill="#FACC15" stroke="#18181B" strokeWidth="1.8" />
                  <g transform="translate(72, 99)">
                    <path
                      d="M 6 0 L 6 -4 C 6 -6, 14 -6, 14 -4 L 14 0"
                      fill="none"
                      stroke="#78350F"
                      strokeWidth="2.2"
                    />
                    <rect x="0" y="0" width="20" height="15" rx="3" fill="#78350F" stroke="#18181B" strokeWidth="1.6" />
                    <rect x="0" y="5" width="20" height="3" fill="#6366F1" />
                    <rect x="8.5" y="4" width="3" height="4.5" rx="0.8" fill="#FACC15" />
                  </g>
                </g>

                {/* Developer Lanyard & ujjwal.ai ID Badge */}
                <path
                  d="M 48 77 L 57 93 L 66 77"
                  fill="none"
                  stroke="#6366F1"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect x="51.5" y="91" width="11" height="14" rx="2" fill="#F8FAFC" stroke="#1E293B" strokeWidth="1.2" />
                <rect x="53.5" y="94" width="7" height="3" rx="1" fill="#F59E0B" />
                <line x1="53.5" y1="99.5" x2="60.5" y2="99.5" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="53.5" y1="102" x2="58.5" y2="102" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />

                {/* Articulated Left Ear */}
                <g transform={`rotate(${leftEarRot.toFixed(2)} 38 42)`}>
                  <path
                    d="M 34 44 C 22 25, 19 10, 21 5 C 26 7, 36 19, 44 38 Z"
                    fill="url(#pikaHeadGrad)"
                    stroke="#18181B"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  />
                  <path d="M 21 5 C 19.8 8.5, 21.5 16, 25.5 23 L 32.5 18 C 28 11, 24 6.5, 21 5 Z" fill="#18181B" />
                </g>

                {/* Articulated Right Ear */}
                <g transform={`rotate(${rightEarRot.toFixed(2)} 76 42)`}>
                  <path
                    d="M 70 38 C 78 19, 88 7, 93 5 C 95 10, 92 25, 80 44 Z"
                    fill="url(#pikaHeadGrad)"
                    stroke="#18181B"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  />
                  <path d="M 93 5 C 90 6.5, 86 11, 81.5 18 L 88.5 23 C 92.5 16, 94.2 8.5, 93 5 Z" fill="#18181B" />
                </g>

                {/* Pikachu Head */}
                <path
                  d="M 32 54 C 31 38, 41 29, 57 29 C 73 29, 83 38, 82 54 C 84 62, 83 73, 75 78 C 68 82, 46 82, 39 78 C 31 73, 30 62, 32 54 Z"
                  fill="url(#pikaHeadGrad)"
                  stroke="#18181B"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />
                <path
                  d="M 52 29.5 L 55 25.5 L 57.5 28.5 L 61 25.5 L 62 29.5"
                  fill="#FEF08A"
                  stroke="#18181B"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Glowing Electric Cheeks */}
                <circle cx="38.5" cy="65.5" r="7.2" fill="url(#pikaCheekGrad)" />
                <circle cx="75.5" cy="65.5" r="7.2" fill="url(#pikaCheekGrad)" />

                {/* Dynamic Expressive Eyes (Cursor-Tracking + Blinking + Mood Expressions) */}
                {isDizzy ? (
                  <g>
                    <path
                      d="M 41 51 L 48 55 L 41 59"
                      fill="none"
                      stroke="#18181B"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 73 51 L 66 55 L 73 59"
                      fill="none"
                      stroke="#18181B"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                ) : isHappy ? (
                  <g>
                    <path
                      d="M 40 56 Q 45 49 50 56"
                      fill="none"
                      stroke="#18181B"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 64 56 Q 69 49 74 56"
                      fill="none"
                      stroke="#18181B"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                    />
                  </g>
                ) : isSleep || isBlinking ? (
                  <g>
                    <path
                      d="M 40 55 Q 45 58.5 50 55"
                      fill="none"
                      stroke="#18181B"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 64 55 Q 69 58.5 74 55"
                      fill="none"
                      stroke="#18181B"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                  </g>
                ) : (
                  <g
                    transform={`translate(${(facingRight ? -eyeOffset.x : eyeOffset.x).toFixed(2)}, ${eyeOffset.y.toFixed(2)})`}
                  >
                    <circle cx="45" cy="54.5" r="5.6" fill="#18181B" />
                    <circle cx="43.3" cy="52.6" r="2.2" fill="#FFFFFF" />
                    <circle cx="46.8" cy="56.5" r="1.0" fill="#FFFFFF" />
                    <circle cx="69" cy="54.5" r="5.6" fill="#18181B" />
                    <circle cx="67.3" cy="52.6" r="2.2" fill="#FFFFFF" />
                    <circle cx="70.8" cy="56.5" r="1.0" fill="#FFFFFF" />
                  </g>
                )}

                {/* Cute Nose */}
                <polygon points="55.5,58.5 58.5,58.5 57,60.5" fill="#18181B" />

                {/* Dynamic Mouth */}
                {isDizzy ? (
                  <path
                    d="M 52 67 Q 57 63 62 67"
                    fill="none"
                    stroke="#18181B"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                ) : isHappy ? (
                  <path
                    d="M 50 63 Q 57 66 64 63 C 64 71, 50 71, 50 63 Z"
                    fill="#F43F5E"
                    stroke="#18181B"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                ) : isSleep ? (
                  <circle cx="57" cy="65.5" r="2" fill="#F43F5E" stroke="#18181B" strokeWidth="1.5" />
                ) : (
                  <path
                    d="M 50 64 Q 53.5 67.5 57 64 Q 60.5 67.5 64 64"
                    fill="none"
                    stroke="#18181B"
                    strokeWidth="2.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* Dizzy Orbiting Gold Stars (Like Nero Frame 3!) */}
                {isDizzy && (
                  <g
                    transform={`translate(0, ${(Math.sin(walkPhase * 3) * 2.5).toFixed(2)})`}
                    fill="#FACC15"
                    stroke="#18181B"
                    strokeWidth="0.8"
                  >
                    <polygon points="45,14 46.8,18 51,18.5 47.8,21.2 48.8,25.5 45,23.2 41.2,25.5 42.2,21.2 39,18.5 43.2,18" />
                    <polygon points="62,9 63.4,12.2 67,12.6 64.2,14.8 65,18.2 62,16.4 59,18.2 59.8,14.8 57,12.6 60.6,12.2" />
                    <polygon points="75,16 76.4,19.2 80,19.6 77.2,21.8 78,25.2 75,23.4 72,25.2 72.8,21.8 70,19.6 73.6,19.2" />
                  </g>
                )}

                {/* Happy Cheek Lightning Bolts */}
                {isHappy && (
                  <g stroke="#22D3EE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
                    <polyline points="16,48 24,44 20,52 28,49" />
                    <polyline points="102,46 94,42 98,50 90,47" />
                  </g>
                )}

                {/* Sleeping Floating Zzz */}
                {isSleep && (
                  <g fill="#38BDF8" fontFamily="monospace" fontWeight="bold">
                    <text x="78" y="28" fontSize="11">
                      z
                    </text>
                    <text x="86" y="19" fontSize="14">
                      Z
                    </text>
                    <text x="96" y="9" fontSize="17">
                      Z
                    </text>
                  </g>
                )}

                {/* Interactive Click Spark Particles */}
                {sparks.map((s) => (
                  <circle key={s.id} cx={s.x + s.vx * 8} cy={s.y + s.vy * 8} r="3" fill={s.color} />
                ))}
              </g>
            </svg>
          </div>
        </div>
      )}

      {/* Subtle Bottom-Right Toggle Pill */}
      <button
        type="button"
        onClick={() => setEnabled((prev) => !prev)}
        className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-[#111625]/90 hover:bg-[#1a2238] text-slate-200 border border-slate-700/80 shadow-lg backdrop-blur-md transition-colors"
      >
        <span
          className={`w-2 h-2 rounded-full ${
            enabled ? 'bg-amber-400 animate-pulse' : 'bg-slate-500'
          }`}
        />
        <span>{enabled ? '⚡ Pika Avatar: ON' : '💤 Pika Avatar: OFF'}</span>
      </button>
    </>
  );
};

export default RoamingPikachu;
