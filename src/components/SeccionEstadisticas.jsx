import React, { useState, useEffect } from 'react';
import { Target, BarChart3, MinusCircle, PlusCircle, Activity, TrendingUp, Sparkles } from 'lucide-react';

/**
 * Componente SeccionEstadisticas
 * Muestra estadísticas y operaciones especiales del árbol con animaciones
 */
export const SeccionEstadisticas = ({ estadisticas, onCalcular, arbol, actualizacion }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [nivelSeleccionado, setNivelSeleccionado] = useState('');
  const [nodosEnNivel, setNodosEnNivel] = useState(null);
  const [nivelConsultado, setNivelConsultado] = useState('');
  
  // Resetear el resultado cuando el árbol cambia
  useEffect(() => {
    setNodosEnNivel(null);
    setNivelConsultado('');
  }, [actualizacion]);
  
  const tarjetas = [
    {
      key: 'niveles',
      titulo: 'Número de Niveles del Árbol',
      icono: BarChart3,
      color: 'indigo',
      gradient: 'from-indigo-500 to-purple-500',
      emoji: '📊',
      esOperacionLibre: false,
      numeroLibre: 9
    },
    {
      key: 'minimo',
      titulo: 'Valor Mínimo del Árbol',
      icono: MinusCircle,
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-500',
      emoji: '⬇️',
      esOperacionLibre: true,
      numeroLibre: 12,
      parte: 'min'
    },
    {
      key: 'maximo',
      titulo: 'Valor Máximo del Árbol',
      icono: PlusCircle,
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500',
      emoji: '⬆️',
      esOperacionLibre: true,
      numeroLibre: 12,
      parte: 'max'
    }
  ];

  const tieneEstadisticas = Object.keys(estadisticas).length > 0;

  const handleCalcularNodosEnNivel = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    const nivel = parseInt(nivelSeleccionado);
    
    if (nivelSeleccionado === '' || isNaN(nivel) || nivel < 0) {
      setNodosEnNivel('Ingrese un nivel válido (número >= 0)');
      setNivelConsultado('');
      return;
    }
    
    if (!arbol || arbol.estaVacio()) {
      setNodosEnNivel('El árbol está vacío');
      setNivelConsultado('');
      return;
    }
    
    try {
      console.log('Nivel solicitado:', nivel);
      console.log('Árbol tiene raíz:', arbol.raiz !== null);
      const cantidad = arbol.contarNodosEnNivel(nivel);
      console.log('Cantidad de nodos en nivel', nivel, ':', cantidad);
      setNivelConsultado(nivelSeleccionado);
      setNodosEnNivel(`${cantidad} ${cantidad === 1 ? 'nodo' : 'nodos'}`);
    } catch (error) {
      console.error('Error al contar nodos:', error);
      setNodosEnNivel('Error al contar nodos');
      setNivelConsultado('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 card-shadow animate-slideInRight">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg mr-3 animate-pulse-slow">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            Estadísticas del Árbol
          </h2>
          <p className="text-sm text-gray-500 mt-1 ml-14">Análisis completo de la estructura</p>
        </div>
        
        <button
          onClick={onCalcular}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 animate-glow"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Calcular Estadísticas
        </button>
      </div>
      
      {/* Campo para contar nodos en nivel específico */}
      <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <span className="text-2xl mr-2">🎯</span>
            <h3 className="text-lg font-bold text-gray-800">Contar nodos en un nivel específico</h3>
          </div>
          <div className="px-3 py-1 bg-green-500 rounded-full">
            <span className="text-white text-sm font-bold">#11</span>
          </div>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={nivelSeleccionado}
            onChange={(e) => {
              const valor = e.target.value;
              if (valor === '' || /^\d+$/.test(valor)) {
                setNivelSeleccionado(valor);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleCalcularNodosEnNivel(e);
              }
            }}
            placeholder="Ingrese el nivel (0, 1, 2...)"
            className="flex-1 px-4 py-3 border-2 border-green-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none"
          />
          <button
            onClick={handleCalcularNodosEnNivel}
            type="button"
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Contar
          </button>
        </div>
        {nodosEnNivel !== null && (
          <div key={`resultado-${nivelConsultado}`} className="mt-4 p-5 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border-2 border-green-400 shadow-md">
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl">📊</span>
              <div className="text-center">
                <p className="text-sm text-gray-600 font-semibold mb-1">Resultado de la consulta</p>
                <p className="text-2xl font-black text-green-700">
                  Nivel {nivelConsultado}: <span className="text-green-600">{nodosEnNivel}</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {tieneEstadisticas ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tarjetas.map(({ key, titulo, subtitulo, icono: Icon, gradient, descripcion, emoji, esOperacionLibre, numeroLibre }, index) => {
            const valor = estadisticas[key];
            const esHovered = hoveredCard === key;
            
            return (
              <div
                key={key}
                className={`relative rounded-xl p-5 text-center transition-all duration-500 cursor-pointer transform ${
                  esHovered ? 'scale-110 -translate-y-2 z-10' : 'hover:scale-105'
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
                onMouseEnter={() => setHoveredCard(key)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Fondo con gradiente */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-xl transition-opacity duration-300 ${
                  esHovered ? 'opacity-100' : 'opacity-90'
                }`}></div>
                
                {/* Efecto de brillo */}
                {esHovered && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-xl blur-xl opacity-50 -z-10 animate-pulse-slow`}></div>
                )}
                
                {/* Contenido */}
                <div className="relative z-10">
                  {/* Emoji decorativo */}
                  <div className={`text-3xl mb-3 transition-transform duration-300 ${
                    esHovered ? 'scale-125 animate-bounce-slow' : ''
                  }`}>
                    {emoji}
                  </div>
                  
                  {/* Badge de Operación */}
                  {numeroLibre && (
                    <div className="absolute top-2 right-2 px-2 py-1 bg-white bg-opacity-30 backdrop-blur-sm rounded-full border border-white border-opacity-50">
                      <span className="text-white text-xs font-bold">#{numeroLibre}</span>
                    </div>
                  )}
                  
                  {/* Título */}
                  <p className="text-white font-bold text-lg mb-1 drop-shadow-md">
                    {titulo}
                  </p>
                  <p className="text-white text-xs opacity-90 mb-3">
                    {subtitulo}
                  </p>
                  
                  {esOperacionLibre && (
                    <div className="mb-2">
                      <span className="inline-block px-2 py-1 bg-yellow-400 text-yellow-900 text-xs rounded-full font-bold">
                        ✨ EXTRA
                      </span>
                    </div>
                  )}
                  
                  {/* Valor principal */}
                  <div className={`bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 mb-2 transition-all duration-300 ${
                    esHovered ? 'bg-opacity-30 shadow-lg' : ''
                  }`}>
                    <p className="text-4xl font-black text-white drop-shadow-lg">
                      {valor !== undefined && valor !== null ? valor : 'N/A'}
                    </p>
                  </div>
                  
                  {/* Descripción */}
                  <p className="text-white text-xs opacity-80">
                    {descripcion}
                  </p>
                  
                  {/* Indicador de hover */}
                  {esHovered && (
                    <div className="mt-2 animate-fadeIn">
                      <div className="w-12 h-1 bg-white rounded-full mx-auto opacity-80"></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300">
          <div className="relative inline-block">
            <BarChart3 className="w-20 h-20 text-gray-400 mx-auto mb-4 animate-pulse-slow" />
            <div className="absolute inset-0 w-20 h-20 mx-auto bg-gray-400 rounded-full blur-2xl opacity-20 animate-pulse-slow"></div>
          </div>
          <p className="text-gray-600 text-xl font-semibold mb-2">No hay estadísticas calculadas</p>
          <p className="text-gray-500 text-sm mb-4">Haz clic en el botón para analizar el árbol</p>
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse-slow"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse-slow" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse-slow" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      )}
    </div>
  );
};