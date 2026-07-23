function renderizarAplicacion() {

  aplicarTema();

  renderizarEncabezado();

  renderizarContenido();

  renderizarModulos();

  mostrarAplicacion();

}


function renderizarEncabezado() {

  const configuracion = SIGEI.CONFIG?.datos;

  if (!configuracion) {
    return;
  }

  construirEncabezado(configuracion);

}

function renderizarModulos() {

  const contenedor =
    document.querySelector(".modulos-grid");

  if (!contenedor) {

    console.error(
      "No se encontró el contenedor .modulos-grid"
    );

    return;

  }

  if (
    !Array.isArray(SIGEI.MODULOS) ||
    SIGEI.MODULOS.length === 0
  ) {

    contenedor.innerHTML = `
      <p class="modulos-vacios">
        No hay módulos disponibles.
      </p>
    `;

    return;

  }

  contenedor.innerHTML =
    SIGEI.MODULOS
      .map(modulo => {

        const activo =
          modulo.estado === "ACTIVO";

        const urlValida =
          modulo.url &&
          modulo.url !== "vacío";

        return `
          <article class="tarjeta-modulo ${
            activo
              ? ""
              : "tarjeta-modulo-proximamente"
          }">

            <div
              class="tarjeta-modulo-icono"
              aria-hidden="true"
            >
              <span class="material-symbols-rounded">
                ${modulo.icono || "apps"}
              </span>
            </div>

            <div class="tarjeta-modulo-contenido">

              ${
                activo
                  ? ""
                  : `
                    <div class="tarjeta-modulo-estado">
                      Próximamente
                    </div>
                  `
              }

              <h3 class="tarjeta-modulo-titulo">
                ${modulo.nombre}
              </h3>

              <p class="tarjeta-modulo-descripcion">
                ${modulo.descripcion || ""}
              </p>

            </div>

            ${
              activo && urlValida
                ? `
                  <a
                    class="tarjeta-modulo-enlace"
                    href="${modulo.url}"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ingresar
                  </a>
                `
                : `
                  <span
                    class="tarjeta-modulo-enlace
                           tarjeta-modulo-enlace-inactivo"
                  >
                    No disponible
                  </span>
                `
            }

          </article>
        `;

      })
      .join("");

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

        <section class="seccion-modulos">

         <div class="seccion-modulos-encabezado">

  <p class="seccion-modulos-etiqueta">
    Plataforma institucional
  </p>

  <h2 class="seccion-modulos-titulo">
    Módulos disponibles
  </h2>

  <p class="seccion-modulos-descripcion">
    Selecciona el servicio institucional que deseas utilizar.
  </p>

</div>

<div class="rejilla-modulos modulos-grid"></div>

</section>

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
