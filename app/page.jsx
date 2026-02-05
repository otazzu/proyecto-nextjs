'use client'

import { useState, useEffect } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'

export default function ListaCompraPage() {
  const [items, setItems] = useLocalStorage('listaActual', [])
  const [newItem, setNewItem] = useState('')
  const [mounted, setMounted] = useState(false)
  const [historial, setHistorial] = useLocalStorage('listaHistorial', [])
  const [faltantes, setFaltantes] = useLocalStorage('listaFaltantes', [])

   useEffect(() => {
    setMounted(true)
  }, [])

  const addItem = () => {
    if (newItem.trim() === '') return
    
    const item = {
      id: crypto.randomUUID(),
      name: newItem,
      tachado: false
      
    }
    setItems([...items, item])
    setNewItem('')
    
  }

  const toggleTachado = (id) => {
    const upadatedItems = items.map(item => {
      if (item.id === id) {
        return { ...item, tachado: !item.tachado }
      }
      return item
    })
    setItems(upadatedItems) 
  }

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  const resetList = () => {
    setItems([])
  }

  const submitHandler = () => {

    if (items.length === 0) return

    const comprados = items.filter(item => item.tachado)
    const noComprados = items.filter(item => !item.tachado)

    if (noComprados.length > 0) {
    setFaltantes([...faltantes, { 
      id: crypto.randomUUID(),
      date: new Date().toISOString(), 
      items: noComprados 
    }])
  }
  
  if (comprados.length > 0) {
    setHistorial([...historial, { 
      id: crypto.randomUUID(),
      date: new Date().toISOString(), 
      items: comprados 
    }])
  }
    setItems([])
  }

  if (!mounted) {
    return (
      <main className="min-h-screen p-8">
          <p className="text-center text-gray-400">Cargando...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            📝 Lista de Compra
          </h1>

          {/* Formulario */}
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addItem()}
              placeholder="Nombre del producto..."
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            
            <button
              onClick={addItem}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Añadir
            </button>
          </div>

          {/* Lista */}
          <div className="space-y-3">
            {items.length === 0 ? (
              <p className="text-center text-gray-400 py-8">
                No hay productos. ¡Añade uno para empezar!
              </p>
            ) : (
              items.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition"
                >
                  <div 
                  className='flex items-center gap-3 flex-1 cursor-pointer'
                  onClick={()=> toggleTachado(item.id)}
                  >
                    {item.tachado && (
                      <span className='text-green-500 text-xl'>✓</span>
                    )}

                    <span className={`font-medium text-gray-800 ${
                      item.tachado ? 'line-through text-gray-400' : ''
                    }`}>
                      {item.name}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              ))
            )}
          </div>
          <div className='flex flex-col md:flex-row justify-center gap-3 mb-6'>
            <button 
              className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
              onClick={submitHandler}
            >
                Hecho
            </button>
            <button 
              className="mt-4 bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition font-semibold"
              onClick={resetList}
            >
                Resetear lista
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}