# Casa Maíz - Componentes de Diseño

## 📂 Estructura de Carpetas

```
src/
├── theme/
│   ├── colors.ts          # Paleta de colores (light/dark)
│   └── styles.ts          # Estilos, spacing, typography, shadows
├── components/
│   ├── blocks/
│   │   ├── Hero.tsx              # Hero con gradient y acciones
│   │   ├── CardGrid.tsx          # Grid de cards (menú)
│   │   ├── Carousel.tsx          # Carrusel horizontal
│   │   ├── PromoRail.tsx         # Promociones
│   │   ├── TextBlock.tsx         # Bloque de texto
│   │   ├── RestaurantCTA.tsx     # Call-to-action final
│   │   └── index.ts              # Exports
│   └── ui/                       # (Para componentes reutilizables menores)
├── services/
│   └── mockData/
│       └── bootstrap.json        # Datos de ejemplo
└── features/
    └── home/
        └── screens/
            └── home/
                └── index.tsx     # HomeScreen renderiza todos los bloques
```

## 🚀 Uso Rápido

### 1. Importar Componentes
```typescript
import { Hero, CardGrid, Carousel, PromoRail, TextBlock, RestaurantCTA } from '@/components/blocks';
```

### 2. Usar en tu Pantalla
```typescript
const MyScreen = () => {
  const colors = useThemeColors();
  
  return (
    <View style={{ backgroundColor: colors.bgPrimary, flex: 1 }}>
      <Hero 
        eyebrow="Cocina de fuego" 
        headline="El maíz tiene memoria."
        actions={[{ label: "Ver menú", onPress: () => {} }]}
      />
      <CardGrid 
        eyebrow="Menú"
        title="Platos"
        cards={[...]}
      />
    </View>
  );
};
```

### 3. Personalizar Colores
```typescript
import { useThemeColors } from '@/theme/colors';

const MyComponent = () => {
  const colors = useThemeColors(); // Auto light/dark
  
  return (
    <View style={{ backgroundColor: colors.bgPrimary }}>
      <Text style={{ color: colors.textPrimary }}>Hola</Text>
    </View>
  );
};
```

### 4. Usar Espaciado y Tipografía
```typescript
import { SPACING, TYPOGRAPHY, getRadius, getShadow, getSpacing } from '@/theme/styles';

<View style={{ 
  padding: SPACING.xl, 
  borderRadius: getRadius(), // Auto iOS/Android
  ...getShadow('medium')     // Auto iOS/Android
}}>
  <Text style={TYPOGRAPHY.h1}>Headline</Text>
  <Text style={TYPOGRAPHY.body}>Body text</Text>
</View>
```

## 🎨 Personalización

### Cambiar Colores Globales
Edita `src/theme/colors.ts`:
```typescript
export const COLORS = {
  light: {
    accentPrimary: '#A85C2C', // Cambiar aquí
    // ... resto de colores
  }
}
```

### Cambiar Espaciado
Edita `src/theme/styles.ts`:
```typescript
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,  // Cambiar base aquí
  // ...
}
```

### Cambiar Radius (iOS vs Android)
Edita `src/theme/styles.ts`:
```typescript
export const RADIUS = {
  ios: 16,      // Cambiar aquí
  android: 8,   // Cambiar aquí
  small: 6,
};
```

## 📋 Props de Componentes

### Hero
```typescript
interface HeroProps {
  eyebrow: string;
  headline: string;
  actions?: Array<{
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary';
  }>;
}
```

### CardGrid
```typescript
interface CardGridProps {
  eyebrow: string;
  title: string;
  cards: Array<{
    id: string;
    title: string;
    description: string;
    price: string;
    image?: { url?: string };
    emoji?: string;
  }>;
}
```

### Carousel
```typescript
interface CarouselProps {
  title: string;
  slides: Array<{
    id: string;
    title: string;
    description: string;
    image?: { url?: string };
    emoji?: string;
  }>;
}
```

### PromoRail
```typescript
interface PromoRailProps {
  title: string;
  promotions: Array<{
    id: string;
    title: string;
    eyebrow: string;
    description: string;
    cta: { label: string; onPress: () => void };
    mobileImage?: { url?: string };
    emoji?: string;
  }>;
}
```

### TextBlock
```typescript
interface TextBlockProps {
  eyebrow?: string;
  heading: string;
  body: string;
  alignment?: 'left' | 'center' | 'right';
}
```

### RestaurantCTA
```typescript
interface RestaurantCTAProps {
  eyebrow: string;
  headline: string;
  description: string;
  buttonLabel: string;
  onPress: () => void;
}
```

## 🔧 Integración con Datos Reales

### Actual (Mock)
```typescript
const response = require('@/services/mockData/bootstrap.json');
setData(response.data);
```

### Producción (API)
```typescript
const response = await fetch('https://api.example.com/bootstrap');
const data = await response.json();
setData(data.data);
```

Los componentes funcionan igual en ambos casos porque esperan la estructura de datos del JSON.

## 🎯 Diferenciadores iOS vs Android

- **Bordes**: iOS 16px → Android 8px (automático)
- **Sombras**: iOS sutiles → Android elevation (automático)
- **Espaciado**: iOS +20% generoso → Android compacto (automático)
- **Tipografía**: iOS 400-500 weight → Android 500-600 weight (automático)

Todo se adapta automáticamente con `getRadius()`, `getShadow()`, `getSpacing()`.

## 📚 Referencias

- Documento de design: `docs/DESIGN_SYSTEM.md`
- Pantalla de ejemplo: `src/features/home/screens/home/index.tsx`
- Datos de ejemplo: `src/services/mockData/bootstrap.json`

## ✅ Checklist de Implementación

- [x] Sistema de colores (light/dark)
- [x] Espaciado y tipografía
- [x] 6 componentes de bloques
- [x] Diferenciadores iOS/Android
- [x] Pantalla Home integrada
- [x] Datos de ejemplo
- [x] Documentación

¡Listo para extender y personalizar! 🎉
