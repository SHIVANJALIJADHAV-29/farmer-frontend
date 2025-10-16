import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import CustomerProductList from "./CustomerProductList";
import CustomerProductModal from "./CustomerProductModal";
import CustomerShoppingCart from "./CustomerShoppingCart";

const CustomerProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [customerData, setCustomerData] = useState(null);

  const email = localStorage.getItem("userEmail");

  const getCustomerPrice = (originalPrice) => {
    if (typeof originalPrice !== 'number' || originalPrice < 0) {
      console.warn("Invalid originalPrice:", originalPrice, "Defaulting to 0 for customerPrice.");
      return 0;
    }
    return Math.round(originalPrice * 1.1);
  };

  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:8085/getAllProducts");
      const updated = res.data.map((product) => ({
        ...product,
        customerPrice: getCustomerPrice(product.price),
        
      }));
      setProducts(updated);
      setFilteredProducts(updated);

      const uniqueCategories = [...new Set(res.data.map((p) => p.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  }, []);

  const fetchCustomer = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:8085/getCustomer/${email}`);
      setCustomerData(res.data);
    } catch (err) {
      console.error("Error fetching customer:", err);
    }
  }, [email]);

  useEffect(() => {
    fetchProducts();
    fetchCustomer();
  }, [fetchProducts, fetchCustomer]);

  useEffect(() => {
    let result = products;

    if (searchTerm) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.farmerTaluka?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.farmerDistrict?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, products]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleCloseModal = () => {
    setShowProductModal(false);
    setSelectedProduct(null);
  };

 const addToCart = (productToAdd) => {
  setCart((prevCart) => {

    return [
      ...prevCart,
      {
        id: productToAdd.id,
        name: productToAdd.name,
        category: productToAdd.category,
        price: productToAdd.customerPrice, 
        quantity: 1,
        farmerId: productToAdd.farmerId,
      },
    ];
  });
};
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity, availableQuantity) => {
    if (newQuantity < 1) return;
    if (newQuantity > availableQuantity) {
      alert(`Only ${availableQuantity} kg available!`);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleCheckout = async (orderData) => {
    try {
      console.log("📦 Sending order to backend:", orderData); // ✅ Keep this for debug
      const response = await axios.post("http://localhost:8085/placeOrder", orderData);
      setCart([]); // Clear cart on successful order
      return response;
    } catch (err) {
      console.error("❌ Error placing order:", err);
      throw err;
    }
  };

  return (
    <div className="container mt-4">
      <CustomerProductModal
        show={showProductModal}
        product={selectedProduct}
        onClose={handleCloseModal}
        onAddToCart={addToCart}
      />

      <div className="row">
        <div className="col-md-8">
          <CustomerProductList
            products={filteredProducts}
            categories={categories}
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
            onCategoryChange={(e) => setSelectedCategory(e.target.value)}
            onProductClick={handleProductClick}
            onAddToCart={addToCart}
          />
        </div>

        <div className="col-md-4">
          <CustomerShoppingCart
            cart={cart}
            products={products} // This `products` list is crucial, it has the original `price` and `farmerId` from the backend
            onUpdateQuantity={updateQuantity}
            onRemoveFromCart={removeFromCart}
            onCheckout={handleCheckout}
            customer={customerData}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerProducts;