'use client'

import { useState, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useRouter } from 'next/navigation'

export default function HistorialPage() {

  const [historial, setHistorial] = useLocalStorage('listaHistorial', [])
  const [listaActual, setListaActual] = useLocalStorage('listaActual', [])
  const [mounted, setMounted] = useState(false)
  const [showDeleteBtn, setShowDeleteBtn] = useState(null)
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

  const repetirCompra = (compra) => {
    const nuevaLista = compra.items.map(item => ({
      id: crypto.randomUUID(),
      name: item.name,
      tachado: false
    }))
    setListaActual(nuevaLista)
    router.push('/')
  }

  const deleteHistorial = (id) => {
    setHistorial(historial.filter(item => item.id !== id))
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
            📊 Historial de Compras
          </h1>
          {historial.length === 0 ? (
            <p className="text-center text-gray-400 text-lg">
              No hay compras en el historial todavía.
            </p>
      ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {historial.map(compra => (
              <div
                onMouseEnter={() => setShowDeleteBtn(compra.id)}
                onMouseLeave={() => setShowDeleteBtn(null)}
                key={compra.id}
                onClick={() => repetirCompra(compra)}
                className="relative bg-white rounded-lg shadow-md hover:shadow-xl transition p-6 border-t-4 border-blue-500 cursor-pointer"
                >
                {/* Fecha y cantidad de items */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-semibold">Fecha</p>
                    <p className="text-lg font-bold text-gray-800">
                      {formatearFecha(compra.date)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 uppercase font-semibold">Items</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {compra.items.length}
                    </p>
                  </div>
                </div>

                {/* Lista de productos */}
                <div className="border-t pt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Productos comprados:
                  </p>
                  <ul className="space-y-1">
                    {compra.items.map((item) => (
                      <li key={item.id} className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
                {showDeleteBtn === compra.id && (
                  <span 
                    className='absolute bottom-2 right-2 text-red-500 text-2xl p-2 rounded-md hover:bg-red-600 hover:text-white'
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteHistorial(compra.id)
                    }}
                    >
                      ✘
                  </span>
                )}
              </div>
            ))}
          </div>
          )}
        </div>
      </div>
    </main>
  )
}
