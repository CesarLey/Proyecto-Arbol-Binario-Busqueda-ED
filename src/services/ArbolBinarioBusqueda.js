import { NodoABB } from '../models/NodoABB';

/**
 * Clase ArbolBinarioBusqueda
 * Implementa todas las operaciones del ABB
 * Aplica principios SOLID y buenas prácticas de POO
 */
export class ArbolBinarioBusqueda {
  constructor() {
    this.raiz = null;
    this._contadorNodos = 0;
  }

  // ==================== OPERACIONES BÁSICAS ====================

  /**
   * Inserta un nuevo valor en el árbol
   * Complejidad: O(h) donde h es la altura
   * @param {number} valor - Valor a insertar
   * @returns {boolean} - true si se insertó correctamente
   * @throws {Error} - Si el valor ya existe o es inválido
   */
  insertar(valor) {
    this._validarValor(valor);
    
    const nuevoNodo = new NodoABB(valor);
    
    if (this.raiz === null) {
      this.raiz = nuevoNodo;
      this._contadorNodos++;
      return true;
    }
    
    return this._insertarRecursivo(this.raiz, nuevoNodo);
  }

  /**
   * Método privado para inserción recursiva
   * @private
   */
  _insertarRecursivo(nodoActual, nuevoNodo) {
    if (nuevoNodo.valor === nodoActual.valor) {
      throw new Error(`El valor ${nuevoNodo.valor} ya existe en el árbol`);
    }
    
    if (nuevoNodo.valor < nodoActual.valor) {
      if (nodoActual.izquierdo === null) {
        nodoActual.izquierdo = nuevoNodo;
        this._contadorNodos++;
        return true;
      }
      return this._insertarRecursivo(nodoActual.izquierdo, nuevoNodo);
    } else {
      if (nodoActual.derecho === null) {
        nodoActual.derecho = nuevoNodo;
        this._contadorNodos++;
        return true;
      }
      return this._insertarRecursivo(nodoActual.derecho, nuevoNodo);
    }
  }

  /**
   * Busca un valor en el árbol
   * Complejidad: O(h)
   * @param {number} valor - Valor a buscar
   * @returns {NodoABB|null} - Nodo encontrado o null
   */
  buscar(valor) {
    this._validarValor(valor);
    return this._buscarRecursivo(this.raiz, valor);
  }

  /**
   * Método privado para búsqueda recursiva
   * @private
   */
  _buscarRecursivo(nodo, valor) {
    if (nodo === null) {
      return null;
    }
    
    if (valor === nodo.valor) {
      return nodo;
    }
    
    if (valor < nodo.valor) {
      return this._buscarRecursivo(nodo.izquierdo, valor);
    } else {
      return this._buscarRecursivo(nodo.derecho, valor);
    }
  }

  /**
   * Elimina un valor del árbol
   * Complejidad: O(h)
   * @param {number} valor - Valor a eliminar
   * @throws {Error} - Si el valor no existe
   */
  eliminar(valor) {
    this._validarValor(valor);
    const nodoAntes = this.buscar(valor);
    
    if (!nodoAntes) {
      throw new Error(`El valor ${valor} no existe en el árbol`);
    }
    
    this.raiz = this._eliminarRecursivo(this.raiz, valor);
    this._contadorNodos--;
  }

  /**
   * Método privado para eliminación recursiva
   * @private
   */
  _eliminarRecursivo(nodo, valor) {
    if (nodo === null) {
      return null;
    }

    if (valor < nodo.valor) {
      nodo.izquierdo = this._eliminarRecursivo(nodo.izquierdo, valor);
      return nodo;
    }
    
    if (valor > nodo.valor) {
      nodo.derecho = this._eliminarRecursivo(nodo.derecho, valor);
      return nodo;
    }

    // Caso 1: Nodo hoja (sin hijos)
    if (nodo.esHoja()) {
      return null;
    }
    
    // Caso 2: Nodo con un solo hijo
    if (nodo.izquierdo === null) {
      return nodo.derecho;
    }
    
    if (nodo.derecho === null) {
      return nodo.izquierdo;
    }
    
    // Caso 3: Nodo con dos hijos
    // Usamos el sucesor inorden (menor de los mayores)
    const sucesor = this._encontrarMinimo(nodo.derecho);
    nodo.valor = sucesor.valor;
    nodo.derecho = this._eliminarRecursivo(nodo.derecho, sucesor.valor);
    
    return nodo;
  }

  /**
   * Encuentra el nodo con el valor mínimo
   * @private
   */
  _encontrarMinimo(nodo) {
    while (nodo.izquierdo !== null) {
      nodo = nodo.izquierdo;
    }
    return nodo;
  }

  /**
   * Encuentra el nodo con el valor máximo
   * @private
   */
  _encontrarMaximo(nodo) {
    while (nodo.derecho !== null) {
      nodo = nodo.derecho;
    }
    return nodo;
  }

  // ==================== RECORRIDOS ====================

  /**
   * Recorrido en anchura (por niveles)
   * Complejidad: O(n)
   * @returns {number[]} - Array con valores en orden de niveles
   */
  recorridoAnchura() {
    if (this.raiz === null) return [];
    
    const resultado = [];
    const cola = [this.raiz];
    
    while (cola.length > 0) {
      const nodo = cola.shift();
      resultado.push(nodo.valor);
      
      if (nodo.izquierdo !== null) {
        cola.push(nodo.izquierdo);
      }
      if (nodo.derecho !== null) {
        cola.push(nodo.derecho);
      }
    }
    
    return resultado;
  }

  /**
   * Recorrido en Preorden (NID)
   * Nodo → Izquierdo → Derecho
   * Complejidad: O(n)
   * @returns {number[]}
   */
  recorridoPreorden() {
    const resultado = [];
    this._preordenRecursivo(this.raiz, resultado);
    return resultado;
  }

  _preordenRecursivo(nodo, resultado) {
    if (nodo === null) return;
    
    resultado.push(nodo.valor);
    this._preordenRecursivo(nodo.izquierdo, resultado);
    this._preordenRecursivo(nodo.derecho, resultado);
  }

  /**
   * Recorrido en Inorden (IND)
   * Izquierdo → Nodo → Derecho
   * Produce valores ordenados ascendentemente
   * Complejidad: O(n)
   * @returns {number[]}
   */
  recorridoInorden() {
    const resultado = [];
    this._inordenRecursivo(this.raiz, resultado);
    return resultado;
  }

  _inordenRecursivo(nodo, resultado) {
    if (nodo === null) return;
    
    this._inordenRecursivo(nodo.izquierdo, resultado);
    resultado.push(nodo.valor);
    this._inordenRecursivo(nodo.derecho, resultado);
  }

  /**
   * Recorrido en Postorden (IDN)
   * Izquierdo → Derecho → Nodo
   * Complejidad: O(n)
   * @returns {number[]}
   */
  recorridoPostorden() {
    const resultado = [];
    this._postordenRecursivo(this.raiz, resultado);
    return resultado;
  }

  _postordenRecursivo(nodo, resultado) {
    if (nodo === null) return;
    
    this._postordenRecursivo(nodo.izquierdo, resultado);
    this._postordenRecursivo(nodo.derecho, resultado);
    resultado.push(nodo.valor);
  }

  // ==================== MÉTRICAS Y ESTADÍSTICAS ====================

  /**
   * Calcula el número de niveles (altura) del árbol
   * Complejidad: O(n)
   * @returns {number}
   */
  numeroNiveles() {
    return this._calcularAltura(this.raiz);
  }

  _calcularAltura(nodo) {
    if (nodo === null) return 0;
    
    const alturaIzq = this._calcularAltura(nodo.izquierdo);
    const alturaDer = this._calcularAltura(nodo.derecho);
    
    return Math.max(alturaIzq, alturaDer) + 1;
  }

  /**
   * Encuentra el nivel de un nodo específico
   * @param {number} valor - Valor del nodo
   * @returns {number} - Nivel del nodo (-1 si no existe)
   */
  nivelNodo(valor) {
    this._validarValor(valor);
    return this._encontrarNivel(this.raiz, valor, 0);
  }

  _encontrarNivel(nodo, valor, nivelActual) {
    if (nodo === null) return -1;
    
    if (nodo.valor === valor) return nivelActual;
    
    if (valor < nodo.valor) {
      return this._encontrarNivel(nodo.izquierdo, valor, nivelActual + 1);
    } else {
      return this._encontrarNivel(nodo.derecho, valor, nivelActual + 1);
    }
  }

  // ==================== OPERACIONES LIBRES ====================

  /**
   * OPERACIÓN LIBRE 1: Contar nodos en un nivel específico
   * Devuelve la cantidad de nodos que hay en el nivel indicado
   * @param {number} nivelBuscado - El nivel del cual contar los nodos
   * @returns {number} - Cantidad de nodos en ese nivel
   */
  contarNodosEnNivel(nivelBuscado) {
    if (this.raiz === null || nivelBuscado < 0) {
      return 0;
    }

    let contador = 0;
    const cola = [{ nodo: this.raiz, nivel: 0 }];

    while (cola.length > 0) {
      const { nodo, nivel } = cola.shift();
      
      // Si estamos en el nivel buscado, solo contar
      if (nivel === nivelBuscado) {
        contador++;
        // No agregar más hijos, solo contar
        continue;
      }
      
      // Si aún no hemos llegado al nivel buscado, seguir explorando
      if (nivel < nivelBuscado) {
        if (nodo.izquierdo) {
          cola.push({ nodo: nodo.izquierdo, nivel: nivel + 1 });
        }
        if (nodo.derecho) {
          cola.push({ nodo: nodo.derecho, nivel: nivel + 1 });
        }
      }
    }

    return contador;
  }

  /**
   * OPERACIÓN LIBRE 2: Obtiene el valor mínimo y máximo
   * @returns {Object} - {minimo, maximo}
   */
  obtenerMinMax() {
    if (this.raiz === null) {
      return { minimo: null, maximo: null };
    }

    const minNodo = this._encontrarMinimo(this.raiz);
    const maxNodo = this._encontrarMaximo(this.raiz);

    return { 
      minimo: minNodo.valor, 
      maximo: maxNodo.valor 
    };
  }

  // ==================== UTILIDADES ====================

  /**
   * Obtiene la estructura del árbol para visualización
   * @returns {Object|null}
   */
  obtenerEstructura() {
    return this._convertirAEstructura(this.raiz);
  }

  _convertirAEstructura(nodo) {
    if (nodo === null) return null;
    
    return {
      valor: nodo.valor,
      izquierdo: this._convertirAEstructura(nodo.izquierdo),
      derecho: this._convertirAEstructura(nodo.derecho)
    };
  }

  /**
   * Obtiene todos los valores del árbol ordenados
   * @returns {number[]}
   */
  obtenerTodosValores() {
    return this.recorridoInorden();
  }

  /**
   * Verifica si el árbol está vacío
   * @returns {boolean}
   */
  estaVacio() {
    return this.raiz === null;
  }

  /**
   * Obtiene el número de nodos
   * @returns {number}
   */
  obtenerCantidadNodos() {
    return this._contadorNodos;
  }

  /**
   * Limpia el árbol completamente
   */
  limpiar() {
    this.raiz = null;
    this._contadorNodos = 0;
  }

  /**
   * Valida que el valor sea un número válido
   * @private
   */
  _validarValor(valor) {
    if (typeof valor !== 'number' || isNaN(valor) || !isFinite(valor)) {
      throw new Error('El valor debe ser un número válido');
    }
  }
}