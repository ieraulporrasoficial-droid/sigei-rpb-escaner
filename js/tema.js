const TEMAS = {

  institucional(colores) {

    const principal =
      colores.principal || "#0FA958";

    document.documentElement.style.setProperty(
      "--fondo-encabezado-completo",
      principal
    );

  },

  tecnologia(colores) {

    const principal =
      colores.principal || "#0FA958";

    const secundario =
      colores.secundario || "#FFD600";

    const fondoTecnologico = `
      linear-gradient(
        rgba(255, 255, 255, 0.08) 1px,
        transparent 1px
      ),
      linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.08) 1px,
        transparent 1px
      ),
      radial-gradient(
        circle at 15% 25%,
        ${secundario}55 0 3px,
        transparent 4px
      ),
      radial-gradient(
        circle at 85% 70%,
        ${secundario}55 0 3px,
        transparent 4px
      ),
      linear-gradient(
        135deg,
        ${principal} 0%,
        #087A48 52%,
        #043F2A 100%
      )
    `;

    document.documentElement.style.setProperty(
      "--fondo-encabezado-completo",
      fondoTecnologico
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

document.documentElement.setAttribute(
  "data-tema",
  nombreTema
);
