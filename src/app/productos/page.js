import { getProductos } from "@/lib/api";

import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function ProductosPage() {
  const user = await getUser();

  let datos = null;
  let error = null;

  if (!user) redirect("/login");
  
  try {
    // Se ejecuta en el servidor, lee la cookie de auth.js y llama a Django
    datos = await getProductos();
  } catch (err) {
    error = err.message;
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "monospace" }}>
      <h1>Prueba de conexión Django + Next.js</h1>

      {error && (
        <p style={{ color: "red" }}>
          <strong>Falló:</strong> {error}
        </p>
      )}

      {datos && (
        <pre style={{ background: "#111", color: "#0f0", padding: "1rem" }}>
          {JSON.stringify(datos, null, 2)}
        </pre>
      )}
    </div>
  );
}