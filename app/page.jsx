'use client'

import { useState } from 'react'

export default function ListaCompraPage() {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')

  const addItem = () => {
    if (newItem.trim() === '') return
    
    const item = {
      id: Date.now(),
      name: newItem,
      
    }
    setItems([...items, item])
    setNewItem('')
    
  }

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            📝 Lista de Compra
          </h1>

          {/* Formulario */}
          <div className="flex gap-3 mb-6">
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
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-800">{item.name}</span>
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
          <div className='flex justify-center'>
            <button 
              className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
            >
                Hecho
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}