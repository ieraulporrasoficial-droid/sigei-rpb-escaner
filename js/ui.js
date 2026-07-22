function renderizarAplicacion() {

  aplicarTema();
  renderizarEncabezado();
  renderizarContenido();
  mostrarAplicacion();

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
    <section class="portada-institucional">

      <div
        class="decoracion-tecnologica"
        aria-hidden="true"
      ></div>

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

          <p class="encabezado-etiqueta">
            Sistema Integral de Gestión Educativa
          </p>

          <h1 class="encabezado-titulo">
            ${configuracion.nombreSistema || "SIGEI-RPB"}
          </h1>

          <p class="encabezado-institucion">
            ${configuracion.nombreInstitucion || ""}
          </p>

          <div
            class="encabezado-separador"
            aria-hidden="true"
          ></div>

         <p class="encabezado-lema">
  ${configuracion.eslogan || configuracion.lema || ""}
</p>

        </div>

      </header>

    </section>
  `;

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


function mostrarAplicacion() {

  const loader =
    document.getElementById("loader");

  const app =
    document.getElementById("app");

  loader.style.display = "none";
  app.style.display = "block";

  app.setAttribute(
    "aria-hidden",
    "false"
  );

  SIGEI.ESTADO.iniciado = true;

}
