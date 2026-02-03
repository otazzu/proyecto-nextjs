export default function FaltantesPage() {
  const faltantes = [
    { id: 1, name: ['Huevos', 'Leche', 'Patatas'], lastBought: '24/05/2025'},
    { id: 2, name: ['Filetes', 'Refresco'], lastBought: '02/06/2025'}
  ]

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            ⚠️ Productos Faltantes
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faltantes.map(item => (
              <div
                key={item.id}
                className="border-l-4 p-6 rounded-lg shadow-md hover:shadow-xl transition"
              >
                <ul className="space-y-1">
                  {item.name.map((nombre, index) => (
                    <li key={index}>
                      {nombre}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-600 mb-3">
                  📅 Última compra: {item.lastBought}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}