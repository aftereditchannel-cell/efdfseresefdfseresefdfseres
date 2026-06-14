import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, Video, PhoneIncoming, PhoneOutgoing, PhoneMissed, Link, Users, Mic, MicOff, VideoOff, Volume2, PhoneOff } from "lucide-react";

const callHistory = [
  { id: 1, name: "Luna ✨", avatar: "https://images.unsplash.com/photo-1674932668403-33398b81c92f?w=80&h=80&fit=crop", type: "incoming", callType: "video", time: "Today, 8:42 PM", duration: "12:34" },
  { id: 2, name: "Alex", avatar: "https://images.unsplash.com/photo-1587397845856-e6cf49176c70?w=80&h=80&fit=crop", type: "missed", callType: "voice", time: "Today, 3:15 PM", duration: null },
  { id: 3, name: "Sofia 💕", avatar: "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?w=80&h=80&fit=crop", type: "outgoing", callType: "voice", time: "Yesterday, 11:00 PM", duration: "5:22" },
  { id: 4, name: "Kai", avatar: "https://images.unsplash.com/photo-1545996124-0501ebae84d0?w=80&h=80&fit=crop", type: "incoming", callType: "video", time: "Yesterday, 2:30 PM", duration: "28:10" },
  { id: 5, name: "Group Call 🌈", avatar: "https://images.unsplash.com/photo-1762954419103-43708f0cf893?w=80&h=80&fit=crop", type: "outgoing", callType: "group", time: "Mon, 9:00 PM", duration: "1:02:45" },
];

const groupCallMembers = [
  { id: 1, name: "Luna", avatar: "https://images.unsplash.com/photo-1674932668403-33398b81c92f?w=80&h=80&fit=crop", speaking: true, muted: false },
  { id: 2, name: "Alex", avatar: "https://images.unsplash.com/photo-1587397845856-e6cf49176c70?w=80&h=80&fit=crop", speaking: false, muted: true },
  { id: 3, name: "You", avatar: "https://images.unsplash.com/photo-1583692331507-fc0bd348695d?w=80&h=80&fit=crop", speaking: false, muted: false },
  { id: 4, name: "Zoe", avatar: "https://images.unsplash.com/photo-1644718847160-52a922094f69?w=80&h=80&fit=crop", speaking: false, muted: false },
];

export function CallsScreen() {
  const [activeCall, setActiveCall] = useState<"voice" | "video" | "group" | null>(null);
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [speaker, setSpeaker] = useState(true);
  const [callDuration, setCallDuration] = useState(0);

  const startCall = (type: "voice" | "video" | "group") => {
    setActiveCall(type);
    const interval = setInterval(() => setCallDuration((d) => d + 1), 1000);
    return () => clearInterval(interval);
  };

  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const endCall = () => {
    setActiveCall(null);
    setCallDuration(0);
    setMuted(false);
    setVideoOff(false);
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "#0a0a14" }}>
      {/* Active call overlay */}
      <AnimatePresence>
        {activeCall && (
          <motion.div
            className="absolute inset-0 z-50 flex flex-col"
            style={{ background: activeCall === "video" ? "transparent" : "linear-gradient(160deg, #1a0a2e 0%, #0a0a14 100%)" }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}>

            {activeCall === "video" && (
              <img src="https://images.unsplash.com/photo-1762954419103-43708f0cf893?w=400&h=800&fit=crop"
                className="absolute inset-0 w-full h-full object-cover" alt="" />
            )}
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 40%, rgba(0,0,0,0.6) 100%)" }} />

            {activeCall === "group" && (
              <div className="absolute inset-0 p-4 pt-20 grid grid-cols-2 gap-3">
                {groupCallMembers.map((m) => (
                  <div key={m.id} className="relative rounded-3xl overflow-hidden"
                    style={{ border: m.speaking ? "2px solid #a855f7" : "2px solid transparent", boxShadow: m.speaking ? "0 0 20px rgba(168,85,247,0.4)" : "none" }}>
                    <img src={m.avatar} className="w-full h-full object-cover" alt={m.name} />
                    <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.2)" }} />
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                      <span className="text-white text-xs font-semibold">{m.name}</span>
                      {m.muted && <MicOff size={12} className="text-red-400" />}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="relative z-10 flex flex-col flex-1">
              {/* Top */}
              <div className="flex flex-col items-center pt-20">
                {activeCall !== "group" && (
                  <>
                    <div className="relative">
                      <img src="https://images.unsplash.com/photo-1674932668403-33398b81c92f?w=120&h=120&fit=crop"
                        className="w-24 h-24 rounded-3xl object-cover border-4 border-white/20" alt="Luna" />
                      <motion.div className="absolute inset-0 rounded-3xl border-4 border-purple-400/50"
                        animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                    </div>
                    <h2 className="text-white text-2xl font-bold mt-4">Luna ✨</h2>
                    <motion.p className="text-white/70 text-sm mt-1"
                      animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
                      {formatDuration(callDuration)} · {activeCall === "voice" ? "Voice Call" : "Video Call"}
                    </motion.p>
                  </>
                )}
                {activeCall === "group" && (
                  <div className="text-center pt-4">
                    <h2 className="text-white text-xl font-bold">Group Call 🌈</h2>
                    <p className="text-white/70 text-sm mt-1">{formatDuration(callDuration)} · {groupCallMembers.length} participants</p>
                  </div>
                )}
              </div>

              {/* Video self-preview */}
              {activeCall === "video" && !videoOff && (
                <div className="absolute top-4 right-4 w-24 h-32 rounded-2xl overflow-hidden border-2 border-white/20">
                  <img src="https://images.unsplash.com/photo-1583692331507-fc0bd348695d?w=120&h=160&fit=crop"
                    className="w-full h-full object-cover" alt="you" />
                </div>
              )}

              {/* Controls */}
              <div className="mt-auto pb-16 px-8">
                <div className="flex items-center justify-center gap-5">
                  <motion.button onClick={() => setMuted(!muted)}
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: muted ? "rgba(239,68,68,0.3)" : "rgba(255,255,255,0.15)" }}
                    whileTap={{ scale: 0.9 }}>
                    {muted ? <MicOff size={22} className="text-red-400" /> : <Mic size={22} className="text-white" />}
                  </motion.button>

                  <motion.button onClick={endCall}
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)", boxShadow: "0 8px 24px rgba(239,68,68,0.4)" }}
                    whileTap={{ scale: 0.9 }}>
                    <PhoneOff size={24} className="text-white" />
                  </motion.button>

                  {activeCall === "video" ? (
                    <motion.button onClick={() => setVideoOff(!videoOff)}
                      className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{ background: videoOff ? "rgba(239,68,68,0.3)" : "rgba(255,255,255,0.15)" }}
                      whileTap={{ scale: 0.9 }}>
                      {videoOff ? <VideoOff size={22} className="text-red-400" /> : <Video size={22} className="text-white" />}
                    </motion.button>
                  ) : (
                    <motion.button onClick={() => setSpeaker(!speaker)}
                      className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{ background: speaker ? "rgba(168,85,247,0.3)" : "rgba(255,255,255,0.15)" }}
                      whileTap={{ scale: 0.9 }}>
                      <Volume2 size={22} style={{ color: speaker ? "#a855f7" : "white" }} />
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="px-5 pt-12 pb-4"
        style={{ background: "rgba(10,10,20,0.9)", backdropFilter: "blur(20px)" }}>
        <h1 className="text-2xl font-bold mb-4" style={{ color: "#f0eeff" }}>Calls</h1>

        {/* Quick call buttons */}
        <div className="flex gap-3">
          <motion.button onClick={() => startCall("voice")}
            className="flex-1 flex items-center gap-2 py-3 rounded-2xl justify-center"
            style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)" }}
            whileTap={{ scale: 0.97 }}>
            <Phone size={16} style={{ color: "#a855f7" }} />
            <span className="text-sm font-medium" style={{ color: "#a855f7" }}>Voice Call</span>
          </motion.button>
          <motion.button onClick={() => startCall("video")}
            className="flex-1 flex items-center gap-2 py-3 rounded-2xl justify-center"
            style={{ background: "rgba(236,72,153,0.15)", border: "1px solid rgba(236,72,153,0.3)" }}
            whileTap={{ scale: 0.97 }}>
            <Video size={16} style={{ color: "#ec4899" }} />
            <span className="text-sm font-medium" style={{ color: "#ec4899" }}>Video Call</span>
          </motion.button>
          <motion.button onClick={() => startCall("group")}
            className="flex-1 flex items-center gap-2 py-3 rounded-2xl justify-center"
            style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)" }}
            whileTap={{ scale: 0.97 }}>
            <Users size={16} style={{ color: "#6366f1" }} />
            <span className="text-sm font-medium" style={{ color: "#6366f1" }}>Group</span>
          </motion.button>
        </div>

        {/* Shareable link */}
        <motion.div className="flex items-center gap-3 mt-3 p-3 rounded-2xl"
          style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)" }}
          whileTap={{ scale: 0.98 }}>
          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(168,85,247,0.2)" }}>
            <Link size={14} style={{ color: "#a855f7" }} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold" style={{ color: "#f0eeff" }}>Create shareable call link</p>
            <p className="text-xs" style={{ color: "#9b8ec4" }}>fakemarket.app/call/abc123</p>
          </div>
          <span className="text-xs font-medium px-3 py-1 rounded-full"
            style={{ background: "rgba(168,85,247,0.2)", color: "#c4b5fd" }}>Copy</span>
        </motion.div>
      </div>

      {/* Call history */}
      <div className="flex-1 overflow-y-auto px-5 pb-24">
        <p className="text-xs font-medium mb-3 mt-4" style={{ color: "#9b8ec4" }}>Recent</p>
        <div className="flex flex-col gap-1">
          {callHistory.map((call) => (
            <motion.div key={call.id}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.04)" }}
              whileTap={{ scale: 0.98 }}>
              <div className="relative flex-shrink-0">
                <img src={call.avatar} className="w-12 h-12 rounded-2xl object-cover" alt={call.name} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm" style={{ color: "#f0eeff" }}>{call.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  {call.type === "incoming" && <PhoneIncoming size={12} style={{ color: "#4ade80" }} />}
                  {call.type === "outgoing" && <PhoneOutgoing size={12} style={{ color: "#a855f7" }} />}
                  {call.type === "missed" && <PhoneMissed size={12} style={{ color: "#ef4444" }} />}
                  {call.callType === "group" && <Users size={12} style={{ color: "#9b8ec4" }} />}
                  {call.callType === "video" && <Video size={12} style={{ color: "#9b8ec4" }} />}
                  <span className="text-xs" style={{ color: call.type === "missed" ? "#ef4444" : "#9b8ec4" }}>{call.time}</span>
                  {call.duration && <span className="text-xs" style={{ color: "#9b8ec4" }}>· {call.duration}</span>}
                </div>
              </div>
              <motion.button
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(168,85,247,0.15)" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => startCall(call.callType === "group" ? "group" : call.callType === "video" ? "video" : "voice")}>
                {call.callType === "video" ? <Video size={16} style={{ color: "#a855f7" }} /> : <Phone size={16} style={{ color: "#a855f7" }} />}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
