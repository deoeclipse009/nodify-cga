import { useState, useRef, useEffect, useCallback } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import {
  Sun, Droplet, Wind, Zap, CircleDot,
  Play, RotateCcw, CheckCircle, XCircle, AlertCircle,
  Sparkles, Battery, Lightbulb, Cable, Power, Flame,
  Cloud, CloudRain, Snowflake, TreeDeciduous,
  Waves, TrendingUp, Thermometer, Shield,
  Mountain, Layers, ArrowLeft, Trash2, Target, ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MonitorSmartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";

{/*small mobile blocker and landscape forcer on bigger devices*/}

export function MobileBlocker() {
  const [blockState, setBlockState] = useState<"none" | "phone" | "portrait">("none");
  const navigate = useNavigate();
 
  useEffect(() => {
    const check = () => {
      const width  = window.innerWidth;
      const height = window.innerHeight;
      const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
 
      if (width < 480) {
        setBlockState("phone");
        return;
      }

      //block small touch devices that are likely phones, even if they are in landscape (some users might try to use nodify on a small phone in landscape, but the experience would be very cramped and not enjoyable)
      if (isTouchDevice && width > height && height < 480) {
        setBlockState("phone");
        return;
      }

      //devices that pass the width check but in portrait mode are directed to landscape mode
      if (isTouchDevice && height > width) {
        setBlockState("portrait");
        return;
      }
 
      setBlockState("none");
    };
 
    check();
    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", () => setTimeout(check, 100));
    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
    };
  }, []);
 
  return (
    <AnimatePresence>
      {blockState !== "none" && (
        <motion.div
          key={blockState}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[999] flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,0,0.82)", backdropFilter: "blur(12px)" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full max-w-sm rounded-3xl p-8 shadow-2xl text-center"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            {blockState === "portrait" ? (
              <>
                {/*animated rotate icon*/}
                <div className="flex items-center justify-center mb-6">
                  <motion.div
                    animate={{ rotate: [0, 90, 90, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
                    style={{
                      width: 64, height: 64, borderRadius: 16,
                      background: "linear-gradient(135deg, var(--primary), var(--secondary))",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    {/*silhouette*/}
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <rect x="6" y="3" width="20" height="26" rx="3" stroke="white" strokeWidth="2" fill="none"/>
                      <circle cx="16" cy="25" r="1.5" fill="white"/>
                      <rect x="12" y="6" width="8" height="1.5" rx="0.75" fill="white"/>
                    </svg>
                  </motion.div>
                </div>
 
                {/*rotating arrow*/}
                <div className="flex items-center justify-center mb-5">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    style={{ width: 48, height: 48 }}
                  >
                    <svg width="48" height="48" viewBox="0 0 48 48">
                      <path
                        d="M 24 8 A 16 16 0 1 1 8 24"
                        stroke="var(--primary)" strokeWidth="3" fill="none"
                        strokeLinecap="round"
                        strokeDasharray="60 20"
                      />
                      <polygon points="8,24 4,18 14,17" fill="var(--primary)" />
                    </svg>
                  </motion.div>
                </div>
 
                <h2 className="text-xl font-bold mb-3" style={{ color: "var(--foreground)" }}>
                  Rotate your device
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                  Nodify's build canvas needs landscape mode to maximize functionality. Please rotate your device horizontally.
                </p>
                <div
                  className="mt-5 px-4 py-2.5 rounded-xl text-xs font-semibold"
                  style={{
                    background: "color-mix(in srgb, var(--primary) 12%, transparent)",
                    border: "1px solid color-mix(in srgb, var(--primary) 30%, transparent)",
                    color: "var(--primary)",
                  }}
                >
                  Landscape mode required
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center mb-5">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ background: "linear-gradient(135deg, var(--primary), var(--secondary))" }}
                  >
                    <MonitorSmartphone className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-3xl mb-4">📱</div>
                <h2 className="text-xl font-bold mb-3 leading-snug" style={{ color: "var(--foreground)" }}>
                  Nodes need more space
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                  Nodify is built around interactive nodes that thrive with more space. On larger screens, 
                  everything connects more fluidly and feels more immersive. 
                  For the full experience, use a tablet, laptop, or desktop.
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="mt-6 w-full py-3 rounded-xl font-semibold transition-all"
                  style={{ background: "var(--primary)", color: "white" }}
                >
                  ← Go Back Home
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// node types 

type NodeType = "input" | "process" | "output" | "energy" | "condition";

interface Component {
  id: string;
  name: string;
  icon: LucideIcon;
  type: NodeType;
  gradient: string;
  _isDistractor?: boolean;
}

interface PlacedNode {
  id: string;
  component: Component;
  x: number;
  y: number;
}

interface ReviewProcess {
  title: string;
  desc: string;
}

interface ReviewContent {
  emoji: string;
  difficulty: string;
  title: string;
  mainIdea: string;
  coreLogic: string[];
  processes: ReviewProcess[];
  focus: string[];
  goal: string;
}

interface Connection {
  from: string;
  to: string;
}

interface EfficiencyConfig {
  optimalNodes: number;
  optimalConnections: number;
  extraNodePenalty: number;
  extraConnPenalty: number;
  attemptPenalty: number;
}

interface RequiredNodeEntry {
  type: NodeType;
  label: string;
  count: string;
}

interface ConceptLevel {
  id: string;
  name: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  goal: string;
  components: Component[];
  efficiencyConfig: EfficiencyConfig;
  requiredNodeTypes: RequiredNodeEntry[];
  validation: ValidationRules;
}

interface ValidationRules {
  validateSystem: (
    placedNodes: PlacedNode[],
    connections: Connection[],
    attemptCount: number,
    efficiencyConfig: EfficiencyConfig
  ) => {
    isValid: boolean;
    message: string;
    state: "idle" | "incomplete" | "partial" | "success" | "error";
    errorType?: string;
    hint?: string;
    score?: { accuracy: number; efficiency: number; simplicity?: number };
    errors?: string[];
    warnings?: string[];
  };
}

type ValidationState = "incomplete" | "error" | "partial" | "success";

//graph utility functions

function buildAdj(connections: Connection[]): Record<string, string[]> {
  const adj: Record<string, string[]> = {};
  connections.forEach(c => {
    if (!adj[c.from]) adj[c.from] = [];
    adj[c.from].push(c.to);
  });
  return adj;
}

function pathExists(from: string, to: string, connections: Connection[]): boolean {
  const adj = buildAdj(connections);
  const visited = new Set<string>();
  const stack = [from];
  while (stack.length) {
    const cur = stack.pop()!;
    if (cur === to) return true;
    if (visited.has(cur)) continue;
    visited.add(cur);
    (adj[cur] || []).forEach(n => stack.push(n));
  }
  return false;
}

function edgeExists(fromId: string, toId: string, connections: Connection[]): boolean {
  return connections.some(c => c.from === fromId && c.to === toId);
}

function getNode(placedNodes: PlacedNode[], compId: string): PlacedNode | null {
  return placedNodes.find(n => n.component.id === compId) || null;
}

function hasCycleInGraph(nodes: PlacedNode[], connections: Connection[]): boolean {
  const adj = buildAdj(connections);
  const visited = new Set<string>();
  const inStack = new Set<string>();
  let found = false;
  function dfs(id: string) {
    if (found) return;
    visited.add(id); inStack.add(id);
    for (const next of (adj[id] || [])) {
      if (!visited.has(next)) dfs(next);
      else if (inStack.has(next)) { found = true; return; }
    }
    inStack.delete(id);
  }
  nodes.forEach(n => { if (!visited.has(n.id)) dfs(n.id); });
  return found;
}

//validators

interface ValidatorResult {
  score: number;
  errors: string[];
}

function validateWaterCycle(placedNodes: PlacedNode[], connections: Connection[]): ValidatorResult {
  let score = 100;
  const errors: string[] = [];
  const requiredNodeIds = ["water", "sunlight", "evaporation", "water-vapor", "condensation", "cloud", "rain"];
  const requiredEdges = [
    { from: "water", to: "evaporation", label: "Connect water → evaporation" },
    { from: "sunlight", to: "evaporation", label: "Connect sunlight → evaporation" },
    { from: "evaporation", to: "water-vapor", label: "Connect evaporation → water vapor" },
    { from: "water-vapor", to: "condensation", label: "Connect water vapor → condensation" },
    { from: "condensation", to: "cloud", label: "Connect condensation → cloud" },
    { from: "cloud", to: "rain", label: "Connect cloud → rain" },
    { from: "rain", to: "water", label: "Connect rain → water" },
  ];
  for (const nodeId of requiredNodeIds) {
    if (!getNode(placedNodes, nodeId)) { score -= 10; errors.push(`Add the missing node: ${nodeId.replace(/-/g, " ")}`); }
  }
  for (const edge of requiredEdges) {
    const fromNode = getNode(placedNodes, edge.from);
    const toNode   = getNode(placedNodes, edge.to);
    if (!fromNode || !toNode) continue;
    if (edgeExists(fromNode.id, toNode.id, connections)) {
    } else if (edgeExists(toNode.id, fromNode.id, connections)) {
      score -= 10; errors.push(`Wrong direction — ${edge.label}`);
    } else if (pathExists(fromNode.id, toNode.id, connections)) {
      score -= 5; errors.push(`Indirect connection — ${edge.label}`);
    } else {
      score -= 10; errors.push(edge.label);
    }
  }
  const coreNodes = placedNodes.filter(n => requiredNodeIds.includes(n.component.id));
  if (coreNodes.length === requiredNodeIds.length && !hasCycleInGraph(coreNodes, connections)) {
    score -= 20; errors.push("This should form a loop — connect rain back to water to close the cycle");
  }
  return { score: Math.max(0, score), errors };
}

function validateClimateChange(placedNodes: PlacedNode[], connections: Connection[]): ValidatorResult {
  let score = 100;
  const errors: string[] = [];
  const requiredNodeIds = ["sunlight", "greenhouse-gases", "heat-trapping", "temperature-rise", "ice-melting", "rising-sea-level"];
  const requiredEdges = [
    { from: "sunlight", to: "heat-trapping", label: "Connect sunlight → heat trapping" },
    { from: "greenhouse-gases", to: "heat-trapping", label: "Connect greenhouse gases → heat trapping" },
    { from: "heat-trapping", to: "temperature-rise", label: "Connect heat trapping → temperature rise" },
    { from: "temperature-rise", to: "ice-melting", label: "Connect temperature rise → ice melting" },
    { from: "ice-melting", to: "rising-sea-level", label: "Connect ice melting → rising sea level" },
  ];
  for (const nodeId of requiredNodeIds) {
    if (!getNode(placedNodes, nodeId)) { score -= 10; errors.push(`Add the missing node: ${nodeId.replace(/-/g, " ")}`); }
  }
  for (const edge of requiredEdges) {
    const fromNode = getNode(placedNodes, edge.from);
    const toNode   = getNode(placedNodes, edge.to);
    if (!fromNode || !toNode) continue;
    if (edgeExists(fromNode.id, toNode.id, connections)) {
    } else if (edgeExists(toNode.id, fromNode.id, connections)) {
      score -= 10; errors.push(`Wrong direction — ${edge.label}`);
    } else if (pathExists(fromNode.id, toNode.id, connections)) {
      score -= 5; errors.push(`Indirect connection — ${edge.label}`);
    } else {
      score -= 10; errors.push(edge.label);
    }
  }
  const coreNodes = placedNodes.filter(n => requiredNodeIds.includes(n.component.id));
  if (hasCycleInGraph(coreNodes, connections)) {
    score -= 20; errors.push("Invalid cycle — climate change is a one-way process, remove any loops");
  }
  const seaNode = getNode(placedNodes, "rising-sea-level");
  if (seaNode) {
    const outgoing = connections.filter(c => c.from === seaNode.id);
    if (outgoing.length > 0) { score -= 10; errors.push("This output should not connect forward — rising sea level is the final step"); }
  }
  return { score: Math.max(0, score), errors };
}

function validateElectricCircuit(placedNodes: PlacedNode[], connections: Connection[]): ValidatorResult {
  let score = 100;
  const errors: string[] = [];
  const requiredNodeIds = ["battery", "wire", "switch", "current-flow", "light-bulb"];
  const requiredEdges = [
    { from: "battery", to: "wire", label: "Connect battery → wire" },
    { from: "wire", to: "switch", label: "Connect wire → switch" },
    { from: "switch", to: "current-flow", label: "Connect switch → current flow" },
    { from: "current-flow", to: "light-bulb", label: "Connect current flow → light bulb" },
    { from: "light-bulb", to: "battery", label: "Connect light bulb → battery" },
  ];
  for (const nodeId of requiredNodeIds) {
    if (!getNode(placedNodes, nodeId)) { score -= 10; errors.push(`Add the missing node: ${nodeId.replace(/-/g, " ")}`); }
  }
  for (const edge of requiredEdges) {
    const fromNode = getNode(placedNodes, edge.from);
    const toNode   = getNode(placedNodes, edge.to);
    if (!fromNode || !toNode) continue;
    if (edgeExists(fromNode.id, toNode.id, connections)) {
    } else if (edgeExists(toNode.id, fromNode.id, connections)) {
      score -= 10; errors.push(`Wrong direction — ${edge.label}`);
    } else if (pathExists(fromNode.id, toNode.id, connections)) {
      score -= 5; errors.push(`Indirect connection — ${edge.label}`);
    } else {
      score -= 10; errors.push(edge.label);
    }
  }
  const coreNodes = placedNodes.filter(n => requiredNodeIds.includes(n.component.id));
  if (coreNodes.length === requiredNodeIds.length && !hasCycleInGraph(coreNodes, connections)) {
    score -= 20; errors.push("This should form a loop — connect light bulb back to battery to close the circuit");
  }
  return { score: Math.max(0, score), errors };
}

//score

export function accColor(a: number): string {
  if (a >= 95) return "#10b981";
  if (a >= 80) return "#f59e0b";
  if (a >= 60) return "#f97316";
  return "#ef4444";
}

export function accLabel(a: number): string {
  if (a >= 100) return "Perfect!";
  if (a >= 95)  return "Excellent";
  if (a >= 85)  return "Near Correct";
  if (a >= 70)  return "Partial";
  if (a >= 50)  return "Incomplete";
  return "Missing Steps";
}

function calcEfficiency(placedCount: number, connCount: number, attemptCount: number, cfg: EfficiencyConfig): number {
  const extraNodes = Math.max(0, placedCount - cfg.optimalNodes);
  const extraConns = Math.max(0, connCount - cfg.optimalConnections);
  const raw = 100 - extraNodes * cfg.extraNodePenalty - extraConns * cfg.extraConnPenalty - attemptCount * cfg.attemptPenalty;
  return Math.min(100, Math.max(0, Math.round(raw)));
}

function safeScore(accuracy: number, efficiency: number) {
  return {
    accuracy:   Math.min(100, Math.max(0, Math.round(accuracy))),
    efficiency: Math.min(100, Math.max(0, Math.round(efficiency))),
  };
}

function computeEfficiencyScore(nodes: PlacedNode[], connections: Connection[], attemptCount: number, efficiencyConfig: EfficiencyConfig): number {
  const usedNodeIds = new Set(connections.flatMap((c) => [c.from, c.to]));
  const unusedNodes = nodes.filter((n) => !usedNodeIds.has(n.id) && !n.component._isDistractor).length;
  const extraConns  = Math.max(0, connections.length - Math.max(0, nodes.length - 1));
  const base = calcEfficiency(nodes.length, connections.length, attemptCount, efficiencyConfig);
  return Math.max(0, Math.min(100, base - unusedNodes * 8 - extraConns * 5));
}

//color mapping for gradients

const COLORS: Record<string, string> = {
  "blue-400": "#60a5fa", "cyan-500": "#06b6d4", "amber-400": "#fbbf24", "orange-500": "#f97316",
  "purple-400": "#c084fc", "violet-500": "#8b5cf6", "indigo-400": "#818cf8", "blue-500": "#3b82f6",
  "emerald-400": "#34d399", "green-500": "#22c55e", "teal-400": "#2dd4bf", "slate-400": "#94a3b8",
  "sky-300": "#7dd3fc", "slate-300": "#cbd5e1", "gray-400": "#9ca3af", "slate-500": "#64748b",
  "orange-300": "#fdba74", "red-400": "#f87171", "orange-400": "#fb923c", "red-500": "#ef4444",
  "blue-300": "#93c5fd", "cyan-400": "#22d3ee", "indigo-600": "#4f46e5", "emerald-500": "#10b981",
  "green-400": "#4ade80", "yellow-500": "#eab308", "violet-400": "#a78bfa", "purple-500": "#a855f7",
  "pink-400": "#f472b6", "rose-500": "#f43f5e", "yellow-300": "#fde047", "amber-300": "#fcd34d",
  "amber-500": "#f59e0b", "yellow-400": "#facc15", "rose-600": "#e11d48", "sky-400": "#38bdf8",
};

function gradientColors(g: string): [string, string] {
  const from = (g.match(/from-([\w-]+)/) || [])[1] || "slate-400";
  const to   = (g.match(/to-([\w-]+)/)   || [])[1] || "slate-500";
  return [COLORS[from] || "#94a3b8", COLORS[to] || "#64748b"];
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

//concept definitions 

const CONCEPTS: ConceptLevel[] = [
  {
    id: "water-cycle",
    name: "Water Cycle",
    difficulty: "Easy",
    description: "Build a closed loop — water must return to where it started",
    goal: "Connect water through evaporation, condensation, clouds, and rain back to water",
    efficiencyConfig: { optimalNodes: 7, optimalConnections: 7, extraNodePenalty: 8, extraConnPenalty: 4, attemptPenalty: 5 },
    requiredNodeTypes: [
      { type: "input", label: "Input", count: "≥ 1" },
      { type: "energy", label: "Energy Source", count: "= 1" },
      { type: "process", label: "Process", count: "≥ 4" },
      { type: "output", label: "Output", count: "≥ 1" },
    ],
    components: [
      { id: "water",        name: "Water",        icon: Droplet,    type: "input",   gradient: "from-blue-400 to-cyan-500" },
      { id: "sunlight",     name: "Sunlight",     icon: Sun,        type: "energy",  gradient: "from-amber-400 to-orange-500" },
      { id: "evaporation",  name: "Evaporation",  icon: TrendingUp, type: "process", gradient: "from-purple-400 to-violet-500" },
      { id: "water-vapor",  name: "Water Vapor",  icon: Wind,       type: "process", gradient: "from-sky-300 to-blue-400" },
      { id: "condensation", name: "Condensation", icon: Cloud,      type: "process", gradient: "from-indigo-400 to-blue-500" },
      { id: "cloud",        name: "Cloud",        icon: Cloud,      type: "process", gradient: "from-slate-300 to-gray-400" },
      { id: "rain",         name: "Rain",         icon: CloudRain,  type: "output",  gradient: "from-emerald-400 to-green-500" },
      { id: "heat",              name: "Heat",              icon: Flame,         type: "process", gradient: "from-orange-400 to-red-500",    _isDistractor: true },
      { id: "wind",              name: "Wind",              icon: Wind,          type: "process", gradient: "from-teal-400 to-cyan-500",     _isDistractor: true },
      { id: "ground-absorption", name: "Ground Absorption", icon: TreeDeciduous, type: "process", gradient: "from-emerald-500 to-green-400", _isDistractor: true },
    ],
    validation: {
      validateSystem: (placedNodes, connections, attemptCount, efficiencyConfig) => {
        const result = validateWaterCycle(placedNodes, connections);
        const hasMissingNode = result.errors.some(e => e.startsWith("Add the missing node"));
        const state: ValidationState = hasMissingNode ? "incomplete" : result.errors.length > 0 ? (result.score >= 60 ? "partial" : "error") : "success";
        const efficiency = computeEfficiencyScore(placedNodes, connections, attemptCount, efficiencyConfig);
        const safe = safeScore(result.score, efficiency);
        return { isValid: result.errors.length === 0 && result.score >= 100, message: result.errors.length === 0 ? "System fully valid" : result.errors[0], state, errorType: result.errors.length > 1 ? `${result.errors.length} issues found` : "", hint: result.errors[0] || "", score: { accuracy: safe.accuracy, efficiency: safe.efficiency }, errors: result.errors, warnings: [] };
      },
    },
  },
  {
    id: "climate-change",
    name: "Climate Change",
    difficulty: "Medium",
    description: "Build a linear chain — no cycles, one direction only",
    goal: "Show how greenhouse gases lead to rising sea levels step by step",
    efficiencyConfig: { optimalNodes: 6, optimalConnections: 5, extraNodePenalty: 12, extraConnPenalty: 6, attemptPenalty: 8 },
    requiredNodeTypes: [
      { type: "energy",  label: "Energy Source", count: "= 1" },
      { type: "input",   label: "Input",         count: "≥ 1" },
      { type: "process", label: "Process",       count: "≥ 2" },
      { type: "output",  label: "Output",        count: "≥ 1" },
    ],
    components: [
      { id: "sunlight",          name: "Sunlight",          icon: Sun,         type: "energy",  gradient: "from-amber-400 to-orange-500" },
      { id: "greenhouse-gases",  name: "Greenhouse Gases",  icon: Wind,        type: "input",   gradient: "from-gray-400 to-slate-500" },
      { id: "heat-trapping",     name: "Heat Trapping",     icon: Flame,       type: "process", gradient: "from-red-400 to-orange-500" },
      { id: "temperature-rise",  name: "Temperature Rise",  icon: TrendingUp,  type: "process", gradient: "from-orange-400 to-red-500" },
      { id: "ice-melting",       name: "Ice Melting",       icon: Snowflake,   type: "process", gradient: "from-blue-300 to-cyan-400" },
      { id: "rising-sea-level",  name: "Rising Sea Level",  icon: Waves,       type: "output",  gradient: "from-blue-500 to-indigo-600" },
      { id: "heat-absorption",   name: "Heat Absorption",   icon: Thermometer, type: "process", gradient: "from-orange-300 to-amber-400", _isDistractor: true },
      { id: "ozone-depletion",   name: "Ozone Depletion",   icon: Shield,      type: "process", gradient: "from-teal-400 to-emerald-500", _isDistractor: true },
      { id: "deforestation",     name: "Deforestation",     icon: TreeDeciduous,type:"input",   gradient: "from-emerald-400 to-green-500",_isDistractor: true },
      { id: "urban-heat",        name: "Urban Heat",        icon: Mountain,    type: "process", gradient: "from-red-500 to-rose-600",     _isDistractor: true },
    ],
    validation: {
      validateSystem: (placedNodes, connections, attemptCount, efficiencyConfig) => {
        const result = validateClimateChange(placedNodes, connections);
        const hasMissingNode = result.errors.some(e => e.startsWith("Add the missing node"));
        const state: ValidationState = hasMissingNode ? "incomplete" : result.errors.length > 0 ? (result.score >= 60 ? "partial" : "error") : "success";
        const efficiency = computeEfficiencyScore(placedNodes, connections, attemptCount, efficiencyConfig);
        const safe = safeScore(result.score, efficiency);
        return { isValid: result.errors.length === 0 && result.score >= 100, message: result.errors.length === 0 ? "System fully valid" : result.errors[0], state, errorType: result.errors.length > 1 ? `${result.errors.length} issues found` : "", hint: result.errors[0] || "", score: { accuracy: safe.accuracy, efficiency: safe.efficiency }, errors: result.errors, warnings: [] };
      },
    },
  },
  {
    id: "electric-circuit",
    name: "Electric Circuit",
    difficulty: "Hard",
    description: "Build a closed loop — electricity must complete a full circuit",
    goal: "Connect battery through wire, switch, current flow, and light bulb back to battery",
    efficiencyConfig: { optimalNodes: 5, optimalConnections: 5, extraNodePenalty: 15, extraConnPenalty: 8, attemptPenalty: 12 },
    requiredNodeTypes: [
      { type: "energy",    label: "Energy Source", count: "= 1" },
      { type: "input",     label: "Conductor",     count: "≥ 1" },
      { type: "condition", label: "Control",       count: "= 1" },
      { type: "process",   label: "Process",       count: "= 1" },
      { type: "output",    label: "Output",        count: "= 1" },
    ],
    components: [
      { id: "battery",       name: "Battery",       icon: Battery,   type: "energy",    gradient: "from-amber-400 to-yellow-500" },
      { id: "wire",          name: "Wire",          icon: Cable,     type: "input",     gradient: "from-blue-400 to-cyan-500" },
      { id: "switch",        name: "Switch",        icon: Power,     type: "condition", gradient: "from-teal-400 to-emerald-500" },
      { id: "current-flow",  name: "Current Flow",  icon: Zap,       type: "process",   gradient: "from-purple-400 to-violet-500" },
      { id: "light-bulb",    name: "Light Bulb",    icon: Lightbulb, type: "output",    gradient: "from-yellow-300 to-amber-400" },
      { id: "closed-circuit", name: "Closed Circuit", icon: CircleDot, type: "process",  gradient: "from-violet-400 to-purple-500", _isDistractor: true },
      { id: "energy-transfer",name: "Energy Transfer",icon: Sparkles,  type: "process",  gradient: "from-amber-300 to-orange-400", _isDistractor: true },
      { id: "resistor",       name: "Resistor",       icon: Shield,    type: "process",  gradient: "from-orange-400 to-red-500",   _isDistractor: true },
      { id: "capacitor",      name: "Capacitor",      icon: Layers,    type: "process",  gradient: "from-indigo-400 to-blue-500",  _isDistractor: true },
      { id: "ground-wire",    name: "Ground Wire",    icon: Cable,     type: "input",    gradient: "from-slate-400 to-gray-400",   _isDistractor: true },
    ],
    validation: {
      validateSystem: (placedNodes, connections, attemptCount, efficiencyConfig) => {
        const result = validateElectricCircuit(placedNodes, connections);
        const hasMissingNode = result.errors.some(e => e.startsWith("Add the missing node"));
        const state: ValidationState = hasMissingNode ? "incomplete" : result.errors.length > 0 ? (result.score >= 60 ? "partial" : "error") : "success";
        const efficiency = computeEfficiencyScore(placedNodes, connections, attemptCount, efficiencyConfig);
        const safe = safeScore(result.score, efficiency);
        return { isValid: result.errors.length === 0 && result.score >= 100, message: result.errors.length === 0 ? "System fully valid" : result.errors[0], state, errorType: result.errors.length > 1 ? `${result.errors.length} issues found` : "", hint: result.errors[0] || "", score: { accuracy: safe.accuracy, efficiency: safe.efficiency }, errors: result.errors, warnings: [] };
      },
    },
  },
];

//review content for each concept

const reviewContent: Record<string, ReviewContent> = {
  "water-cycle": {
    emoji: "💧", difficulty: "EASY", title: "WATER CYCLE",
    mainIdea: "Water continuously moves through Earth — it evaporates, rises, condenses into clouds, and falls as rain, completing a cycle.",
    coreLogic: [
      "Water + Sunlight → Evaporation → Water Vapor → Condensation → Cloud → Rain → Water",
      "Both Water and Sunlight feed into Evaporation to start the cycle",
      "Rain must connect back to Water — the loop must fully close",
    ],
    processes: [
      { title: "Water",        desc: "The starting material — rivers, oceans, lakes" },
      { title: "Sunlight",     desc: "Provides the energy that causes evaporation" },
      { title: "Evaporation",  desc: "Heat turns liquid water into invisible vapor" },
      { title: "Water Vapor",  desc: "Invisible gas rising into the atmosphere — a key intermediate step" },
      { title: "Condensation", desc: "Vapor cools and turns back into water droplets" },
      { title: "Cloud",        desc: "Water droplets cluster together visibly" },
      { title: "Rain",         desc: "Water falls back to the ground, closing the cycle" },
    ],
    focus: [
      "Both Water and Sunlight connect INTO Evaporation",
      "Water Vapor is a required step between Evaporation and Condensation",
      "Rain must connect back to Water to close the loop",
      "The cycle must be complete — no dead ends",
    ],
    goal: "Build a closed loop where water correctly moves through all seven stages in order.",
  },
  "climate-change": {
    emoji: "🌡️", difficulty: "MEDIUM", title: "CLIMATE CHANGE",
    mainIdea: "Greenhouse gases trap heat from the sun, warming the planet — causing ice to melt and sea levels to rise.",
    coreLogic: [
      "Sunlight → Heat Trapping ← Greenhouse Gases → Temperature Rise → Ice Melting → Rising Sea Level",
      "This is a one-way linear chain — no loops or cycles",
      "Rising Sea Level is the final outcome — nothing connects out from it",
    ],
    processes: [
      { title: "Sunlight",          desc: "Solar energy enters the atmosphere" },
      { title: "Greenhouse Gases",  desc: "CO₂ and methane trap outgoing heat" },
      { title: "Heat Trapping",     desc: "Both Sunlight and Greenhouse Gases contribute to this process" },
      { title: "Temperature Rise",  desc: "Average global temperatures rise" },
      { title: "Ice Melting",       desc: "Glaciers and polar ice sheets melt" },
      { title: "Rising Sea Level",  desc: "The final result — melted water raises ocean levels" },
    ],
    focus: [
      "This is a linear chain — no loops or cycles allowed",
      "Both Sunlight and Greenhouse Gases connect directly into Heat Trapping",
      "Rising Sea Level is the endpoint — nothing flows out of it",
      "One result becomes the next cause — order matters",
    ],
    goal: "Build a linear chain showing how greenhouse gases lead to rising sea levels through all six stages.",
  },
  "electric-circuit": {
    emoji: "⚡", difficulty: "HARD", title: "ELECTRIC CIRCUIT",
    mainIdea: "Electricity only flows through a complete, unbroken loop. If any connection is missing, the circuit fails.",
    coreLogic: [
      "Battery → Wire → Switch → Current Flow → Light Bulb → Battery",
      "The loop must be fully closed — Light Bulb connects back to Battery",
      "Every component is required — missing one breaks the entire circuit",
    ],
    processes: [
      { title: "Battery",       desc: "Provides the electrical energy — the power source" },
      { title: "Wire",          desc: "Conducts electricity between components" },
      { title: "Switch",        desc: "Must be closed (ON) for electricity to flow" },
      { title: "Current Flow",  desc: "Electricity moves through the circuit" },
      { title: "Light Bulb",    desc: "Converts electrical energy into visible light" },
    ],
    focus: [
      "The circuit must close — Light Bulb connects BACK to Battery",
      "All five components are required — missing one means the system fails",
      "Connections must be in the correct direction",
      "No indirect paths — every connection must be direct",
    ],
    goal: "Build a closed loop where electricity flows through all five stages and lights the bulb.",
  },
};

//difficulty color palettes

const difficultyStyle = {
  Easy: {
    badge: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
    btn:   "from-emerald-500 to-teal-500",
    glow:  "shadow-emerald-500/20",
    card:  "from-emerald-900/20 to-teal-900/10 border-emerald-800/40",
    panel: "from-emerald-900/30 to-teal-900/10 border-emerald-700/40",
  },
  Medium: {
    badge: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
    btn:   "from-amber-500 to-orange-500",
    glow:  "shadow-amber-500/20",
    card:  "from-amber-900/20 to-orange-900/10 border-amber-800/40",
    panel: "from-amber-900/30 to-orange-900/10 border-amber-700/40",
  },
  Hard: {
    badge: "bg-red-500/20 text-red-300 border border-red-500/30",
    btn:   "from-red-500 to-rose-500",
    glow:  "shadow-red-500/20",
    card:  "from-red-900/20 to-rose-900/10 border-red-800/40",
    panel: "from-red-900/30 to-rose-900/10 border-red-700/40",
  },
};

const NAVBAR_HEIGHT = 72;

//some css

const themeStyles = `
  .nodify-app {
    background-color: var(--background);
    color: var(--foreground);
    font-family: 'Inter', sans-serif;
  }
  .nodify-sidebar {
    background-color: var(--sidebar);
    color: var(--sidebar-foreground);
  }
  .nodify-toolbar {
    background-color: var(--popover);
  }
  .nodify-canvas {
    background-color: var(--background);
    /* Allow touch scrolling on canvas when not dragging */
    touch-action: none;
  }
  .nodify-muted { color: var(--muted-foreground); }

  .nodify-component-item {
    background-color: var(--muted);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    transition: background-color 0.15s, border-color 0.15s;
    /* Ensure minimum touch target size */
    min-height: 56px;
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
  }
  .nodify-component-item:hover {
    background-color: var(--card);
    border-color: var(--primary);
  }

  .nodify-node-card {
    background-color: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    /* Larger touch target for nodes */
    min-width: 140px;
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
  }
  .nodify-node-card.selected {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 25%, transparent);
  }
  .nodify-node-card.success {
    border-color: var(--success);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--success) 20%, transparent);
  }
  .nodify-node-card.error {
    border-color: var(--destructive);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--destructive) 20%, transparent);
  }

  .nodify-status-idle    { background-color: var(--muted); border: 1px solid var(--border); }
  .nodify-status-running { background-color: color-mix(in srgb, var(--secondary) 15%, transparent); border: 1px solid color-mix(in srgb, var(--secondary) 40%, transparent); }
  .nodify-status-success { background-color: color-mix(in srgb, var(--success) 12%, transparent);     border: 1px solid color-mix(in srgb, var(--success) 40%, transparent); }
  .nodify-status-error   { background-color: color-mix(in srgb, var(--destructive) 12%, transparent); border: 1px solid color-mix(in srgb, var(--destructive) 40%, transparent); }
  .nodify-status-partial { background-color: color-mix(in srgb, var(--warning) 12%, transparent);     border: 1px solid color-mix(in srgb, var(--warning) 40%, transparent); }

  .nodify-score-panel { background-color: var(--muted); border: 1px solid var(--border); border-radius: var(--radius); }
  .nodify-score-track { background-color: var(--border); border-radius: 999px; overflow: hidden; }
  .nodify-score-fill-accuracy   { background: linear-gradient(to right, var(--success), #3dd68c); border-radius: 999px; }
  .nodify-score-fill-efficiency { background: linear-gradient(to right, var(--secondary), var(--info)); border-radius: 999px; }

  .nodify-hint-current  { background-color: color-mix(in srgb, var(--primary) 10%, transparent); border: 1px solid color-mix(in srgb, var(--primary) 35%, transparent); border-radius: var(--radius); }
  .nodify-hint-previous { background-color: var(--muted); border: 1px solid var(--border); border-radius: var(--radius); }
  .nodify-error-panel   { background-color: color-mix(in srgb, var(--destructive) 10%, transparent); border: 1px solid color-mix(in srgb, var(--destructive) 35%, transparent); border-radius: var(--radius); }
  .nodify-warning-panel { background-color: color-mix(in srgb, var(--warning) 10%, transparent); border: 1px solid color-mix(in srgb, var(--warning) 35%, transparent); border-radius: var(--radius); }
  .nodify-progress-panel { background-color: var(--muted); border: 1px solid var(--border); border-radius: var(--radius); }

  .nodify-trash          { background-color: color-mix(in srgb, var(--destructive) 8%, transparent); border: 2px dashed color-mix(in srgb, var(--destructive) 35%, transparent); border-radius: var(--radius); }
  .nodify-trash.can-drop { background-color: color-mix(in srgb, var(--destructive) 15%, transparent); border-color: var(--destructive); }
  .nodify-trash.is-over  { background-color: color-mix(in srgb, var(--destructive) 25%, transparent); border-color: var(--destructive); transform: scale(1.08); }

  .nodify-run-btn {
    background: linear-gradient(135deg, var(--primary), var(--accent));
    color: var(--primary-foreground);
    border: none;
    border-radius: var(--radius);
    transition: filter 0.15s;
    min-height: 44px;
  }
  .nodify-run-btn:hover:not(:disabled) { filter: brightness(1.1); }
  .nodify-run-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .nodify-secondary-btn {
    background-color: var(--muted);
    color: var(--muted-foreground);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    transition: background-color 0.15s, color 0.15s;
    min-height: 44px;
  }
  .nodify-secondary-btn:hover { background-color: var(--card); color: var(--foreground); }

  .nodify-success-banner { background-color: var(--success); color: var(--success-foreground); border-radius: var(--radius); }
  .nodify-review-card { background-color: var(--popover); border: 1px solid var(--border); border-radius: calc(var(--radius) * 2); color: var(--popover-foreground); }
  .nodify-review-process-item { background-color: var(--muted); border: 1px solid var(--border); border-radius: var(--radius); }
  .nodify-level-card { border-radius: calc(var(--radius) * 2); transition: transform 0.15s, box-shadow 0.15s; cursor: pointer; }
  .nodify-instructions { background-color: var(--muted); border-top: 1px solid var(--border); color: var(--muted-foreground); }
  .nodify-connect-label { color: var(--primary); }
  .nodify-section-label { color: var(--muted-foreground); letter-spacing: 0.1em; font-size: 0.65rem; text-transform: uppercase; font-weight: 600; }
  .nodify-duplicate-warn { background-color: color-mix(in srgb, var(--warning) 12%, transparent); border: 1px solid color-mix(in srgb, var(--warning) 40%, transparent); border-radius: var(--radius); }

  /*touch drag preview*/
  .nodify-drag-preview {
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.85;
    transform: scale(1.05);
    transition: none;
  }

  /*touch mode */
  .nodify-move-mode {
    border: 2px solid var(--primary) !important;
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--primary) 20%, transparent) !important;
  }

  /*tablet layout*/
  @media (max-width: 1024px) {
    .nodify-sidebar-left {
      width: 14rem !important;
    }
    .nodify-sidebar-right {
      width: 16rem !important;
    }
  }

  @media (max-width: 768px) {
    .nodify-sidebar-left {
      width: 12rem !important;
    }
    .nodify-sidebar-right {
      width: 13rem !important;
    }
  }

  .nodify-app * {
    -webkit-tap-highlight-color: transparent;
  }
`;

const touchBackendOptions = {
  enableMouseEvents: true,      // keep mouse drag working on desktops
  enableKeyboardEvents: false,
  delayTouchStart: 80,          // ms — wait before treating touch as drag (not tap)
  touchSlop: 8,                 // px movement before drag activates
};

// score ring

function ScoreRing({ accuracy }: { accuracy: number }) {
  const r = 28, circ = 2 * Math.PI * r;
  const dash = (accuracy / 100) * circ;
  const color = accColor(accuracy);
  return (
    <div style={{ position: "relative", width: 68, height: 68, flexShrink: 0 }}>
      <svg width="68" height="68" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="34" cy="34" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="6" />
        <circle cx="34" cy="34" r={r} fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.8s ease" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 14, fontWeight: 800, color, lineHeight: 1 }}>{accuracy}</span>
        <span style={{ fontSize: 8, color: "var(--muted-foreground)", fontWeight: 600 }}>%</span>
      </div>
    </div>
  );
}

// export main build page

export function Build() {
  return (
    <>
      <MobileBlocker />
      <style>{themeStyles}</style>
      {/* TouchBackend with enableMouseEvents keeps desktop working too */}
      <DndProvider backend={TouchBackend} options={touchBackendOptions}>
        <BuildContent />
      </DndProvider>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// system contents
// ─────────────────────────────────────────────────────────────────────────────

function BuildContent() {
  const [viewMode, setViewMode] = useState<"selector" | "review" | "canvas">("selector");
  const [selectedLevel, setSelectedLevel] = useState<ConceptLevel | null>(null);
  const [shuffledComponents, setShuffledComponents] = useState<Component[]>([]);

  const [placedNodes, setPlacedNodes] = useState<PlacedNode[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [systemStatus, setSystemStatus] = useState<"idle" | "running" | "incomplete" | "partial" | "success" | "error">("idle");
  const [validationMessage, setValidationMessage] = useState("");
  const [errorType, setErrorType] = useState("");
  const [currentHint, setCurrentHint] = useState("");
  const [previousHints, setPreviousHints] = useState<string[]>([]);
  const [score, setScore] = useState({ accuracy: 0, efficiency: 0 });
  const [validationWarnings, setValidationWarnings] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [failedAttemptLog, setFailedAttemptLog] = useState<
    { attempt: number; hint: string; errorType: string; message: string; accuracy: number }[]
  >([]);
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);

  // ── move mode ──
  const [movingNodeId, setMovingNodeId] = useState<string | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);

  const addNode = useCallback((component: Component, x: number, y: number) => {
    setPlacedNodes(prev => {
      const alreadyPlaced = prev.some(n => n.component.id === component.id);
      if (alreadyPlaced) {
        setDuplicateWarning(`"${component.name}" is already on the canvas. Remove it if it's unneeded.`);
        setTimeout(() => setDuplicateWarning(null), 3000);
        return prev;
      }
      setDuplicateWarning(null);
      return [...prev, { id: `${component.id}-${Date.now()}`, component, x, y }];
    });
  }, []);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "component",
    drop: (item: { component: Component }, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset && canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        addNode(item.component, offset.x - rect.left - 70, offset.y - rect.top - 28);
      }
    },
    collect: monitor => ({ isOver: monitor.isOver() }),
  }), [addNode]);

  // placed node question
  const [, dropCanvas] = useDrop(() => ({
    accept: "placed-node",
    drop: (item: { nodeId: string }, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset && canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = offset.x - rect.left - 70;
        const y = offset.y - rect.top - 28;
        setPlacedNodes(prev =>
          prev.map(n => n.id === item.nodeId ? { ...n, x, y } : n)
        );
      }
    },
  }), []);

  // Attach drop to canvas
  useEffect(() => {
    if (canvasRef.current && viewMode === "canvas") {
      drop(canvasRef);
      dropCanvas(canvasRef);
    }
  }, [drop, dropCanvas, viewMode]);

  // ── Canvas tap handler — 
  const handleCanvasTap = (e: React.MouseEvent | React.TouchEvent) => {
    if (movingNodeId) {
      // Place move node
      let clientX: number, clientY: number;
      if ("touches" in e) {
        const touch = (e as React.TouchEvent).changedTouches[0];
        clientX = touch.clientX; clientY = touch.clientY;
      } else {
        clientX = (e as React.MouseEvent).clientX;
        clientY = (e as React.MouseEvent).clientY;
      }
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        setPlacedNodes(prev =>
          prev.map(n => n.id === movingNodeId
            ? { ...n, x: clientX - rect.left - 70, y: clientY - rect.top - 28 }
            : n
          )
        );
      }
      setMovingNodeId(null);
      return;
    }
    setSelectedNode(null);
  };

  const handleNodeClick = (nodeId: string, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();

    // If already in move-mode, then cancel move-mode
    if (movingNodeId === nodeId) {
      setMovingNodeId(null);
      return;
    }

    // If in move-mode, ignore node taps 
    if (movingNodeId) return;

    // connect logic
    if (selectedNode === null) {
      setSelectedNode(nodeId);
    } else if (selectedNode === nodeId) {
      setSelectedNode(null);
    } else {
      const alreadyExists = connections.some(c => c.from === selectedNode && c.to === nodeId);
      const isReversed    = connections.some(c => c.from === nodeId && c.to === selectedNode);
      if (!alreadyExists && !isReversed) {
        setConnections(prev => [...prev, { from: selectedNode, to: nodeId }]);
      }
      setSelectedNode(null);
    }
  };

  const handleNodeDoubleClick = (nodeId: string) => {
    setConnections(prev => prev.filter(c => c.from !== nodeId && c.to !== nodeId));
  };

  // ──enter move-mode ──
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleNodeTouchStart = (nodeId: string) => {
    longPressTimer.current = setTimeout(() => {
      setMovingNodeId(nodeId);
      setSelectedNode(null);
    }, 500); // 500ms long-press
  };

  const handleNodeTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const deleteNode = (nodeId: string) => {
    setPlacedNodes(prev => prev.filter(n => n.id !== nodeId));
    setConnections(prev => prev.filter(c => c.from !== nodeId && c.to !== nodeId));
    if (selectedNode === nodeId) setSelectedNode(null);
    if (movingNodeId === nodeId) setMovingNodeId(null);
  };

  const validateSystem = () => {
    if (!selectedLevel) return;
    setSystemStatus("running");
    setIsRunning(true);
    setTimeout(() => {
      const result = selectedLevel.validation.validateSystem(
        placedNodes, connections, attemptCount, selectedLevel.efficiencyConfig
      );
      setSystemStatus(result.state);
      setValidationMessage(result.message);
      setErrorType(result.errorType || "");
      setCurrentHint(result.hint || "");
      setValidationWarnings(result.warnings || []);
      const clampedScore = {
        accuracy:   Math.min(100, Math.max(0, result.score?.accuracy   ?? 0)),
        efficiency: Math.min(100, Math.max(0, result.score?.efficiency ?? 0)),
      };
      setScore(clampedScore);
      setIsRunning(false);

      if (!result.isValid) {
        const newCount = attemptCount + 1;
        setAttemptCount(newCount);
        if (result.hint || result.errorType || result.message) {
          setFailedAttemptLog(prev => [
            ...prev,
            { attempt: newCount, hint: result.hint || "", errorType: result.errorType || "Error", message: result.message, accuracy: clampedScore.accuracy },
          ]);
        }
      }

      if (result.hint && !previousHints.includes(result.hint)) {
        setPreviousHints(prev => [...prev, result.hint!]);
      }
    }, 1200);
  };

  const resetCanvas = () => {
    setPlacedNodes([]); setConnections([]); setSelectedNode(null); setMovingNodeId(null);
    setSystemStatus("idle"); setValidationMessage(""); setErrorType("");
    setCurrentHint(""); setScore({ accuracy: 0, efficiency: 0 }); setValidationWarnings([]);
    setIsRunning(false); setDuplicateWarning(null);
  };

  const selectLevel = (level: ConceptLevel) => {
    setSelectedLevel(level);
    setShuffledComponents(shuffleArray(level.components));
    setViewMode("review");
  };

  const startBuilding = () => { setViewMode("canvas"); resetCanvas(); };

  const backToSelector = () => {
    setViewMode("selector"); setSelectedLevel(null); setShuffledComponents([]);
    setPlacedNodes([]); setConnections([]); setSelectedNode(null); setMovingNodeId(null);
    setSystemStatus("idle"); setValidationMessage(""); setErrorType("");
    setCurrentHint(""); setPreviousHints([]); setScore({ accuracy: 0, efficiency: 0 });
    setIsRunning(false); setAttemptCount(0); setFailedAttemptLog([]); setDuplicateWarning(null);
    setValidationWarnings([]);
  };

  const getArrowPath = (fromId: string, toId: string) => {
    const f = placedNodes.find(n => n.id === fromId);
    const t = placedNodes.find(n => n.id === toId);
    if (!f || !t) return "";
    const x1 = f.x + 70, y1 = f.y + 28;
    const x2 = t.x + 70, y2 = t.y + 28;
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - 50;
    return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
  };

  // level selector
  if (viewMode === "selector") {
    return (
      <div
        className="nodify-app min-h-screen flex items-center justify-center p-8 relative overflow-hidden"
        style={{ paddingTop: `${NAVBAR_HEIGHT + 32}px` }}
      >
        <motion.div animate={{ y: [0, -30, 0], rotate: [0, 8, 0] }} transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-20 left-16 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ background: "color-mix(in srgb, var(--primary) 8%, transparent)" }} />
        <motion.div animate={{ y: [0, 25, 0], rotate: [0, -6, 0] }} transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 right-16 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: "color-mix(in srgb, var(--secondary) 8%, transparent)" }} />

        <div className="max-w-5xl w-full relative z-10">
          <motion.div initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
            <h1 className="text-5xl font-black mb-3 tracking-tight" style={{ color: "var(--foreground)" }}>
              Choose Your{" "}
              <span style={{ background: "linear-gradient(135deg, var(--primary), var(--secondary))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Challenge
              </span>
            </h1>
            <p className="text-lg nodify-muted">Select a difficulty level to start building</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {CONCEPTS.map((concept, i) => {
              const ds = difficultyStyle[concept.difficulty];
              return (
                <motion.div key={concept.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} whileHover={{ y: -6, scale: 1.02 }}
                  className={`nodify-level-card bg-gradient-to-br ${ds.card} border shadow-2xl ${ds.glow} p-8 h-full backdrop-blur-sm relative`}
                  onClick={() => selectLevel(concept)}>
                  <div className={`w-14 h-14 mb-5 rounded-2xl bg-gradient-to-br ${ds.btn} flex items-center justify-center shadow-xl`}>
                    <Layers className="w-7 h-7 text-white" />
                  </div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${ds.badge}`}>
                    {concept.difficulty}
                  </span>
                  <h2 className="text-2xl font-bold text-white mb-2">{concept.name}</h2>
                  <p className="text-sm nodify-muted mb-2">{concept.description}</p>
                  <p className="text-xs italic mb-6" style={{ color: "var(--muted-foreground)", opacity: 0.7 }}>{concept.goal}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs nodify-muted">{concept.components.filter(c => !c._isDistractor).length} core nodes</span>
                    <span className="text-xs nodify-muted">{concept.components.filter(c => c._isDistractor).length} extra nodes</span>
                  </div>
                  <button className={`w-full py-3 rounded-2xl font-semibold text-white bg-gradient-to-r ${ds.btn} shadow-lg hover:brightness-110 transition-all`}>
                    Start Building →
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }


  // material review
  if (viewMode === "review" && selectedLevel) {
    const review = reviewContent[selectedLevel.id];
    const ds = difficultyStyle[selectedLevel.difficulty];
    return (
      <div
        className="nodify-app min-h-screen flex items-center justify-center p-8 relative overflow-hidden"
        style={{ paddingTop: `${NAVBAR_HEIGHT + 32}px` }}
      >
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-24 right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none"
          style={{ background: "color-mix(in srgb, var(--primary) 8%, transparent)" }} />
        <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-24 left-24 w-64 h-64 rounded-full blur-3xl pointer-events-none"
          style={{ background: "color-mix(in srgb, var(--secondary) 8%, transparent)" }} />

        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full relative z-10">
          <div className="nodify-review-card p-10 shadow-2xl">
            <div className="text-center mb-8">
              <span className="text-4xl">{review.emoji}</span>
              <h1 className="text-3xl font-black mt-3" style={{ color: "var(--card-foreground)" }}>
                {review.difficulty} — {review.title} REVIEW
              </h1>
            </div>

            <div className="space-y-6 text-sm">
              <div>
                <h2 className="text-base font-bold mb-2 flex items-center gap-2" style={{ color: "var(--card-foreground)" }}>
                  <span>🌍</span> Main Idea
                </h2>
                <p className="nodify-muted">{review.mainIdea}</p>
              </div>
              <div>
                <h2 className="text-base font-bold mb-2 flex items-center gap-2" style={{ color: "var(--card-foreground)" }}>
                  <span>🔁</span> Core Logic
                </h2>
                {review.coreLogic.map((l: string, i: number) => (
                  <p key={i} className="nodify-muted mb-1">{l}</p>
                ))}
              </div>
              <div>
                <h2 className="text-base font-bold mb-3 flex items-center gap-2" style={{ color: "var(--card-foreground)" }}>
                  <span>⚙️</span> Process Breakdown
                </h2>
                <div className="space-y-2">
                  {review.processes.map((p: ReviewProcess, i: number) => (
                    <div key={i} className="nodify-review-process-item px-4 py-3">
                      <p className="font-semibold mb-0.5" style={{ color: "var(--card-foreground)" }}>{p.title}</p>
                      <p className="nodify-muted whitespace-pre-line">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-base font-bold mb-2 flex items-center gap-2" style={{ color: "var(--card-foreground)" }}>
                  <span>🎯</span> What to Focus On
                </h2>
                <div className="space-y-1.5">
                  {review.focus.map((f: string, i: number) => (
                    <div key={i} className="flex items-start gap-2 nodify-muted">
                      <ChevronRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "var(--primary)" }} />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
              <div className={`bg-gradient-to-r ${ds.panel} border px-4 py-3`} style={{ borderRadius: "var(--radius)" }}>
                <h2 className="font-bold flex items-center gap-2 mb-1" style={{ color: "var(--card-foreground)" }}>
                  <Target className="w-4 h-4" /> Your Goal
                </h2>
                <p className="nodify-muted">{review.goal}</p>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={backToSelector}
                className="nodify-secondary-btn flex-1 py-3 rounded-2xl font-semibold flex items-center justify-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back to Levels
              </button>
              <button onClick={startBuilding}
                className={`flex-1 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r ${ds.btn} shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2`}>
                Start Building <Play className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!selectedLevel) return null;
  const ds = difficultyStyle[selectedLevel.difficulty];

  // canvas
  return (
    <div
      className="nodify-app flex flex-col overflow-hidden"
      style={{ height: "100vh", paddingTop: `${NAVBAR_HEIGHT}px` }}
    >
      <div className="flex flex-1 overflow-hidden">

        {/*component sidebar*/}
        <motion.div initial={{ x: -300 }} animate={{ x: 0 }} transition={{ duration: 0.4 }}
          className={`nodify-sidebar nodify-sidebar-left flex flex-col shadow-2xl ${ds.card}`}
          style={{ width: "18rem", flexShrink: 0, borderRight: "1px solid var(--sidebar-border)" }}>

          <div className="p-5" style={{ borderBottom: "1px solid var(--sidebar-border)" }}>
            <button onClick={backToSelector}
              className="flex items-center gap-2 text-sm nodify-muted hover:text-foreground transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" /> Back to Levels
            </button>
            <h2 className="font-bold text-base" style={{ color: "var(--sidebar-foreground)" }}>{selectedLevel.name}</h2>
            <p className="text-xs nodify-muted mt-1">{selectedLevel.description}</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            <p className="nodify-section-label mb-2">Components</p>
            {shuffledComponents.map(comp => (
              <DraggableComponent key={comp.id} component={comp} />
            ))}
          </div>

          <div className="nodify-instructions p-4">
            <p className="font-semibold text-xs mb-2" style={{ color: "var(--muted-foreground)" }}>How to build:</p>
            <div className="space-y-1 text-xs nodify-muted leading-relaxed">
              <p>• Drag or tap nodes onto canvas</p>
              <p>• Tap a node, then tap another to connect</p>
              <p>• Double-tap to disconnect all edges</p>
              <p>• Long-press (0.5s) to reposition a node</p>
              <p>• Drag node to trash zone to delete</p>
              <p>• Run system to validate</p>
            </div>
          </div>
        </motion.div>

        {/*center canvas*/}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Toolbar */}
          <div className="nodify-toolbar px-6 py-4 flex items-center justify-between"
            style={{ borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
            <div>
              <h2 className="font-bold" style={{ color: "var(--foreground)" }}>{selectedLevel.name}</h2>
              <p className="text-xs nodify-muted">{selectedLevel.description}</p>
            </div>
            <div className="flex gap-2">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={resetCanvas}
                className="nodify-secondary-btn px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2">
                <RotateCcw className="w-4 h-4" /> Reset
              </motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={validateSystem} disabled={isRunning}
                className="nodify-run-btn px-5 py-2 text-sm font-semibold flex items-center gap-2">
                {isRunning
                  ? <><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><Zap className="w-4 h-4" /></motion.div> Running…</>
                  : <><Play className="w-4 h-4" /> Run System</>}
              </motion.button>
            </div>
          </div>

          {/* Move-mode banner */}
          <AnimatePresence>
            {movingNodeId && (
              <motion.div
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                className="px-4 py-2 text-xs font-semibold text-center"
                style={{ background: "color-mix(in srgb, var(--primary) 15%, transparent)", color: "var(--primary)", borderBottom: "1px solid color-mix(in srgb, var(--primary) 30%, transparent)" }}
              >
                Move mode — tap anywhere on the canvas to place the node, or tap the node again to cancel
              </motion.div>
            )}
          </AnimatePresence>

          {/* Drop zone */}
          <div
            ref={canvasRef}
            className="flex-1 relative overflow-hidden nodify-canvas"
            onClick={handleCanvasTap}
            style={{
              backgroundImage: isOver
                ? "radial-gradient(circle, color-mix(in srgb, var(--primary) 18%, transparent) 2px, transparent 2px)"
                : "radial-gradient(circle, color-mix(in srgb, var(--foreground) 6%, transparent) 1.5px, transparent 1.5px)",
              backgroundSize: "30px 30px",
              cursor: movingNodeId ? "crosshair" : "default",
            }}
          >
            {/* SVG connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              <defs>
                <filter id="nodify-glow">
                  <feGaussianBlur stdDeviation="3" result="cb" />
                  <feMerge><feMergeNode in="cb" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <marker id="arrowSuccess4" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" style={{ fill: "var(--success)" }} />
                </marker>
                <marker id="arrowError4" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" style={{ fill: "var(--destructive)" }} />
                </marker>
                <marker id="arrowIdle4" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" style={{ fill: "var(--primary)" }} />
                </marker>
              </defs>

              {connections.map((conn) => {
                const isSuccess = systemStatus === "success";
                const isErr     = systemStatus === "incomplete" || systemStatus === "partial";
                const stroke    = isSuccess ? "var(--success)" : isErr ? "var(--destructive)" : "var(--primary)";
                const marker    = isSuccess ? "url(#arrowSuccess4)" : isErr ? "url(#arrowError4)" : "url(#arrowIdle4)";
                const d         = getArrowPath(conn.from, conn.to);
                if (!d) return null;
                return (
                  <motion.path
                    key={`${conn.from}-${conn.to}`}
                    d={d} stroke={stroke} strokeWidth="2.5" fill="none"
                    filter="url(#nodify-glow)" markerEnd={marker}
                    strokeDasharray={isErr ? "8 4" : undefined}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                );
              })}

              {systemStatus === "success" && connections.map((conn) => {
                const d = getArrowPath(conn.from, conn.to);
                if (!d) return null;
                return (
                  <motion.circle key={`particle-${conn.from}-${conn.to}`} r="4"
                    filter="url(#nodify-glow)"
                    initial={{ offsetDistance: "0%" } as unknown as { offsetDistance: string }}
                    animate={{ offsetDistance: "100%" } as unknown as { offsetDistance: string }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                    style={{ offsetPath: `path('${d}')`, fill: "var(--success)" } as React.CSSProperties}
                  />
                );
              })}
            </svg>

            <AnimatePresence>
              {placedNodes.map(node => (
                <PlacedNodeComponent
                  key={node.id}
                  node={node}
                  isSelected={selectedNode === node.id}
                  isMoving={movingNodeId === node.id}
                  onTap={(e) => handleNodeClick(node.id, e)}
                  onDoubleClick={() => handleNodeDoubleClick(node.id)}
                  onTouchStart={() => handleNodeTouchStart(node.id)}
                  onTouchEnd={handleNodeTouchEnd}
                  systemStatus={systemStatus}
                />
              ))}
            </AnimatePresence>

            <TrashZone onDelete={deleteNode} />

            {placedNodes.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center" style={{ color: "var(--border)" }}>
                  <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
                    <Zap className="w-16 h-16 mx-auto mb-4 opacity-40" />
                  </motion.div>
                  <p className="text-lg font-medium">Drag or tap components here to start</p>
                  <p className="text-sm mt-1 opacity-60">Your system awaits…</p>
                </div>
              </div>
            )}

            <AnimatePresence>
              {isRunning && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none backdrop-blur-sm"
                  style={{ background: "color-mix(in srgb, var(--secondary) 8%, transparent)", zIndex: 100 }}>
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-14 h-14 rounded-full"
                    style={{ border: "4px solid var(--primary)", borderTopColor: "transparent" }} />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {systemStatus === "success" && (
                <motion.div initial={{ scale: 0, opacity: 0, y: -20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0, opacity: 0, y: -20 }}
                  className="absolute top-6 left-1/2 -translate-x-1/2 z-50">
                  <motion.div animate={{ rotate: [0, 4, -4, 0] }} transition={{ duration: 0.5, repeat: 3 }}
                    className="nodify-success-banner px-8 py-4 shadow-2xl flex items-center gap-3">
                    <CheckCircle className="w-6 h-6" />
                    <div>
                      <p className="font-bold">System Working!</p>
                      <p className="text-xs opacity-80">{validationMessage}</p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/*Right Panel */}
        <motion.div initial={{ x: 300 }} animate={{ x: 0 }} transition={{ duration: 0.4 }}
          className="nodify-sidebar nodify-sidebar-right flex flex-col shadow-2xl"
          style={{ width: "20rem", flexShrink: 0, borderLeft: "1px solid var(--sidebar-border)" }}>

          <div className="p-5" style={{ borderBottom: "1px solid var(--sidebar-border)" }}>
            <h2 className="font-bold text-base" style={{ color: "var(--sidebar-foreground)" }}>System Status</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-5">

            {/* Status box*/}
            <motion.div
              animate={isRunning ? { scale: [1, 1.02, 1] } : {}}
              transition={{ duration: 0.5, repeat: isRunning ? Infinity : 0 }}
              className={`rounded-2xl p-4 transition-all ${
                systemStatus === "success"      ? "nodify-status-success"
                : systemStatus === "incomplete" ? "nodify-status-error"
                : systemStatus === "partial"    ? "nodify-status-partial"
                : isRunning                     ? "nodify-status-running"
                : "nodify-status-idle"
              }`}>
              <div className="flex items-start gap-3">
                {systemStatus === "idle" && !isRunning   && <AlertCircle className="w-5 h-5 mt-0.5" style={{ color: "var(--muted-foreground)" }} />}
                {isRunning && <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><Zap className="w-5 h-5" style={{ color: "var(--secondary)" }} /></motion.div>}
                {!isRunning && systemStatus === "incomplete" && <XCircle    className="w-5 h-5 mt-0.5" style={{ color: "var(--destructive)" }} />}
                {!isRunning && systemStatus === "partial"    && <AlertCircle className="w-5 h-5 mt-0.5" style={{ color: "var(--warning)" }} />}
                {!isRunning && systemStatus === "success"    && <CheckCircle className="w-5 h-5 mt-0.5" style={{ color: "var(--success)" }} />}
                <div>
                  <p className="font-bold text-sm" style={{
                    color: systemStatus === "success"    ? "var(--success)"
                         : systemStatus === "incomplete" ? "var(--destructive)"
                         : systemStatus === "partial"    ? "var(--warning)"
                         : isRunning                     ? "var(--secondary)"
                         : "var(--muted-foreground)"
                  }}>
                    {systemStatus === "idle" && !isRunning && "Not Running"}
                    {isRunning && "Validating…"}
                    {!isRunning && systemStatus === "incomplete" && "Incomplete"}
                    {!isRunning && systemStatus === "partial"    && "Partial — Has Errors"}
                    {!isRunning && systemStatus === "success"    && "Success!"}
                  </p>
                  <p className="text-xs mt-0.5 nodify-muted">
                    {systemStatus === "idle" && !isRunning && "Build your system then run it"}
                    {isRunning && "Checking all connections…"}
                    {!isRunning && systemStatus === "incomplete" && "Missing components"}
                    {!isRunning && systemStatus === "partial"    && "Connection or logic error"}
                    {!isRunning && systemStatus === "success"    && "System working perfectly"}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Score */}
            {systemStatus !== "idle" && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="nodify-score-panel p-4">
                <div className="flex items-center gap-4 mb-3">
                  <ScoreRing accuracy={score.accuracy} />
                  <div>
                    <h3 className="font-bold text-sm" style={{ color: "var(--sidebar-foreground)" }}>
                      {accLabel(score.accuracy)}
                    </h3>
                    <p className="text-xs nodify-muted">{score.accuracy}% accurate</p>
                  </div>
                </div>
                {[
                  { label: "Accuracy",   value: score.accuracy,   fillClass: "nodify-score-fill-accuracy" },
                  { label: "Efficiency", value: score.efficiency, fillClass: "nodify-score-fill-efficiency" },
                ].map(({ label, value, fillClass }) => (
                  <div key={label} className="mb-3 last:mb-0">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="nodify-muted">{label}</span>
                      <span className="font-bold" style={{ color: "var(--sidebar-foreground)" }}>{value}%</span>
                    </div>
                    <div className="nodify-score-track w-full h-1.5">
                      <motion.div className={`h-1.5 ${fillClass}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, value)}%` }}
                        transition={{ duration: 0.7, ease: "easeOut" }} />
                    </div>
                  </div>
                ))}
                {attemptCount > 0 && (
                  <p className="text-xs nodify-muted mt-2">
                    {attemptCount} failed attempt{attemptCount > 1 ? "s" : ""} — efficiency −{Math.min(100, attemptCount * selectedLevel.efficiencyConfig.attemptPenalty)}%
                  </p>
                )}
              </motion.div>
            )}

            {/* Duplicate warning */}
            <AnimatePresence>
              {duplicateWarning && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  className="nodify-duplicate-warn p-3">
                  <p className="text-xs font-bold mb-0.5" style={{ color: "var(--warning)" }}>Duplicate Node</p>
                  <p className="text-xs nodify-muted">{duplicateWarning}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error message */}
            {validationMessage && systemStatus !== "success" && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                className="nodify-error-panel p-4">
                <p className="text-xs font-bold mb-1" style={{ color: "var(--destructive)" }}>{errorType || "Error"}</p>
                <p className="text-sm" style={{ color: "var(--foreground)" }}>{validationMessage}</p>
              </motion.div>
            )}

            {/* Warnings */}
            {validationWarnings.length > 0 && systemStatus !== "success" && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                className="nodify-warning-panel p-4">
                <p className="text-xs font-bold mb-2" style={{ color: "var(--warning)" }}>Suggestions</p>
                <div className="space-y-1.5">
                  {validationWarnings.map((w, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: "var(--warning)" }} />
                      <p className="text-xs nodify-muted">{w}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Current hint */}
            {currentHint && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                className="nodify-hint-current p-4">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--primary)" }} />
                  <div>
                    <p className="text-xs font-bold mb-1" style={{ color: "var(--primary)" }}>Hint</p>
                    <p className="text-sm" style={{ color: "var(--foreground)" }}>{currentHint}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Progress */}
            <div className="nodify-progress-panel p-4">
              <h3 className="nodify-section-label mb-3">Progress</h3>
              <div className="space-y-2 text-sm mb-3">
                <div className="flex justify-between">
                  <span className="nodify-muted">Components placed</span>
                  <span className="font-bold" style={{ color: "var(--foreground)" }}>{placedNodes.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="nodify-muted">Connections made</span>
                  <span className="font-bold" style={{ color: "var(--foreground)" }}>{connections.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="nodify-muted">Failed attempts</span>
                  <span className="font-bold" style={{ color: attemptCount > 0 ? "var(--warning)" : "var(--foreground)" }}>{attemptCount}</span>
                </div>
              </div>

              {failedAttemptLog.length > 0 && (
                <div>
                  <p className="nodify-section-label mb-2">Attempt History</p>
                  <div className="space-y-2">
                    {[...failedAttemptLog].reverse().map((entry, idx) => {
                      const num = failedAttemptLog.length - idx;
                      return (
                        <motion.div key={num} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                          className="rounded-lg p-2.5"
                          style={{ background: "color-mix(in srgb, var(--destructive) 8%, transparent)", border: "1px solid color-mix(in srgb, var(--destructive) 22%, transparent)" }}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold" style={{ color: "var(--destructive)" }}>Attempt #{num}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs nodify-muted">{entry.errorType}</span>
                              <span className="text-xs font-bold" style={{ color: accColor(entry.accuracy) }}>{entry.accuracy}%</span>
                            </div>
                          </div>
                          <p className="text-xs nodify-muted leading-relaxed">{entry.message}</p>
                          {entry.hint && (
                            <div className="flex items-start gap-1.5 mt-1.5">
                              <Sparkles className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: "var(--primary)" }} />
                              <p className="text-xs" style={{ color: "var(--primary)", opacity: 0.85 }}>{entry.hint}</p>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Draggable component 

function DraggableComponent({ component }: { component: Component }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "component",
    item: { component },
    collect: monitor => ({ isDragging: monitor.isDragging() }),
  }), [component]);

  const Icon = component.icon;
  const [c1, c2] = gradientColors(component.gradient);

  return (
    <motion.div
      ref={(node) => { drag(node as unknown as Element | null); }}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`nodify-component-item p-3 cursor-grab active:cursor-grabbing ${isDragging ? "opacity-40 scale-95" : ""}`}
      style={{ touchAction: "none" }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="font-semibold text-sm" style={{ color: "var(--sidebar-foreground)" }}>{component.name}</p>
          <p className="text-xs nodify-muted capitalize">{component.type}</p>
        </div>
      </div>
    </motion.div>
  );
}

// Placed Node Component 

function PlacedNodeComponent({
  node, isSelected, isMoving, onTap, onDoubleClick, onTouchStart, onTouchEnd, systemStatus,
}: {
  node: PlacedNode;
  isSelected: boolean;
  isMoving: boolean;
  onTap: (e: React.MouseEvent | React.TouchEvent) => void;
  onDoubleClick: () => void;
  onTouchStart: () => void;
  onTouchEnd: () => void;
  systemStatus: string;
}) {
  const Icon = node.component.icon;
  const [c1, c2] = gradientColors(node.component.gradient);

  // DnD drag 
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "placed-node",
    item: { nodeId: node.id },
    collect: monitor => ({ isDragging: monitor.isDragging() }),
  }), [node.id]);

  const lastTap = useRef<number>(0);

  const handleTouchEnd = (e: React.TouchEvent) => {
    onTouchEnd();
    const now = Date.now();
    if (now - lastTap.current < 300) {
      e.preventDefault();
      onDoubleClick();
      lastTap.current = 0;
    } else {
      lastTap.current = now;
    }
  };

  return (
    <motion.div
      ref={(node) => { drag(node as unknown as Element | null); }}
      initial={{ scale: 0, rotate: -90 }}
      animate={{ scale: 1, rotate: 0, left: node.x, top: node.y }}
      exit={{ scale: 0, rotate: 90 }}
      transition={{ scale: { duration: 0.2 }, rotate: { duration: 0.2 }, left: { duration: 0 }, top: { duration: 0 } }}
      className={`absolute cursor-pointer ${isDragging ? "opacity-40" : ""}`}
      style={{ left: node.x, top: node.y, zIndex: isSelected || isMoving ? 5 : 2, touchAction: "none" }}
      onClick={onTap}
      onDoubleClick={(e) => { e.stopPropagation(); onDoubleClick(); }}
      onTouchStart={(e) => { e.stopPropagation(); onTouchStart(); }}
      onTouchEnd={(e) => { e.stopPropagation(); handleTouchEnd(e); }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
    >
      <div className={`nodify-node-card p-4 shadow-2xl
        ${isSelected ? "selected" : ""}
        ${isMoving  ? "nodify-move-mode" : ""}
        ${systemStatus === "success" ? "success" : ""}
        ${(systemStatus === "incomplete" || systemStatus === "partial") ? "error" : ""}
      `}>
        <div className="flex items-center gap-2.5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
          >
            <Icon className="w-5 h-5" />
          </div>
          <span className="font-semibold text-sm whitespace-nowrap" style={{ color: "var(--card-foreground)" }}>
            {node.component.name}
          </span>
        </div>

        {systemStatus !== "idle" && systemStatus !== "running" && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: systemStatus === "success" ? "var(--success)" : "var(--destructive)" }}>
            {systemStatus === "success"
              ? <CheckCircle className="w-3 h-3" style={{ color: "var(--success-foreground)" }} />
              : <AlertCircle className="w-3 h-3" style={{ color: "var(--destructive-foreground)" }} />}
          </motion.div>
        )}

        {isSelected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap font-medium nodify-connect-label">
            tap another to connect
          </motion.div>
        )}

        {isMoving && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap font-medium"
            style={{ color: "var(--primary)" }}>
            tap canvas to place
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// Trash

function TrashZone({ onDelete }: { onDelete: (nodeId: string) => void }) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "placed-node",
    drop: (item: { nodeId: string }) => onDelete(item.nodeId),
    collect: monitor => ({ isOver: monitor.isOver(), canDrop: monitor.canDrop() }),
  }), [onDelete]);

  return (
    <motion.div
      ref={(node) => { drop(node as unknown as Element | null); }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className={`absolute bottom-6 right-6 p-5 transition-all nodify-trash ${canDrop ? "can-drop" : ""} ${isOver && canDrop ? "is-over" : ""}`}
      style={{ zIndex: 1 }}
    >
      <div className="flex flex-col items-center gap-1.5">
        <Trash2 className="w-6 h-6" style={{
          color: isOver && canDrop ? "var(--destructive)" : canDrop ? "var(--destructive)" : "var(--muted-foreground)"
        }} />
        <span className="text-xs font-medium" style={{
          color: isOver && canDrop ? "var(--destructive)" : canDrop ? "var(--destructive)" : "var(--muted-foreground)"
        }}>
          {isOver && canDrop ? "Drop to Delete" : "Delete Zone"}
        </span>
      </div>
    </motion.div>
  );
}