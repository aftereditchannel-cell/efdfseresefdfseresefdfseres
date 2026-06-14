import { useState } from "react";
import { motion } from "motion/react";
import { Search, Filter, MapPin, Heart, UserPlus, Zap, TrendingUp, BookOpen, Radio } from "lucide-react";

const explorePeople = [
  { id: 1, name: "Luna", age: 23, photo: "https://images.unsplash.com/photo-1762954419103-43708f0cf893?w=300&h=400&fit=crop", tags: ["Gay", "Music"], distance: "2.3 km", online: true, match: 94 },
  { id: 2, name: "Alex", age: 28, photo: "https://images.unsplash.com/photo-1587397845856-e6cf49176c70?w=300&h=400&fit=crop", tags: ["Straight", "Art"], distance: "4.1 km", online: false, match: 72 },
  { id: 3, name: "Sofia", age: 25, photo: "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?w=300&h=400&fit=crop", tags: ["Lesbian", "Travel"], distance: "1.2 km", online: true, match: 87 },
  { id: 4, name: "Kai", age: 22, photo: "https://images.unsplash.com/photo-1545996124-0501ebae84d0?w=300&h=400&fit=crop", tags: ["Bisexual", "Fitness"], distance: "6.8 km", online: false, match: 68 },
  { id: 5, name: "Zoe", age: 24, photo: "https://images.unsplash.com/photo-1644718847160-52a922094f69?w=300&h=400&fit=crop", tags: ["Non-binary", "Gaming"], distance: "3.5 km", online: true, match: 91 },
  { id: 6, name: "Max", age: 26, photo: "https://images.unsplash.com/photo-1614321375197-c5083895b054?w=300&h=400&fit=crop", tags: ["Gay", "Yoga"], distance: "0.8 km", online: true, match: 83 },
];

const articles = [
  { id: 1, title: "Finding Connection in the Digital Age", category: "Relationships", time: "5 min read", emoji: "💕" },
  { id: 2, title: "The Power of Being Authentic Online", category: "Lifestyle", time: "3 min read", emoji: "✨" },
  { id: 3, title: "LGBTQ+ Safe Spaces in Your City", category: "Community", time: "7 min read", emoji: "🌈" },
  { id: 4, title: "How AI is Changing Dating Apps", category: "Tech", time: "4 min read", emoji: "🤖" },
];

const liveStreams = [
  { id: 1, name: "Luna Live 🌙", avatar: "https://images.unsplash.com/photo-1762954419103-43708f0cf893?w=80&h=80&fit=crop", viewers: 1240, topic: "Late night vibes 🌃" },
  { id: 2, name: "Sofia Art", avatar: "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?w=80&h=80&fit=crop", viewers: 438, topic: "Drawing portraits ✏️" },
];

const filters = ["Everyone", "Gay", "Lesbian", "Bisexual", "Straight", "Non-binary", "Trans"];

export function ExploreScreen() {
  const [activeFilter, setActiveFilter] = useState("Everyone");
  const [activeTab, setActiveTab] = useState<"people" | "blog" | "live">("people");
  const [likedIds, setLikedIds] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLikedIds((prev) => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filtered = explorePeople.filter(p =>
    activeFilter === "Everyone" || p.tags.some(t => t === activeFilter)
  );

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: "#0a0a14" }}>
      {/* Header */}
      <div className="sticky top-0 z-20 px-5 pt-12 pb-3"
        style={{ background: "rgba(10,10,20,0.9)", backdropFilter: "blur(20px)" }}>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold" style={{ color: "#f0eeff" }}>Explore</h1>
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full"
            style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)" }}>
            <Zap size={12} style={{ color: "#a855f7" }} />
            <span className="text-xs font-medium" style={{ color: "#a855f7" }}>AI Suggestions</span>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 rounded-2xl px-4 py-3 mb-4"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(168,85,247,0.2)" }}>
          <Search size={16} style={{ color: "#9b8ec4" }} />
          <input className="flex-1 bg-transparent text-sm outline-none" style={{ color: "#f0eeff" }} placeholder="Search people, topics..." />
          <button style={{ color: "#9b8ec4" }}><Filter size={16} /></button>
        </div>

        {/* Tabs */}
        <div className="flex rounded-2xl p-1 gap-1" style={{ background: "rgba(255,255,255,0.05)" }}>
          {(["people", "blog", "live"] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="flex-1 py-2 rounded-xl text-sm font-medium capitalize transition-all"
              style={{
                background: activeTab === tab ? "linear-gradient(135deg, #a855f7, #ec4899)" : "transparent",
                color: activeTab === tab ? "white" : "#9b8ec4",
              }}>
              {tab === "live" ? "🔴 Live" : tab === "blog" ? "📖 Blog" : "👥 People"}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pb-24 flex flex-col gap-4">
        {activeTab === "people" && (
          <>
            {/* Filter chips */}
            <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
              {filters.map((f) => (
                <button key={f} onClick={() => setActiveFilter(f)}
                  className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all"
                  style={{
                    background: activeFilter === f ? "linear-gradient(135deg, #a855f7, #ec4899)" : "rgba(255,255,255,0.07)",
                    color: activeFilter === f ? "white" : "#9b8ec4",
                    border: activeFilter === f ? "none" : "1px solid rgba(168,85,247,0.2)",
                  }}>
                  {f}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-3">
              {filtered.map((person) => (
                <motion.div key={person.id}
                  className="relative rounded-3xl overflow-hidden"
                  style={{ height: 220 }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileTap={{ scale: 0.97 }}>
                  <img src={person.photo} className="w-full h-full object-cover" alt={person.name} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)" }} />

                  {person.online && (
                    <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)" }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <span className="text-xs text-white">online</span>
                    </div>
                  )}

                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(168,85,247,0.8)", backdropFilter: "blur(10px)" }}>
                    <span className="text-xs text-white font-bold">{person.match}%</span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white font-semibold text-sm">{person.name}, {person.age}</p>
                    <div className="flex items-center gap-1 mb-2">
                      <MapPin size={10} className="text-white/60" />
                      <span className="text-xs text-white/60">{person.distance}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        {person.tags.slice(0, 1).map((tag) => (
                          <span key={tag} className="text-xs px-2 py-0.5 rounded-full text-white"
                            style={{ background: "rgba(168,85,247,0.6)" }}>{tag}</span>
                        ))}
                      </div>
                      <motion.button
                        className="w-7 h-7 rounded-full flex items-center justify-center"
                        style={{ background: likedIds.includes(person.id) ? "linear-gradient(135deg, #a855f7, #ec4899)" : "rgba(255,255,255,0.2)" }}
                        onClick={() => toggleLike(person.id)}
                        whileTap={{ scale: 0.85 }}>
                        <Heart size={14} className="text-white" fill={likedIds.includes(person.id) ? "white" : "none"} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {activeTab === "blog" && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-2xl"
              style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(236,72,153,0.1))", border: "1px solid rgba(168,85,247,0.2)" }}>
              <TrendingUp size={16} style={{ color: "#a855f7" }} />
              <span className="text-sm font-medium" style={{ color: "#c4b5fd" }}>Trending this week</span>
            </div>
            {articles.map((article) => (
              <motion.div key={article.id}
                className="flex items-center gap-4 p-4 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(168,85,247,0.1)" }}
                whileTap={{ scale: 0.98 }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: "rgba(168,85,247,0.15)" }}>
                  {article.emoji}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm" style={{ color: "#f0eeff" }}>{article.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(168,85,247,0.2)", color: "#c4b5fd" }}>
                      {article.category}
                    </span>
                    <span className="text-xs" style={{ color: "#9b8ec4" }}>{article.time}</span>
                  </div>
                </div>
                <BookOpen size={16} style={{ color: "#9b8ec4" }} />
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "live" && (
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium" style={{ color: "#9b8ec4" }}>🔴 LIVE NOW</p>
            {liveStreams.map((stream) => (
              <motion.div key={stream.id}
                className="relative rounded-3xl overflow-hidden"
                style={{ height: 200 }}
                whileTap={{ scale: 0.97 }}>
                <img src={stream.avatar.replace("w=80&h=80", "w=400&h=300")} className="w-full h-full object-cover" alt={stream.name} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)" }} />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full"
                  style={{ background: "rgba(239,68,68,0.9)" }}>
                  <motion.div className="w-2 h-2 rounded-full bg-white" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                  <span className="text-xs text-white font-bold">LIVE</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-semibold">{stream.name}</p>
                  <p className="text-white/70 text-sm">{stream.topic}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-white/60">👁 {stream.viewers.toLocaleString()} watching</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
