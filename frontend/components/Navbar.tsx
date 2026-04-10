'use client'


import Link from 'next/link'


export default function Navbar() {
return (
<header className="w-full bg-white shadow">
<div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="w-10 h-10 rounded-full bg-fuchsia-600" />
<span className="font-bold text-fuchsia-600">WILS</span>
</div>


<nav className="hidden md:flex gap-6 text-sm font-medium">
<Link href="/">Inicio</Link>
<Link href="/decorations">Decoraciones</Link>
<Link href="/services">Servicios</Link>
<Link href="/gallery">Galería</Link>
<Link href="/contact">Contacto</Link>
</nav>


<Link
href="/login"
className="bg-fuchsia-600 text-white px-4 py-2 rounded-lg text-sm"
>
Reservar ahora
</Link>
</div>
</header>
)
}