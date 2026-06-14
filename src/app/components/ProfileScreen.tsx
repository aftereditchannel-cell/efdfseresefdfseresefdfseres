import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Edit2, Camera, Settings, Heart, Users, Eye, Grid, Bookmark, Bell, Shield, Moon, Sun,
  LogOut, ChevronRight, Share2, Star, Zap, Check
} from "lucide-react";

const myPosts = [
  "https://images.unsplash.com/photo-1762954419103-43708f0cf893?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1644718847160-52a922094f69?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1674932668403-33398b81c92f?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1779675257929-ae3dbf2ad924?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1776356678917-4f44b8c91a7b?w=200&h=200&fit=crop",
];

const interests = ["🎵 Music", "✈️ Travel", "🎨 Art", "🌈 LGBTQ+", "🎮 Gaming", "🌿 Nature"];
const identities = ["Gay", "Lesbian", "Bisexual", "Straight", "Non-binary", "Trans", "Queer", "Pansexual"];

interface Props {
  isDark: boolean;
  onToggleDark: () => void;
}

export function ProfileScreen({ isDark, onToggleDark }: Props) {
  const [activeTab, setActiveTab] = useState<"posts" | "saved">("posts");
  const [editing, setEditing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [bio, setBio] = useState("just vibing ✨ | music lover 🎵 | she/her | 🌈 proud");
  const [selectedIdentity, setSelectedIdentity] = useState("Gay");
  const [name, setName] = useState("Alex Rivera");
  const [username, setUsername] = useState("@alex.rivera");

  const stats = [
    { label: "Posts", value: "42" },
    { label: "Followers", value: "2.4K" },
    { label: "Following", value: "386" },
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: "#0a0a14" }}>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            className="absolute inset-0 z-40 flex flex-col"
            style={{ background: "#0a0a14" }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25 }}>
            <div className="px-5 pt-14 pb-4 flex items-center gap-3 border-b"
              style={{ borderColor: "rgba(168,85,247,0.15)" }}>
              <motion.button className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.06)" }}
                onClick={() => setShowSettings(false)} whileTap={{ scale: 0.9 }}>
                <ChevronRight size={18} style={{ color: "#c4b5fd", transform: "rotate(180deg)" }} />
              </motion.button>
              <h2 className="text-lg font-bold" style={{ color: "#f0eeff" }}>Settings</h2>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {/* Dark mode */}
              <div className="flex items-center justify-between py-4 border-b"
                style={{ borderColor: "rgba(168,85,247,0.1)" }}>
                <div className="flex items-center gap-3">
                  {isDark ? <Moon size={18} style={{ color: "#a855f7" }} /> : <Sun size={18} style={{ color: "#f59e0b" }} />}
                  <span className="text-sm font-medium" style={{ color: "#f0eeff" }}>Dark Mode</span>
                </div>
                <motion.button
                  className="w-12 h-6 rounded-full relative"
                  style={{ background: isDark ? "linear-gradient(135deg, #a855f7, #ec4899)" : "rgba(255,255,255,0.2)" }}
                  onClick={onToggleDark} whileTap={{ scale: 0.97 }}>
                  <motion.div className="absolute top-0.5 w-5 h-5 rounded-full bg-white"
                    animate={{ left: isDark ? "calc(100% - 22px)" : "2px" }}
                    transition={{ type: "spring", stiffness: 300 }} />
                </motion.button>
              </div>

              {[
                { icon: Bell, label: "Notifications", sub: "Push, email, SMS" },
                { icon: Shield, label: "Privacy", sub: "Who can see your profile" },
                { icon: Heart, label: "Matching Preferences", sub: "Distance, age range, identity" },
                { icon: Share2, label: "Invite Friends", sub: "Earn rewards for referrals" },
                { icon: Star, label: "Fake Market Premium", sub: "Unlock AI matching + more" },
              ].map(({ icon: Icon, label, sub }) => (
                <motion.div key={label}
                  className="flex items-center gap-3 py-4 border-b cursor-pointer"
                  style={{ borderColor: "rgba(168,85,247,0.1)" }}
                  whileTap={{ background: "rgba(168,85,247,0.05)" }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(168,85,247,0.12)" }}>
                    <Icon size={16} style={{ color: "#a855f7" }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: "#f0eeff" }}>{label}</p>
                    <p className="text-xs" style={{ color: "#9b8ec4" }}>{sub}</p>
                  </div>
                  <ChevronRight size={16} style={{ color: "#9b8ec4" }} />
                </motion.div>
              ))}

              <motion.button
                className="flex items-center gap-3 py-4 w-full"
                whileTap={{ scale: 0.98 }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(239,68,68,0.12)" }}>
                  <LogOut size={16} style={{ color: "#ef4444" }} />
                </div>
                <span className="text-sm font-medium" style={{ color: "#ef4444" }}>Sign Out</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header area */}
      <div className="relative">
        {/* Cover */}
        <div className="h-36 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #581c87 0%, #831843 50%, #1e1b4b 100%)" }}>
          <div className="absolute inset-0 opacity-30"
            style={{ backgroundImage: "radial-gradient(circle at 30% 50%, rgba(168,85,247,0.6), transparent 50%), radial-gradient(circle at 70% 30%, rgba(236,72,153,0.6), transparent 50%)" }} />
        </div>

        {/* Avatar + top actions */}
        <div className="px-5">
          <div className="flex items-end justify-between -mt-10 mb-3">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1583692331507-fc0bd348695d?w=120&h=120&fit=crop"
                className="w-20 h-20 rounded-3xl object-cover border-4"
                style={{ borderColor: "#0a0a14" }} alt="Profile" />
              <motion.button
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}
                whileTap={{ scale: 0.9 }}>
                <Camera size={12} className="text-white" />
              </motion.button>
            </div>
            <div className="flex gap-2 pb-1">
              <motion.button onClick={() => setShowSettings(true)}
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.08)" }}
                whileTap={{ scale: 0.9 }}>
                <Settings size={16} style={{ color: "#c4b5fd" }} />
              </motion.button>
              <motion.button
                onClick={() => setEditing(!editing)}
                className="px-4 h-9 rounded-xl flex items-center gap-1.5"
                style={{
                  background: editing ? "linear-gradient(135deg, #a855f7, #ec4899)" : "rgba(255,255,255,0.08)",
                  border: editing ? "none" : "1px solid rgba(168,85,247,0.3)",
                }}
                whileTap={{ scale: 0.97 }}>
                {editing ? <Check size={14} className="text-white" /> : <Edit2 size={14} style={{ color: "#c4b5fd" }} />}
                <span className="text-xs font-medium" style={{ color: editing ? "white" : "#c4b5fd" }}>
                  {editing ? "Save" : "Edit"}
                </span>
              </motion.button>
            </div>
          </div>

          {/* Info */}
          {editing ? (
            <div className="flex flex-col gap-3 mb-4">
              <input className="px-3 py-2 rounded-xl text-sm font-bold outline-none"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(168,85,247,0.3)", color: "#f0eeff" }}
                value={name} onChange={(e) => setName(e.target.value)} />
              <input className="px-3 py-2 rounded-xl text-sm outline-none"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(168,85,247,0.3)", color: "#9b8ec4" }}
                value={username} onChange={(e) => setUsername(e.target.value)} />
              <textarea className="px-3 py-2 rounded-xl text-sm outline-none resize-none"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(168,85,247,0.3)", color: "#f0eeff" }}
                rows={2} value={bio} onChange={(e) => setBio(e.target.value)} />
              <div className="flex flex-wrap gap-2">
                {identities.map((id) => (
                  <button key={id} onClick={() => setSelectedIdentity(id)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all"
                    style={{
                      background: selectedIdentity === id ? "linear-gradient(135deg, #a855f7, #ec4899)" : "rgba(255,255,255,0.06)",
                      borderColor: selectedIdentity === id ? "transparent" : "rgba(168,85,247,0.2)",
                      color: selectedIdentity === id ? "white" : "#9b8ec4",
                    }}>{id}</button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold" style={{ color: "#f0eeff" }}>{name}</h2>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                  style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(236,72,153,0.3))", border: "1px solid rgba(168,85,247,0.4)" }}>
                  <Zap size={10} style={{ color: "#a855f7" }} />
                  <span className="text-xs" style={{ color: "#c4b5fd" }}>{selectedIdentity}</span>
                </div>
              </div>
              <p className="text-sm mt-0.5" style={{ color: "#9b8ec4" }}>{username} · 23 years old</p>
              <p className="text-sm mt-2" style={{ color: "#c4b5fd" }}>{bio}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {interests.map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full"
                    style={{ background: "rgba(168,85,247,0.12)", color: "#c4b5fd", border: "1px solid rgba(168,85,247,0.2)" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="flex rounded-2xl overflow-hidden border mb-5"
            style={{ borderColor: "rgba(168,85,247,0.15)" }}>
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex-1 text-center py-3"
                style={{ borderRight: i < 2 ? "1px solid rgba(168,85,247,0.15)" : "none" }}>
                <p className="text-lg font-bold" style={{ color: "#f0eeff" }}>{stat.value}</p>
                <p className="text-xs" style={{ color: "#9b8ec4" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-5 gap-2 mb-4">
        {(["posts", "saved"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 capitalize"
            style={{
              background: activeTab === tab ? "linear-gradient(135deg, #a855f7, #ec4899)" : "rgba(255,255,255,0.06)",
              color: activeTab === tab ? "white" : "#9b8ec4",
            }}>
            {tab === "posts" ? <Grid size={14} /> : <Bookmark size={14} />}
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-0.5 px-0 pb-24">
        {myPosts.map((photo, i) => (
          <motion.div key={i} className="aspect-square overflow-hidden relative"
            whileTap={{ opacity: 0.8 }}>
            <img src={photo} className="w-full h-full object-cover" alt="" />
            {i === 0 && (
              <div className="absolute top-2 right-2">
                <span className="text-lg">⭐</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
