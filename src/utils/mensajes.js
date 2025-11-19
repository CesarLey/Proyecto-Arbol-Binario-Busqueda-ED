/**
 * Utilidades para manejo de mensajes
 */

export const TIPOS_MENSAJE = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

export const crearMensaje = (texto, tipo = TIPOS_MENSAJE.INFO) => ({
  texto,
  tipo,
  timestamp: Date.now()
});

export const obtenerClasesMensaje = (tipo) => {
  const clases = {
    [TIPOS_MENSAJE.SUCCESS]: 'bg-green-50 border-green-500 text-green-800',
    [TIPOS_MENSAJE.ERROR]: 'bg-red-50 border-red-500 text-red-800',
    [TIPOS_MENSAJE.WARNING]: 'bg-yellow-50 border-yellow-500 text-yellow-800',
    [TIPOS_MENSAJE.INFO]: 'bg-blue-50 border-blue-500 text-blue-800'
  };
  
  return clases[tipo] || clases[TIPOS_MENSAJE.INFO];
};