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


async function cargarConfiguracion() {

  try {

    const respuesta = await fetch(
      SIGEI.API.BASE +
      SIGEI.API.CONFIGURACION
    );

    if (!respuesta.ok) {
      throw new Error(
        `Error HTTP: ${respuesta.status}`
      );
    }

    const datos = await respuesta.json();

    if (!datos.exito) {
      throw new Error(
        "La API no devolvió una respuesta exitosa."
      );
    }

    SIGEI.CONFIG = datos;

    console.log(
      "Configuración recibida:",
      datos
    );

    renderizarAplicacion();

  } catch (error) {

    console.error(
      "Error al cargar la configuración:",
      error
    );

    SIGEI.ESTADO.error = error;

  }

}


function renderizarAplicacion() {

  aplicarTema();
  renderizarEncabezado();
  mostrarAplicacion();

}


function aplicarTema() {

  const configuracion = SIGEI.CONFIG?.datos;

  if (!configuracion?.colores) {
    return;
  }

  const colores = configuracion.colores;

  document.documentElement.style.setProperty(
    "--color-principal",
    colores.principal || "#0FA958"
  );

  document.documentElement.style.setProperty(
    "--color-secundario",
    colores.secundario || "#FFD600"
  );

  document.documentElement.style.setProperty(
    "--color-fondo",
    colores.fondo || "#FFFFFF"
  );

  document.documentElement.style.setProperty(
    "--color-texto",
    colores.texto || "#222222"
  );

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
