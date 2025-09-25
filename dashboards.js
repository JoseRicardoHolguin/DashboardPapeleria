// ============================
// Leer CSV de ventas
function cargarVentas(callback) {
  Papa.parse("data/ventas.csv", {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: function(results) {
      callback(results.data);
    }
  });
}

// Leer CSV de inventario
function cargarInventario(callback) {
  Papa.parse("data/inventario.csv", {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: function(results) {
      callback(results.data);
    }
  });
}

// ============================
// Gráficos usando CSV
function renderVentas() {
  cargarVentas(function(ventas){
    const ventasPorFecha = {};
    ventas.forEach(v => {
      ventasPorFecha[v.fecha] = (ventasPorFecha[v.fecha] || 0) + v.total;
    });

    const fechas = Object.keys(ventasPorFecha);
    const totales = Object.values(ventasPorFecha);

    new Chart(document.getElementById("tendenciaVentas"), {
      type: "line",
      data: {
        labels: fechas,
        datasets: [{
          label: "Ventas diarias ($)",
          data: totales,
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
  });
}

function renderCategorias() {
  cargarVentas(function(ventas){
    const categoriaTotales = {};
    ventas.forEach(v => {
      categoriaTotales[v.categoria] = (categoriaTotales[v.categoria] || 0) + v.total;
    });

    new Chart(document.getElementById("categoriasProductos"), {
      type: "pie",
      data: {
        labels: Object.keys(categoriaTotales),
        datasets: [{
          data: Object.values(categoriaTotales),
          backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0", "#9966ff", "#ff9f40"]
        }]
      },
      options: {
        plugins: { title: { display: true, text: "Ingresos por categoría (Jul–Sep 2024)" } }
      }
    });
  });
}

function renderMargenes() {
  cargarInventario(function(inventario){
    const labels = inventario.map(p => p.producto);
    const margenes = inventario.map(p => ((p.precio_venta - p.precio_compra)/p.precio_compra*100).toFixed(1));

    new Chart(document.getElementById("margenesGanancia"), {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "Margen de ganancia (%)",
          data: margenes,
          backgroundColor: "#36a2eb"
        }]
      },
      options: {
        indexAxis: 'y',
        plugins: { title: { display: true, text: "Márgenes de ganancia por producto" } },
        scales: { x: { beginAtZero: true } }
      }
    });
  });
}

function renderEmpleados() {
  cargarVentas(function(ventas){
    const vendedores = {};
    ventas.forEach(v => {
      if(!vendedores[v.vendedor]) vendedores[v.vendedor] = {};
      vendedores[v.vendedor][v.metodo_pago] = (vendedores[v.vendedor][v.metodo_pago] || 0) + v.total;
    });

    const metodos = [...new Set(ventas.map(v => v.metodo_pago))];
    const datasets = Object.keys(vendedores).map((vendedor, i) => ({
      label: vendedor,
      data: metodos.map(m => vendedores[vendedor][m] || 0),
      backgroundColor: i % 2 === 0 ? "#4bc0c0" : "#ffcd56"
    }));

    new Chart(document.getElementById("empleadosVentas"), {
      type: "bar",
      data: { labels: metodos, datasets: datasets },
      options: { plugins: { title: { display: true, text: "Comparación de ventas por método de pago" } }, scales: { y: { beginAtZero: true } } }
    });
  });
}

function renderInventario() {
  cargarInventario(function(inventario){
    // Mostrar todos los productos, no solo los de bajo stock
    const labels = inventario.map(p => p.producto);
    const stockActual = inventario.map(p => p.stock_actual);
    const stockMinimo = inventario.map(p => p.stock_minimo);

    new Chart(document.getElementById("alertasInventario"), {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          { label: "Stock actual", data: stockActual, backgroundColor: "#ff6384" },
          { label: "Stock mínimo", data: stockMinimo, backgroundColor: "#36a2eb" }
        ]
      },
      options: { plugins: { title: { display: true, text: "Inventario y stock mínimo por producto" } }, scales: { y: { beginAtZero: true } } }
    });
  });
}
