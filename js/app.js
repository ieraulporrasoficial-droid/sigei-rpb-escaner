const SIGEI = {

  API: {

    BASE:
      "https://script.google.com/macros/s/AKfycbzt8cODEG3Yivg_-RT9CegcHFc3mpJGwX9aOnJQ1OIiqBQxfwAHtcwb3TljtxLQBdH0/exec",

   CONFIGURACION:
      "?api=configuracion",
      
    MODULOS:
  "?api=modulos"

  },

  VERSION:
    "1.0.0",

  CONFIG:
    null,

  MODULOS:
    [],

  ESTADO: {

    iniciado:
      false,

    error:
      null

  }

};

console.log(
  "SIGEI-RPB iniciado."
);

cargarConfiguracion();
