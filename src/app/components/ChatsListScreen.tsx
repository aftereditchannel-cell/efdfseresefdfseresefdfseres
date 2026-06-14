import { useState } from "react";
import { motion } from "motion/react";
import { Search, Edit, Archive, Star, Pin } from "lucide-react";

const allChats = [
  { id: 1, name: "Luna ✨", avatar: "https://images.unsplash.com/photo-1674932668403-33398b81c92f?w=80&h=80&fit=crop", lastMsg: "heyy are you free tonight? 🌙", time: "2m", unread: 3, online: true, pinned: true },
  { id: 2, name: "Alex", avatar: "https://images.unsplash.com/photo-1587397845856-e6cf49176c70?w=80&h=80&fit=crop", lastMsg: "🎙 Voice message · 0:12", time: "15m", unread: 1, online: false, pinned: true },
  { id: 3, name: "Sofia 💕", avatar: "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?w=80&h=80&fit=crop", lastMsg: "omg same!! 😭", time: "1h", unread: 0, online: true, pinned: false },
  { id: 4, name: "Saved Messages 🔖", avatar: null, lastMsg: "Design notes, links...", time: "3h", unread: 0, online: false, pinned: false, isSaved: true },
  { id: 5, name: "Kai", avatar: "https://images.unsplash.com/photo-1545996124-0501ebae84d0?w=80&h=80&fit=crop", lastMsg: "You: see you tomorrow", time: "3h", unread: 0, online: false, pinned: false },
  { id: 6, name: "Zoe 🌸", avatar: "https://images.unsplash.com/photo-1644718847160-52a922094f69?w=80&h=80&fit=crop", lastMsg: "📷 Photo", time: "5h", unread: 0, online: true, pinned: false },
  { id: 7, name: "Max", avatar: "https://images.unsplash.com/photo-1614321375197-c5083895b054?w=80&h=80&fit=crop", lastMsg: "hey what's up", time: "1d", unread: 0, online: false, pinned: false },
  { id: 8, name: "App Updates 🤖", avatar: null, lastMsg: "New feature: AI Matching 🚀", time: "2d", unread: 0, online: false, pinned: false, isBot: true },
];

interface Props {
  onOpenChat: (id: number) => void;
}

export function ChatsListScreen({ onOpenChat }: Props) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "unread" | "groups">("all");

  const filtered = allChats.filter(c =>
    (!search || c.name.toLowerCase().includes(search.toLowerCase())) &&
    (activeFilter !== "unread" || c.unread > 0)
  );

  return (
    <div className="flex flex-col h-full" style={{ background: "#0a0a14" }}>
      {/* Header */}
      <div className="sticky top-0 z-20 px-5 pt-12 pb-3"
        style={{ background: "rgba(10,10,20,0.9)", backdropFilter: "blur(20px)" }}>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold" style={{ color: "#f0eeff" }}>Chats</h1>
          <motion.button className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}
            whileTap={{ scale: 0.9 }}>
            <Edit size={16} className="text-white" />
          </motion.button>
        </div>

        <div className="flex items-center gap-2 rounded-2xl px-4 py-3 mb-3"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(168,85,247,0.2)" }}>
          <Search size={16} style={{ color: "#9b8ec4" }} />
          <input className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "#f0eeff" }} placeholder="Search chats..."
            value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="flex gap-2">
          {(["all", "unread", "groups"] as const).map((f) => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className="px-4 py-1.5 rounded-full text-xs font-medium capitalize"
              style={{
                background: activeFilter === f ? "linear-gradient(135deg, #a855f7, #ec4899)" : "rgba(255,255,255,0.06)",
                color: activeFilter === f ? "white" : "#9b8ec4",
                border: activeFilter === f ? "none" : "1px solid rgba(168,85,247,0.2)",
              }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto px-5 pb-24">
        {/* Pinned section */}
        {filtered.some(c => c.pinned) && !search && (
          <div className="mb-1">
            <p className="text-xs font-medium mb-2 mt-2 flex items-center gap-1.5" style={{ color: "#9b8ec4" }}>
              <Pin size={10} /> PINNED
            </p>
            {filtered.filter(c => c.pinned).map((chat) => <ChatRow key={chat.id} chat={chat} onOpen={onOpenChat} />)}
          </div>
        )}

        {/* All chats */}
        <div className="mt-2">
          {filtered.filter(c => !c.pinned || search).map((chat) => (
            <ChatRow key={chat.id} chat={chat} onOpen={onOpenChat} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <span className="text-5xl">💬</span>
            <p className="text-sm font-medium" style={{ color: "#9b8ec4" }}>No chats found</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ChatRow({ chat, onOpen }: { chat: typeof allChats[0]; onOpen: (id: number) => void }) {
  return (
    <motion.div
      className="flex items-center gap-3 px-4 py-3.5 rounded-2xl mb-0.5 cursor-pointer"
      style={{ background: "transparent" }}
      whileTap={{ background: "rgba(168,85,247,0.08)", scale: 0.99 }}
      onClick={() => onOpen(chat.id)}>
      <div className="relative flex-shrink-0">
        {chat.avatar ? (
          <img src={chat.avatar} className="w-13 h-13 rounded-2xl object-cover" style={{ width: 52, height: 52 }} alt={chat.name} />
        ) : (
          <div className="w-13 h-13 rounded-2xl flex items-center justify-center" style={{
            width: 52, height: 52,
            background: chat.isSaved ? "linear-gradient(135deg, #a855f7, #ec4899)" : "linear-gradient(135deg, #6366f1, #4338ca)",
          }}>
            <span className="text-xl">{chat.isSaved ? "🔖" : "🤖"}</span>
          </div>
        )}
        {chat.online && (
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 bg-green-400"
            style={{ borderColor: "#0a0a14", boxShadow: "0 0 6px #4ade80" }} />
        )}
        {(chat as any).pinned && (
          <div className="absolute top-0 right-0 w-4 h-4 rounded-full flex items-center justify-center"
            style={{ background: "#a855f7" }}>
            <span className="text-white" style={{ fontSize: 8 }}>📌</span>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-sm" style={{ color: "#f0eeff" }}>{chat.name}</span>
          <span className="text-xs" style={{ color: chat.unread > 0 ? "#a855f7" : "#9b8ec4" }}>{chat.time}</span>
        </div>
        <p className="text-xs truncate mt-0.5" style={{ color: chat.unread > 0 ? "#c4b5fd" : "#9b8ec4" }}>
          {chat.lastMsg}
        </p>
      </div>

      {chat.unread > 0 && (
        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}>
          <span className="text-xs font-bold text-white">{chat.unread}</span>
        </div>
      )}
    </motion.div>
  );
}
