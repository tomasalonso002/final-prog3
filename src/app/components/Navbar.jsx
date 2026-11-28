'use client'

import Link from "next/link"


export default function Navbar(){
    const login = true

    return(
        <>
        <nav className="flex justify-center gap-3">
            <div>
                <Link href={'/inicio'}>Inicio</Link>
            </div>
            <div>
                <Link href={'/productos'}>Productos</Link>
            </div>
            {login ? (
                <div  className="flex justify-center gap-3">
                    <div>
                        <p>Hola Tomas</p>
                    </div>
                    <div>
                        <Link href={'/inicio'}>Cerrar Sesion</Link>
                    </div>
                </div>
                ):(
                <div>
                    <div>
                        <Link href={'/inicio'}>Iniciar Sesion</Link>
                    </div>
                    <div>
                        <Link href={'/inicio'}>Registrarse</Link>
                    </div>
                </div>
            )}
        
        </nav>
    </>
    )
}