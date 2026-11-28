import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getToken() {
  return (await cookies()).get("access")?.value;
}

export async function requireToken() {
  const token = await getToken();
  if (!token) redirect("/login");
  return token;
}


//decodifica el JWT para leer el grupo (Cliente / Vendedor)
export async function getUser() {
  const token = await getToken();
  if (!token) return null; // No está logueado

  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64url").toString("utf-8")
    );
    return payload; // Devuelve el objeto con user_id, username,grupo
  } catch {
    return null;
  }
}