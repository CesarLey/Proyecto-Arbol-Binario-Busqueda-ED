import React, { useState } from 'react';
import { Menu, CheckCircle2, ChevronRight } from 'lucide-react';

/**
 * Componente MenuOpciones
 * Muestra el menú completo de opciones numeradas del 1 al 12
 * según los requisitos de la práctica
 */
export const MenuOpciones = () => {
  const [menuExpandido, setMenuExpandido] = useState(false);

  const opciones = [
    { id: 1, titulo: "Imprimir los elementos del árbol", implementado: true },
    { id: 2, titulo: "Buscar un elemento en el árbol", implementado: true },
    { id: 3, titulo: "Insertar un elemento en el árbol", implementado: true },
    { id: 4, titulo: "Borrar un elemento del árbol", implementado: true },
    { id: 5, titulo: "Recorridos en anchura (amplitud o por niveles)", implementado: true },
    { id: 6, titulo: "Recorrido en Preorden", implementado: true },
    { id: 7, titulo: "Recorrido en Postorden", implementado: true },
    { id: 8, titulo: "Recorrido en Inorden", implementado: true },
    { id: 9, titulo: "Número de niveles del árbol", implementado: true },
    { id: 10, titulo: "Nivel de un nodo en específico", implementado: true },
    { id: 11, titulo: "Contar nodos en un nivel específico", implementado: true, esLibre: true },
    { id: 12, titulo: "Obtener valores mínimo y máximo", implementado: true, esLibre: true }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 card-shadow animate-fadeIn relative overflow-hidden">
      {/* Efecto de fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full blur-3xl opacity-30 -z-10 animate-pulse-slow"></div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg mr-3">
            <Menu className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Operaciones Implementadas
          </h2>
        </div>
        <button
          onClick={() => setMenuExpandido(!menuExpandido)}
          className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full hover:from-green-200 hover:to-emerald-200 transition-all flex items-center font-semibold text-sm"
        >
          {menuExpandido ? 'Contraer' : 'Expandir'}
          <ChevronRight className={`w-4 h-4 ml-2 transition-transform ${menuExpandido ? 'rotate-90' : ''}`} />
        </button>
      </div>

      {menuExpandido && (
        <div className="animate-slideInDown">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {opciones.map((opcion, index) => (
              <div
                key={opcion.id}
                className={`p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-md ${
                  opcion.esLibre 
                    ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300 hover:border-purple-400' 
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-3 ${
                    opcion.esLibre 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                      : 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white'
                  }`}>
                    {opcion.id}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium text-sm leading-tight">
                      {opcion.titulo}
                    </p>
                    {opcion.esLibre && (
                      <span className="inline-block mt-2 px-3 py-1 bg-purple-600 text-white text-xs rounded-full font-semibold">
                        ✨ Operación Extra
                      </span>
                    )}
                  </div>
                  {opcion.implementado && (
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 ml-2" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!menuExpandido && (
        <div className="text-center py-4">
          <p className="text-gray-600">
            Haz clic en <strong>Expandir</strong> para ver todas las operaciones implementadas
          </p>
        </div>
      )}
    </div>
  );
};
