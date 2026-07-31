import {
  BarChart3,
  Bell,
  Cloud,
  FileText,
  LineChart,
  Lock,
  Map,
  RefreshCw,
  Satellite,
  Server,
  ShieldCheck,
  Users,
} from 'lucide-react';
import type { FeatureItem, PlatformView, Step } from '@/types';

/** Captures réelles de l'application — textes dans `platform.views.<id>`. */
export const PLATFORM_VIEWS = [
  { id: 'pivot', image: '/platform/crop-health-pivot.webp', width: 1600, height: 1000 },
  { id: 'olive', image: '/platform/crop-health-olive.webp', width: 1600, height: 1000 },
] as const satisfies readonly PlatformView[];

/** Les six modules — textes dans `platform.modules.<id>`. */
export const PLATFORM_MODULES = [
  { id: 'dashboard', icon: BarChart3 },
  { id: 'mapping', icon: Map },
  { id: 'satellite', icon: Satellite },
  { id: 'weather', icon: Cloud },
  { id: 'reports', icon: FileText },
  { id: 'alerts', icon: Bell },
] as const satisfies readonly FeatureItem[];

/** Les quatre étapes de démarrage — textes dans `platform.steps.<id>`. */
export const PLATFORM_STEPS = [
  { id: 'account' },
  { id: 'fields' },
  { id: 'monitor' },
  { id: 'decisions' },
] as const satisfies readonly Step[];

/** Usages avancés — textes dans `platform.capabilities.items.<id>`. */
export const PLATFORM_CAPABILITIES = [
  { id: 'mapping', icon: Map },
  { id: 'analytics', icon: LineChart },
  { id: 'alerts', icon: Bell, tone: 'ocre' },
  { id: 'farm', icon: Users },
] as const satisfies readonly FeatureItem[];

/** Couches techniques — textes dans `platform.architecture.layers.<id>`. */
export const PLATFORM_LAYERS = [
  'ingestion',
  'processing',
  'storage',
  'api',
  'delivery',
] as const;

/** Garanties cloud et sécurité — textes dans `platform.security.items.<id>`. */
export const PLATFORM_SECURITY = [
  { id: 'hosting', icon: Server },
  { id: 'encryption', icon: Lock },
  { id: 'ownership', icon: ShieldCheck },
  { id: 'availability', icon: RefreshCw },
] as const satisfies readonly FeatureItem[];
