export async function getProducts() {
  const response = await fetch("http://localhost:8000/api/products", {
    headers: { Accept: "application/json" }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  
  const body = await response.json();
  return body.data;
}