import { getToken } from "@/lib/auth";

export const API_URL = process.env.NEXT_PUBLIC_API_URL


export const ENDPOINTS = {
    
    //Authentication
    login:"api/token/",
    refresh:"api/token/refresh/",
    
    //Usuarios
    cliente: "api/usuarios/cliente/",
    clienteGet: "api/usuarios/cliente-get/",
    vendedor: "api/usuarios/vendedor/",
    vendedorGet:"api/usuarios/vendedor-get/",
    listaDeseos:"api/usuarios/lista-deseos/",
    listaDeseosGet:"api/usuarios/lista-deseos-get/",

    //Catalogo
    categorias: "api/catalogo/categoria/",
    categoriasGet: "api/catalogo/categoria-get/",
    marcas:"api/catalogo/marca/",
    marcasGet:"api/catalogo/marca-get/",
    productos:"api/catalogo/producto/",
    productosGet:"api/catalogo/producto-get/",
    
    //Ventas
    venta: "api/ventas/venta/",
    ventaGet:"api/ventas/venta-get/",
    detalleVenta:"api/ventas/detalle-venta/",
    detalleVentaGet:"api/ventas/detalle-venta-get/"
}

async function authHeaders(extra = {}) {
  const token = await getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  };
}


// GET con soporte automático de paginación DRF
async function list(path) {
  const headers = await authHeaders();
  let page = 1;
  let all = [];

  while (true) {
    const res = await fetch(`${API_URL}${path}?page=${page}`, {
      headers,
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`La API respondió ${res.status} en ${path}`);
    const data = await res.json();

    if (Array.isArray(data)) return data;
    all = all.concat(data.results ?? []);
    if (!data.next) return all;
    page += 1;
  }
}

// POST estándar para crear registros
async function create(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: await authHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Error ${res.status} al crear en ${path}`);
  return res.json();
}

// PATCH estándar para editar registros
async function update(path, id, body) {
  const res = await fetch(`${API_URL}${path}${id}/`, {
    method: "PATCH",
    headers: await authHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Error ${res.status} al actualizar en ${path}`);
  return res.json();
}

// POST para @action(detail=True, methods=['post']) como eliminado_logico
async function postAction(path, id, actionName, body = {}) {
  const res = await fetch(`${API_URL}${path}${id}/${actionName}/`, {
    method: "POST",
    headers: await authHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Error ${res.status} en ${actionName}`);
  return res.json();
}


//Auth
export const loginUsuario = (credenciales) => create(ENDPOINTS.token, credenciales )

export const getProductos=()=> list(ENDPOINTS.productosGet)