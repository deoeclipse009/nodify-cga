import { Link } from "react-router-dom";
import { ArrowRight, Lightbulb, Play, Target, Zap, Brain, Rocket, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect} from "react";

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayed.length < text.length) {
      // typing
      timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, 200);
    } else if (!isDeleting && displayed.length === text.length) {
      // pause before deleting
      timeout = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && displayed.length > 0) {
      // deleting
      timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length - 1));
      }, 25);
    } else if (isDeleting && displayed.length === 0) {
      // restart
      setIsDeleting(false);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, text]);

  return <>{displayed}</>;
}

export function Home() {
  return (
    <div className="pt-20 overflow-hidden">
      {/* Floating background elements — blur reduced, no infinite motion */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-20 left-10 w-64 h-64 rounded-full blur-xl"
          style={{
            background: "linear-gradient(135deg, var(--secondary) 0%, transparent 70%)",
            opacity: 0.15,
          }}
        />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-xl"
          style={{
            background: "linear-gradient(135deg, var(--success) 0%, transparent 70%)",
            opacity: 0.15,
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-xl"
          style={{
            background: "linear-gradient(135deg, var(--primary) 0%, transparent 70%)",
            opacity: 0.08,
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left Side */}
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-6"
              >
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#E6A97A]/10 to-[#D48A5A]/10 rounded-full border border-[#E6A97A]/20">
                  <Zap className="w-4 h-4 text-[#E6A97A]" />
                  <span className="text-sm font-semibold text-[#E6A97A]">Learning Revolution</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              >
                <span className="relative">
                  Don't memorize
                </span>
                <br />
                <span className="bg-gradient-to-r from-[#FAF6F2] via-[#707F9E] to-[#E6A97A] bg-clip-text text-transparent inline-flex items-center">
                  <TypewriterText text="Build. " />
                  <span className="animate-pulse">|</span>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="absolute bottom-[5.25rem] left-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
                  />
                </span>
                <span className="relative">
                  how
                </span>
                <br />
                <span className="relative">
                   the world works.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg sm:text-xl text-[#D6CFC7] mb-8 leading-relaxed"
              >
                Construct systems, test them, and truly understand concepts through interactive learning.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/build">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#E6A97A] to-[#D48A5A] text-white rounded-2xl shadow-lg shadow-[#E6A97A]/20 relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
                      Start Building
                      <ArrowRight size={20} />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#D48A5A] to-[#E6A97A]"
                      initial={{ x: "100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </Link>
              </motion.div>
            </div>

            {/* Right Side Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <SystemIllustration />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-block mb-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#E6A97A]/10 to-[#D48A5A]/10 rounded-full border border-[#E6A97A]/20">
                <Star className="w-4 h-4 text-[#E6A97A]" />
                <span className="text-sm font-semibold text-[#E6A97A]">Powerful Features</span>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight bg-gradient-to-r from-[#FAF6F2] via-[#707F9E] to-[#E6A97A] bg-clip-text text-transparent mb-4">
              Learn by Building
            </h2>
            <p className="text-lg sm:text-xl text-[#D6CFC7]">Experience learning like never before</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <FeatureCard
              icon={<Target className="w-10 h-10 text-[#707F9E]" />}
              title="Build Systems"
              description="Drag and connect concepts to create interactive learning systems"
              gradient="from-[#707F9E] to-[#E6A97A]"
              delay={0.1}
            />
            <FeatureCard
              icon={<Brain className="w-10 h-10 text-[#D291BC]" />}
              title="Test Your Understanding"
              description="Run your system and see concepts come to life in real-time"
              gradient="from-[#D291BC] to-[#5FAF7A]"
              delay={0.2}
            />
            <FeatureCard
              icon={<Lightbulb className="w-10 h-10 text-[#D9A441]" />}
              title="Learn From Mistakes"
              description="Fix broken logic and iterate until you achieve mastery"
              gradient="from-[#D9A441] to-[#E6A97A]"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 sm:py-32 bg-[#2B1915]/5 relative overflow-hidden">
        {/* Static orb — removed infinite rotation */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#707F9E]/10 to-transparent rounded-full blur-xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-20"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-accent bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-[#D6CFC7]">Three simple steps to mastery</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
            {/* Connection lines */}
            <div className="hidden md:block absolute top-1/3 left-1/4 right-1/4 h-0.5">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-[#707F9E] via-[#E6A97A] to-[#5FAF7A]"
              />
            </div>

            <StepCard
              number="1"
              title="Pick a concept"
              description="Choose from many concepts to learn"
              icon={<Target className="w-8 h-8 text-[#707F9E]" />}
              delay={0.1}
            />
            <StepCard
              number="2"
              title="Build the system"
              description="Drag and connect components visually"
              icon={<Brain className="w-8 h-8 text-[#E6A97A]" />}
              delay={0.2}
            />
            <StepCard
              number="3"
              title="Run & improve"
              description="Test, learn, iterate until perfect"
              icon={<Rocket className="w-8 h-8 text-[#5FAF7A]" />}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="py-20 sm:py-32 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#6E341E] rounded-3xl p-6 sm:p-8 md:p-12 text-center text-[#FAF6F2] shadow-xl relative overflow-hidden"
          >
            {/* Static decorative orbs — removed infinite scale/rotate */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#E6A97A]/10 rounded-full blur-xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#D291BC]/10 rounded-full blur-xl" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Why It Matters</h2>
              <div className="max-w-3xl mx-auto space-y-4 text-base sm:text-xl">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-[#E6A97A]/20 rounded-2xl p-4 sm:p-6 border border-[#E6A97A]/40"
                >
                  Traditional learning: Memorizing facts that fade away
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="bg-[#5FAF7A]/20 rounded-2xl p-4 sm:p-6 border border-[#5FAF7A]/40"
                >
                  Concept Builder: Understanding systems that last forever
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2B1915]/5 via-transparent to-[#5FAF7A]/5" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Static rocket — removed infinite wobble */}
            <div className="inline-block mb-6">
              <Rocket className="w-12 h-12 sm:w-16 sm:h-16 text-[#E6A97A]" />
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Ready to build your first concept?
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-[#D6CFC7] mb-8">
              Join thousands of learners transforming how they understand the world
            </p>

            <Link to="/build">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-accent to-accent text-[#2B1915] rounded-2xl text-lg sm:text-xl font-semibold shadow-lg shadow-[#E6A97A]/20 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Start Now - It's Free
                  <ArrowRight size={24} />
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, gradient, delay }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  gradient: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative bg-card p-8 rounded-3xl shadow-md hover:shadow-xl transition-all border border-border overflow-hidden"
    >
      <motion.div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
      <div
        className="mb-6 w-16 h-16 rounded-2xl flex items-center justify-center shadow-md relative z-10"
        style={{
          backgroundColor: "var(--popover)",
          color: "var(--primary)",
        }}
      >
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3 text-foreground relative z-10">{title}</h3>
      <p className="text-muted-foreground leading-relaxed relative z-10">{description}</p>
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-5 rounded-bl-full`} />
    </motion.div>
  );
}

function StepCard({ number, title, description, icon, delay }: { 
  number: string; 
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      <div className="bg-card p-8 rounded-3xl shadow-md hover:shadow-xl transition-all border border-border text-center relative overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="w-20 h-20 bg-secondary text-secondary-foreground rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl font-bold shadow-md relative z-10"
        >
          {number}
        </motion.div>
        <div className="text-secondary mb-4 flex justify-center">{icon}</div>
        <h3 className="text-2xl font-bold mb-3 text-foreground">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
        <motion.div
          className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>
    </motion.div>
  );
}

// Pure CSS keyframe animations — zero JS/Framer overhead on the GPU-intensive paths
const illustrationStyles = `
  @keyframes floatNode {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-5px); }
  }
  @keyframes repeatPath {
    0%   { stroke-dashoffset: 300; opacity: 0; }
    10%  { opacity: 1; }
    80%  { stroke-dashoffset: 0; opacity: 1; }
    100% { stroke-dashoffset: 0; opacity: 0; }
  }
  .node-input  { animation: floatNode 3s ease-in-out infinite; }
  .node-data   { animation: floatNode 3s ease-in-out infinite 0.3s; }
  .node-proc   { animation: floatNode 3s ease-in-out infinite 0.6s; }
  .node-output { animation: floatNode 3s ease-in-out infinite 1s; }
  .path-1 { stroke-dasharray: 300; animation: repeatPath 2.5s linear infinite; }
  .path-2 { stroke-dasharray: 300; animation: repeatPath 2.5s linear infinite 0.5s; }
  .path-3 { stroke-dasharray: 300; animation: repeatPath 2.5s linear infinite 1s; }
`;

function SystemIllustration() {
  return (
    <div className="relative bg-card/90 rounded-3xl p-4 sm:p-8 md:p-12 shadow-xl border border-border">
      <style>{illustrationStyles}</style>
      <div className="relative h-48 sm:h-64 md:h-96">
        <svg width="100%" height="100%" viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--secondary)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--success)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--success)" stopOpacity="0.8" />
            </linearGradient>
            <radialGradient id="nodeInput">
              <stop offset="0%" stopColor="var(--secondary)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0.6" />
            </radialGradient>
            <radialGradient id="nodeProcess">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.6" />
            </radialGradient>
            <radialGradient id="nodeOutput">
              <stop offset="0%" stopColor="var(--success)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--success)" stopOpacity="0.6" />
            </radialGradient>
          </defs>

          {/* CSS-animated paths — no Framer Motion, no feGaussianBlur filter */}
          <path className="path-1" d="M 100 80 Q 150 80 200 160" stroke="url(#grad1)" strokeWidth="3" fill="none" />
          <path className="path-2" d="M 300 80 Q 250 80 200 160" stroke="url(#grad1)" strokeWidth="3" fill="none" />
          <path className="path-3" d="M 200 160 L 200 240" stroke="url(#grad2)" strokeWidth="3" fill="none" />

          <g className="node-input">
            <circle cx="100" cy="80" r="32" fill="url(#nodeInput)" />
            <circle cx="100" cy="80" r="28" fill="var(--card)" />
            <text x="100" y="84" textAnchor="middle" fill="var(--secondary)" fontSize="14" fontWeight="700">Input</text>
          </g>

          <g className="node-data">
            <circle cx="300" cy="80" r="32" fill="url(#nodeInput)" />
            <circle cx="300" cy="80" r="28" fill="var(--card)" />
            <text x="300" y="84" textAnchor="middle" fill="var(--secondary)" fontSize="14" fontWeight="700">Data</text>
          </g>

          <g className="node-proc">
            <circle cx="200" cy="160" r="38" fill="url(#nodeProcess)" />
            <circle cx="200" cy="160" r="34" fill="var(--card)" />
            <text x="200" y="164" textAnchor="middle" fill="var(--primary)" fontSize="14" fontWeight="700">Process</text>
          </g>

          <g className="node-output">
            <circle cx="200" cy="240" r="32" fill="url(#nodeOutput)" />
            <circle cx="200" cy="240" r="28" fill="var(--card)" />
            <text x="200" y="244" textAnchor="middle" fill="var(--success)" fontSize="14" fontWeight="700">Output</text>
          </g>
        </svg>
      </div>
    </div>
  );
}