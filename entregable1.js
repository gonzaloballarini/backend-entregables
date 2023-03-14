class ProductManager {
    constructor() {
        this.products = [];
    }

    getProducts() {
    return this.products;
    }

    addProduct(product) {
        if (this.products.some((p) => p.code === product.code)) {
        throw new Error("El código del producto ya existe");
    }

    const id = this.generateId();
    this.products.push({ ...product, id });
    }

    getProductById(id) {
        const product = this.products.find((p) => p.id === id);

    if (!product) {
        throw new Error(`No se encontró ningún producto con el ID ${id}`);
    }

    return product;
    }

    generateId() {
        const existingIds = this.products.map((p) => p.id);
        let id;

    do {
        id = Math.random().toString(36).substring(2, 15);
    } while (existingIds.includes(id));

    return id;
    }
}

// Ejemplo de uso
const productManager = new ProductManager();

// Obtener productos (debería ser un array vacío)
const products = productManager.getProducts();
console.log(products); // []

// Agregar un producto
const product = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
};

productManager.addProduct(product);

// Obtener productos (debería tener un elemento)
const productsAfterAddition = productManager.getProducts();
console.log(productsAfterAddition); 

// Intentar agregar un producto con el mismo código (debe lanzar un error)
try {
    productManager.addProduct(product);
} catch (error) {
    console.error(error.message); 
}

// Buscar un producto por ID
const productId = product.id; 
const foundProduct = productManager.getProductById(productId);
console.log(foundProduct); // { title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code: 'abc123', stock: 25, id: 'wle07o40hvn' }

// Intentar buscar un producto inexistente
try {
    const nonExistentProductId = "non-existent-id";
    const nonExistentProduct = productManager.getProductById(nonExistentProductId);
} catch (error) {
  console.error(error.message); // "No se encontró ningún producto con el ID non-existent-id"
}
