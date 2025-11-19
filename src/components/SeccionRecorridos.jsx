import React, { useState } from 'react';
import { Layers, GitBranch, ArrowRight, ArrowLeft } from 'lucide-react';

/**
 * Componente SeccionRecorridos
 * Muestra todos los tipos de recorridos del árbol con animaciones
 */
export const SeccionRecorridos = ({ recorridos }) => {
  const [recorridoActivo, setRecorridoActivo] = useState(null);
  
  if (!recorridos || Object.keys(recorridos).length === 0) {
    return null;
  }

  const tiposRecorrido = [
    {
      key: 'anchura',
      titulo: 'Anchura (BFS)',
      subtitulo: 'Breadth-First Search',
      descripcion: 'Recorre nivel por nivel de izquierda a derecha',
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      icon: Layers
    },
    {
      key: 'preorden',
      titulo: 'Preorden (NID)',
      descripcion: 'Raíz → Izquierdo → Derecho',
      color: 'green',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      icon: ArrowRight
    },
    {
      key: 'inorden',
      titulo: 'Inorden (IND)',
      descripcion: 'Izquierdo → Raíz → Derecho',
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      icon: GitBranch
    },
    {
      key: 'postorden',
      titulo: 'Postorden (IDN)',
      descripcion: 'Izquierdo → Derecho → Raíz',
      color: 'orange',
      gradient: 'from-orange-500 to-amber-500',
      bgGradient: 'from-orange-50 to-amber-50',
      icon: ArrowLeft
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 card-shadow animate-slideInLeft">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg mr-3">
            <Layers className="w-6 h-6 text-white" />
          </div>
          Recorridos del Árbol
        </h2>
        <div className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full">
          <span className="text-indigo-700 font-semibold text-sm">4 Algoritmos</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {tiposRecorrido.map(({ key, titulo, subtitulo, descripcion, gradient, bgGradient, icon: Icon }, index) => {
          const valores = recorridos[key] || [];
          const esActivo = recorridoActivo === key;
          
          return (
            <div
              key={key}
              className={`relative p-6 rounded-xl border-2 transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                esActivo 
                  ? 'border-transparent shadow-2xl' 
                  : 'border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg'
              }`}
              style={{
                background: esActivo 
                  ? `linear-gradient(135deg, var(--tw-gradient-stops))`
                  : 'white',
                animationDelay: `${index * 0.1}s`
              }}
              onMouseEnter={() => setRecorridoActivo(key)}
              onMouseLeave={() => setRecorridoActivo(null)}
            >
              {/* Efecto de brillo de fondo */}
              {esActivo && (
                <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} rounded-xl opacity-90 -z-10`}></div>
              )}
              
              <div className="flex items-start mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} mr-4 transform transition-transform duration-300 ${
                  esActivo ? 'scale-110 rotate-6' : ''
                }`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold text-lg mb-1 transition-colors ${
                    esActivo ? 'text-gray-800' : 'text-gray-700'
                  }`}>
                    {titulo}
                  </h3>
                  <p className={`text-xs font-semibold mb-1 transition-colors ${
                    esActivo ? 'text-gray-600' : 'text-gray-500'
                  }`}>
                    {subtitulo}
                  </p>
                  <p className={`text-sm transition-colors ${
                    esActivo ? 'text-gray-600' : 'text-gray-500'
                  }`}>
                    {descripcion}
                  </p>
                </div>
              </div>
              
              {/* Secuencia de valores con animación */}
              <div className={`mt-4 p-4 rounded-lg transition-all duration-300 ${
                esActivo ? 'bg-white shadow-inner' : 'bg-gray-50'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-semibold uppercase tracking-wide ${
                    esActivo ? 'text-gray-700' : 'text-gray-500'
                  }`}>
                    Secuencia:
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    esActivo ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {valores.length} nodos
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {valores.length > 0 ? (
                    valores.map((valor, idx) => (
                      <div
                        key={idx}
                        className={`px-3 py-1.5 rounded-lg font-mono font-bold text-sm transition-all duration-300 ${
                          esActivo 
                            ? `bg-gradient-to-r ${gradient} text-white shadow-md transform hover:scale-110` 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        style={{
                          animationDelay: `${idx * 0.05}s`,
                          animation: esActivo ? 'scaleIn 0.3s ease-out' : 'none'
                        }}
                      >
                        {valor}
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-400 text-sm italic">Sin datos</span>
                  )}
                </div>
              </div>
              
              {/* Indicador de complejidad */}
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className={`font-semibold ${esActivo ? 'text-gray-600' : 'text-gray-500'}`}>
                  Complejidad: O(n)
                </span>
                {esActivo && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full font-semibold animate-fadeIn">
                    ✓ Activo
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};