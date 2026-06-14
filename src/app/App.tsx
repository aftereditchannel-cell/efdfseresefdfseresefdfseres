import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, MessageCircle, Compass, Phone, User } from "lucide-react";
import { SplashScreen } from "./components/SplashScreen";
import { LoginScreen, SignupScreen } from "./components/AuthScreens";
import { HomeScreen } from "./components/HomeScreen";
import { ChatScreen } from "./components/ChatScreen";
import { ChatsListScreen } from "./components/ChatsListScreen";
import { ExploreScreen } from "./components/ExploreScreen";
import { CallsScreen } from "./components/CallsScreen";
import { ProfileScreen } from "./components/ProfileScreen";

type Screen =
  | "splash"
  | "login"
  | "signup"
  | "home"
  | "chats"
  | "chat"
  | "explore"
  | "calls"
  | "profile";

const NAV_ITEMS = [
  { id: "home", icon: Home, label: "Home" },
  { id: "chats", icon: MessageCircle, label: "Chats" },
  { id: "explore", icon: Compass, label: "Explore" },
  { id: "calls", icon: Phone, label: "Calls" },
  { id: "profile", icon: User, label: "Profile" },
] as const;

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [activeNav, setActiveNav] = useState<"home" | "chats" | "explore" | "calls" | "profile">("home");
  const [activeChatId, setActiveChatId] = useState<number>(1);
  const [isDark, setIsDark] = useState(true);
  const [prevScreen, setPrevScreen] = useState<Screen | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.classList.toggle("light", !isDark);
  }, [isDark]);

  const navigate = (s: Screen) => {
    setPrevScreen(screen);
    setScreen(s);
  };

  const openChat = (id: number) => {
    setActiveChatId(id);
    navigate("chat");
  };

  const handleNavPress = (id: typeof activeNav) => {
    setActiveNav(id);
    navigate(id as Screen);
  };

  const showBottomNav = !["splash", "login", "signup", "chat"].includes(screen);

  const renderScreen = () => {
    switch (screen) {
      case "splash":
        return <SplashScreen onComplete={() => navigate("login")} />;
      case "login":
        return <LoginScreen onLogin={() => navigate("home")} onGoSignup={() => navigate("signup")} />;
      case "signup":
        return <SignupScreen onSignup={() => navigate("home")} onGoLogin={() => navigate("login")} />;
      case "home":
        return <HomeScreen onOpenChat={openChat} />;
      case "chats":
        return <ChatsListScreen onOpenChat={openChat} />;
      case "chat":
        return <ChatScreen chatId={activeChatId} onBack={() => navigate(prevScreen === "home" ? "home" : "chats")} />;
      case "explore":
        return <ExploreScreen />;
      case "calls":
        return <CallsScreen />;
      case "profile":
        return <ProfileScreen isDark={isDark} onToggleDark={() => setIsDark(!isDark)} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ background: isDark ? "#050510" : "#ede9fe" }}
    >
      {/* Phone frame */}
      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{
          width: 390,
          height: 844,
          borderRadius: 44,
          background: isDark ? "#0a0a14" : "#f5f3ff",
          boxShadow: isDark
            ? "0 0 0 1px rgba(168,85,247,0.15), 0 40px 120px rgba(0,0,0,0.8), 0 0 60px rgba(168,85,247,0.1) inset"
            : "0 0 0 1px rgba(124,58,237,0.2), 0 40px 120px rgba(0,0,0,0.3)",
        }}
      >
        {/* Status bar */}
        <div
          className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8"
          style={{ height: 44, paddingTop: 14 }}
        >
          <span className="text-xs font-semibold" style={{ color: isDark ? "#9b8ec4" : "#6b5b95" }}>9:41</span>
          <div className="absolute left-1/2 -translate-x-1/2 w-28 h-6 rounded-full"
            style={{ background: isDark ? "#0a0a14" : "#f5f3ff", top: 8 }} />
          <div className="flex items-center gap-1">
            <span className="text-xs" style={{ color: isDark ? "#9b8ec4" : "#6b5b95" }}>●●●</span>
            <span className="text-xs ml-1" style={{ color: isDark ? "#9b8ec4" : "#6b5b95" }}>🔋</span>
          </div>
        </div>

        {/* Screen content */}
        <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: 44 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              className="absolute inset-0"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom navigation */}
        <AnimatePresence>
          {showBottomNav && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 z-30"
              style={{ paddingBottom: 20 }}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div
                className="mx-4 rounded-3xl px-4 py-3 flex items-center justify-around"
                style={{
                  background: isDark ? "rgba(15,12,25,0.97)" : "rgba(255,255,255,0.97)",
                  backdropFilter: "blur(24px)",
                  border: `1px solid ${isDark ? "rgba(168,85,247,0.2)" : "rgba(124,58,237,0.15)"}`,
                  boxShadow: isDark
                    ? "0 -4px 40px rgba(0,0,0,0.5), 0 0 40px rgba(168,85,247,0.05)"
                    : "0 -4px 40px rgba(0,0,0,0.08)",
                }}
              >
                {NAV_ITEMS.map(({ id, icon: Icon, label }) => {
                  const isActive = activeNav === id;
                  return (
                    <motion.button
                      key={id}
                      className="flex flex-col items-center gap-0.5 relative"
                      style={{ minWidth: 52 }}
                      onClick={() => handleNavPress(id as typeof activeNav)}
                      whileTap={{ scale: 0.85 }}
                    >
                      {isActive && (
                        <motion.div
                          className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full"
                          style={{ background: "linear-gradient(90deg, #a855f7, #ec4899)" }}
                          layoutId="navIndicator"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <div
                        className="w-10 h-8 rounded-xl flex items-center justify-center"
                        style={{
                          background: isActive
                            ? isDark ? "rgba(168,85,247,0.18)" : "rgba(168,85,247,0.1)"
                            : "transparent",
                        }}
                      >
                        <Icon
                          size={20}
                          style={{
                            color: isActive ? "#a855f7" : isDark ? "#9b8ec4" : "#6b5b95",
                            strokeWidth: isActive ? 2.5 : 1.8,
                          }}
                        />
                      </div>
                      <span
                        className="text-xs"
                        style={{
                          color: isActive ? "#a855f7" : isDark ? "#9b8ec4" : "#6b5b95",
                          fontWeight: isActive ? 600 : 400,
                        }}
                      >
                        {label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle scanline texture */}
        <div className="absolute inset-0 pointer-events-none rounded-[44px] overflow-hidden">
          <div className="absolute inset-0 opacity-[0.012]"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)",
            }} />
        </div>
      </div>

      {/* Controls outside phone */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <button
          className="text-xs px-4 py-2 rounded-full font-medium transition-all"
          style={{ background: "rgba(168,85,247,0.18)", color: "#c4b5fd", border: "1px solid rgba(168,85,247,0.3)" }}
          onClick={() => setIsDark(!isDark)}>
          {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
        <button
          className="text-xs px-4 py-2 rounded-full font-medium"
          style={{ background: "rgba(236,72,153,0.15)", color: "#ec4899", border: "1px solid rgba(236,72,153,0.3)" }}
          onClick={() => { navigate("splash"); setActiveNav("home"); }}>
          ↺ Restart
        </button>
      </div>
    </div>
  );
}
