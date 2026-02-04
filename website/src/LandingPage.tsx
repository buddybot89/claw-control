/**
 * @fileoverview Landing Page for Claw Control
 * 
 * EXACT match of OpenClaw.ai design structure
 */

import { motion } from 'framer-motion';
import {
  LayoutGrid,
  MessageSquare,
  Bot,
  Users,
  Rocket,
  ArrowRight,
  Github,
  Copy,
  Check,
  Database,
  Gauge,
  Puzzle,
  BookOpen,
  MessageCircle,
} from 'lucide-react';
import { useState } from 'react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 }
  }
};

// ============ Components ============

function Terminal({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="terminal rounded-xl overflow-hidden">
      <div className="terminal-header px-4 py-3 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
        <div className="w-3 h-3 rounded-full bg-[#27CA3F]" />
      </div>
      <div className="flex items-center justify-between px-5 py-4">
        <code className="text-sm text-gray-300 font-mono">
          <span className="text-[#FF6B6B]">$</span> {command}
        </code>
        <button
          onClick={handleCopy}
          className="ml-4 p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-gray-500 hover:text-white" />
          )}
        </button>
      </div>
    </div>
  );
}

// Feature Card
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      variants={fadeIn}
      className="feature-card p-6 rounded-2xl"
    >
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B6B]/20 to-[#EF4444]/10 flex items-center justify-center mb-4">
        <span className="text-[#FF6B6B]">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

// Testimonials
const testimonials = [
  {
    avatar: "🧑‍💻",
    name: "DevOps Engineer",
    handle: "@devops_daily",
    quote: "Finally, a dashboard that lets me see what all my AI agents are doing at once. The real-time updates are chef's kiss 👨‍🍳",
  },
  {
    avatar: "👩‍🔬",
    name: "AI Researcher", 
    handle: "@ai_labs",
    quote: "We use this to coordinate our multi-agent experiments. The kanban workflow is perfect for tracking parallel tasks.",
  },
  {
    avatar: "🚀",
    name: "Indie Hacker",
    handle: "@shipper",
    quote: "Deployed in 2 minutes on Railway. Now I can stop asking my agents 'what are you working on?' every 5 minutes 😅",
  },
];

function TestimonialCard({ avatar, name, handle, quote }: typeof testimonials[0]) {
  return (
    <motion.div 
      variants={fadeIn}
      className="testimonial-card p-6 rounded-2xl"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-xl">
          {avatar}
        </div>
        <div>
          <div className="font-semibold text-white text-sm">{name}</div>
          <div className="text-sm text-[#FF6B6B]">{handle}</div>
        </div>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed">"{quote}"</p>
    </motion.div>
  );
}

// Integration badges
const integrations = [
  { name: "OpenClaw", icon: "🦞" },
  { name: "Railway", icon: "🚂" },
  { name: "Docker", icon: "🐳" },
  { name: "Claude", icon: "🤖" },
  { name: "GPT", icon: "✨" },
  { name: "Telegram", icon: "📱" },
  { name: "Discord", icon: "🎮" },
  { name: "Slack", icon: "💼" },
  { name: "GitHub", icon: "🐙" },
  { name: "REST API", icon: "🔌" },
  { name: "Webhooks", icon: "🪝" },
  { name: "SSE", icon: "📡" },
  { name: "Vercel", icon: "▲" },
  { name: "Fly.io", icon: "🪁" },
];

function IntegrationBadge({ name, icon }: { name: string; icon: string }) {
  return (
    <motion.div
      variants={fadeIn}
      className="integration-badge px-4 py-2.5 rounded-full flex items-center gap-2"
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm text-gray-300">{name}</span>
    </motion.div>
  );
}

// Press/Built For cards
const pressItems = [
  {
    icon: "🤖",
    title: "AI Developers",
    description: "Building multi-agent systems and AI workflows",
  },
  {
    icon: "🏢",
    title: "Startups",
    description: "Running AI-powered automation at scale",
  },
];

// ============ Main Component ============

export function LandingPage() {
  const [activeTab, setActiveTab] = useState<'railway' | 'npm' | 'docker' | 'git'>('railway');

  const commands: Record<string, string> = {
    railway: 'railway up',
    npm: 'npx clawhub install claw-control',
    docker: 'docker run -p 3000:3000 ghcr.io/adarshmishra07/claw-control',
    git: 'git clone https://github.com/adarshmishra07/claw-control && cd claw-control && npm start',
  };

  return (
    <div className="min-h-screen text-white relative">
      {/* Background */}
      <div className="space-bg" />
      <div className="stars" />

      {/* ======== HERO ======== */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            {/* 1. Lobster Logo */}
            <motion.div 
              className="mb-6"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-7xl sm:text-8xl filter drop-shadow-lg">🦞</span>
            </motion.div>

            {/* 2. Title - Serif + Gradient */}
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black mb-4 tracking-tight">
              <span className="gradient-text">Claw Control</span>
            </h1>
            
            {/* 3. Tagline - SPACED UPPERCASE */}
            <p className="tagline text-[#FF6B6B] text-xs sm:text-sm mb-6 tracking-[0.3em]">
              THE DASHBOARD FOR AI AGENT TEAMS.
            </p>
            
            {/* 4. Description */}
            <p className="text-base sm:text-lg text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed">
              A beautiful kanban board to coordinate your AI agents. 
              Track tasks, monitor status, and watch your team work in real-time.
            </p>

            {/* 5. NEW Pill + Introducing Button */}
            <motion.a
              href="https://github.com/adarshmishra07/claw-control/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="pill-button inline-flex items-center gap-3 px-5 py-2.5 rounded-full"
              whileHover={{ scale: 1.02 }}
            >
              <span className="pill-new text-white">NEW</span>
              <span className="text-gray-300 text-sm">Introducing Claw Control</span>
              <ArrowRight className="w-4 h-4 text-[#FF6B6B]" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ======== 6. WHAT PEOPLE SAY ======== */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-2xl sm:text-3xl font-bold text-white text-center mb-10"
          >
            What People Say
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-4"
          >
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ======== 7. QUICK START ======== */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-2xl sm:text-3xl font-bold text-white text-center mb-8"
          >
            Quick Start
          </motion.h2>

          {/* Tab Selector */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="flex flex-wrap justify-center gap-2 mb-6"
          >
            {[
              { id: 'railway', label: 'One-Click' },
              { id: 'npm', label: 'npm' },
              { id: 'docker', label: 'Docker' },
              { id: 'git', label: 'Self-Host' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                  activeTab === tab.id 
                    ? 'bg-[#FF6B6B]/15 border-[#FF6B6B]/40 text-[#FF6B6B]' 
                    : 'bg-transparent border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Terminal / Deploy Button */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            {activeTab === 'railway' ? (
              <div className="text-center">
                <a
                  href="https://railway.com/deploy/_odwJ4?referralCode=VsZvQs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img 
                    src="https://railway.com/button.svg" 
                    alt="Deploy on Railway" 
                    className="h-12 mx-auto hover:opacity-90 transition-opacity"
                  />
                </a>
                <p className="text-gray-500 text-sm mt-4">Click → Configure → Done in 2 minutes</p>
              </div>
            ) : (
              <Terminal command={commands[activeTab]} />
            )}
          </motion.div>
        </div>
      </section>

      {/* ======== 8. WHAT IT DOES ======== */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-2xl sm:text-3xl font-bold text-white text-center mb-10"
          >
            What It Does
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <FeatureCard
              icon={<LayoutGrid className="w-5 h-5" />}
              title="Kanban Board"
              description="Drag-and-drop tasks across columns. Backlog → Todo → In Progress → Review → Done."
            />
            <FeatureCard
              icon={<Bot className="w-5 h-5" />}
              title="Agent Tracking"
              description="See which agents are working, idle, or offline. Real-time status with colored indicators."
            />
            <FeatureCard
              icon={<MessageSquare className="w-5 h-5" />}
              title="Live Feed"
              description="Watch agent communications as they happen. Never miss an important update."
            />
            <FeatureCard
              icon={<Gauge className="w-5 h-5" />}
              title="Real-Time Sync"
              description="Instant updates via Server-Sent Events. No manual refresh needed."
            />
            <FeatureCard
              icon={<Users className="w-5 h-5" />}
              title="Multi-Agent Teams"
              description="Coordinate entire teams. Assign specialists to tasks by their strengths."
            />
            <FeatureCard
              icon={<Database className="w-5 h-5" />}
              title="Persistent State"
              description="SQLite database keeps your tasks and history. Survives restarts."
            />
          </motion.div>
        </div>
      </section>

      {/* ======== 9. WORKS WITH EVERYTHING ======== */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-2xl sm:text-3xl font-bold text-white text-center mb-10"
          >
            Works With Everything
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-3"
          >
            {integrations.map((int, i) => (
              <IntegrationBadge key={i} {...int} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ======== 10. FEATURED IN / BUILT FOR ======== */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-2xl sm:text-3xl font-bold text-white text-center mb-10"
          >
            Built For
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 gap-4"
          >
            {pressItems.map((item, i) => (
              <motion.div 
                key={i}
                variants={fadeIn}
                className="press-card p-6 rounded-2xl flex items-start gap-4"
              >
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ======== 11. FOOTER ICONS ======== */}
      <section className="py-12 px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="flex justify-center gap-4"
        >
          <a
            href="https://github.com/adarshmishra07/claw-control/discussions"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon-btn p-4 rounded-xl"
            title="Discussions"
          >
            <MessageCircle className="w-6 h-6 text-gray-400 hover:text-white transition-colors" />
          </a>
          <a
            href="https://github.com/adarshmishra07/claw-control#readme"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon-btn p-4 rounded-xl"
            title="Documentation"
          >
            <BookOpen className="w-6 h-6 text-gray-400 hover:text-white transition-colors" />
          </a>
          <a
            href="https://github.com/adarshmishra07/claw-control"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon-btn p-4 rounded-xl"
            title="GitHub"
          >
            <Github className="w-6 h-6 text-gray-400 hover:text-white transition-colors" />
          </a>
          <a
            href="https://clawhub.ai/adarshmishra07/claw-control"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon-btn p-4 rounded-xl"
            title="ClawHub"
          >
            <span className="text-2xl opacity-60 hover:opacity-100 transition-opacity">🦞</span>
          </a>
        </motion.div>
      </section>

      {/* ======== 12. STAY IN THE LOOP ======== */}
      <section className="py-12 px-4">
        <div className="max-w-md mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-xl font-bold text-white mb-3">Stay in the Loop</h2>
            <p className="text-gray-500 text-sm mb-5">Updates on new features and releases</p>
            
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="you@email.com"
                className="newsletter-input flex-1 px-4 py-3 rounded-xl text-white text-sm placeholder-gray-500"
              />
              <button className="btn-primary px-5 py-3 rounded-xl text-white font-semibold text-sm">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ======== CTA ======== */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="gradient-text">Ready to Coordinate?</span>
            </h2>
            <p className="text-gray-400 mb-8">
              Open source • Self-hosted • Free forever
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://railway.com/deploy/_odwJ4?referralCode=VsZvQs"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-8 py-4 rounded-xl flex items-center gap-2 text-white font-semibold"
              >
                <Rocket className="w-5 h-5" />
                Deploy on Railway
              </a>
              <a
                href="https://github.com/adarshmishra07/claw-control"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-8 py-4 rounded-xl flex items-center gap-2 text-white font-semibold"
              >
                <Github className="w-5 h-5" />
                Star on GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ======== 13. FOOTER ======== */}
      <footer className="border-t border-white/5 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🦞</span>
              <span className="font-semibold text-white">Claw Control</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <a href="https://github.com/adarshmishra07/claw-control#readme" className="hover:text-[#FF6B6B] transition-colors">Docs</a>
              <a href="https://github.com/adarshmishra07/claw-control" className="hover:text-[#FF6B6B] transition-colors">GitHub</a>
              <a href="https://clawhub.ai/adarshmishra07/claw-control" className="hover:text-[#FF6B6B] transition-colors">ClawHub</a>
              <a href="https://github.com/adarshmishra07/claw-control/blob/main/LICENSE" className="hover:text-[#FF6B6B] transition-colors">MIT License</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
