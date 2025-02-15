export async function getProducts(limit) {
    const API_URL = `https://fakestoreapi.com/products?limit=${limit}`;
    return fetch(API_URL).then((response) => response.json());
}

export async function getCategories() {
    const API_URL = 'https://fakestoreapi.com/products/categories';
    return fetch(API_URL).then((response) => response.json());
}
  
export async function getProductsFromCategory(categoryName) {
    const API_URL = `https://fakestoreapi.com/products/category/${categoryName}`;
    return fetch(API_URL).then((response) => response.json());
}