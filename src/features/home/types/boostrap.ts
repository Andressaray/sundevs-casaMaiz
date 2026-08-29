export interface BootstrapRequest {
    platform: string;
    market: string;
    audience: string;
    appVersion: string;
}

export interface ContextResponse {
    contractVersion: string;
    nextChangeAt: string;
    preview: boolean;
    resolvedContext: ResolvedContext;
    data: ContextData;
  }
  
  export interface ResolvedContext {
    appVersion: string;
    authenticationState: string;
    market: string;
    now: string;
    platform: string;
    store: string;
  }
  
  export interface ContextData {
    alerts: Alert[];
    experience: Record<string, unknown>;
    featureFlags: Record<string, boolean>;
    navigation: Navigation;
    operationalControls: Record<string, unknown>;
    promotions: Promotion[];
  }
  
  export interface Alert {
    actions: AlertAction[];
    dismissible: boolean;
    eyebrow: string;
    frequency: Record<string, unknown>;
    id: string;
    image: string;
    message: string;
    pageSlugs: string[];
    placement: string;
    priority: number;
    revision: string;
    title: string;
    trigger: Record<string, unknown>;
  }
  
  export interface AlertAction {
    href: string;
    label: string;
  }
  
  export interface Navigation {
    id: string;
    key: string;
    name: string;
    items: NavigationItem[];
  }
  
  export interface NavigationItem {
    destination: NavigationDestination;
    highlighted: boolean;
    icon: string;
    label: string;
  }
  
  export interface NavigationDestination {
    key: string;
    label: string;
    path: string;
    supportedPlatforms: string[];
  }
  
  export interface Promotion {
    id: string;
    title: string;
    eyebrow: string;
    description: string;
    placement: string;
    priority: number;
    desktopImage: string;
    mobileImage: string;
    cta: Record<string, unknown>;
    externalPromotion: boolean;
  }