# 🌳 Árbol Binario de Búsqueda (ABB)

<div align="center">

**Implementación completa e interactiva de un Árbol Binario de Búsqueda con visualización dinámica en tiempo real**

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.2.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.18-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## 📋 Descripción

Proyecto educativo que implementa un **Árbol Binario de Búsqueda (ABB)** completo con una interfaz web interactiva. Permite visualizar en tiempo real las operaciones sobre el árbol, facilitando la comprensión de esta estructura de datos fundamental en ciencias de la computación.

### ✨ Características Principales

#### 🔧 Operaciones Básicas (1-10)
- **Insertar nodos**: Agregar valores manteniendo la propiedad de BST
- **Eliminar nodos**: Eliminación con manejo de casos (hoja, un hijo, dos hijos)
- **Buscar nodos**: Búsqueda eficiente por valor
- **Recorrido Preorden**: Raíz → Izquierdo → Derecho
- **Recorrido Inorden**: Izquierdo → Raíz → Derecho (orden ascendente)
- **Recorrido Postorden**: Izquierdo → Derecho → Raíz
- **Recorrido por Anchura**: Nivel por nivel (BFS)
- **Calcular altura**: Profundidad máxima del árbol
- **Contar nodos**: Total de elementos en el árbol
- **Vaciar árbol**: Eliminar todos los nodos

#### ⚡ Operaciones Avanzadas (11-12)
- **Contar nodos en nivel específico**: Algoritmo BFS para contar nodos por nivel
- **Obtener mínimo y máximo**: Valores extremos del árbol

### 🎨 Interfaz de Usuario

- **Visualización Dinámica**: Representación gráfica del árbol con animaciones suaves
- **Panel de Control**: Interfaz intuitiva para ejecutar operaciones
- **Estadísticas en Tiempo Real**: Altura, cantidad de nodos, valores min/max
- **Recorridos Interactivos**: Visualización de los 4 tipos de recorridos
- **Tema Oscuro**: Interfaz moderna con diseño dark mode
- **Feedback Visual**: Animaciones y colores para indicar operaciones

---

## 🚀 Inicio Rápido

### Prerrequisitos

- **Node.js** (versión 16 o superior)
- **npm** o **yarn**

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/CesarLey/Proyecto-Arbol-Binario-Busqueda-ED.git
   cd Proyecto-Arbol-Binario-Busqueda-ED
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

### Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Compila para producción
npm run preview  # Previsualiza build de producción
npm run lint     # Ejecuta ESLint para análisis de código
```

---

## 🏗️ Arquitectura del Proyecto

```
abb-proyecto/
├── public/              # Archivos estáticos
├── src/
│   ├── assets/          # Recursos (imágenes, iconos)
│   ├── components/      # Componentes React
│   │   ├── MenuOpciones.jsx        # Menú de operaciones disponibles
│   │   ├── PanelControl.jsx        # Panel de control principal
│   │   ├── SeccionEstadisticas.jsx # Estadísticas del árbol
│   │   ├── SeccionRecorridos.jsx   # Visualización de recorridos
│   │   └── VisualizadorArbol.jsx   # Renderizado gráfico del árbol
│   ├── models/          # Modelos de datos
│   │   └── NodoABB.js              # Clase Nodo del árbol
│   ├── services/        # Lógica de negocio
│   │   └── ArbolBinarioBusqueda.js # Implementación del ABB
│   ├── utils/           # Utilidades
│   │   └── mensajes.js             # Mensajes y notificaciones
│   ├── App.jsx          # Componente principal
│   ├── App.css          # Estilos del componente App
│   ├── main.jsx         # Punto de entrada
│   └── index.css        # Estilos globales
├── eslint.config.js     # Configuración ESLint
├── postcss.config.js    # Configuración PostCSS
├── tailwind.config.js   # Configuración Tailwind CSS
├── vite.config.js       # Configuración Vite
└── package.json         # Dependencias y scripts
```

---

## 💻 Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 19.2.0 | Framework UI con componentes reutilizables |
| **Vite** | 7.2.2 | Build tool ultrarrápido con HMR |
| **Tailwind CSS** | 3.4.18 | Framework CSS utility-first |
| **Lucide React** | ^0.468.0 | Biblioteca de iconos modernos |
| **ESLint** | 9.18.0 | Linter para mantener código limpio |

---

## 📚 Conceptos Implementados

### Algoritmos de Recorrido
- **Preorden (DFS)**: Útil para copiar o serializar el árbol
- **Inorden (DFS)**: Genera secuencia ordenada de valores
- **Postorden (DFS)**: Útil para eliminar o liberar memoria
- **Por Anchura (BFS)**: Nivel por nivel, útil para búsquedas

### Operaciones de BST
- **Complejidad Promedio**: O(log n) para inserción, búsqueda y eliminación
- **Complejidad Peor Caso**: O(n) cuando el árbol está desbalanceado
- **Propiedad BST**: Subárbol izquierdo < Raíz < Subárbol derecho

### Algoritmo BFS para Conteo por Nivel
Implementación eficiente usando cola para contar nodos en un nivel específico:
```javascript
contarNodosEnNivel(nivelBuscado) {
  if (this.raiz === null || nivelBuscado < 0) return 0;
  
  let contador = 0;
  const cola = [{ nodo: this.raiz, nivel: 0 }];
  
  while (cola.length > 0) {
    const { nodo, nivel } = cola.shift();
    
    if (nivel === nivelBuscado) {
      contador++;
      continue;
    }
    
    if (nivel < nivelBuscado) {
      if (nodo.izquierdo) cola.push({ nodo: nodo.izquierdo, nivel: nivel + 1 });
      if (nodo.derecho) cola.push({ nodo: nodo.derecho, nivel: nivel + 1 });
    }
  }
  
  return contador;
}
```

---

## 🎯 Casos de Uso

- **Educación**: Herramienta didáctica para enseñar estructuras de datos
- **Visualización**: Entender operaciones de BST de forma interactiva
- **Práctica**: Experimentar con diferentes secuencias de inserción
- **Análisis**: Observar comportamiento del árbol según datos de entrada

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

---

## 👤 Autor

**CesarLey**

- GitHub: [@CesarLey](https://github.com/CesarLey)
- Proyecto: [Árbol Binario de Búsqueda](https://github.com/CesarLey/Proyecto-Arbol-Binario-Busqueda-ED)

---

## 🙏 Agradecimientos

- Comunidad de React por la excelente documentación
- Tailwind CSS por el framework de estilos
- Lucide por los iconos modernos y accesibles

---

<div align="center">

**⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub ⭐**

Hecho con ❤️ y ☕

</div>
