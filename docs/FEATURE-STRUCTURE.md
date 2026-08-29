# Estructura de Features con Múltiples Screens

## Opción 1: State Local + Condicionales (Simple)

**Mejor para:** Flujos simples, 2-3 screens

```
features/
└── UserProfile/
    ├── index.tsx              ← Componente principal
    ├── screens/
    │   ├── ProfileView.tsx     ← Screen 1
    │   ├── EditProfile.tsx     ← Screen 2
    │   └── Settings.tsx        ← Screen 3
    ├── types.ts
    └── useProfileState.ts      ← Hook de estado
```

**Código:**

```typescript
// UserProfile/index.tsx
type ScreenType = 'view' | 'edit' | 'settings';

export function UserProfile() {
  const [screen, setScreen] = useState<ScreenType>('view');

  return (
    <div>
      {screen === 'view' && (
        <ProfileView onEdit={() => setScreen('edit')} />
      )}
      {screen === 'edit' && (
        <EditProfile onSave={() => setScreen('view')} />
      )}
      {screen === 'settings' && (
        <Settings onClose={() => setScreen('view')} />
      )}
    </div>
  );
}
```

**Ventajas:** Simple, rápido
**Desventajas:** No escalable, difícil de mantener con muchas screens

---

## Opción 2: Router Interno (Recomendado) ⭐

**Mejor para:** Flujos complejos, 4+ screens, navegación compleja

```
features/
└── Dashboard/
    ├── index.tsx              ← Router interno
    ├── screens/
    │   ├── Overview.tsx
    │   ├── Analytics.tsx
    │   ├── Reports.tsx
    │   └── Settings.tsx
    ├── router.ts              ← Config de rutas
    └── types.ts
```

**Código:**

```typescript
// Dashboard/router.ts
export type DashboardScreen = 'overview' | 'analytics' | 'reports' | 'settings';

export const DASHBOARD_ROUTES = {
  OVERVIEW: 'overview',
  ANALYTICS: 'analytics',
  REPORTS: 'reports',
  SETTINGS: 'settings',
} as const;

// Dashboard/index.tsx
export function Dashboard() {
  const [screen, setScreen] = useState<DashboardScreen>('overview');

  const renderScreen = () => {
    switch (screen) {
      case 'overview':
        return <Overview onNavigate={setScreen} />;
      case 'analytics':
        return <Analytics onNavigate={setScreen} />;
      case 'reports':
        return <Reports onNavigate={setScreen} />;
      case 'settings':
        return <Settings onNavigate={setScreen} />;
      default:
        return <Overview onNavigate={setScreen} />;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar active={screen} onSelect={setScreen} />
      <main>{renderScreen()}</main>
    </div>
  );
}

// Dashboard/screens/Overview.tsx
interface OverviewProps {
  onNavigate: (screen: DashboardScreen) => void;
}

export function Overview({ onNavigate }: OverviewProps) {
  return (
    <div>
      <h2>Dashboard Overview</h2>
      <button onClick={() => onNavigate('analytics')}>
        Ver Análitica
      </button>
    </div>
  );
}
```

**Ventajas:** Escalable, fácil de mantener, clara separación
**Desventajas:** Más boilerplate que Option 1

---

## Opción 3: React Router + Nested Routes (Enterprise)

**Mejor para:** Apps grandes, múltiples features con subroutes

```
features/
└── eCommerce/
    ├── index.tsx
    └── routes/
        ├── Products/
        │   ├── index.tsx
        │   ├── ProductList.tsx
        │   ├── ProductDetail.tsx
        │   └── ProductCreate.tsx
        ├── Orders/
        │   ├── index.tsx
        │   ├── OrderList.tsx
        │   └── OrderDetail.tsx
        └── Checkout/
            ├── index.tsx
            ├── Cart.tsx
            ├── Shipping.tsx
            ├── Payment.tsx
            └── Confirmation.tsx
```

**Código:**

```typescript
// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { eCommerceRoutes } from '@/features/eCommerce/routes';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Otras rutas globales */}
        <Route path="/ecommerce/*" element={<eCommerceRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

// features/eCommerce/routes.tsx
export function eCommerceRoutes() {
  return (
    <Routes>
      <Route path="products" element={<ProductsFeature />}>
        <Route index element={<ProductList />} />
        <Route path=":id" element={<ProductDetail />} />
        <Route path="create" element={<ProductCreate />} />
      </Route>

      <Route path="orders" element={<OrdersFeature />}>
        <Route index element={<OrderList />} />
        <Route path=":id" element={<OrderDetail />} />
      </Route>

      <Route path="checkout" element={<CheckoutFeature />}>
        <Route index element={<Cart />} />
        <Route path="shipping" element={<Shipping />} />
        <Route path="payment" element={<Payment />} />
        <Route path="confirmation" element={<Confirmation />} />
      </Route>
    </Routes>
  );
}

// Screen component
export function ProductList() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Productos</h2>
      <button onClick={() => navigate('create')}>
        Crear Producto
      </button>
    </div>
  );
}
```

**Ventajas:** URLs limpias, bookmarkable, back button funciona, muy escalable
**Desventajas:** Más setup, necesita React Router

---

## Opción 4: State Machine (Avanzado)

**Mejor para:** Flujos complejos con lógica condicional

```typescript
// features/Checkout/checkout.machine.ts
import { createMachine, interpret } from 'xstate';

export const checkoutMachine = createMachine({
  initial: 'cart',
  states: {
    cart: {
      on: { PROCEED: 'shipping' }
    },
    shipping: {
      on: {
        PROCEED: 'payment',
        BACK: 'cart'
      }
    },
    payment: {
      on: {
        PROCEED: 'confirmation',
        BACK: 'shipping'
      }
    },
    confirmation: {
      type: 'final'
    }
  }
});

// features/Checkout/index.tsx
import { useActor } from '@xstate/react';

export function Checkout() {
  const [state, send] = useActor(
    () => interpret(checkoutMachine)
  );

  return (
    <div>
      {state.matches('cart') && (
        <Cart onProceed={() => send('PROCEED')} />
      )}
      {state.matches('shipping') && (
        <Shipping
          onProceed={() => send('PROCEED')}
          onBack={() => send('BACK')}
        />
      )}
      {state.matches('payment') && (
        <Payment
          onProceed={() => send('PROCEED')}
          onBack={() => send('BACK')}
        />
      )}
      {state.matches('confirmation') && (
        <Confirmation />
      )}
    </div>
  );
}
```

**Ventajas:** Lógica compleja clara, transiciones predecibles
**Desventajas:** Librería adicional (xstate)

---

## Comparación rápida

| Opción | Complejidad | Screens | URLs | Recomendado |
|--------|------------|---------|------|------------|
| 1. State Local | ⭐ | 2-3 | ❌ | Prototipos |
| 2. Router Interno | ⭐⭐ | 4-8 | ⚠️ | Mejor opción |
| 3. React Router | ⭐⭐⭐ | 8+ | ✅ | Apps grandes |
| 4. State Machine | ⭐⭐⭐⭐ | Cualquiera | ✅ | Flujos complejos |

---

## Mi Recomendación

**Para tu caso (CasaMaizApp):** Usa **Opción 2 (Router Interno)**

Porque:
- ✅ Es escalable sin over-engineering
- ✅ Fácil de mantener
- ✅ No necesitas React Router todavía
- ✅ Puedes migrar a React Router después si creces
- ✅ Buena separación de concerns
