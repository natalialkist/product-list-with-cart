export async function getAllProducts() {
    const API_URL = 'https://fakestoreapi.com/products';
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Error fetching products');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
}
  