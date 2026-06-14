import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const identityTags = [
  { label: "Gay", color: "from-pink-500 to-purple-600" },
  { label: "Lesbian", color: "from-orange-400 to-pink-600" },
  { label: "Straight", color: "from-blue-500 to-cyan-400" },
  { label: "Bisexual", color: "from-pink-400 to-blue-500" },
  { label: "Femboy", color: "from-pink-300 to-purple-400" },
  { label: "Tomboy", color: "from-indigo-500 to-violet-500" },
  { label: "Non-binary", color: "from-yellow-400 to-purple-500" },
  { label: "Trans", color: "from-cyan-400 to-pink-400" },
  { label: "Queer", color: "from-purple-500 to-pink-500" },
  { label: "Pansexual", color: "from-yellow-400 to-pink-500" },
  { label: "Ace", color: "from-gray-400 to-purple-500" },
  { label: "Bottom", color: "from-pink-500 to-red-400" },
];

const tagPositions = [
  { x: -80, y: -140, rotation: -15, delay: 0 },
  { x: 60, y: -160, rotation: 10, delay: 0.1 },
  { x: -120, y: -60, rotation: -8, delay: 0.2 },
  { x: 80, y: -80, rotation: 12, delay: 0.3 },
  { x: -100, y: 40, rotation: -5, delay: 0.4 },
  { x: 90, y: 20, rotation: 8, delay: 0.5 },
  { x: -60, y: 120, rotation: -12, delay: 0.6 },
  { x: 70, y: 110, rotation: 6, delay: 0.7 },
  { x: -130, y: 160, rotation: -10, delay: 0.8 },
  { x: 50, y: 180, rotation: 15, delay: 0.9 },
  { x: 120, y: 150, rotation: -7, delay: 1.0 },
  { x: -20, y: 200, rotation: 3, delay: 1.1 },
];

interface Props {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return p + 2.2;
      });
    }, 66);
    return () => clearInterval(interval);
  }, [onComplete]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0d0820 0%, #0a0a14 50%, #120a1e 100%)" }}>

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #a855f7 0%, transparent 70%)" }} />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #ec4899 0%, transparent 70%)" }} />
      </div>

      {/* Floating identity tags */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {identityTags.map((tag, i) => {
          const pos = tagPositions[i];
          const isSelected = selectedTags.includes(tag.label);
          return (
            <motion.button
              key={tag.label}
              className={`absolute px-3 py-1.5 rounded-full text-xs font-semibold text-white cursor-pointer pointer-events-auto border`}
              style={{
                left: `calc(50% + ${pos.x}px)`,
                top: `calc(50% + ${pos.y}px)`,
                background: isSelected ? `linear-gradient(135deg, ${tag.color.replace("from-", "").replace(" to-", ", ")})` : "rgba(255,255,255,0.08)",
                borderColor: isSelected ? "transparent" : "rgba(255,255,255,0.15)",
                boxShadow: isSelected ? "0 0 16px rgba(168,85,247,0.5)" : "none",
              }}
              initial={{ opacity: 0, scale: 0, rotate: pos.rotation }}
              animate={{
                opacity: [0, 1, 0.85, 1],
                scale: 1,
                rotate: pos.rotation,
                y: [0, -8, 0],
              }}
              transition={{
                opacity: { delay: pos.delay, duration: 0.5 },
                scale: { delay: pos.delay, duration: 0.4, type: "spring" },
                y: { delay: pos.delay + 1, duration: 3, repeat: Infinity, repeatType: "mirror" },
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleTag(tag.label)}
            >
              {tag.label}
            </motion.button>
          );
        })}
      </div>

      {/* Center logo */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
      >
        {/* Logo mark */}
        <div className="relative">
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
              boxShadow: "0 0 40px rgba(168,85,247,0.6), 0 0 80px rgba(236,72,153,0.3)"
            }}>
            <span className="text-4xl">💜</span>
          </div>
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)", opacity: 0.4 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight"
            style={{ background: "linear-gradient(135deg, #e9d5ff, #fce7f3)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Fake Market
          </h1>
          <p className="text-sm mt-1" style={{ color: "#9b8ec4" }}>Connect. Chat. Match.</p>
        </div>

        {/* Progress bar */}
        <div className="w-48 mt-4">
          <div className="flex justify-between text-xs mb-1.5" style={{ color: "#9b8ec4" }}>
            <span>Loading...</span>
            <span>{Math.min(100, Math.round(progress))}%</span>
          </div>
          <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #a855f7, #ec4899)" }}
              animate={{ width: `${Math.min(100, progress)}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
