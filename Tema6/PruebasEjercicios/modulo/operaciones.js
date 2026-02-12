// operaciones.js

// Exportación con nombre: se exporta tal cual
export function sumar(a, b) {
    return a + b;
}

// Otra exportación con nombre
export function multiplicar(a, b) {
    return a * b;
}

// Exportación por defecto: solo puede haber una por archivo
// Representa la función "principal" del módulo
export default function saludar(nombre) {
    return "Hola"+nombre+", bienvenido al módulo de operaciones.";
}
