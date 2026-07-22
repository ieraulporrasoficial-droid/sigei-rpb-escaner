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
