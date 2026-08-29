# 🌙 Dark & Light Mode - Guía Completa

## 📋 Resumen Ejecutivo

Este documento establece las **mejores prácticas** para implementar Dark & Light Mode en CasaMaizApp de forma consistente, accesible y mantenible.

---

## 🎨 Arquitectura de Temas

### Estructura de Archivos

```
src/
├── theme/
│   ├── colors.ts          # Definición de colores (light/dark)
│   ├── ThemeContext.tsx   # Context global del tema
│   └── styles.ts          # Estilos y espaciado
└── components/
    └── ui/
        └── ThemeToggle.tsx # Selector de tema
```

---

## 🔧 Sistema de Colores

### Paleta Light Mode (Día)

```
🟩 Backgrounds
- bgPrimary:    #F7F3ED (Beige claro - fondo principal)
- bgSecondary:  #FFFFFF (Blanco - cards)
- bgTertiary:   #EDE7DE (Beige oscuro - superficies)

📝 Text (WCAG AA/AAA Compliant)
- textPrimary:  #1A1815 (Texto principal - casi negro)
- textSecondary: #6B5E54 (Texto secundario)
- textTertiary: #9B9087 (Texto deshabilitado)

🎯 Accents
- accentPrimary: #A85C2C (Marrón restaurante)
- accentSecondary: #C65D3B (Terracota)
- accentTertiary: #8B6F47 (Marrón oscuro)

📊 Semantic
- success: #2DA545, warning: #F5A623, error: #D9534F, info: #5B9BD5
```

### Paleta Dark Mode (Noche)

```
🟩 Backgrounds
- bgPrimary:    #0F0D0B (Negro profundo)
- bgSecondary:  #1A1815 (Gris muy oscuro)
- bgTertiary:   #2A2620 (Gris oscuro)

📝 Text (Contraste elevado)
- textPrimary:  #F7F3ED (Beige claro)
- textSecondary: #D9CFB8 (Gris claro)
- textTertiary: #9B9087 (Gris medio)

🎯 Accents (Versiones más brillantes)
- accentPrimary: #D9894F (Marrón brillante)
- accentSecondary: #E07856 (Terracota brillante)
- accentTertiary: #A87560 (Marrón claro)
```

---

## 📱 Usar Theme en Componentes

### ✅ Hook useThemeColors (Recomendado)

```tsx
import { useThemeColors } from '../../theme/colors';

const MyComponent: React.FC = () => {
  const colors = useThemeColors();
  
  return (
    <View style={{ backgroundColor: colors.bgPrimary }}>
      <Text style={{ color: colors.textPrimary }}>
        Texto dinámico
      </Text>
    </View>
  );
};
```

---

## 📚 Referencias

- [React Native useColorScheme](https://reactnative.dev/docs/usecolorscheme)
- [WCAG 2.1 Color Contrast](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
