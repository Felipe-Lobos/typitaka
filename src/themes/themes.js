export const themes = {
  dark: {
    '--background-color': '#242424',
    '--text-color': '#d3d3d3',
    '--highlight-color': '#d2691e',
    '--error-color': '#cd5c5c',
    '--success-color': '#219ebc',
    '--secondary-text-color': '#808080',
  },
  light: {
    '--background-color': '#ffffff',
    '--text-color': '#333333',
    '--highlight-color': '#ff6600',
    '--error-color': '#ff3333',
    '--success-color': '#33cc33',
    '--secondary-text-color': '#666666',
  },
  dracula: {
    '--background-color': '#282a36',
    '--text-color': '#f8f8f2',
    '--highlight-color': '#bd93f9',
    '--error-color': '#ff5555',
    '--success-color': '#50fa7b',
    '--secondary-text-color': '#6272a4',
  },
  forest: {
    '--background-color': '#2e4a3b',
    '--text-color': '#dbe2e0',
    '--highlight-color': '#a3c9a8',
    '--error-color': '#e07a5f',
    '--success-color': '#a7c957',
    '--secondary-text-color': '#95afba',
  },
  ocean: {
    '--background-color': '#1b2b34',
    '--text-color': '#c0c5ce',
    '--highlight-color': '#6699cc',
    '--error-color': '#f07178',
    '--success-color': '#99c794',
    '--secondary-text-color': '#65737e',
  },
  material: {
    '--background-color': '#fafafa',
    '--text-color': '#212121',
    '--highlight-color': '#2196f3',
    '--error-color': '#f44336',
    '--success-color': '#4caf50',
    '--secondary-text-color': '#757575',
  },
  tokyoNeon: {
    '--background-color': '#000000',    // Fondo negro, inspirado en el vibrante Tokio de noche.
    '--text-color': '#ffffff',          // Texto blanco para alto contraste.
    '--highlight-color': '#00ffff',     // Cian neón, para un efecto futurista.
    '--error-color': '#ff073a',         // Rojo neón para errores.
    '--success-color': '#39ff14',       // Verde neón para éxito.
    '--secondary-text-color': '#cccccc',// Gris claro para detalles secundarios.
  },
  wabiSabi: {
    '--background-color': '#e9e2d0',    // Beige apagado, que refleja la simplicidad y la imperfección del wabi-sabi.
    '--text-color': '#4a403a',          // Marrón oscuro para un aspecto orgánico.
    '--highlight-color': '#d27a49',     // Naranja quemado, evocando tonos naturales y envejecidos.
    '--error-color': '#b0413e',         // Rojo apagado para errores.
    '--success-color': '#5e8c4d',       // Verde oliva, sutil y terroso.
    '--secondary-text-color': '#7d7d7d',// Gris medio para detalles secundarios.
  },
  darkContrast: { /* Tema Oscuro con Contraste Mejorado */
    '--background-color': '#181818',        /* Gris muy oscuro, casi negro (más claro que antes para contraste) */
    '--text-color': '#f8f9fa',             /* Blanco muy suave, casi blanco hueso */
    '--highlight-color': '#ffbb33',        /* Amarillo dorado, más cálido y contrastado */
    '--error-color': '#f2545b',            /* Rojo coral intenso */
    '--success-color': '#3cb371',          /* Verde mar brillante */
    '--secondary-text-color': '#adb5bd',   /* Gris medio claro, más oscuro que text-color para jerarquía */
  },

  bambooForest: { /* Tema Bosque de Bambú (Japonés) */
    '--background-color': '#f0f4f0',        /* Beige verdoso muy pálido, como papel arroz */
    '--text-color': '#2e4a3d',             /* Verde bosque muy oscuro, casi negro */
    '--highlight-color': '#9ccc65',        /* Verde lima suave, como brotes de bambú */
    '--error-color': '#ff7043',            /* Naranja terroso */
    '--success-color': '#4caf50',          /* Verde césped, vibrante y natural */
    '--secondary-text-color': '#43614c',   /* Verde musgo oscuro, tenue y natural */
  },
  indigoInk: { /* Tema Tinta Índigo (Japonés) */
    '--background-color': '#f8f8ff',        /* Blanco lavanda pálido */
    '--text-color': '#1a237e',             /* Azul índigo muy oscuro, profundo y rico */
    '--highlight-color': '#3f51b5',        /* Azul índigo medio, para acentos */
    '--error-color': '#ff6f61',            /* Salmón, para contraste cálido */
    '--success-color': '#26a69a',          /* Verde azulado, sofisticado */
    '--secondary-text-color': '#3949ab',   /* Azul índigo más claro, tenue y elegante */
  },
  cyberpunk: { /* Tema Cyberpunk (Contraste Intenso y Neón) */
    '--background-color': '#000000',        /* Negro puro */
    '--text-color': '#e0e0e0',             /* Gris muy claro, casi blanco */
    '--highlight-color': '#ff4081',        /* Rosa neón, vibrante y futurista */
    '--error-color': '#ff6f00',            /* Naranja eléctrico */
    '--success-color': '#00ffc4',          /* Turquesa neón brillante */
    '--secondary-text-color': '#616161',   /* Gris oscuro, tenue pero legible contra el negro */
  },
  midnightCity: { /* Tema Ciudad Medianoche (Azules Oscuros y Luces Urbanas) */
    '--background-color': '#121a2b',        /* Azul noche muy oscuro, casi negro */
    '--text-color': '#cfd8dc',             /* Gris azulado muy claro */
    '--highlight-color': '#90caf9',        /* Azul cielo claro, luces de ciudad */
    '--error-color': '#f48fb1',            /* Rosa neón suave, luces de neón urbanas */
    '--success-color': '#a5d6a7',          /* Verde menta suave, luces de edificios */
    '--secondary-text-color': '#546e7a',   /* Gris azulado oscuro, tenue y nocturno */
  },
  forestTwilight: { /* Tema Crepúsculo en el Bosque (Tonos Profundos y Místicos) */
    '--background-color': '#263238',        /* Gris azulado muy oscuro, profundo como la noche */
    '--text-color': '#eceff1',             /* Gris muy claro, casi blanco como la luna */
    '--highlight-color': '#90a4ae',        /* Gris azulado medio, misterioso y suave */
    '--error-color': '#e57373',            /* Rojo suave, como el último resplandor del sol */
    '--success-color': '#80cbc4',          /* Verde azulado pálido, mágico y etéreo */
    '--secondary-text-color': '#607d8b',   /* Gris azulado medio oscuro, tenue y profundo */
  },
  sakuraLight: {
    '--background-color': '#fff0f6', // Un rosa muy pálido, evocando la delicadeza de los cerezos en flor
    '--text-color': '#4a4a4a',         // Gris oscuro para un buen contraste
    '--highlight-color': '#ff7eb9',    // Un rosa vibrante, similar al color de la flor de cerezo
    '--error-color': '#ff4d4d',        // Rojo brillante para errores
    '--success-color': '#6fae6f',      // Verde suave, armonioso y calmado
    '--secondary-text-color': '#808080'// Gris medio, para información secundaria sin robar protagonismo
  },
  sakuraDark: {
    '--background-color': '#2d1a22',   // Un fondo oscuro con un toque purpúreo, evocando la noche
    '--text-color': '#e7dcdc',         // Texto claro para resaltar sobre el fondo oscuro
    '--highlight-color': '#ff7eb9',    // Se mantiene el rosa vibrante, para resaltar acentos
    '--error-color': '#ff6666',        // Rojo un poco más suave para errores en modo oscuro
    '--success-color': '#80c080',      // Verde brillante, adaptado para resaltar sobre fondo oscuro
    '--secondary-text-color': '#b2a6a6' // Gris claro para detalles secundarios
  }
};


