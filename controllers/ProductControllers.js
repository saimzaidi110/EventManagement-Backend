// const products = [
//   { id: 1, name: "Mobile Phone", price: 15000, category: "Electronics" },
//   { id: 2, name: "Laptop", price: 45000, category: "Electronics" },
//   { id: 3, name: "T-shirt", price: 500, category: "Clothing" },
//   { id: 4, name: "Jeans", price: 1200, category: "Clothing" },
//   { id: 5, name: "Wrist Watch", price: 3500, category: "Accessories" },
//   { id: 6, name: "Sunglasses", price: 2500, category: "Accessories" },
//   { id: 7, name: "Microwave Oven", price: 7000, category: "Home Appliances" },
//   { id: 8, name: "Refrigerator", price: 25000, category: "Home Appliances" },
//   { id: 9, name: "Sneakers", price: 1800, category: "Footwear" },
//   { id: 10, name: "Backpack", price: 900, category: "Accessories" }
// ];

const ProductSchema = require("../models/ProductSchema");

// //AllProducts

// let ProductController={
//     getallproducts:(req,res)=>{
//     res.send(products)
// },

// //For Single Product
// getsingleproduct:(req,res)=>{
//     const{id}= req.params
//     const product = products.find(pro => pro.id ==id)
//     if(product){
//          res.send(product);

//     }
//     else{
//         res.send("Product not available");
//     }

// }

// }

// module.exports =ProductController




//new work



const ProductController = {

  createProduct: async (req, res) => {
    try {
      const { name, description, price, category, stock, image } = req.body;

      // Validation (basic)
      if (!name || !description || !price || !category || stock == null) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const newProduct = new ProductSchema({
        name,
        description,
        price,
        category,
        stock,
        image
      });

      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (err) {
      console.error("Error creating product:", err);
      res.status(500).json({ error: "Server error" });
    }
  },


  //  all products
  getallproducts: async (req, res) => {
    try {
      const products = await ProductSchema.find({})
      res.json({
        message: "All products get successfully",
        status: true,
        products
      })
    } catch (error) {
      res.json({
        message: "Failed to get Products",
        status: false,
        error
      })
    }
  },

  //  single product by ID
  // getsingleproduct: (req, res) => {
  //   const { id } = req.params;
  //   const product = products.find(p => p.id == id);

  //   if (product) {
  //     res.send(product);
  //   } else {
  //     res.status(404).json({ status: false, message: "Product not available" });
  //   }
  // },

  // Update product by ID
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, price, category, stock, image } = req.body;

      // Basic validation
      if (!name || !price || !category) {
        return res.status(400).json({ status: false, message: "Missing required fields" });
      }

      const updatedProduct = await ProductSchema.findByIdAndUpdate(
        id,
        { name, description, price, category, stock, image },
        { new: true } // return the updated document
      );

      if (!updatedProduct) {
        return res.status(404).json({ status: false, message: "Product not found" });
      }

      res.json({ status: true, message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ status: false, message: "Server error", error });
    }
  },


deleteProduct: async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await ProductSchema.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ status: false, message: "Product not found" });
    }

    res.json({ status: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ status: false, message: "Server error", error });
  }
}

};

module.exports = ProductController;
