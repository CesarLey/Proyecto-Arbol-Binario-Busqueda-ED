import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

/**
 * Componente VisualizadorArbol
 * Renderiza una representación gráfica del árbol binario con animaciones
 */
export const VisualizadorArbol = ({ arbol, valorBuscado }) => {
  const [hoveredNode, setHoveredNode] = useState(null);
  const estructura = arbol.obtenerEstructura();
  
  if (!estructura) {
    return (
      <div className="flex items-center justify-center h-64 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-lg border-2 border-dashed border-indigo-300 animate-fadeIn">
        <div className="text-center">
          <div className="relative">
            <Sparkles className="w-16 h-16 mx-auto text-indigo-400 mb-3 animate-pulse-slow" />
            <div className="absolute inset-0 w-16 h-16 mx-auto bg-indigo-400 rounded-full blur-xl opacity-30 animate-pulse-slow"></div>
          </div>
          <p className="text-indigo-600 text-xl font-bold mb-1">El árbol está vacío</p>
          <p className="text-indigo-400 text-sm">Inserta valores para ver la magia ✨</p>
        </div>
      </div>
    );
  }

  const renderNodo = (nodo, x, y, espaciado, nivel) => {
    if (!nodo) return null;

    const esDestacado = valorBuscado !== null && nodo.valor === valorBuscado;
    const esHovered = hoveredNode === nodo.valor;
    const offsetX = espaciado / 2;
    
    // Colores por nivel para efecto arcoíris
    const coloresPorNivel = [
      { fill: '#6366f1', stroke: '#4f46e5', glow: 'rgba(99, 102, 241, 0.6)' }, // Indigo
      { fill: '#8b5cf6', stroke: '#7c3aed', glow: 'rgba(139, 92, 246, 0.6)' }, // Violet
      { fill: '#ec4899', stroke: '#db2777', glow: 'rgba(236, 72, 153, 0.6)' }, // Pink
      { fill: '#f59e0b', stroke: '#d97706', glow: 'rgba(245, 158, 11, 0.6)' }, // Amber
      { fill: '#10b981', stroke: '#059669', glow: 'rgba(16, 185, 129, 0.6)' }, // Emerald
    ];
    
    const colorNivel = coloresPorNivel[nivel % coloresPorNivel.length];
    const colorFinal = esDestacado ? '#10b981' : colorNivel.fill;
    const strokeFinal = esDestacado ? '#059669' : colorNivel.stroke;
    const glowColor = esDestacado ? 'rgba(16, 185, 129, 0.8)' : colorNivel.glow;

    return (
      <g key={`${nodo.valor}-${x}-${y}`} className="animate-scaleIn">
        {/* Línea al hijo izquierdo */}
        {nodo.izquierdo && (
          <>
            <line
              x1={x}
              y1={y}
              x2={x - espaciado / 2}
              y2={y + 70}
              stroke={colorFinal}
              strokeWidth={esHovered ? "4" : "3"}
              strokeLinecap="round"
              className="transition-all duration-500"
              style={{
                filter: esHovered ? 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.6))' : 'none'
              }}
            />
            {renderNodo(nodo.izquierdo, x - espaciado / 2, y + 70, offsetX, nivel + 1)}
          </>
        )}
        
        {/* Línea al hijo derecho */}
        {nodo.derecho && (
          <>
            <line
              x1={x}
              y1={y}
              x2={x + espaciado / 2}
              y2={y + 70}
              stroke={colorFinal}
              strokeWidth={esHovered ? "4" : "3"}
              strokeLinecap="round"
              className="transition-all duration-500"
              style={{
                filter: esHovered ? 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.6))' : 'none'
              }}
            />
            {renderNodo(nodo.derecho, x + espaciado / 2, y + 70, offsetX, nivel + 1)}
          </>
        )}
        
        {/* Efecto de resplandor detrás del nodo */}
        {(esDestacado || esHovered) && (
          <circle
            cx={x}
            cy={y}
            r="35"
            fill={glowColor}
            className="animate-pulse-slow"
            style={{ filter: 'blur(10px)' }}
          />
        )}
        
        {/* Círculo exterior decorativo */}
        <circle
          cx={x}
          cy={y}
          r={esHovered ? "34" : "32"}
          fill="none"
          stroke={strokeFinal}
          strokeWidth="2"
          strokeDasharray={esDestacado ? "5,5" : "none"}
          className="transition-all duration-300"
          style={{
            opacity: esHovered ? 1 : 0.3,
            animation: esDestacado ? 'spin 3s linear infinite' : 'none'
          }}
        />
        
        {/* Círculo del nodo principal */}
        <circle
          cx={x}
          cy={y}
          r={esHovered ? "30" : "28"}
          fill={colorFinal}
          stroke={strokeFinal}
          strokeWidth="3"
          className="transition-all duration-300 cursor-pointer"
          onMouseEnter={() => setHoveredNode(nodo.valor)}
          onMouseLeave={() => setHoveredNode(null)}
          style={{
            filter: esDestacado 
              ? `drop-shadow(0 0 15px ${glowColor}) drop-shadow(0 0 25px ${glowColor})`
              : esHovered
              ? `drop-shadow(0 0 10px ${glowColor})`
              : 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))'
          }}
        />
        
        {/* Valor del nodo */}
        <text
          x={x}
          y={y}
          textAnchor="middle"
          dy=".35em"
          fill="white"
          fontSize={esHovered ? "18" : "16"}
          fontWeight="bold"
          className="select-none transition-all duration-300 pointer-events-none"
          style={{
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
          }}
        >
          {nodo.valor}
        </text>
        
        {/* Indicador de nivel */}
        {esHovered && (
          <text
            x={x}
            y={y - 45}
            textAnchor="middle"
            fill={strokeFinal}
            fontSize="12"
            fontWeight="600"
            className="animate-fadeIn"
          >
            Nivel {nivel}
          </text>
        )}
      </g>
    );
  };

  const altura = arbol.numeroNiveles();
  // Reducir aún más el espaciado horizontal para hacer el árbol más compacto
  const ancho = Math.max(500, Math.pow(2, altura) * 25);
  const alto = altura * 70 + 60;
  
  // Calcular altura mínima para que el árbol se vea bien
  const alturaMinima = Math.max(400, altura * 110);

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-lg p-6 border-2 border-indigo-200 animate-fadeIn relative">
      {/* Efecto de partículas de fondo */}
      <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 bg-indigo-400 rounded-full animate-pulse-slow opacity-40"></div>
        <div className="absolute top-20 right-20 w-2 h-2 bg-purple-400 rounded-full animate-pulse-slow opacity-40" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-10 left-1/4 w-2 h-2 bg-pink-400 rounded-full animate-pulse-slow opacity-40" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-indigo-400 rounded-full animate-pulse-slow opacity-40" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      {/* Contenedor sin scroll - árbol siempre visible completo con altura mínima */}
      <div className="w-full" style={{ minHeight: `${alturaMinima}px` }}>
        <svg 
          width="100%" 
          height="100%"
          viewBox={`0 0 ${ancho} ${alto}`}
          preserveAspectRatio="xMidYMid meet"
          className="mx-auto relative z-10"
          style={{ minHeight: `${alturaMinima}px` }}
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {renderNodo(estructura, ancho / 2, 40, ancho / 4, 0)}
        </svg>
      </div>
      
      {/* Leyenda */}
      <div className="mt-4 flex justify-center gap-4 text-sm">
        <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-full shadow-sm">
          <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
          <span className="text-gray-600">Nivel 0</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-full shadow-sm">
          <div className="w-3 h-3 rounded-full bg-violet-500"></div>
          <span className="text-gray-600">Nivel 1</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-full shadow-sm">
          <div className="w-3 h-3 rounded-full bg-pink-500"></div>
          <span className="text-gray-600">Nivel 2+</span>
        </div>
        {valorBuscado && (
          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-100 rounded-full shadow-sm animate-pulse-slow">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-emerald-700 font-semibold">Encontrado</span>
          </div>
        )}
      </div>
    </div>
  );
};
