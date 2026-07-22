const SIGEI = {

  API: {

    BASE:
      "https://script.google.com/macros/s/AKfycbzt8cODEG3Yivg_-RT9CegcHFc3mpJGwX9aOnJQ1OIiqBQxfwAHtcwb3TljtxLQBdH0/exec",

    CONFIGURACION:
      "?api=configuracion"

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


function renderizarAplicacion() {

  aplicarTema();
  renderizarEncabezado();
  mostrarAplicacion();

}


function renderizarEncabezado() {

  const configuracion = SIGEI.CONFIG?.datos;

  if (!configuracion) {
    return;
  }

  const app = document.getElementById("app");

  app.innerHTML = `
    <header>
      <h1>${configuracion.nombreSistema || "SIGEI-RPB"}</h1>
      <p>${configuracion.nombreInstitucion || ""}</p>
      <p>${configuracion.lema || ""}</p>
    </header>
  `;

}


function mostrarAplicacion() {

  const loader = document.getElementById("loader");
  const app = document.getElementById("app");

  loader.style.display = "none";
  app.style.display = "block";

  app.setAttribute(
    "aria-hidden",
    "false"
  );

  SIGEI.ESTADO.iniciado = true;

}


console.log(
  "SIGEI-RPB iniciado."
);

cargarConfiguracion();
