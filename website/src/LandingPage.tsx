/**
 * @fileoverview Landing Page for Claw Control
 * 
 * Clean, modern landing page following OpenClaw.ai design language
 */

import { motion } from 'framer-motion';
import {
  Zap,
  LayoutGrid,
  MessageSquare,
  Terminal,
  Users,
  Rocket,
  ArrowRight,
  Github,
  Copy,
  Check,
  Clock,
  Bot,
  Workflow,
} from 'lucide-react';
import { useState } from 'react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
        {label && (
          <div className="px-4 py-2 border-b border-gray-800 bg-gray-900/50">
            <span className="text-xs font-mono text-gray-500">{label}</span>
          </div>
        )}
        <div className="flex items-center justify-between px-4 py-3">
          <code className="text-sm font-mono text-emerald-400">{code}</code>
          <button
            onClick={handleCopy}
            className="ml-4 p-2 hover:bg-gray-800 rounded transition-colors"
            title="Copy"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4 text-gray-500 hover:text-white" />
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
      className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-colors"
    >
      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
        <span className="text-emerald-400">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

export function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/80 border-b border-gray-800">
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
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Github className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
              <a
                href="https://railway.com/deploy/_odwJ4?referralCode=VsZvQs"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-black font-medium rounded-lg transition-colors text-sm"
              >
                Deploy Now
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
              <span className="text-sm text-emerald-400">Open Source • MIT License</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Kanban for
              <span className="text-emerald-400"> AI Agents</span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              A beautiful dashboard to coordinate your AI agent team. 
              Track tasks, monitor status, and watch your agents work in real-time.
            </p>

            {/* Quick Start Options */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a
                href="https://railway.com/deploy/_odwJ4?referralCode=VsZvQs"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-lg transition-all flex items-center gap-2"
              >
                <Rocket className="w-5 h-5" />
                Deploy on Railway
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://github.com/adarshmishra07/claw-control"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Three Ways to Get Started */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Get Started in Seconds</h2>
            <p className="text-gray-400">Choose the method that works for you</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Option 1: Railway */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-gradient-to-b from-emerald-500/10 to-transparent border border-emerald-500/20"
            >
              <div className="text-emerald-400 font-mono text-sm mb-2">Option 1</div>
              <h3 className="text-xl font-bold mb-3">One-Click Deploy</h3>
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
                  className="h-10"
                />
              </a>
            </motion.div>

            {/* Option 2: ClawHub Skill */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-xl bg-gradient-to-b from-blue-500/10 to-transparent border border-blue-500/20"
            >
              <div className="text-blue-400 font-mono text-sm mb-2">Option 2</div>
              <h3 className="text-xl font-bold mb-3">OpenClaw Skill</h3>
              <p className="text-gray-400 text-sm mb-4">
                Already using OpenClaw? Install the skill and let your agent set it up.
              </p>
              <CodeBlock code="npx clawhub install claw-control" />
              <a
                href="https://clawhub.ai/adarshmishra07/claw-control"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-400 text-sm mt-3 hover:underline"
              >
                View on ClawHub <ArrowRight className="w-3 h-3" />
              </a>
            </motion.div>

            {/* Option 3: Git Clone */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-xl bg-gradient-to-b from-purple-500/10 to-transparent border border-purple-500/20"
            >
              <div className="text-purple-400 font-mono text-sm mb-2">Option 3</div>
              <h3 className="text-xl font-bold mb-3">Clone & Run</h3>
              <p className="text-gray-400 text-sm mb-4">
                For developers who want full control. Self-host anywhere.
              </p>
              <CodeBlock code="git clone github.com/adarshmishra07/claw-control" />
              <a
                href="https://github.com/adarshmishra07/claw-control#quick-start"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-purple-400 text-sm mt-3 hover:underline"
              >
                Full instructions <ArrowRight className="w-3 h-3" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
            <p className="text-gray-400">Built for AI agent coordination at any scale</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
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
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400">Simple workflow, powerful results</p>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex gap-6 items-start"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 font-bold text-black">1</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Deploy the Dashboard</h3>
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
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 font-bold text-black">2</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Connect Your Agents</h3>
                <p className="text-gray-400">Point your AI agents to the API. They report status automatically.</p>
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
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 font-bold text-black">3</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Watch Them Work</h3>
                <p className="text-gray-400">See tasks move across the board in real-time as your agents complete them.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* For OpenClaw Users */}
      <section className="py-20 px-4 border-t border-gray-800 bg-gradient-to-b from-emerald-500/5 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="text-4xl mb-4">🦞</div>
            <h2 className="text-3xl font-bold mb-4">OpenClaw Users</h2>
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
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Coordinate?</h2>
            <p className="text-gray-400 mb-8">
              Open source, self-hosted, and free forever.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://railway.com/deploy/_odwJ4?referralCode=VsZvQs"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                <Rocket className="w-5 h-5" />
                Deploy on Railway
              </a>
              <a
                href="https://github.com/adarshmishra07/claw-control"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                <Github className="w-5 h-5" />
                Star on GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🦞</span>
            <span className="font-semibold">Claw Control</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="https://github.com/adarshmishra07/claw-control" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://clawhub.ai/adarshmishra07/claw-control" className="hover:text-white transition-colors">ClawHub</a>
            <a href="https://github.com/adarshmishra07/claw-control/blob/main/docs" className="hover:text-white transition-colors">Docs</a>
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
