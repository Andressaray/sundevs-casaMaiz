export interface Bootstrap {
  contractVersion: string;
  data: Data;
}

export interface Data {
  alerts: Alert[];
  experience: Experience;
  featureFlags: FeatureFlags;
  navigation: DataNavigation;
  operationalControls: OperationalControls;
  promotions: Promotion[];
}

export interface Alert {
  actions: Action[];
  dismissible: boolean;
  frequency: Frequency;
  id: string;
  image: Image;
  message: string;
  pageSlugs: unknown[];
  placement: string;
  priority: number;
  revision: Date;
  title: string;
  trigger: Trigger;
}

export interface Action {
  href: string;
  label: string;
}

export interface Frequency {
  type: string;
  cooldownHours: number;
}

export interface Image {
  createdAt: Date;
  updatedAt: Date;
  alt: string;
  usage: unknown[];
  url: string;
  filename: string;
  mimeType: MIMEType;
  filesize: number;
  width: number;
  height: number;
  focalX: number;
  focalY: number;
  sizes: Sizes;
  id: string;
  thumbnailURL: string;
  caption?: Caption;
}

export interface Caption {
  root: Root;
}

export interface Root {
  type: string;
  children: RootChild[];
  direction: string;
  format: string;
  indent: number;
  version: number;
}

export interface RootChild {
  type: string;
  children: PurpleChild[];
  direction: string;
  format: string;
  indent: number;
  textFormat: number;
  version: number;
}

export interface PurpleChild {
  type: string;
  detail?: number;
  format: number | string;
  mode?: string;
  style?: string;
  text?: string;
  version: number;
  children?: FluffyChild[];
  direction?: string;
  fields?: Fields;
  indent?: number;
}

export interface FluffyChild {
  type: string;
  detail: number;
  format: number;
  mode: string;
  style: string;
  text: string;
  version: number;
}

export interface Fields {
  linkType: string;
  newTab: boolean;
  url: string;
}

export enum MIMEType {
  _ImageWebp = "image/webp",
}

export interface Sizes {
  thumbnail: Large;
  square: Large;
  small: Large;
  medium: Large;
  large: Large;
  xlarge: Large;
  og: Large;
}

export interface Large {
  url: string;
  width: number;
  height: number;
  mimeType: MIMEType;
  filesize: number;
  filename: string;
}

export interface Trigger {
  type: string;
  delayMs: number;
  scrollPercent: number;
}

export interface Experience {
  createdAt: Date;
  updatedAt: Date;
  name: string;
  key: string;
  priority: number;
  layout: string;
  visibleModules: string[];
  labels: Label[];
  navigation: ExperienceNavigation;
  visualDefaults: VisualDefaults;
  audience: Audience;
  editorialStatus: string;
  _status: string;
  id: string;
  publicationStartsAt_tz: string;
  publicationEndsAt_tz: string;
}

export interface Audience {
  platforms: Platform[];
  markets?: string[];
  authenticationStates: unknown[];
  timezone: string;
  startsAt_tz: string;
  endsAt_tz: string;
}

export enum Platform {
  _Android = "android",
  _Ios = "ios",
  _Web = "web",
}

export interface Label {
  key: string;
  value: string;
  id: string;
}

export interface ExperienceNavigation {
  createdAt: Date;
  updatedAt: Date;
  name: string;
  key: string;
  items: PurpleItem[];
  audience: Audience;
  editorialStatus: string;
  _status: string;
  id: string;
  publicationStartsAt_tz: string;
  publicationEndsAt_tz: string;
}

export interface PurpleItem {
  label: string;
  destination: PurpleDestination;
  highlighted: boolean;
  id: string;
  icon?: string;
}

export interface PurpleDestination {
  createdAt: Date;
  updatedAt: Date;
  label: string;
  key: string;
  path: string;
  iosPath: string;
  androidPath: string;
  platforms: Platform[];
  id: string;
}

export interface VisualDefaults {
  accent: string;
  density: string;
}

export interface FeatureFlags {
  show_reorder: boolean;
  enable_new_home: boolean;
  show_store_locator_banner: boolean;
  show_rewards_module: boolean;
}

export interface DataNavigation {
  id: string;
  key: string;
  name: string;
  items: FluffyItem[];
}

export interface FluffyItem {
  label: string;
  highlighted: boolean;
  destination: CtaDestination;
  icon?: string;
}

export interface CtaDestination {
  key: string;
  label: string;
  path: string;
  supportedPlatforms: Platform[];
}

export interface OperationalControls {
  createdAt: Date;
  updatedAt: Date;
  name: string;
  priority: number;
  mode: string;
  bannerMessage: string;
  appUpdate: AppUpdate;
  audience: Audience;
  editorialStatus: string;
  _status: string;
  publicationEndsAt_tz: string;
  publicationStartsAt_tz: string;
  id: string;
}

export interface AppUpdate {
  policy: string;
  minimumVersion: string;
  recommendedVersion: string;
  message: string;
}

export interface Promotion {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  desktopImage: Image;
  mobileImage: Image;
  placement: string;
  priority: number;
  cta: Cta;
  externalPromotion: ExternalPromotion;
}

export interface Cta {
  label: string;
  destination: CtaDestination;
}

export interface ExternalPromotion {
  provider: string;
  campaignId: string;
  trackingCode: string;
}
