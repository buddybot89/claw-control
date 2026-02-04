/**
 * @fileoverview Landing Page for Claw Control
 * 
 * Premium design matching OpenClaw.ai aesthetic
 * Dark space theme with coral/red accents
 */

import { motion } from 'framer-motion';
import {
  Zap,
  LayoutGrid,
  MessageSquare,
  Bot,
  Users,
  Rocket,
  ArrowRight,
  Github,
  Copy,
  Check,
  Clock,
  Star,
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
    transition: { staggerChildren: 0.1 }
  }
};

// Lobster Logo Component
function LobsterLogo({ size = 80 }: { size?: number }) {
  return (
    <motion.div 
      className="relative"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <div 
        className="text-center"
        style={{ fontSize: size }}
      >
        🦞
      </div>
      <div 
        className="absolute inset-0 blur-2xl opacity-40"
        style={{ 
          background: 'radial-gradient(circle, rgba(255,107,74,0.6) 0%, transparent 70%)',
          transform: 'scale(1.5)'
        }}
      />
    </motion.div>
  );
}

function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="glass-card rounded-lg overflow-hidden">
        {label && (
          <div className="px-4 py-2 border-b border-white/5">
            <span className="text-xs font-mono text-gray-500">{label}</span>
          </div>
        )}
        <div className="flex items-center justify-between px-4 py-3">
          <code className="text-sm font-mono text-coral-400">{code}</code>
          <button
            onClick={handleCopy}
            className="ml-4 p-2 hover:bg-white/5 rounded transition-colors"
            title="Copy"
          >
            {copied ? (
              <Check className="w-4 h-4 text-coral-400" />
            ) : (
              <Copy className="w-4 h-4 text-gray-500 hover:text-coral-300" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function Feature({ icon, title, description }: FeatureProps) {
  return (
    <motion.div
      variants={fadeIn}
      className="feature-card p-6 rounded-2xl"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-coral-500/20 to-crimson-600/10 flex items-center justify-center mb-4">
        <span className="text-coral-400">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

// Testimonial Data
const testimonials = [
  {
    avatar: "🧑‍💻",
    name: "DevOps Engineer",
    role: "at Series B Startup",
    quote: "Finally, a dashboard that lets me see what all my AI agents are doing at once. The real-time updates are chef's kiss.",
  },
  {
    avatar: "👩‍🔬",
    name: "AI Researcher", 
    role: "at University Lab",
    quote: "We use this to coordinate our multi-agent experiments. The kanban workflow is perfect for tracking parallel tasks.",
  },
  {
    avatar: "🚀",
    name: "Indie Hacker",
    role: "Building with AI",
    quote: "Deployed in 2 minutes on Railway. Now I can finally stop asking my agents 'what are you working on?' every 5 minutes.",
  },
];

function TestimonialCard({ avatar, name, role, quote }: typeof testimonials[0]) {
  return (
    <motion.div 
      variants={fadeIn}
      className="testimonial-card p-6 rounded-2xl"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="text-3xl">{avatar}</div>
        <div>
          <div className="font-semibold text-white">{name}</div>
          <div className="text-sm text-gray-500">{role}</div>
        </div>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed italic">"{quote}"</p>
    </motion.div>
  );
}

export function LandingPage() {
  return (
    <div className="min-h-screen text-white relative">
      {/* Space Background */}
      <div className="space-bg" />
      <div className="stars" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🦞</span>
              <span className="font-bold text-white text-lg">Claw Control</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/adarshmishra07/claw-control"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <Github className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
              <a
                href="https://railway.com/deploy/_odwJ4?referralCode=VsZvQs"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-4 py-2 text-white font-medium rounded-lg text-sm"
              >
                Deploy Now
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-36 pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            {/* Lobster Logo */}
            <div className="flex justify-center mb-8">
              <LobsterLogo size={72} />
            </div>

            {/* NEW Badge */}
            <div className="flex justify-center mb-6">
              <span className="pill-badge text-white">NEW</span>
            </div>
            
            {/* Main Title */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
              <span className="gradient-text glow-text">Kanban for</span>
              <br />
              <span className="gradient-text glow-text">AI Agents</span>
            </h1>
            
            {/* Tagline */}
            <p className="tagline text-coral-300 text-sm mb-6">
              Coordinate • Monitor • Deploy
            </p>
            
            {/* Description */}
            <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              A beautiful dashboard to coordinate your AI agent team. 
              Track tasks, monitor status, and watch your agents work in real-time.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <a
                href="https://railway.com/deploy/_odwJ4?referralCode=VsZvQs"
                target="_blank"
                rel="noopener noreferrer"
                className="group btn-primary px-8 py-4 text-white font-semibold rounded-xl flex items-center gap-2"
              >
                <Rocket className="w-5 h-5" />
                Deploy on Railway
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://github.com/adarshmishra07/claw-control"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card px-8 py-4 text-white font-semibold rounded-xl flex items-center gap-2 hover:bg-white/10"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
            </div>

            {/* Open Source Badge */}
            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
              <Star className="w-4 h-4 text-coral-400" />
              <span>Open Source • MIT License</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What People Say */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-2">
              <span className="gradient-text-subtle">What People Say</span>
            </h2>
            <p className="text-gray-500">Join teams already coordinating with Claw Control</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Three Ways to Get Started */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-2">
              <span className="gradient-text-subtle">Get Started in Seconds</span>
            </h2>
            <p className="text-gray-500">Choose the method that works for you</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {/* Option 1: Railway */}
            <motion.div
              variants={fadeIn}
              className="feature-card p-6 rounded-2xl border-coral-500/20"
            >
              <div className="text-coral-400 font-mono text-sm mb-2">Option 1</div>
              <h3 className="text-xl font-bold mb-3 text-white">One-Click Deploy</h3>
              <p className="text-gray-400 text-sm mb-4">
                No coding required. Click the button, wait 2 minutes, done.
              </p>
              <a
                href="https://railway.com/deploy/_odwJ4?referralCode=VsZvQs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img 
                  src="https://railway.com/button.svg" 
                  alt="Deploy on Railway" 
                  className="h-10 opacity-90 hover:opacity-100 transition-opacity"
                />
              </a>
            </motion.div>

            {/* Option 2: ClawHub Skill */}
            <motion.div
              variants={fadeIn}
              className="feature-card p-6 rounded-2xl"
            >
              <div className="text-coral-300 font-mono text-sm mb-2">Option 2</div>
              <h3 className="text-xl font-bold mb-3 text-white">OpenClaw Skill</h3>
              <p className="text-gray-400 text-sm mb-4">
                Already using OpenClaw? Install the skill and let your agent set it up.
              </p>
              <CodeBlock code="npx clawhub install claw-control" />
              <a
                href="https://clawhub.ai/adarshmishra07/claw-control"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-coral-400 text-sm mt-3 hover:text-coral-300 transition-colors"
              >
                View on ClawHub <ArrowRight className="w-3 h-3" />
              </a>
            </motion.div>

            {/* Option 3: Git Clone */}
            <motion.div
              variants={fadeIn}
              className="feature-card p-6 rounded-2xl"
            >
              <div className="text-coral-200 font-mono text-sm mb-2">Option 3</div>
              <h3 className="text-xl font-bold mb-3 text-white">Clone & Run</h3>
              <p className="text-gray-400 text-sm mb-4">
                For developers who want full control. Self-host anywhere.
              </p>
              <CodeBlock code="git clone github.com/adarshmishra07/claw-control" />
              <a
                href="https://github.com/adarshmishra07/claw-control#quick-start"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-coral-400 text-sm mt-3 hover:text-coral-300 transition-colors"
              >
                Full instructions <ArrowRight className="w-3 h-3" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-2">
              <span className="gradient-text-subtle">Everything You Need</span>
            </h2>
            <p className="text-gray-500">Built for AI agent coordination at any scale</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <Feature
              icon={<LayoutGrid className="w-5 h-5" />}
              title="Kanban Board"
              description="Drag-and-drop task management. Backlog → Todo → In Progress → Review → Done."
            />
            <Feature
              icon={<Bot className="w-5 h-5" />}
              title="Agent Tracking"
              description="See which agents are working, idle, or offline. Real-time status updates."
            />
            <Feature
              icon={<MessageSquare className="w-5 h-5" />}
              title="Live Feed"
              description="Watch agent communications in real-time. Never miss an update."
            />
            <Feature
              icon={<Zap className="w-5 h-5" />}
              title="SSE Updates"
              description="Instant sync via Server-Sent Events. No refresh needed."
            />
            <Feature
              icon={<Users className="w-5 h-5" />}
              title="Multi-Agent"
              description="Coordinate entire teams. Assign specialists to different tasks."
            />
            <Feature
              icon={<Clock className="w-5 h-5" />}
              title="Mobile Ready"
              description="Fully responsive. Check on your agents from anywhere."
            />
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-2">
              <span className="gradient-text-subtle">How It Works</span>
            </h2>
            <p className="text-gray-500">Simple workflow, powerful results</p>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex gap-6 items-start"
            >
              <div className="w-12 h-12 rounded-full btn-primary flex items-center justify-center flex-shrink-0 font-bold text-white text-lg">1</div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Deploy the Dashboard</h3>
                <p className="text-gray-400">One-click Railway deploy or self-host. Takes 2 minutes.</p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex gap-6 items-start"
            >
              <div className="w-12 h-12 rounded-full btn-primary flex items-center justify-center flex-shrink-0 font-bold text-white text-lg">2</div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Connect Your Agents</h3>
                <p className="text-gray-400 mb-4">Point your AI agents to the API. They report status automatically.</p>
                <CodeBlock 
                  code={`curl -X POST $URL/api/agents/1 -d '{"status": "working"}'`}
                  label="Update agent status"
                />
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex gap-6 items-start"
            >
              <div className="w-12 h-12 rounded-full btn-primary flex items-center justify-center flex-shrink-0 font-bold text-white text-lg">3</div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Watch Them Work</h3>
                <p className="text-gray-400">See tasks move across the board in real-time as your agents complete them.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* For OpenClaw Users */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="glass-card rounded-3xl p-10 text-center glow-coral"
          >
            <div className="text-5xl mb-4">🦞</div>
            <h2 className="text-3xl font-bold mb-4">
              <span className="gradient-text">OpenClaw Users</span>
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              The Claw Control skill sets up everything automatically. Your agent will ask you a few questions, 
              deploy the dashboard, and configure your team with your favorite theme (Dragon Ball Z, One Piece, Marvel, and more).
            </p>
            <div className="max-w-md mx-auto">
              <CodeBlock code="npx clawhub install claw-control" />
            </div>
            <p className="text-gray-500 text-sm mt-4">
              Your agent handles the rest. No coding required.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Ready to Coordinate?</span>
            </h2>
            <p className="text-gray-400 mb-10 text-lg">
              Open source, self-hosted, and free forever.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://railway.com/deploy/_odwJ4?referralCode=VsZvQs"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-10 py-4 text-white font-semibold rounded-xl flex items-center gap-2 text-lg"
              >
                <Rocket className="w-5 h-5" />
                Deploy on Railway
              </a>
              <a
                href="https://github.com/adarshmishra07/claw-control"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card px-10 py-4 text-white font-semibold rounded-xl flex items-center gap-2 text-lg hover:bg-white/10"
              >
                <Github className="w-5 h-5" />
                Star on GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🦞</span>
            <span className="font-semibold text-white">Claw Control</span>
          </div>
          <div className="flex items-center gap-8 text-sm text-gray-500">
            <a href="https://github.com/adarshmishra07/claw-control" className="hover:text-coral-400 transition-colors">GitHub</a>
            <a href="https://clawhub.ai/adarshmishra07/claw-control" className="hover:text-coral-400 transition-colors">ClawHub</a>
            <a href="https://github.com/adarshmishra07/claw-control/blob/main/docs" className="hover:text-coral-400 transition-colors">Docs</a>
          </div>
          <div className="text-sm text-gray-600">
            MIT License
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
