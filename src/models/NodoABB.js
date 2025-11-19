/**
 * Clase NodoABB - Representa un nodo individual del árbol
 * Aplica principio de Single Responsibility
 */
export class NodoABB {
  constructor(valor) {
    this.valor = valor;
    this.izquierdo = null;
    this.derecho = null;
  }

  /**
   * Verifica si el nodo es una hoja
   * @returns {boolean}
   */
  esHoja() {
    return this.izquierdo === null && this.derecho === null;
  }

  /**
   * Cuenta el número de hijos del nodo
   * @returns {number}
   */
  contarHijos() {
    let count = 0;
    if (this.izquierdo !== null) count++;
    if (this.derecho !== null) count++;
    return count;
  }
}