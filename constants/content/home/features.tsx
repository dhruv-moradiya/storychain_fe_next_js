import { GitBranch, Users, MessageCircle, Zap, Shield, Layers } from 'lucide-react';

const features = [
  {
    icon: GitBranch,
    title: 'Infinite Branching',
    description: 'Let your story split into countless paths. Every choice creates a new reality.',
    color: 'var(--brand-blue)',
  },
  {
    icon: Users,
    title: 'Collaborative Writing',
    description: 'Invite co-authors into your world. Write together in real-time harmony.',
    color: 'var(--brand-pink-500)',
  },
  {
    icon: MessageCircle,
    title: 'Inline Comments',
    description: 'Discuss moments within the story. Let feedback flow naturally.',
    color: 'var(--brand-orange)',
  },
  {
    icon: Layers,
    title: 'Version History',
    description: "Every revision is remembered. Return to any moment in your story's past.",
    color: '#8b5cf6',
  },
  {
    icon: Zap,
    title: 'Real-time Updates',
    description: "See changes as they happen. Stay connected to your story's heartbeat.",
    color: '#f59e0b',
  },
  {
    icon: Shield,
    title: 'Your Story, Your Rules',
    description: 'Control who reads, who writes, and how far your branches grow.',
    color: '#10b981',
  },
];

export { features };
