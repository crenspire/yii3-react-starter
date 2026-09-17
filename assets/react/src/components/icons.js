import {
  BarChart3,
  Box,
  Brain,
  CreditCard,
  FlaskConical,
  Globe,
  Key,
  Layers,
  Palette,
  Rocket,
  ShieldCheck,
  Zap,
} from 'lucide-react';

// Maps the icon names sent from PHP props to Lucide components.
export const iconMap = {
  rocket: Rocket,
  docker: Box,
  layers: Layers,
  palette: Palette,
  zap: Zap,
  shield: ShieldCheck,
  flask: FlaskConical,
  key: Key,
  creditCard: CreditCard,
  globe: Globe,
  brain: Brain,
  barChart: BarChart3,
};

export function iconFor(name) {
  return iconMap[name] ?? Rocket;
}
