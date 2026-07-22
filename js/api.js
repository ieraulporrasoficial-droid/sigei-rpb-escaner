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


async function cargarModulos() {

  try {

   const respuesta = await fetch(
  SIGEI.API.BASE +
  SIGEI.API.MODULOS +
  "&t=" +
  Date.now(),
  {
    cache: "no-store"
  }
);

    if (!respuesta.ok) {
      throw new Error(
        `Error HTTP al cargar módulos: ${respuesta.status}`
      );
    }

    const datos = await respuesta.json();

    if (!datos.exito) {
      throw new Error(
        datos.mensaje ||
        "La API de módulos no devolvió una respuesta exitosa."
      );
    }

    SIGEI.MODULOS =
      Array.isArray(datos.datos)
        ? datos.datos
        : [];

    console.log(
      "Módulos recibidos:",
      SIGEI.MODULOS
    );

  } catch (error) {

    console.error(
      "Error al cargar los módulos:",
      error
    );

    SIGEI.MODULOS = [];
    SIGEI.ESTADO.error = error;

  }

}
