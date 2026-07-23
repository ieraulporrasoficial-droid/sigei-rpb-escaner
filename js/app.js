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

async function iniciarAplicacion() {

  await cargarConfiguracion();
  await cargarModulos();

  renderizarAplicacion();

}

iniciarAplicacion();

if ("serviceWorker" in navigator) {

  window.addEventListener("load", async () => {

    try {

      const registro = await navigator.serviceWorker.register(
        "./service-worker.js"
      );

      console.log(
        "Service Worker registrado correctamente:",
        registro.scope
      );

    } catch (error) {

      console.error(
        "No se pudo registrar el Service Worker:",
        error
      );

    }

  });

}
