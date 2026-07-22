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
