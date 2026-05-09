import API from "./api.js";

export const productService = {
  async getInventory() {
    try {
      const res = await API.get("/products/inventory");

      return res.data.inventory || res.data.data || [];
    } catch (error) {
      console.error("getInventory error:", error);
      return [];
    }
  },

  async getProducts(limit = 8) {
    try {
      const res = await API.get("/products");

      const productList = res.data.data || res.data.products || [];

      return productList.slice(0, limit).map((p) => ({
        id: p._id,
        name: p.name,
        price: Number(p.price),
        category: p.category || "General",

        // ✅ DIRECT IMAGE URL
        image: p.image,

        tag: p.tag,
        stock: p.stock,
      }));
    } catch (error) {
      console.error("getProducts error:", error);
      return [];
    }
  },

  async getBestSellers(limit = 4) {
    try {
      const res = await API.get("/products");

      const productList = res.data.data || res.data.products || [];

      return productList.slice(0, limit).map((p) => ({
  id: p._id,
  name: p.name,
  price: Number(p.price),
  category: p.category || "General",
  image: p.image,
  tag: p.tag,
  stock: p.stock,
}));
    } catch (error) {
      console.error("getBestSellers error:", error);
      return [];
    }
  },
};