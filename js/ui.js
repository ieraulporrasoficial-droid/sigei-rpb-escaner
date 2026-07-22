function renderizarAplicacion() {

  aplicarTema();

  renderizarEncabezado();

  renderizarContenido();

  mostrarAplicacion();

}

function renderizarContenido() {

  const app = document.getElementById("app");

  app.insertAdjacentHTML(
    "beforeend",
    `
      <main id="contenidoPrincipal">

      </main>
    `
  );

}


function renderizarEncabezado() {

  const configuracion = SIGEI.CONFIG?.datos;

  if (!configuracion) {
    return;
  }

  construirEncabezado(configuracion);

}


function construirEncabezado(configuracion) {

  const app = document.getElementById("app");

  app.innerHTML = `
    <header class="encabezado-institucional">

      <div class="encabezado-logo">

        ${
          configuracion.logo
            ? `
              <img
                src="${configuracion.logo}"
                alt="Logo institucional"
                class="logo-institucional"
              >
            `
            : ""
        }

      </div>

      <div class="encabezado-informacion">

        <h1 class="encabezado-titulo">
          ${configuracion.nombreSistema || "SIGEI-RPB"}
        </h1>

        <p class="encabezado-institucion">
          ${configuracion.nombreInstitucion || ""}
        </p>

        <p class="encabezado-lema">
          ${configuracion.lema || ""}
        </p>

      </div>

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
