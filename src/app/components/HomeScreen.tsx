import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bell, Search, Heart, X, MessageCircle, UserPlus, Zap, MapPin } from "lucide-react";

const stories = [
  { id: 1, name: "You", avatar: "https://images.unsplash.com/photo-1583692331507-fc0bd348695d?w=80&h=80&fit=crop", hasStory: false, isMe: true },
  { id: 2, name: "Luna", avatar: "https://images.unsplash.com/photo-1674932668403-33398b81c92f?w=80&h=80&fit=crop", hasStory: true },
  { id: 3, name: "Alex", avatar: "https://images.unsplash.com/photo-1587397845856-e6cf49176c70?w=80&h=80&fit=crop", hasStory: true },
  { id: 4, name: "Sofia", avatar: "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?w=80&h=80&fit=crop", hasStory: true },
  { id: 5, name: "Kai", avatar: "https://images.unsplash.com/photo-1545996124-0501ebae84d0?w=80&h=80&fit=crop", hasStory: true },
  { id: 6, name: "Zoe", avatar: "https://images.unsplash.com/photo-1644718847160-52a922094f69?w=80&h=80&fit=crop", hasStory: true },
  { id: 7, name: "Max", avatar: "https://images.unsplash.com/photo-1600603406200-5b2a104684ac?w=80&h=80&fit=crop", hasStory: false },
];

const chats = [
  { id: 1, name: "Luna ✨", avatar: "https://images.unsplash.com/photo-1674932668403-33398b81c92f?w=80&h=80&fit=crop", lastMsg: "heyy are you free tonight? 🌙", time: "2m", unread: 3, online: true },
  { id: 2, name: "Alex", avatar: "https://images.unsplash.com/photo-1587397845856-e6cf49176c70?w=80&h=80&fit=crop", lastMsg: "sent a voice message 🎙", time: "15m", unread: 1, online: false },
  { id: 3, name: "Sofia 💕", avatar: "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?w=80&h=80&fit=crop", lastMsg: "omg same!! 😭", time: "1h", unread: 0, online: true },
  { id: 4, name: "Kai", avatar: "https://images.unsplash.com/photo-1545996124-0501ebae84d0?w=80&h=80&fit=crop", lastMsg: "You: see you tomorrow", time: "3h", unread: 0, online: false },
  { id: 5, name: "Zoe 🌸", avatar: "https://images.unsplash.com/photo-1644718847160-52a922094f69?w=80&h=80&fit=crop", lastMsg: "📷 Photo", time: "5h", unread: 0, online: true },
];

const matchCards = [
  {
    id: 1,
    name: "Luna",
    age: 23,
    photo: "https://images.unsplash.com/photo-1762954419103-43708f0cf893?w=400&h=600&fit=crop",
    location: "2.3 km away",
    tags: ["💫 Adventurous", "🎵 Music Lover", "🌈 Gay"],
    match: 94,
  },
  {
    id: 2,
    name: "Sofia",
    age: 25,
    photo: "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?w=400&h=600&fit=crop",
    location: "5.1 km away",
    tags: ["🎨 Creative", "☕ Coffee Addict", "🌸 Lesbian"],
    match: 87,
  },
  {
    id: 3,
    name: "Zoe",
    age: 21,
    photo: "https://images.unsplash.com/photo-1644718847160-52a922094f69?w=400&h=600&fit=crop",
    location: "1.8 km away",
    tags: ["🌙 Night Owl", "🎮 Gamer", "⚡ Bisexual"],
    match: 79,
  },
];

interface Props {
  onOpenChat: (chatId: number) => void;
}

export function HomeScreen({ onOpenChat }: Props) {
  const [cardIndex, setCardIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [liked, setLiked] = useState<number[]>([]);
  const [passed, setPassed] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewingStory, setViewingStory] = useState<number | null>(null);

  const currentCard = matchCards[cardIndex % matchCards.length];

  const handleLike = () => {
    setLiked([...liked, currentCard.id]);
    setCardIndex((i) => i + 1);
  };

  const handlePass = () => {
    setPassed([...passed, currentCard.id]);
    setCardIndex((i) => i + 1);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: "#0a0a14" }}>

      {/* Story viewer overlay */}
      <AnimatePresence>
        {viewingStory !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.9)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewingStory(null)}
          >
            <div className="w-full max-w-sm aspect-[9/16] rounded-2xl overflow-hidden relative">
              <img src={stories.find(s => s.id === viewingStory)?.avatar.replace("w=80&h=80", "w=400&h=600")}
                className="w-full h-full object-cover" alt="story" />
              <div className="absolute top-4 left-4 right-4 h-1 rounded-full bg-white/30 overflow-hidden">
                <motion.div className="h-full bg-white rounded-full"
                  initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 5 }} />
              </div>
              <div className="absolute top-8 left-4 flex items-center gap-2">
                <img src={stories.find(s => s.id === viewingStory)?.avatar} className="w-8 h-8 rounded-full object-cover" alt="" />
                <span className="text-white text-sm font-semibold">{stories.find(s => s.id === viewingStory)?.name}</span>
              </div>
              <div className="absolute bottom-6 left-4 right-4">
                <div className="flex items-center gap-3 rounded-2xl px-4 py-3" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(20px)" }}>
                  <input className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/50" placeholder="Reply to story..." />
                  <span className="text-white">❤️</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="sticky top-0 z-20 px-5 pt-12 pb-3"
        style={{ background: "rgba(10,10,20,0.9)", backdropFilter: "blur(20px)" }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#f0eeff" }}>Fake Market</h1>
            <p className="text-xs" style={{ color: "#9b8ec4" }}>Find your vibe 💜</p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button className="w-10 h-10 rounded-2xl flex items-center justify-center relative"
              style={{ background: "rgba(255,255,255,0.08)" }}
              whileTap={{ scale: 0.9 }}>
              <Bell size={18} style={{ color: "#c4b5fd" }} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: "#ec4899" }} />
            </motion.button>
            <img src="https://images.unsplash.com/photo-1583692331507-fc0bd348695d?w=80&h=80&fit=crop"
              className="w-10 h-10 rounded-2xl object-cover border-2"
              style={{ borderColor: "#a855f7" }} alt="profile" />
          </div>
        </div>

        {/* Search bar */}
        <div className="flex items-center gap-3 rounded-2xl px-4 py-3"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(168,85,247,0.2)" }}>
          <Search size={16} style={{ color: "#9b8ec4" }} />
          <input
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "#f0eeff" }}
            placeholder="Search people, chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="px-5 pb-24 flex flex-col gap-6">
        {/* Stories */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold" style={{ color: "#f0eeff" }}>Stories</h2>
            <button className="text-xs font-medium" style={{ color: "#a855f7" }}>See all</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {stories.map((story) => (
              <motion.div key={story.id} className="flex flex-col items-center gap-1.5 flex-shrink-0"
                whileTap={{ scale: 0.95 }} onClick={() => !story.isMe && setViewingStory(story.id)}>
                <div className={`w-16 h-16 rounded-2xl p-0.5 ${story.hasStory ? "" : ""}`}
                  style={{
                    background: story.hasStory
                      ? "linear-gradient(135deg, #a855f7, #ec4899)"
                      : story.isMe ? "rgba(168,85,247,0.3)" : "rgba(255,255,255,0.1)",
                  }}>
                  <div className="w-full h-full rounded-xl overflow-hidden relative"
                    style={{ background: "#1a1030" }}>
                    {story.isMe ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-2xl">+</span>
                      </div>
                    ) : (
                      <img src={story.avatar} className="w-full h-full object-cover" alt={story.name} />
                    )}
                  </div>
                </div>
                <span className="text-xs" style={{ color: story.hasStory ? "#c4b5fd" : "#9b8ec4" }}>
                  {story.isMe ? "Add" : story.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Match card */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold" style={{ color: "#f0eeff" }}>Discover</h2>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full"
              style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)" }}>
              <Zap size={12} style={{ color: "#a855f7" }} />
              <span className="text-xs font-medium" style={{ color: "#a855f7" }}>AI Match</span>
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div key={cardIndex}
              className="relative rounded-3xl overflow-hidden"
              style={{ height: 360 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDrag={(_, info) => setDragX(info.offset.x)}
              onDragEnd={(_, info) => {
                if (info.offset.x > 80) handleLike();
                else if (info.offset.x < -80) handlePass();
                setDragX(0);
              }}
              animate={{ rotate: dragX / 30 }}
              initial={{ opacity: 0, scale: 0.9 }}
              exit={{ opacity: 0, x: dragX > 0 ? 200 : -200, rotate: dragX > 0 ? 20 : -20 }}
              whileTap={{ cursor: "grabbing" }}
            >
              <img src={currentCard.photo} className="w-full h-full object-cover" alt={currentCard.name} />
              {/* Gradient overlay */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)" }} />

              {/* Like/Nope indicators */}
              {dragX > 20 && (
                <div className="absolute top-6 left-6 px-4 py-2 rounded-xl border-2 border-green-400 rotate-[-12deg]">
                  <span className="text-green-400 font-bold text-lg">LIKE 💚</span>
                </div>
              )}
              {dragX < -20 && (
                <div className="absolute top-6 right-6 px-4 py-2 rounded-xl border-2 border-red-400 rotate-[12deg]">
                  <span className="text-red-400 font-bold text-lg">NOPE ✕</span>
                </div>
              )}

              {/* Match % badge */}
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full"
                style={{ background: "rgba(168,85,247,0.9)", backdropFilter: "blur(10px)" }}>
                <span className="text-white text-xs font-bold">⚡ {currentCard.match}% match</span>
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-end justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{currentCard.name}, {currentCard.age}</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin size={12} className="text-white/70" />
                      <span className="text-xs text-white/70">{currentCard.location}</span>
                    </div>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-green-400" style={{ boxShadow: "0 0 8px #4ade80" }} />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {currentCard.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-full text-xs text-white"
                      style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Action buttons */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <motion.button
              className="w-14 h-14 rounded-full flex items-center justify-center border-2"
              style={{ background: "rgba(239,68,68,0.1)", borderColor: "rgba(239,68,68,0.4)" }}
              onClick={handlePass} whileTap={{ scale: 0.9 }}>
              <X size={22} style={{ color: "#ef4444" }} />
            </motion.button>
            <motion.button
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: "rgba(168,85,247,0.15)", border: "2px solid rgba(168,85,247,0.4)" }}
              whileTap={{ scale: 0.9 }}>
              <UserPlus size={20} style={{ color: "#a855f7" }} />
            </motion.button>
            <motion.button
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)", boxShadow: "0 8px 24px rgba(168,85,247,0.5)" }}
              onClick={handleLike} whileTap={{ scale: 0.9 }}>
              <Heart size={26} className="text-white" fill="white" />
            </motion.button>
            <motion.button
              className="w-14 h-14 rounded-full flex items-center justify-center border-2"
              style={{ background: "rgba(236,72,153,0.1)", borderColor: "rgba(236,72,153,0.4)" }}
              onClick={() => onOpenChat(1)} whileTap={{ scale: 0.9 }}>
              <MessageCircle size={20} style={{ color: "#ec4899" }} />
            </motion.button>
          </div>
        </div>

        {/* Chats */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold" style={{ color: "#f0eeff" }}>Recent Chats</h2>
            <button className="text-xs font-medium" style={{ color: "#a855f7" }}>See all</button>
          </div>
          <div className="flex flex-col gap-1">
            {chats
              .filter(c => !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((chat) => (
                <motion.div key={chat.id}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                  whileTap={{ scale: 0.98, background: "rgba(168,85,247,0.1)" }}
                  onClick={() => onOpenChat(chat.id)}>
                  <div className="relative flex-shrink-0">
                    <img src={chat.avatar} className="w-12 h-12 rounded-2xl object-cover" alt={chat.name} />
                    {chat.online && (
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 bg-green-400"
                        style={{ borderColor: "#0a0a14", boxShadow: "0 0 6px #4ade80" }} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm" style={{ color: "#f0eeff" }}>{chat.name}</span>
                      <span className="text-xs" style={{ color: "#9b8ec4" }}>{chat.time}</span>
                    </div>
                    <p className="text-xs truncate mt-0.5" style={{ color: "#9b8ec4" }}>{chat.lastMsg}</p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}>
                      <span className="text-xs font-bold text-white">{chat.unread}</span>
                    </div>
                  )}
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
