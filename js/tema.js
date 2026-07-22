const TEMAS = {

  institucional(colores) {

    document.documentElement.style.setProperty(
      "--fondo-encabezado",
      colores.principal || "#0FA958"
    );

    document.documentElement.style.setProperty(
      "--imagen-encabezado",
      "none"
    );

  },

  tecnologia(colores) {

    const principal =
      colores.principal || "#0FA958";

    const secundario =
      colores.secundario || "#FFD600";

    document.documentElement.style.setProperty(
      "--fondo-encabezado",
      `linear-gradient(
        135deg,
        ${principal} 0%,
        #087A48 55%,
        #043F2A 100%
      )`
    );

    document.documentElement.style.setProperty(
      "--imagen-encabezado",
      `
        linear-gradient(
          rgba(255, 255, 255, 0.05) 1px,
          transparent 1px
        ),
        linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.05) 1px,
          transparent 1px
        ),
        radial-gradient(
          circle at 15% 25%,
          ${secundario}33 0 2px,
          transparent 3px
        ),
        radial-gradient(
          circle at 85% 70%,
          ${secundario}33 0 2px,
          transparent 3px
        )
      `
    );

  }

};


function aplicarTema() {

  const configuracion =
    SIGEI.CONFIG?.datos;

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

  const tema =
    TEMAS[nombreTema] ||
    TEMAS.institucional;

  tema(colores);

}
