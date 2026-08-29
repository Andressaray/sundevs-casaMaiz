/**
 * EJEMPLO AVANZADO: Feature con layout, header y componentes compartidos
 *
 * Estructura recomendada para features complejas
 */

import React, { useState, useCallback } from 'react';

// ============================================
// Types
// ============================================

export type ProductScreenType = 'list' | 'detail' | 'create' | 'edit';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
}

export interface ProductState {
  screen: ProductScreenType;
  products: Product[];
  selectedProduct?: Product;
  loading: boolean;
  error?: string;
}

// ============================================
// Hook de Estado (Reutilizable)
// ============================================

export function useProductState() {
  const [state, setState] = useState<ProductState>({
    screen: 'list',
    products: [],
    loading: false,
  });

  const navigateTo = useCallback((screen: ProductScreenType, product?: Product) => {
    setState((prev) => ({
      ...prev,
      screen,
      selectedProduct: product,
    }));
  }, []);

  const goBack = useCallback(() => {
    setState((prev) => ({
      ...prev,
      screen: 'list',
      selectedProduct: undefined,
    }));
  }, []);

  const addProduct = useCallback((product: Product) => {
    setState((prev) => ({
      ...prev,
      products: [...prev.products, product],
    }));
  }, []);

  const updateProduct = useCallback((product: Product) => {
    setState((prev) => ({
      ...prev,
      products: prev.products.map((p) =>
        p.id === product.id ? product : p
      ),
    }));
  }, []);

  const deleteProduct = useCallback((productId: string) => {
    setState((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== productId),
    }));
  }, []);

  return {
    state,
    navigateTo,
    goBack,
    addProduct,
    updateProduct,
    deleteProduct,
  };
}

// ============================================
// Feature Principal con Layout
// ============================================

export function ProductFeature() {
  const { state, navigateTo, goBack, addProduct, updateProduct, deleteProduct } =
    useProductState();

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <ProductSidebar
        active={state.screen}
        onNavigate={navigateTo}
      />

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <ProductHeader screen={state.screen} />

        {/* Content */}
        <main style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
          {state.screen === 'list' && (
            <ProductListScreen
              products={state.products}
              loading={state.loading}
              onSelect={(product) => navigateTo('detail', product)}
              onCreate={() => navigateTo('create')}
            />
          )}

          {state.screen === 'detail' && state.selectedProduct && (
            <ProductDetailScreen
              product={state.selectedProduct}
              onEdit={(product) => navigateTo('edit', product)}
              onDelete={(id) => {
                deleteProduct(id);
                goBack();
              }}
              onBack={goBack}
            />
          )}

          {state.screen === 'create' && (
            <ProductCreateScreen
              onCreate={(product) => {
                addProduct(product);
                goBack();
              }}
              onCancel={goBack}
            />
          )}

          {state.screen === 'edit' && state.selectedProduct && (
            <ProductEditScreen
              product={state.selectedProduct}
              onSave={(updated) => {
                updateProduct(updated);
                goBack();
              }}
              onCancel={goBack}
            />
          )}
        </main>
      </div>
    </div>
  );
}

// ============================================
// Componentes de Navegación
// ============================================

interface ProductSidebarProps {
  active: ProductScreenType;
  onNavigate: (screen: ProductScreenType) => void;
}

function ProductSidebar({ active, onNavigate }: ProductSidebarProps) {
  const menuItems = [
    { label: 'Productos', screen: 'list' as ProductScreenType },
    { label: 'Crear', screen: 'create' as ProductScreenType },
  ];

  return (
    <aside
      style={{
        width: '200px',
        backgroundColor: '#f5f5f5',
        borderRight: '1px solid #ddd',
        padding: '16px',
      }}
    >
      <h3>Inventario</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {menuItems.map((item) => (
          <li key={item.screen} style={{ marginBottom: '8px' }}>
            <button
              onClick={() => onNavigate(item.screen)}
              style={{
                width: '100%',
                padding: '8px 12px',
                textAlign: 'left',
                backgroundColor:
                  active === item.screen ? '#007bff' : 'transparent',
                color: active === item.screen ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

interface ProductHeaderProps {
  screen: ProductScreenType;
}

function ProductHeader({ screen }: ProductHeaderProps) {
  const titles: Record<ProductScreenType, string> = {
    list: 'Productos',
    detail: 'Detalle del Producto',
    create: 'Crear Producto',
    edit: 'Editar Producto',
  };

  return (
    <header
      style={{
        padding: '16px',
        borderBottom: '1px solid #ddd',
        backgroundColor: '#fff',
      }}
    >
      <h1 style={{ margin: 0 }}>{titles[screen]}</h1>
    </header>
  );
}

// ============================================
// Screens
// ============================================

interface ProductListScreenProps {
  products: Product[];
  loading: boolean;
  onSelect: (product: Product) => void;
  onCreate: () => void;
}

function ProductListScreen({
  products,
  loading,
  onSelect,
  onCreate,
}: ProductListScreenProps) {
  if (loading) return <div>Cargando productos...</div>;

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <button onClick={onCreate} style={{ padding: '8px 16px' }}>
          ➕ Nuevo Producto
        </button>
      </div>

      {products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>No hay productos. Crea uno para empezar.</p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '16px',
          }}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onSelect(product)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface ProductDetailScreenProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
}

function ProductDetailScreen({
  product,
  onEdit,
  onDelete,
  onBack,
}: ProductDetailScreenProps) {
  return (
    <div>
      <button
        onClick={onBack}
        style={{ marginBottom: '16px', padding: '8px 16px' }}
      >
        ← Volver
      </button>

      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '20px',
          maxWidth: '400px',
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
        />

        <h2 style={{ marginTop: '16px' }}>{product.name}</h2>
        <p>
          <strong>Precio:</strong> ${product.price}
        </p>
        <p>
          <strong>Categoría:</strong> {product.category}
        </p>
        <p>
          <strong>Stock:</strong> {product.stock}
        </p>

        <div style={{ marginTop: '20px', display: 'flex', gap: '8px' }}>
          <button
            onClick={() => onEdit(product)}
            style={{ padding: '8px 16px' }}
          >
            ✏️ Editar
          </button>
          <button
            onClick={() => onDelete(product.id)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

interface ProductCreateScreenProps {
  onCreate: (product: Product) => void;
  onCancel: () => void;
}

function ProductCreateScreen({
  onCreate,
  onCancel,
}: ProductCreateScreenProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    image: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      stock: parseInt(formData.stock),
      image: formData.image || 'https://via.placeholder.com/200',
    };

    onCreate(newProduct);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
      <ProductFormFields formData={formData} onChange={setFormData} />

      <div style={{ marginTop: '20px', display: 'flex', gap: '8px' }}>
        <button type="submit" style={{ padding: '8px 16px' }}>
          Crear
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

interface ProductEditScreenProps {
  product: Product;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

function ProductEditScreen({
  product,
  onSave,
  onCancel,
}: ProductEditScreenProps) {
  const [formData, setFormData] = React.useState({
    name: product.name,
    price: product.price.toString(),
    category: product.category,
    stock: product.stock.toString(),
    image: product.image,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updated: Product = {
      ...product,
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      stock: parseInt(formData.stock),
      image: formData.image,
    };

    onSave(updated);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
      <ProductFormFields formData={formData} onChange={setFormData} />

      <div style={{ marginTop: '20px', display: 'flex', gap: '8px' }}>
        <button type="submit" style={{ padding: '8px 16px' }}>
          Guardar
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

// ============================================
// Componentes Compartidos
// ============================================

interface ProductFormFieldsProps {
  formData: Record<string, string>;
  onChange: (data: Record<string, string>) => void;
}

function ProductFormFields({ formData, onChange }: ProductFormFieldsProps) {
  return (
    <>
      <div style={{ marginBottom: '16px' }}>
        <label>
          Nombre:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => onChange({ ...formData, name: e.target.value })}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '4px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label>
          Precio:
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => onChange({ ...formData, price: e.target.value })}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '4px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label>
          Categoría:
          <input
            type="text"
            value={formData.category}
            onChange={(e) =>
              onChange({ ...formData, category: e.target.value })
            }
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '4px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label>
          Stock:
          <input
            type="number"
            value={formData.stock}
            onChange={(e) => onChange({ ...formData, stock: e.target.value })}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '4px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
        </label>
      </div>
    </>
  );
}

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.2s',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
      />
      <div style={{ padding: '12px' }}>
        <h4 style={{ margin: '0 0 8px 0' }}>{product.name}</h4>
        <p style={{ margin: '0 0 8px 0', color: '#666' }}>
          ${product.price}
        </p>
        <p style={{ margin: '0', fontSize: '12px', color: '#999' }}>
          Stock: {product.stock}
        </p>
      </div>
    </div>
  );
}
