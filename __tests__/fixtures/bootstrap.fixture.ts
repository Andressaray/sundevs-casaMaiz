import type { Bootstrap, Data } from '@/types/bootstrap.types';
import { imageFixture } from './image.fixture';

const navigationItems = [
  {
    label: 'Inicio',
    highlighted: true,
    icon: 'home',
    destination: {
      key: 'home',
      label: 'Inicio',
      path: '/',
      supportedPlatforms: ['ios', 'android', 'web'],
    },
  },
  {
    label: 'Menu',
    highlighted: false,
    icon: 'menu',
    destination: {
      key: 'menu',
      label: 'Menu',
      path: '/menu',
      supportedPlatforms: ['ios', 'android', 'web'],
    },
  },
  {
    label: 'Reservas',
    highlighted: false,
    icon: 'reservation',
    destination: {
      key: 'reservations',
      label: 'Reservas',
      path: '/reservas',
      supportedPlatforms: ['ios', 'android'],
    },
  },
  {
    label: 'Privacidad',
    highlighted: false,
    icon: 'privacy',
    destination: {
      key: 'privacy',
      label: 'Privacidad',
      path: '/legal/privacy_policy',
      supportedPlatforms: ['ios', 'android', 'web'],
    },
  },
];

const audience = {
  platforms: ['ios', 'android', 'web'],
  markets: ['MX'],
  authenticationStates: [],
  timezone: 'America/Mexico_City',
  startsAt_tz: '2026-01-01T00:00:00.000Z',
  endsAt_tz: '2099-01-01T00:00:00.000Z',
};

export const alertFixture = {
  id: 'alert-1',
  title: 'Horario especial',
  message: 'Este domingo cerramos a las 18:00.',
  placement: 'topBar',
  priority: 1,
  dismissible: true,
  pageSlugs: [],
  revision: '2026-08-01T00:00:00.000Z',
  image: imageFixture,
  actions: [{ label: 'Ver mas', href: '/menu' }],
  frequency: { type: 'session', cooldownHours: 24 },
  trigger: { type: 'immediate', delayMs: 0, scrollPercent: 0 },
};

export const buildBootstrapData = (overrides: Partial<Data> = {}) =>
  ({
    alerts: [alertFixture],
    experience: {
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-08-01T00:00:00.000Z',
      name: 'Default',
      key: 'default',
      priority: 1,
      layout: 'standard',
      visibleModules: ['home', 'menu'],
      labels: [{ key: 'brand', value: 'Casa Maiz', id: 'label-1' }],
      navigation: {
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-08-01T00:00:00.000Z',
        name: 'Main',
        key: 'main',
        items: [],
        audience,
        editorialStatus: 'published',
        _status: 'published',
        id: 'nav-exp-1',
        publicationStartsAt_tz: '2026-01-01T00:00:00.000Z',
        publicationEndsAt_tz: '2099-01-01T00:00:00.000Z',
      },
      visualDefaults: { accent: '#A85C2C', density: 'comfortable' },
      audience,
      editorialStatus: 'published',
      _status: 'published',
      id: 'exp-1',
      publicationStartsAt_tz: '2026-01-01T00:00:00.000Z',
      publicationEndsAt_tz: '2099-01-01T00:00:00.000Z',
    },
    featureFlags: {
      show_reorder: false,
      enable_new_home: true,
      show_store_locator_banner: false,
      show_rewards_module: false,
    },
    navigation: {
      id: 'nav-1',
      key: 'main',
      name: 'Main navigation',
      items: navigationItems,
    },
    operationalControls: {
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-08-01T00:00:00.000Z',
      name: 'Default controls',
      priority: 1,
      mode: 'normal',
      bannerMessage: '',
      appUpdate: {
        policy: 'optional',
        minimumVersion: '1.0.0',
        recommendedVersion: '1.0.1',
        message: 'Hay una nueva version disponible.',
      },
      audience,
      editorialStatus: 'published',
      _status: 'published',
      publicationEndsAt_tz: '2099-01-01T00:00:00.000Z',
      publicationStartsAt_tz: '2026-01-01T00:00:00.000Z',
      id: 'ops-1',
    },
    promotions: [],
    ...overrides,
  }) as unknown as Data;

export const buildBootstrap = (overrides: Partial<Data> = {}): Bootstrap => ({
  contractVersion: '1.0.0',
  data: buildBootstrapData(overrides),
});

export const bootstrapFixture: Bootstrap = buildBootstrap();

export const bootstrapOnlyHomeAndMenuFixture: Bootstrap = buildBootstrap({
  navigation: {
    id: 'nav-1',
    key: 'main',
    name: 'Main navigation',
    items: navigationItems.slice(0, 2),
  },
} as unknown as Partial<Data>);
