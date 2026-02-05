'use client'

import { useState, useEffect, use } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useRouter } from 'next/navigation'

export default function FaltantesPage() {

  const [faltantes, setFaltantes] = useLocalStorage('listaFaltantes', [])
  const [listaActual, setListaActual] = useLocalStorage('listaActual', [])
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const formatearFecha = (isoString) => {
    const fecha = new Date(isoString)
    
    const dia = String(fecha.getDate()).padStart(2, '0')
    const mes = String(fecha.getMonth() + 1).padStart(2, '0')
    const año = fecha.getFullYear()
    
    return `${dia}/${mes}/${año}`
  }

  const retomarFaltantes = (tarjeta) => {
    const comprarFaltantes = tarjeta.items.map(item => ({
      id: crypto.randomUUID(),
      name: item.name,
      tachado: false
    }))
    setFaltantes(faltantes.filter(item => item.id !== tarjeta.id))
    setListaActual(comprarFaltantes)
    router.push('/')

  }

  if (!mounted) {
    return (
      <main className="min-h-screen p-8">
        <p className="text-center text-white">Cargando...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            ⚠️ Productos Faltantes
          </h1>
          {faltantes.length === 0 ? (
            <p className="text-center text-gray-400 text-lg">
              No hay productos faltantes por ahora.
            </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faltantes.map(tarjeta => (
              <div
                key={tarjeta.id}
                onClick={ () => retomarFaltantes(tarjeta)}
                className="border-l-4 p-6 rounded-lg shadow-md hover:shadow-xl transition cursor-pointer"
              >
                <ul className="space-y-1">
                  {tarjeta.items.map((item, index) => (
                    <li key={index}>
                      {item.name}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-600 mb-3">
                  📅 Fecha compra: {formatearFecha(tarjeta.date)}
                </p>
              </div>
            ))}
        </div>
        )} 
        </div>
      </div>
    </main>
  )
}