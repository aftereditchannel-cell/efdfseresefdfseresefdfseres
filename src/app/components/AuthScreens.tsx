import { useState } from "react";
import { motion } from "motion/react";
import { Eye, EyeOff, Camera, ChevronRight } from "lucide-react";

interface LoginProps {
  onLogin: () => void;
  onGoSignup: () => void;
}

interface SignupProps {
  onSignup: () => void;
  onGoLogin: () => void;
}

function GlassInput({ label, type = "text", placeholder, icon, value, onChange }: {
  label: string; type?: string; placeholder: string; icon?: React.ReactNode;
  value: string; onChange: (v: string) => void;
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium" style={{ color: "#9b8ec4" }}>{label}</label>
      <div className="relative flex items-center rounded-2xl border overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(168,85,247,0.25)" }}>
        {icon && <span className="pl-4 pr-2" style={{ color: "#9b8ec4" }}>{icon}</span>}
        <input
          type={isPassword ? (show ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-4 py-3.5 bg-transparent text-sm outline-none placeholder:text-sm"
          style={{ color: "#f0eeff", caretColor: "#a855f7" }}
        />
        {isPassword && (
          <button className="pr-4" onClick={() => setShow(!show)} type="button" style={{ color: "#9b8ec4" }}>
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}

function GradientButton({ children, onClick, className = "" }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  return (
    <motion.button
      className={`w-full py-4 rounded-2xl font-semibold text-white flex items-center justify-center gap-2 ${className}`}
      style={{ background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)", boxShadow: "0 8px 32px rgba(168,85,247,0.4)" }}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      whileHover={{ boxShadow: "0 12px 40px rgba(168,85,247,0.6)" }}
    >
      {children}
    </motion.button>
  );
}

export function LoginScreen({ onLogin, onGoSignup }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col h-full" style={{ background: "linear-gradient(160deg, #0d0820 0%, #0a0a14 100%)" }}>
      {/* Top ambient */}
      <div className="absolute top-0 left-0 right-0 h-72 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.2) 0%, transparent 70%)" }} />

      <div className="flex flex-col flex-1 px-6 pt-16 pb-8 relative z-10">
        {/* Header */}
        <motion.div className="mb-10" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)", boxShadow: "0 0 30px rgba(168,85,247,0.5)" }}>
            <span className="text-2xl">💜</span>
          </div>
          <h1 className="text-3xl font-bold" style={{ color: "#f0eeff" }}>Welcome back</h1>
          <p className="text-sm mt-1" style={{ color: "#9b8ec4" }}>Sign in to Fake Market</p>
        </motion.div>

        {/* Form */}
        <motion.div className="flex flex-col gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <GlassInput label="Username" placeholder="@username" value={username} onChange={setUsername} />
          <GlassInput label="Password" type="password" placeholder="••••••••" value={password} onChange={setPassword} />

          <div className="flex justify-end">
            <button className="text-xs font-medium" style={{ color: "#a855f7" }}>Forgot password?</button>
          </div>

          <div className="mt-2">
            <GradientButton onClick={onLogin}>
              Sign In <ChevronRight size={16} />
            </GradientButton>
          </div>

          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px" style={{ background: "rgba(168,85,247,0.2)" }} />
            <span className="text-xs" style={{ color: "#9b8ec4" }}>or continue with</span>
            <div className="flex-1 h-px" style={{ background: "rgba(168,85,247,0.2)" }} />
          </div>

          <div className="flex gap-3">
            {["G", "A", "𝕏"].map((provider) => (
              <motion.button key={provider}
                className="flex-1 py-3.5 rounded-2xl font-semibold text-sm border"
                style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)", color: "#f0eeff" }}
                whileTap={{ scale: 0.97 }}>
                {provider}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="mt-auto text-center">
          <p className="text-sm" style={{ color: "#9b8ec4" }}>
            Don't have an account?{" "}
            <button className="font-semibold" style={{ color: "#a855f7" }} onClick={onGoSignup}>Sign up</button>
          </p>
        </div>
      </div>
    </div>
  );
}

const identities = ["Straight", "Gay", "Lesbian", "Bisexual", "Non-binary", "Femboy", "Tomboy", "Trans", "Pansexual", "Queer"];
const genders = ["Man", "Woman", "Non-binary", "Other"];

export function SignupScreen({ onSignup, onGoLogin }: SignupProps) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedIdentity, setSelectedIdentity] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: "linear-gradient(160deg, #0d0820 0%, #0a0a14 100%)" }}>
      <div className="absolute top-0 left-0 right-0 h-72 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(236,72,153,0.2) 0%, transparent 70%)" }} />

      <div className="flex flex-col flex-1 px-6 pt-16 pb-8 relative z-10">
        {/* Header */}
        <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-6">
            {[1, 2].map((s) => (
              <div key={s} className="h-1 flex-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                <motion.div className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #a855f7, #ec4899)" }}
                  animate={{ width: step >= s ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }} />
              </div>
            ))}
          </div>
          <h1 className="text-3xl font-bold" style={{ color: "#f0eeff" }}>
            {step === 1 ? "Create account" : "Your identity"}
          </h1>
          <p className="text-sm mt-1" style={{ color: "#9b8ec4" }}>
            {step === 1 ? "Join Fake Market today" : "Tell us about yourself (optional)"}
          </p>
        </motion.div>

        {step === 1 && (
          <motion.div className="flex flex-col gap-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            {/* Avatar upload */}
            <div className="flex justify-center mb-2">
              <div className="relative">
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center border-2 border-dashed"
                  style={{ background: "rgba(168,85,247,0.1)", borderColor: "rgba(168,85,247,0.4)" }}>
                  <Camera size={24} style={{ color: "#a855f7" }} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}>
                  <span className="text-white text-xs">+</span>
                </div>
              </div>
            </div>
            <GlassInput label="Full Name" placeholder="Your name" value={name} onChange={setName} />
            <GlassInput label="Age" type="number" placeholder="18" value={age} onChange={setAge} />
            <GlassInput label="Username" placeholder="@username" value={username} onChange={setUsername} />
            <GlassInput label="Password" type="password" placeholder="••••••••" value={password} onChange={setPassword} />
            <div className="mt-2">
              <GradientButton onClick={() => setStep(2)}>Continue</GradientButton>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div className="flex flex-col gap-5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div>
              <p className="text-xs font-medium mb-2" style={{ color: "#9b8ec4" }}>Gender</p>
              <div className="flex flex-wrap gap-2">
                {genders.map((g) => (
                  <button key={g}
                    onClick={() => setSelectedGender(g)}
                    className="px-4 py-2 rounded-xl text-sm font-medium border transition-all"
                    style={{
                      background: selectedGender === g ? "linear-gradient(135deg, #a855f7, #ec4899)" : "rgba(255,255,255,0.06)",
                      borderColor: selectedGender === g ? "transparent" : "rgba(168,85,247,0.2)",
                      color: selectedGender === g ? "white" : "#c4b5fd",
                    }}>
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium mb-2" style={{ color: "#9b8ec4" }}>Identity / Orientation</p>
              <div className="flex flex-wrap gap-2">
                {identities.map((id) => (
                  <button key={id}
                    onClick={() => setSelectedIdentity(id)}
                    className="px-4 py-2 rounded-xl text-sm font-medium border transition-all"
                    style={{
                      background: selectedIdentity === id ? "linear-gradient(135deg, #a855f7, #ec4899)" : "rgba(255,255,255,0.06)",
                      borderColor: selectedIdentity === id ? "transparent" : "rgba(168,85,247,0.2)",
                      color: selectedIdentity === id ? "white" : "#c4b5fd",
                    }}>
                    {id}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-2">
              <GradientButton onClick={onSignup}>Create Account ✨</GradientButton>
            </div>
            <button className="text-center text-sm" style={{ color: "#9b8ec4" }} onClick={() => setStep(1)}>← Go back</button>
          </motion.div>
        )}

        <div className="mt-auto text-center pt-6">
          <p className="text-sm" style={{ color: "#9b8ec4" }}>
            Already have an account?{" "}
            <button className="font-semibold" style={{ color: "#a855f7" }} onClick={onGoLogin}>Sign in</button>
          </p>
        </div>
      </div>
    </div>
  );
}
