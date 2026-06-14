import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft, Phone, Video, MoreVertical, Send, Smile, Paperclip, Mic, Image, Sticker, Heart, ThumbsUp, Laugh, Flame, Star
} from "lucide-react";

interface Message {
  id: number;
  text: string;
  time: string;
  mine: boolean;
  type: "text" | "voice" | "image" | "sticker";
  reactions?: string[];
  read?: boolean;
}

const initialMessages: Message[] = [
  { id: 1, text: "hey!! are you free tonight? 🌙", time: "8:42 PM", mine: false, type: "text" },
  { id: 2, text: "omg yes!! what's the plan? 👀", time: "8:43 PM", mine: true, type: "text", read: true },
  { id: 3, text: "thinking we could go to that new rooftop place 🌆✨", time: "8:43 PM", mine: false, type: "text" },
  { id: 4, text: "🎉", time: "8:44 PM", mine: false, type: "sticker" },
  { id: 5, text: "YESSS I've been wanting to go there forever", time: "8:44 PM", mine: true, type: "text", read: true },
  { id: 6, text: "🎙 Voice message · 0:12", time: "8:45 PM", mine: false, type: "voice" },
  { id: 7, text: "omg same!! 😭", time: "8:46 PM", mine: false, type: "text", reactions: ["❤️", "😂"] },
];

const reactions = ["❤️", "😂", "😮", "😢", "👍", "🔥"];
const stickers = ["🎉", "💜", "🌙", "✨", "🔥", "💕", "👾", "🌈"];

interface Props {
  chatId: number;
  onBack: () => void;
}

const chatProfiles: Record<number, { name: string; avatar: string; status: string }> = {
  1: { name: "Luna ✨", avatar: "https://images.unsplash.com/photo-1674932668403-33398b81c92f?w=80&h=80&fit=crop", status: "online" },
  2: { name: "Alex", avatar: "https://images.unsplash.com/photo-1587397845856-e6cf49176c70?w=80&h=80&fit=crop", status: "last seen 30m ago" },
  3: { name: "Sofia 💕", avatar: "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?w=80&h=80&fit=crop", status: "online" },
  4: { name: "Kai", avatar: "https://images.unsplash.com/photo-1545996124-0501ebae84d0?w=80&h=80&fit=crop", status: "last seen 3h ago" },
  5: { name: "Zoe 🌸", avatar: "https://images.unsplash.com/photo-1644718847160-52a922094f69?w=80&h=80&fit=crop", status: "online" },
};

export function ChatScreen({ chatId, onBack }: Props) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttach, setShowAttach] = useState(false);
  const [reactingTo, setReactingTo] = useState<number | null>(null);
  const [isTyping, setIsTyping] = useState(true);
  const [showStickers, setShowStickers] = useState(false);
  const [theme, setTheme] = useState<"purple" | "pink" | "blue">("purple");
  const bottomRef = useRef<HTMLDivElement>(null);

  const profile = chatProfiles[chatId] || chatProfiles[1];

  const themeColors = {
    purple: { mine: "linear-gradient(135deg, #a855f7, #7c3aed)", other: "rgba(255,255,255,0.08)" },
    pink: { mine: "linear-gradient(135deg, #ec4899, #be185d)", other: "rgba(255,255,255,0.08)" },
    blue: { mine: "linear-gradient(135deg, #6366f1, #4338ca)", other: "rgba(255,255,255,0.08)" },
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const t = setTimeout(() => setIsTyping(false), 3000);
    return () => clearTimeout(t);
  }, []);

  const sendMessage = (text: string, type: Message["type"] = "text") => {
    if (!text.trim() && type === "text") return;
    const msg: Message = {
      id: Date.now(), text, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      mine: true, type, read: false,
    };
    setMessages([...messages, msg]);
    setInput("");
    setShowStickers(false);
    setTimeout(() => setIsTyping(true), 1500);
    setTimeout(() => {
      setIsTyping(false);
      const replies = ["hahaha 😂", "omg yes!!", "no way!!!", "🥺💜", "seriously tho??", "same honestly"];
      const reply: Message = {
        id: Date.now() + 1,
        text: replies[Math.floor(Math.random() * replies.length)],
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        mine: false, type: "text",
      };
      setMessages((prev) => [...prev, reply]);
    }, 3500);
  };

  const addReaction = (msgId: number, reaction: string) => {
    setMessages((prev) => prev.map((m) =>
      m.id === msgId
        ? { ...m, reactions: [...(m.reactions || []), reaction] }
        : m
    ));
    setReactingTo(null);
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "#0a0a14" }}>

      {/* Header */}
      <div className="px-4 pt-14 pb-3 flex items-center gap-3 border-b"
        style={{ background: "rgba(10,10,20,0.95)", backdropFilter: "blur(20px)", borderColor: "rgba(168,85,247,0.15)" }}>
        <motion.button className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.06)" }} whileTap={{ scale: 0.9 }} onClick={onBack}>
          <ArrowLeft size={18} style={{ color: "#c4b5fd" }} />
        </motion.button>

        <div className="relative cursor-pointer" onClick={() => {}}>
          <img src={profile.avatar} className="w-10 h-10 rounded-2xl object-cover" alt={profile.name} />
          {profile.status === "online" && (
            <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 bg-green-400"
              style={{ borderColor: "#0a0a14" }} />
          )}
        </div>

        <div className="flex-1">
          <p className="font-semibold text-sm" style={{ color: "#f0eeff" }}>{profile.name}</p>
          <div className="flex items-center gap-1">
            {isTyping ? (
              <motion.p className="text-xs" style={{ color: "#a855f7" }}
                animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                typing...
              </motion.p>
            ) : (
              <p className="text-xs" style={{ color: "#9b8ec4" }}>{profile.status}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.06)" }} whileTap={{ scale: 0.9 }}>
            <Phone size={16} style={{ color: "#c4b5fd" }} />
          </motion.button>
          <motion.button className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.06)" }} whileTap={{ scale: 0.9 }}>
            <Video size={16} style={{ color: "#c4b5fd" }} />
          </motion.button>
          <motion.button className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.06)" }} whileTap={{ scale: 0.9 }}>
            <MoreVertical size={16} style={{ color: "#c4b5fd" }} />
          </motion.button>
        </div>
      </div>

      {/* Theme selector */}
      <div className="flex gap-2 px-4 py-2">
        {(["purple", "pink", "blue"] as const).map((t) => (
          <button key={t} onClick={() => setTheme(t)}
            className="w-5 h-5 rounded-full border-2 transition-all"
            style={{
              background: t === "purple" ? "#a855f7" : t === "pink" ? "#ec4899" : "#6366f1",
              borderColor: theme === t ? "white" : "transparent",
              transform: theme === t ? "scale(1.2)" : "scale(1)",
            }} />
        ))}
        <span className="text-xs ml-1" style={{ color: "#9b8ec4" }}>Theme</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.mine ? "justify-end" : "justify-start"}`}>
            <div className="max-w-[75%]">
              {!msg.mine && (
                <img src={profile.avatar} className="w-6 h-6 rounded-lg object-cover mb-1" alt="" />
              )}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                onDoubleClick={() => setReactingTo(msg.id)}>

                {msg.type === "voice" ? (
                  <div className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                    style={{ background: msg.mine ? themeColors[theme].mine : themeColors[theme].other }}>
                    <motion.div className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.2)" }}
                      whileTap={{ scale: 0.9 }}>
                      <Mic size={14} className="text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 20 }).map((_, i) => (
                          <div key={i} className="w-0.5 rounded-full bg-white/60"
                            style={{ height: `${Math.random() * 16 + 4}px` }} />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-white/70">0:12</span>
                  </div>
                ) : msg.type === "sticker" ? (
                  <span className="text-5xl">{msg.text}</span>
                ) : (
                  <div className="px-4 py-2.5 rounded-2xl text-sm"
                    style={{
                      background: msg.mine ? themeColors[theme].mine : themeColors[theme].other,
                      color: "#f0eeff",
                      borderRadius: msg.mine ? "1rem 1rem 0.25rem 1rem" : "1rem 1rem 1rem 0.25rem",
                    }}>
                    {msg.text}
                  </div>
                )}

                <div className={`flex items-center gap-1 mt-0.5 ${msg.mine ? "justify-end" : "justify-start"}`}>
                  <span className="text-xs" style={{ color: "#9b8ec4" }}>{msg.time}</span>
                  {msg.mine && <span className="text-xs" style={{ color: msg.read ? "#a855f7" : "#9b8ec4" }}>✓✓</span>}
                </div>

                {msg.reactions && msg.reactions.length > 0 && (
                  <div className={`flex gap-0.5 mt-1 ${msg.mine ? "justify-end" : "justify-start"}`}>
                    {msg.reactions.map((r, i) => (
                      <span key={i} className="text-sm px-1.5 py-0.5 rounded-full"
                        style={{ background: "rgba(168,85,247,0.2)", border: "1px solid rgba(168,85,247,0.3)" }}>
                        {r}
                      </span>
                    ))}
                  </div>
                )}

                {/* Reaction picker */}
                <AnimatePresence>
                  {reactingTo === msg.id && (
                    <motion.div
                      className={`absolute ${msg.mine ? "right-0" : "left-0"} -top-12 flex gap-1 p-2 rounded-2xl z-10`}
                      style={{ background: "rgba(20,15,35,0.95)", border: "1px solid rgba(168,85,247,0.3)", backdropFilter: "blur(20px)" }}
                      initial={{ opacity: 0, scale: 0.8, y: 5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}>
                      {reactions.map((r) => (
                        <button key={r} className="text-xl hover:scale-125 transition-transform"
                          onClick={() => addReaction(msg.id, r)}>{r}</button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Sticker picker */}
      <AnimatePresence>
        {showStickers && (
          <motion.div
            className="px-4 py-3 grid grid-cols-8 gap-2 border-t"
            style={{ background: "rgba(15,12,25,0.98)", borderColor: "rgba(168,85,247,0.15)" }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}>
            {stickers.map((s) => (
              <button key={s} className="text-3xl hover:scale-110 transition-transform"
                onClick={() => sendMessage(s, "sticker")}>{s}</button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input bar */}
      <div className="px-4 py-3 pb-safe flex items-end gap-2 border-t"
        style={{ background: "rgba(10,10,20,0.98)", borderColor: "rgba(168,85,247,0.15)" }}>
        <motion.button className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(255,255,255,0.06)" }}
          whileTap={{ scale: 0.9 }} onClick={() => { setShowStickers(!showStickers); setShowAttach(false); }}>
          <Sticker size={18} style={{ color: showStickers ? "#a855f7" : "#9b8ec4" }} />
        </motion.button>

        <div className="flex-1 flex items-end rounded-2xl px-4 py-2.5 gap-2"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(168,85,247,0.2)" }}>
          <input
            className="flex-1 bg-transparent text-sm outline-none resize-none"
            style={{ color: "#f0eeff" }}
            placeholder="Message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage(input))}
          />
          <button style={{ color: "#9b8ec4" }}><Smile size={18} /></button>
          <button style={{ color: "#9b8ec4" }}><Paperclip size={18} /></button>
        </div>

        <motion.button
          className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: input.trim() ? "linear-gradient(135deg, #a855f7, #ec4899)" : "rgba(255,255,255,0.06)" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => input.trim() ? sendMessage(input) : sendMessage("🎙 Voice message · 0:08", "voice")}>
          {input.trim() ? <Send size={16} className="text-white" /> : <Mic size={18} style={{ color: "#9b8ec4" }} />}
        </motion.button>
      </div>
    </div>
  );
}
