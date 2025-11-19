import React, { useState } from 'react';
import { Search, Plus, Trash2, List, PlayCircle, Zap } from 'lucide-react';

/**
 * Componente PanelControl
 * Maneja las operaciones básicas del árbol con efectos visuales
 */
export const PanelControl = ({
  inputValor,
  setInputValor,
  onInsertar,
  onBuscar,
  onEliminar,
  onMostrarRecorridos,
  onCargarEjemplo
}) => {
  const [focusedInput, setFocusedInput] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

  const botones = [
    {
      id: 'insertar',
      label: 'Insertar',
      icon: Plus,
      gradient: 'from-indigo-600 to-blue-600',
      hoverGradient: 'from-indigo-700 to-blue-700',
      onClick: onInsertar,
      description: 'Agregar nodo'
    },
    {
      id: 'buscar',
      label: 'Buscar',
      icon: Search,
      gradient: 'from-green-600 to-emerald-600',
      hoverGradient: 'from-green-700 to-emerald-700',
      onClick: onBuscar,
      description: 'Encontrar valor'
    },
    {
      id: 'eliminar',
      label: 'Eliminar',
      icon: Trash2,
      gradient: 'from-red-600 to-rose-600',
      hoverGradient: 'from-red-700 to-rose-700',
      onClick: onEliminar,
      description: 'Remover nodo'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 card-shadow animate-fadeIn relative overflow-hidden">
      {/* Efecto de fondo animado */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full blur-3xl opacity-30 -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-30 -z-10 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg mr-3 animate-pulse-slow">
            <Zap className="w-6 h-6 text-white" />
          </div>
          Panel de Control
        </h2>
        <div className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full">
          <span className="text-indigo-700 font-semibold text-sm">Operaciones ABB</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {/* Input con efectos */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <span className="mr-2">🔢</span>
            Valor numérico:
          </label>
          <div className="relative">
            <input
              type="number"
              value={inputValor}
              onChange={(e) => setInputValor(e.target.value)}
              onFocus={() => setFocusedInput(true)}
              onBlur={() => setFocusedInput(false)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  onInsertar();
                }
              }}
              placeholder="Ingrese un número"
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 ${
                focusedInput 
                  ? 'border-indigo-500 ring-4 ring-indigo-100 shadow-lg' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            />
            {focusedInput && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-fadeIn">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse-slow"></div>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1 ml-1">Presiona Enter para insertar rápidamente</p>
        </div>
        
        {/* Botón de ejemplo con efectos */}
        <div className="flex items-end">
          <button
            onClick={onCargarEjemplo}
            onMouseEnter={() => setHoveredButton('ejemplo')}
            onMouseLeave={() => setHoveredButton(null)}
            className="w-full px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 relative overflow-hidden group"
          >
            {/* Efecto de brillo al hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            
            <PlayCircle className={`w-5 h-5 mr-2 transition-transform duration-300 ${
              hoveredButton === 'ejemplo' ? 'rotate-90 scale-110' : ''
            }`} />
            <span>Cargar Datos de Ejemplo</span>
            
            {hoveredButton === 'ejemplo' && (
              <div className="absolute -right-1 -top-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
            )}
          </button>
        </div>
      </div>

      {/* Botones de operaciones con efectos mejorados */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {botones.map(({ id, label, icon: Icon, gradient, hoverGradient, onClick, description }) => {
          const esHovered = hoveredButton === id;
          
          return (
            <button
              key={id}
              onClick={onClick}
              onMouseEnter={() => setHoveredButton(id)}
              onMouseLeave={() => setHoveredButton(null)}
              className={`relative px-5 py-4 bg-gradient-to-r ${gradient} hover:${hoverGradient} text-white rounded-xl transition-all flex flex-col items-center justify-center font-semibold shadow-lg hover:shadow-2xl transform hover:scale-110 hover:-translate-y-1 group overflow-hidden`}
            >
              {/* Efecto de onda al hover */}
              {esHovered && (
                <div className="absolute inset-0 bg-white opacity-20 animate-pulse-slow"></div>
              )}
              
              {/* Icono con animación */}
              <Icon className={`w-6 h-6 mb-2 transition-all duration-300 ${
                esHovered ? 'scale-125 rotate-12' : ''
              }`} />
              
              {/* Label */}
              <span className="text-sm relative z-10">{label}</span>
              
              {/* Descripción al hover */}
              {esHovered && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap animate-fadeIn z-20">
                  {description}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              )}
              
              {/* Partículas decorativas */}
              {esHovered && (
                <>
                  <div className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full animate-ping"></div>
                  <div className="absolute bottom-2 left-2 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                </>
              )}
            </button>
          );
        })}
      </div>
      
      {/* Atajos de teclado */}
      <div className="mt-5 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
        <p className="text-xs text-gray-600 font-semibold mb-2">⌨️ Atajos de teclado:</p>
        <div className="flex flex-wrap gap-3 text-xs">
          <span className="px-2 py-1 bg-white rounded shadow-sm text-gray-700">
            <kbd className="font-mono font-bold">Enter</kbd> = Insertar
          </span>
          <span className="px-2 py-1 bg-white rounded shadow-sm text-gray-700">
            <kbd className="font-mono font-bold">Números</kbd> = Valor del nodo
          </span>
        </div>
      </div>
    </div>
  );
};