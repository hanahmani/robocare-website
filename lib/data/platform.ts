import { BarChart3, Bell, Cloud, FileText, Map, Satellite } from 'lucide-react';
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
