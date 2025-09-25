// ============================
// Pregunta 1: Tendencia Ventas
// ============================
function renderVentas() {
  new Chart(document.getElementById("tendenciaVentas"), {
    type: "line",
    data: {
      labels: ["01-Jul", "15-Jul", "01-Ago", "15-Ago", "01-Sep", "15-Sep", "30-Sep"],
      datasets: [{
        label: "Ventas diarias ($)",
        data: [1200, 1400, 5000, 6200, 3100, 2800, 2600],
        borderColor: "#36a2eb",
        backgroundColor: "rgba(54,162,235,0.2)",
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      plugins: { title: { display: true, text: "Tendencia de ventas (Jul–Sep 2024)" } },
      scales: { y: { beginAtZero: true } }
    }
  });
}

// ============================
// Pregunta 2: Categorías
// ============================
function renderCategorias() {
  new Chart(document.getElementById("categoriasProductos"), {
    type: "pie",
    data: {
      labels: ["Escolar", "Oficina", "Arte", "Tecnología"],
      datasets: [{
        data: [25000, 12000, 8000, 5000],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0"]
      }]
    },
    options: {
      plugins: { title: { display: true, text: "Ingresos por categoría (Jul–Sep 2024)" } }
    }
  });
}

// ============================
// Pregunta 3: Márgenes
// ============================
function renderMargenes() {
  new Chart(document.getElementById("margenesGanancia"), {
    type: "bar",
    data: {
      labels: ["Cuadernos", "Plumas", "Lápices", "Hojas", "Calculadoras"],
      datasets: [{
        label: "Margen de ganancia (%)",
        data: [40, 35, 25, 20, 50],
        backgroundColor: ["#36a2eb", "#36a2eb", "#36a2eb", "#36a2eb", "#ff6384"]
      }]
    },
    options: {
      indexAxis: 'y',
      plugins: { title: { display: true, text: "Márgenes de ganancia (Jul–Sep 2024)" } },
      scales: { x: { beginAtZero: true, max: 60 } }
    }
  });
}

// ============================
// Pregunta 4: Empleados
// ============================
function renderEmpleados() {
  new Chart(document.getElementById("empleadosVentas"), {
    type: "bar",
    data: {
      labels: ["Efectivo", "Tarjeta"],
      datasets: [
        {
          label: "María",
          data: [9000, 6000],
          backgroundColor: "#4bc0c0"
        },
        {
          label: "Carlos",
          data: [3600, 8400],
          backgroundColor: "#ffcd56"
        }
      ]
    },
    options: {
      plugins: { title: { display: true, text: "Comparación de ventas por método de pago" } },
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });
}

// ============================
// Pregunta 5: Inventario
// ============================
function renderInventario() {
  new Chart(document.getElementById("alertasInventario"), {
    type: "bar",
    data: {
      labels: ["Cuadernos", "Plumas", "Hojas"],
      datasets: [{
        label: "Stock actual",
        data: [80, 150, 300],
        backgroundColor: "#ff6384"
      },
      {
        label: "Stock mínimo",
        data: [100, 200, 500],
        backgroundColor: "#36a2eb"
      }]
    },
    options: {
      plugins: { title: { display: true, text: "Productos con stock bajo (Jul–Sep 2024)" } },
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });
}
