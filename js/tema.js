function aplicarTema() {

  const configuracion = SIGEI.CONFIG?.datos;

  if (!configuracion) {
    return;
  }

  const colores =
    configuracion.colores || {};

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

  const nombreTema =
    configuracion.temaVisual || "institucional";

  document.documentElement.setAttribute(
    "data-tema",
    nombreTema
  );

}
