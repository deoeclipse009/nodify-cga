import { motion } from "framer-motion";
import { BookOpen, Lightbulb, Target, TrendingUp, Zap, Eye, Brain } from "lucide-react";

export function About() {
  return (
    <div className="pt-20 min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 30, repeat: Infinity }}
          className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            rotate: [360, 180, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 35, repeat: Infinity }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -50, 0],
            x: [0, 50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-24"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="inline-block mb-6 sm:mb-8"
          >
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-primary rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden">
              <img src="/nodify_logo.png" alt="Nodify Logo" className="w-8 h-8 sm:w-12 sm:h-12 object-contain" />
            </div>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight text-foreground">
            About Concept Builder
          </h1>

          <p className="text-lg sm:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Transforming how students learn and understand complex concepts
          </p>
        </motion.div>

        {/* Section 1 - Problem */}
        <BigSection
          icon={<BookOpen className="w-8 h-8 sm:w-16 sm:h-16" />}
          title="The Problem"
          gradient="from-destructive to-accent"
          delay={0}
          side="left"
        >
          <p className="text-base sm:text-xl text-muted-foreground leading-relaxed mb-6">
            Students memorize without understanding. Traditional education focuses on rote learning,
            where concepts are absorbed temporarily for tests but never truly comprehended.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ProblemCard text="Forgotten after exams" />
            <ProblemCard text="No real understanding" />
            <ProblemCard text="Passive learning" />
            <ProblemCard text="Disconnected facts" />
          </div>
        </BigSection>

        {/* Section 2 - Solution */}
        <BigSection
          icon={<Lightbulb className="w-8 h-8 sm:w-16 sm:h-16" />}
          title="Our Solution"
          gradient="from-primary to-accent"
          delay={0.1}
          side="right"
        >
          <p className="text-base sm:text-xl text-muted-foreground leading-relaxed mb-6">
            We turn learning into system-building. Instead of memorizing facts, students actively
            construct systems that represent real-world concepts.
          </p>
          <div className="space-y-4">
            <SolutionCard
              icon={<Brain className="w-6 h-6" />}
              title="Active Construction"
              description="Build and manipulate concepts with your own hands"
            />
            <SolutionCard
              icon={<Zap className="w-6 h-6" />}
              title="Immediate Feedback"
              description="See the results of your thinking in real-time"
            />
            <SolutionCard
              icon={<Target className="w-6 h-6" />}
              title="Deep Understanding"
              description="Internalize how systems actually work"
            />
          </div>
        </BigSection>

        {/* Section 3 - Method */}
        <BigSection
          icon={<Target className="w-8 h-8 sm:w-16 sm:h-16" />}
          title="Our Method"
          gradient="from-secondary to-accent"
          delay={0.1}
          side="left"
        >
          <p className="text-base sm:text-xl text-muted-foreground leading-relaxed mb-8">
            We introduce three key learning principles:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <MethodCard
              icon={<Eye className="w-8 h-8" />}
              title="Visual Learning"
              description="See concepts come to life through interactive diagrams"
            />
            <MethodCard
              icon={<Zap className="w-8 h-8" />}
              title="Interaction"
              description="Drag, drop, and connect components to build systems"
            />
            <MethodCard
              icon={<Brain className="w-8 h-8" />}
              title="Trial & Error"
              description="Test, identify mistakes, and improve iteratively"
            />
          </div>
        </BigSection>

        {/* Section 4 - Impact */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 sm:mt-16 mb-12 sm:mb-20"
        >
          <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[3rem]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary" />

            {/* Orbs */}
            <motion.div
              animate={{ scale: [1, 1.5, 1], x: [0, 100, 0], y: [0, -100, 0] }}
              transition={{ duration: 20, repeat: Infinity }}
              className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1], x: [0, -100, 0], y: [0, 100, 0] }}
              transition={{ duration: 25, repeat: Infinity }}
              className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
            />

            <div className="relative z-10 p-6 sm:p-10 md:p-14 text-primary-foreground">
              <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                </div>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold">The Impact</h2>
              </div>

              <p className="text-base sm:text-xl md:text-2xl text-primary-foreground/90 leading-relaxed mb-6 sm:mb-10 max-w-3xl">
                By using Concept Builder, students develop skills that last a lifetime:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                <ImpactCard
                  title="Deeper Understanding"
                  description="Move beyond surface-level knowledge to truly grasp how systems work"
                  stat="3x"
                  statLabel="Better retention"
                />
                <ImpactCard
                  title="Critical Thinking"
                  description="Develop analytical skills by identifying patterns and solving problems"
                  stat="2.5x"
                  statLabel="Faster learning"
                />
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

function BigSection({
  icon,
  title,
  gradient,
  children,
  delay,
  side,
}: {
  icon: React.ReactNode;
  title: string;
  gradient: string;
  children: React.ReactNode;
  delay: number;
  side: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="mb-8 sm:mb-20"
    >
      <div className="bg-gradient-to-br from-card via-popover to-card backdrop-blur-xl rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 md:p-16 shadow-2xl border border-border relative overflow-hidden">

        {/* soft overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

        {/* decorative corner */}
        <div
          className={`absolute ${
            side === "left" ? "top-0 left-0 rounded-br-full" : "top-0 right-0 rounded-bl-full"
          } w-96 h-96 bg-gradient-to-br ${gradient} opacity-5`}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className={`w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br ${gradient} rounded-2xl sm:rounded-3xl flex items-center justify-center text-primary-foreground shadow-2xl flex-shrink-0`}
            >
              {icon}
            </motion.div>

            <h2
              className={`text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
            >
              {title}
            </h2>
          </div>

          {children}
        </div>
      </div>
    </motion.div>
  );
}

function ProblemCard({ text }: { text: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, x: 5 }}
      className="flex items-center gap-3 p-4 bg-muted rounded-2xl border border-border
                 hover:bg-warning/20 hover:border-warning transition-all duration-300"
    >
      <div className="w-2 h-2 bg-warning rounded-full flex-shrink-0" />
      <span className="text-muted-foreground font-medium group-hover:text-foreground">
        {text}
      </span>
    </motion.div>
  );
}

function SolutionCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ x: 8, scale: 1.02 }}
      className="group flex items-start gap-5 p-6 bg-card rounded-2xl border border-border hover:border-primary/40 transition-all relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform flex-shrink-0">
        {icon}
      </div>

      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

function MethodCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -12, scale: 1.04 }}
      className="group relative bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-lg hover:shadow-2xl transition-all overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10">
        <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
          {icon}
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">{title}</h3>

        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

function ImpactCard({ title, description, stat, statLabel }: { title: string; description: string; stat: string; statLabel: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-white/20">
      <div className="flex items-start justify-between mb-3 sm:mb-4 gap-4">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{title}</h3>
        <div className="text-right flex-shrink-0">
          <div className="text-3xl sm:text-4xl font-bold text-white">{stat}</div>
          <div className="text-xs sm:text-sm text-white/70">{statLabel}</div>
        </div>
      </div>
      <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed">{description}</p>
    </div>
  );
}