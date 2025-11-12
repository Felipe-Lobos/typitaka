# TipyTaka

Aplicación de test de mecanografía inspirada en MonkeyType, construida con React. Permite medir WPM en tiempo real, precisión y practicar con diferentes duraciones y listas de palabras.

INTEGRACION CI/CD CON TESTING SELENIUM
Nueva prueba ci/cd

## Características principales
- Cálculo de WPM en tiempo real.
- Seguimiento de precisión (accuracy).
- Modos por tiempo y por palabras.
- Temas personalizables (CSS).
- Estadísticas de progreso.
- Soporte para listas de palabras importadas.
- Componente de cursor que se posiciona sobre la letra activa.
- Enfoque automático y manejo del input para móvil y escritorio.

## Estado del proyecto
Proyecto en desarrollo (monkeytype-clone / v2). Funcionalidades base implementadas en `src/App.jsx` y componentes en `src/components/`. Existen áreas marcadas como TODO y problemas conocidos — consulte la sección "Problemas conocidos".

## Requisitos
- Node.js >= 16 (o LTS compatible)
- npm o yarn
- Windows (desarrollo probado en Windows, compatible con otros OS)

## Instalación y ejecución (Windows)
1. Clonar:
   git clone <repo>
2. Instalar dependencias:
   npm install
3. Levantar servidor de desarrollo:
   npm run dev
4. Construir para producción:
   npm run build

## Scripts útiles
- npm run dev — servidor de desarrollo
- npm run build — build de producción
- npm run preview — vista previa del build (si está configurado)

## Estructura del proyecto
- src/
  - App.jsx — lógica principal: estado del juego, carga de palabras, manejo de input, control de palabras/letters.
  - components/
    - CursorComponent.jsx — cursor que se mueve sobre la letra activa.
    - (otros componentes UI: Timer, Stats, Settings...)
  - styles/ — estilos globales y por componente.
  - contexts/ — (si existen) estado global / provider.
  - assets/ — listas de palabras y recursos.
- README.md — este archivo.

## Notas de implementación (puntos clave)
- Estado principal:
  - wordsData: array con objetos por palabra { id, word, letters: [{char, status, typed}], status, activeLetterIndex }.
  - importedWords: lista de palabras cargadas desde assets o API.
  - wordsList: subconjunto aleatorio según `gameOptions.words`.
  - typedWords: useRef para guardar las palabras tipeadas cuando se avanza.
  - inputRef: referencia al input oculto que recibe el texto.

- Manejo de input:
  - Se usan combinaciones de onChange (handleOnChange), onKeyDown (handleOnKeyDown) y onBeforeInput para mejorar compatibilidad móvil.
  - Recomendación: detectar espacio por value.endsWith(" ") en onChange / onInput y/o usar onBeforeInput.data === " " para móviles que no envían key === " " en keydown.

- CursorComponent:
  - Mide el ancho de palabra por getBoundingClientRect() y divide entre cantidad de letras para calcular ancho por carácter.
  - Se posiciona con transform: translateX(letterWidthPx * letterIndex).
  - Recomendación: usar fuente monospace para evitar discrepancias de anchura entre caracteres o medir cada letra (offsetWidth) si se usa variable-width.

## Problemas conocidos y soluciones recomendadas
1. Eventos de espacio en móviles Android
   - keydown no siempre reporta key === " " en teclados virtuales.
   - Solución: manejar espacio en onChange comprobando value.endsWith(" ") y/o usar onBeforeInput (event.data === " ") para interceptar el carácter antes de que llegue al input.

2. Cursor que se mueve demasiado en escritorio o insuficientemente en móvil
   - Causa común: cálculo de ancho por letra incorrecto cuando se incluyen márgenes, padding, letter-spacing o fuentes proporcionales.
   - Soluciones:
     - Preferible usar una fuente monospace (CSS: font-family: "Menlo", "Monaco", monospace) para que cada carácter tenga el mismo ancho.
     - Si no se puede cambiar la fuente: medir cada letra individualmente (element.offsetWidth de cada nodo de letra) y promediar o usar el offsetLeft del carácter objetivo.
     - En CursorComponent, calcular letterWidthPx con: sumar offsetWidth de cada nodo letra / número de letras, o usar rects de childNodes para mayor precisión.
     - Evitar suposiciones rígidas (ej.: 1em * factor) si el CSS en móviles puede modificar el tamaño de fuente por viewport o zoom.

3. Scroll/desplazamiento de palabras en móvil
   - Comportamiento distinto por el zoom y tamaño del viewport en navegadores móviles.
   - Recomendación:
     - Asegurarse que el contenedor tenga overflow visible/auto correcto y que el scroll se calcule usando scrollIntoView({ block: 'nearest', inline: 'center' }) sobre la palabra activa.
     - Evitar usar transform en elementos padres que alteren el contexto de scroll.
     - Usar scrollLeft calculado con getBoundingClientRect relativo al contenedor.

4. MaxLength del input
   - Se establece dinámicamente según la longitud de la palabra activa para evitar entradas extra; mantener actualizado en onChange.

## Consejos de depuración (móviles)
- Usar "Remote devices" de Chrome DevTools para depurar Android.
- Añadir logs puntuales: ancho calculado, rects, childNodes.length y offsets.
- Probar con y sin zoom / ajuste de texto en Android.
- Probar con fuentes monospace para confirmar si el problema es ancho variable.

## Buenas prácticas y TODOs
- Extraer lógica de reset de juego y manejo de input a custom hooks (por ejemplo useGame, useTypingInput) para evitar re-renderizados y centralizar la lógica.
- Implementar tests unitarios para funciones puras (getNewWordsList, initializeWordsData).
- Añadir manejo de accesibilidad (focus management y roles).
- Guardar estadísticas en localStorage y mostrar historial.

## Contribuir
1. Abrir un issue describiendo el bug o mejora.
2. Crear un branch con prefijo feature/ o fix/.
3. Hacer un PR con descripción clara y capturas si aplica.

## Licencia
MIT

## Contacto
Reporte problemas mediante issues en el repositorio.
