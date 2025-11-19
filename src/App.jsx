import React, { useState } from 'react';
import { ArbolBinarioBusqueda } from './services/ArbolBinarioBusqueda';
import { VisualizadorArbol } from './components/VisualizadorArbol';
import { PanelControl } from './components/PanelControl';
import { SeccionRecorridos } from './components/SeccionRecorridos';
import { SeccionEstadisticas } from './components/SeccionEstadisticas';
import { MenuOpciones } from './components/MenuOpciones';
import { crearMensaje, obtenerClasesMensaje, TIPOS_MENSAJE } from './utils/mensajes';
import { GitBranch } from 'lucide-react';
import './App.css';

/**
 * Componente Principal de la Aplicación
 * Árbol Binario de Búsqueda (ABB)
 */
function App() {
  // Estados principales
  const [arbol] = useState(() => new ArbolBinarioBusqueda());
  const [valores, setValores] = useState([]);
  const [inputValor, setInputValor] = useState('');
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const [mensajeNivel, setMensajeNivel] = useState(''); // Mensaje para mostrar el nivel del nodo
  const [keyMensajeNivel, setKeyMensajeNivel] = useState(0); // Key para forzar reanimación
  const [valorBuscado, setValorBuscado] = useState(null);
  const [recorridos, setRecorridos] = useState({});
  const [estadisticas, setEstadisticas] = useState({});
  const [actualizacion, setActualizacion] = useState(0);

  /**
   * Actualiza la vista del árbol y recorridos
   */
  const actualizarVista = () => {
    setValores(arbol.obtenerTodosValores());
    setActualizacion(prev => prev + 1);
    
    // Actualizar recorridos automáticamente si el árbol no está vacío
    if (!arbol.estaVacio()) {
      const nuevosRecorridos = {
        anchura: arbol.recorridoAnchura(),
        preorden: arbol.recorridoPreorden(),
        inorden: arbol.recorridoInorden(),
        postorden: arbol.recorridoPostorden()
      };
      setRecorridos(nuevosRecorridos);
    } else {
      setRecorridos({});
    }
  };

  /**
   * Muestra un mensaje temporal
   */
  const mostrarMensaje = (texto, tipo = TIPOS_MENSAJE.INFO) => {
    setMensaje(crearMensaje(texto, tipo));
    setTimeout(() => setMensaje({ texto: '', tipo: '' }), 4000);
  };

  /**
   * Maneja la inserción de valores
   */
  const manejarInsertar = () => {
    try {
      const valor = parseFloat(inputValor);
      if (isNaN(valor)) {
        mostrarMensaje('Por favor ingrese un número válido', TIPOS_MENSAJE.ERROR);
        return;
      }
      
      arbol.insertar(valor);
      actualizarVista();
      setInputValor('');
      mostrarMensaje(`✓ Valor ${valor} insertado correctamente`, TIPOS_MENSAJE.SUCCESS);
    } catch (error) {
      mostrarMensaje(`✗ ${error.message}`, TIPOS_MENSAJE.ERROR);
    }
  };

  /**
   * Maneja la búsqueda de valores
   */
  const manejarBuscar = () => {
    try {
      const valor = parseFloat(inputValor);
      if (isNaN(valor)) {
        mostrarMensaje('Por favor ingrese un número válido', TIPOS_MENSAJE.ERROR);
        return;
      }
      
      const resultado = arbol.buscar(valor);
      if (resultado) {
        setValorBuscado(valor);
        const nivel = arbol.nivelNodo(valor);
        mostrarMensaje(
          `✓ Valor ${valor} encontrado en el nivel ${nivel}`, 
          TIPOS_MENSAJE.SUCCESS
        );
        setTimeout(() => setValorBuscado(null), 3000);
      } else {
        mostrarMensaje(`✗ Valor ${valor} no encontrado en el árbol`, TIPOS_MENSAJE.WARNING);
      }
    } catch (error) {
      mostrarMensaje(`✗ ${error.message}`, TIPOS_MENSAJE.ERROR);
    }
  };

  /**
   * Maneja la eliminación de valores
   */
  const manejarEliminar = () => {
    try {
      const valor = parseFloat(inputValor);
      if (isNaN(valor)) {
        mostrarMensaje('Por favor ingrese un número válido', TIPOS_MENSAJE.ERROR);
        return;
      }
      
      arbol.eliminar(valor);
      actualizarVista();
      setInputValor('');
      mostrarMensaje(`✓ Valor ${valor} eliminado correctamente`, TIPOS_MENSAJE.SUCCESS);
    } catch (error) {
      mostrarMensaje(`✗ ${error.message}`, TIPOS_MENSAJE.ERROR);
    }
  };

  /**
   * Calcula y muestra todos los recorridos
   */
  const mostrarRecorridos = () => {
    if (arbol.estaVacio()) {
      mostrarMensaje('El árbol está vacío', TIPOS_MENSAJE.WARNING);
      return;
    }

    const nuevosRecorridos = {
      anchura: arbol.recorridoAnchura(),
      preorden: arbol.recorridoPreorden(),
      inorden: arbol.recorridoInorden(),
      postorden: arbol.recorridoPostorden()
    };
    
    setRecorridos(nuevosRecorridos);
    mostrarMensaje('✓ Recorridos calculados exitosamente', TIPOS_MENSAJE.INFO);
  };

  /**
   * Calcula y muestra estadísticas
   */
  const mostrarEstadisticas = () => {
    if (arbol.estaVacio()) {
      mostrarMensaje('El árbol está vacío', TIPOS_MENSAJE.WARNING);
      return;
    }

    try {
      const valor = parseFloat(inputValor);
      const nivel = !isNaN(valor) ? arbol.nivelNodo(valor) : -1;
      const minMax = arbol.obtenerMinMax();
      
      const nuevasEstadisticas = {
        niveles: arbol.numeroNiveles(),
        nivelNodo: nivel !== -1 ? nivel : 'N/A',
        minimo: minMax?.minimo || 'N/A',
        maximo: minMax?.maximo || 'N/A'
      };
      
      setEstadisticas(nuevasEstadisticas);
      mostrarMensaje('✓ Estadísticas calculadas exitosamente', TIPOS_MENSAJE.INFO);
    } catch (error) {
      console.error('Error al calcular estadísticas:', error);
      mostrarMensaje(`✗ Error al calcular estadísticas: ${error.message}`, TIPOS_MENSAJE.ERROR);
    }
  };

  /**
   * Carga datos de ejemplo
   */
  const cargarDatosEjemplo = () => {
    try {
      const ejemplos = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45, 65, 75, 90];
      
      arbol.limpiar();
      
      ejemplos.forEach(val => {
        try {
          arbol.insertar(val);
        } catch (e) {
          // Ignorar duplicados
        }
      });
      
      actualizarVista();
      mostrarMensaje(
        `✓ ${ejemplos.length} valores de ejemplo cargados correctamente`, 
        TIPOS_MENSAJE.SUCCESS
      );
    } catch (error) {
      mostrarMensaje(`✗ ${error.message}`, TIPOS_MENSAJE.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 text-center relative animate-fadeIn">
          {/* Efectos de fondo */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-3xl opacity-20 -z-10 animate-pulse-slow"></div>
          
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <GitBranch className="w-16 h-16 text-indigo-600 mr-4 animate-bounce-slow" />
              <div className="absolute inset-0 w-16 h-16 bg-indigo-600 rounded-full blur-xl opacity-30 animate-pulse-slow"></div>
            </div>
            <h1 className="text-6xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-slideInRight">
              Árbol Binario de Búsqueda
            </h1>
          </div>
          
          {/* Línea decorativa */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="w-20 h-1 bg-gradient-to-r from-transparent to-indigo-500 rounded-full"></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse-slow"></div>
            <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-20 h-1 bg-gradient-to-l from-transparent to-pink-500 rounded-full"></div>
          </div>
        </header>

        {/* Mensajes */}
        {mensaje.texto && (
          <div className={`mb-6 p-5 rounded-xl border-l-4 ${obtenerClasesMensaje(mensaje.tipo)} shadow-lg animate-slideInLeft transform hover:scale-102 transition-all`}>
            <div className="flex items-center">
              <div className="mr-3 text-2xl">
                {mensaje.tipo === 'success' && '✅'}
                {mensaje.tipo === 'error' && '❌'}
                {mensaje.tipo === 'warning' && '⚠️'}
                {mensaje.tipo === 'info' && 'ℹ️'}
              </div>
              <p className="font-semibold text-lg">{mensaje.texto}</p>
            </div>
          </div>
        )}

        {/* Menú de Opciones */}
        <MenuOpciones />

        {/* Panel de Control */}
        <PanelControl
          inputValor={inputValor}
          setInputValor={setInputValor}
          onInsertar={manejarInsertar}
          onBuscar={manejarBuscar}
          onEliminar={manejarEliminar}
          onCargarEjemplo={cargarDatosEjemplo}
        />

        {/* Visualización del Árbol */}
        <div className="bg-gray-900 rounded-xl shadow-lg p-6 mb-6 card-shadow animate-fadeIn border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-white flex items-center">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg mr-3 animate-pulse-slow">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              Visualización Interactiva del Árbol
            </h2>
          </div>
          
          <VisualizadorArbol 
            arbol={arbol} 
            valorBuscado={valorBuscado}
            key={actualizacion}
          />
        </div>

        {/* Elementos del Árbol */}
        <div className="bg-gray-900 rounded-xl shadow-lg p-6 mb-6 card-shadow animate-scaleIn border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-white flex items-center">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg mr-3">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>
              Elementos del Árbol
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-white text-sm font-semibold">Total de nodos:</span>
              <span className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-base font-bold shadow-md">
                {valores.length} {valores.length === 1 ? 'nodo' : 'nodos'}
              </span>
            </div>
          </div>
          
          {/* Mensaje instructivo */}
          {valores.length > 0 && (
            <div className="mb-4 p-3 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-lg border border-blue-700">
              <p className="text-blue-200 text-sm text-center">
                💡 <strong>Seleccione un nodo</strong> para ver en qué nivel se encuentra
              </p>
            </div>
          )}
          
          {valores.length > 0 ? (
            <>
              <div className="flex flex-wrap gap-3">
                {valores.map((valor, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const nivel = arbol.nivelNodo(valor);
                      setMensajeNivel(`El nodo ${valor} se encuentra en el nivel ${nivel}`);
                      setKeyMensajeNivel(prev => prev + 1); // Incrementar key para reanimar
                      setValorBuscado(valor); // Iluminar el nodo seleccionado
                      setTimeout(() => setValorBuscado(null), 3000); // Quitar iluminación después de 3 segundos
                    }}
                    className="px-5 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:scale-110 hover:-translate-y-1 animate-scaleIn"
                    style={{
                      animationDelay: `${idx * 0.05}s`
                    }}
                  >
                    {valor}
                  </button>
                ))}
              </div>
              
              {/* Mensaje del nivel del nodo */}
              {mensajeNivel && (
                <div 
                  key={keyMensajeNivel}
                  className="mt-4 p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl shadow-lg animate-slideInLeft border-2 border-blue-300"
                >
                  <div className="flex items-center justify-center">
                    <span className="text-2xl mr-3">🎯</span>
                    <p className="font-bold text-lg">{mensajeNivel}</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300">
              <div className="text-6xl mb-3 animate-bounce-slow">🌳</div>
              <p className="text-gray-600 text-xl font-semibold mb-2">No hay elementos en el árbol</p>
              <p className="text-gray-500 text-sm">Inserta valores o carga datos de ejemplo para comenzar</p>
            </div>
          )}
        </div>

        {/* Recorridos */}
        <SeccionRecorridos recorridos={recorridos} />

        {/* Estadísticas */}
        <SeccionEstadisticas 
          estadisticas={estadisticas} 
          onCalcular={mostrarEstadisticas}
          arbol={arbol}
          actualizacion={actualizacion}
        />

      </div>
    </div>
  );
}

export default App;