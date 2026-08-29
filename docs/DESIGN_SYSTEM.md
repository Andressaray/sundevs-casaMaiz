# Casa Maíz - Design System

## 🎨 Paleta de Colores

### Light Theme
- **bgPrimary**: `#F7F3ED` - Fondo principal (crema cálida)
- **bgSecondary**: `#FFFFFF` - Fondo secundario (blanco)
- **bgTertiary**: `#EDE7DE` - Fondo terciario
- **textPrimary**: `#1A1815` - Texto principal (carbón)
- **textSecondary**: `#9B9087` - Texto secundario (gris cálido)
- **accentPrimary**: `#A85C2C` - Acento principal (terracota)
- **accentSecondary**: `#3D5C2F` - Acento secundario (verde oscuro)
- **borderColor**: `#E8E1D7` - Bordes

### Dark Theme
- **bgPrimary**: `#1A1815`
- **bgSecondary**: `#2A2620`
- **bgTertiary**: `#3A3430`
- **textPrimary**: `#F7F3ED`
- **textSecondary**: `#B8A89D`
- **accentPrimary**: `#D9894F`
- **accentSecondary**: `#6BAB55`

## 🔤 Tipografía

### Display Font
- **Serif moderno** (serif fallback en React Native)
- Usado en headlines (h1, h2, h3)
- Representa memoria y tradición

### Body Font
- **Sans-serif limpio** (system default en React Native)
- Usado en body text, captions, labels
- Optimizado para legibilidad en móvil

### Type Scale
```
h1: 36px, weight 600, lineHeight 42
h2: 28px, weight 600, lineHeight 34
h3: 22px, weight 600, lineHeight 28
h4: 18px, weight 600, lineHeight 24
body: 15px, weight 400, lineHeight 22
caption: 13px, weight 500, lineHeight 18
eyebrow: 12px, weight 600, lineHeight 16, letter-spacing 0.8
```

## 📱 iOS vs Android Diferenciadores

### Bordes (Border Radius)
- **iOS**: 16px - Minimalista, suave
- **Android**: 8px - Material Design, definido

### Sombras
- **iOS**: 
  - Light: shadowOpacity 0.08, shadowRadius 3
  - Medium: shadowOpacity 0.12, shadowRadius 4
  - Sutiles, casi invisibles
  
- **Android**: 
  - Light: elevation 2
  - Medium: elevation 4
  - Presencia visual clara

### Espaciado
- **iOS**: Base × 1.2 (20% más generoso)
- **Android**: Base × 1.0 (compacto)

### Weights & Opacity
- **iOS**: 400-500 weight (ligero)
- **Android**: 500-600 weight (más peso visual)

## 🧩 Componentes

### Hero
```tsx
<Hero
  eyebrow="Cocina de fuego · CDMX"
  headline="El maíz tiene memoria."
  actions={[
    { label: "Ver menú", onPress: () => {}, variant: "primary" },
    { label: "Reservar", onPress: () => {}, variant: "secondary" }
  ]}
/>
```
- Full-width gradient
- Actions en fila
- Se adapta automáticamente a iOS/Android

### CardGrid
```tsx
<CardGrid
  eyebrow="Menú de temporada"
  title="De la milpa a la mesa"
  cards={[
    { 
      id: "1", 
      title: "Tostada de kampachi",
      description: "Chile chiltepín...",
      price: "$220",
      emoji: "🥙"
    }
  ]}
/>
```
- Stack vertical en móvil
- Cards con sombra adaptada
- Imagen o emoji como fallback

### Carousel
```tsx
<Carousel
  title="Rituales de la casa"
  slides={[
    { id: "1", title: "Nixtamal diario", description: "Molemos el maíz cada mañana.", emoji: "🌽" }
  ]}
/>
```
- ScrollView horizontal
- Snap-to-interval para mejor UX
- Slides 280px de ancho

### PromoRail
```tsx
<PromoRail
  title="Algo especial está en la mesa"
  promotions={[
    {
      id: "1",
      title: "Martes de sobremesa",
      eyebrow: "Solo por temporada",
      description: "Postre de maíz azul de cortesía en cenas de los martes.",
      emoji: "🍰",
      cta: { label: "Reservar", onPress: () => {} }
    }
  ]}
/>
```
- Gradient verde oscuro
- Layout 2-columnas (content + imagen)
- CTA blanco sobre fondo oscuro

### TextBlock
```tsx
<TextBlock
  heading="Comer aquí es sentarse cerca del fuego."
  body="Casa Maíz celebra las recetas que viajan entre generaciones..."
  alignment="center"
/>
```
- Centro centrado por defecto
- Máximo ancho para legibilidad
- Eyebrow opcional

### RestaurantCTA
```tsx
<RestaurantCTA
  eyebrow="Tu mesa está lista"
  headline="Abrimos de martes a domingo."
  description="Para comida y cena."
  buttonLabel="Reservar ahora"
  onPress={() => {}}
/>
```
- Gradient full-width
- CTA prominente en blanco
- Cierre de página

## 🎯 Principios de Diseño

1. **Identidad mexicana contemporánea**: Terracota y verde como protagonistas
2. **Minimalismo iOS vs Presencia Android**: Cada plataforma respira como lo haría nativamente
3. **Tipografía como personalidad**: Serif en headlines (memoria), sans en body (modernidad)
4. **Espaciado generoso**: Especialmente en iOS
5. **Sombras sutiles**: Evitar exceso visual, dejar que el contenido brille

## 🔄 Ciclo de Datos

1. HomeScreen carga `bootstrap.json` vía `MockData` (en producción: API)
2. Datos se mapean a componentes según `blockType`
3. Cada componente se renderiza con colores, espaciado y sombras adaptadas
4. AccionesNavigación se manejan a través de callbacks

## 📦 Uso en Proyecto

```typescript
import { Hero, CardGrid, Carousel, PromoRail, TextBlock, RestaurantCTA } from '@/components/blocks';
import { useThemeColors } from '@/theme/colors';
import { SPACING, TYPOGRAPHY, getRadius } from '@/theme/styles';
```
