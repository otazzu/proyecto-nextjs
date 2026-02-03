'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const isActive = (path) => pathname === path

  return (
      <nav className='flex justify-center space-x-8'>
        <Link
          href="/"
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            isActive('/')
              ? 'bg-white text-blue-600 shadow-md'
              : 'text-white hover:bg-amber-400'
          }`}
        >
          📝 Lista de Compra
        </Link>

        <Link
          href="/faltantes"
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            isActive('/faltantes')
              ? 'bg-white text-blue-600 shadow-md'
              : 'text-white hover:bg-amber-400'
          }`}
        >
          ⚠️ Faltantes
        </Link>

        <Link
          href="/historial"
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            isActive('/historial')
              ? 'bg-white text-blue-600 shadow-md'
              : 'text-white hover:bg-amber-400'
          }`}
        >
          📊 Historial
        </Link>

      </nav>
  )
}