export default function HistorialPage() {
  const compras = [
    { 
      id: 1, 
      date: '2024-02-01', 
      items: ['Leche', 'Pan', 'Huevos'], 
    },
    { 
      id: 2, 
      date: '2024-01-28', 
      items: ['Queso', 'Jamón', 'Yogur'], 
    },
    { 
      id: 3, 
      date: '2024-01-25', 
      items: ['Arroz', 'Pasta', 'Aceite', 'Tomate'], 
    },
  ]

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            📊 Historial de Compras
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {compras.map(compra => (
              <div
                key={compra.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-6 border-t-4 border-blue-500"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-semibold">Fecha</p>
                    <p className="text-lg font-bold text-gray-800">{compra.date}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Productos ({compra.items.length}):
                  </p>
                  <ul className="space-y-1">
                    {compra.items.map((item, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
