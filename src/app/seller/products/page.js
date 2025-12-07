"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { getSellerProducts, updateProduct, deleteProduct } from "../../../utils/sellerApi"
import { Pencil, Trash2 } from "lucide-react"
import {useToast} from "../dashboard/components/ui/Toast"

export default function SellerProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null) // product being edited
  const toast = useToast();

  // --------------------------------------------
  // LOAD SELLER PRODUCTS
  // --------------------------------------------
  const fetchProducts = async () => {
    try {
      const data = await getSellerProducts()
      setProducts(data.data.products || [])
    } catch (err) {
      console.log("Fetch seller products error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // --------------------------------------------
  // DELETE PRODUCT
  // --------------------------------------------
  const handleDelete = async (productId) => {
    if (!confirm("Delete this product permanently?")) return

    try {
      await deleteProduct(productId)
      toast.success("Product deleted")
      setProducts(prev => prev.filter(p => p._id !== productId))
    } catch (err) {
      toast.error("Delete failed!")
    }
  }

  // --------------------------------------------
  // UPDATE PRODUCT SUBMIT
  // --------------------------------------------
  const handleUpdateSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    try {
      await updateProduct(editing._id, formData)
      toast.success("Product updated")
      setEditing(null)
      fetchProducts()
    } catch (err) {
      toast.error("Update failed!")
    }
  }

  // --------------------------------------------

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-xl text-white">
        Loading products...
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0b0c] to-[#111114] text-white p-8">
      <h1 className="text-4xl font-black mb-10">Your Products</h1>

      {products.length === 0 ? (
        <p className="text-gray-400 text-lg">You haven't uploaded any products yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl shadow-lg p-5 flex flex-col"
            >
              {/* IMAGE */}
              <div className="rounded-xl overflow-hidden h-48 bg-black/20">
                {product.Images?.[0]?.url && (
                  <img
                    src={product.Images[0].url}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* CONTENT */}
              <div className="mt-4 flex-1">
                <h2 className="text-xl font-semibold">{product.title}</h2>
                <p className="text-gray-300 mt-1 line-clamp-2">{product.description}</p>

                <p className="text-lg font-bold mt-3 text-green-400">
                  ₹{product.price?.amount} {product.price?.currency}
                </p>

                <p className="text-gray-400 text-sm mt-1">Stock: {product.stock}</p>
              </div>

              {/* BUTTONS */}
              <div className="flex justify-between mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setEditing(product)}
                  className="flex gap-2 items-center bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl font-semibold shadow-md"
                >
                  <Pencil size={18} /> Update
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleDelete(product._id)}
                  className="flex gap-2 items-center bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl font-semibold shadow-md"
                >
                  <Trash2 size={18} /> Delete
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* UPDATE MODAL */}
      {editing && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xl flex items-center justify-center z-50">
          <motion.form
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#111113] p-8 rounded-2xl w-[90%] max-w-lg border border-white/20"
            onSubmit={handleUpdateSubmit}
          >
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

            <input
              name="title"
              defaultValue={editing.title}
              className="w-full p-3 rounded-lg bg-white/10 mb-3 text-white outline-none"
            />

            <textarea
              name="description"
              defaultValue={editing.description}
              className="w-full p-3 rounded-lg bg-white/10 mb-3 text-white outline-none"
            />

            <input
              type="number"
              name="priceAmount"
              defaultValue={editing.price?.amount}
              className="w-full p-3 rounded-lg bg-white/10 mb-3 text-white outline-none"
            />

            <input
              type="number"
              name="stock"
              defaultValue={editing.stock}
              className="w-full p-3 rounded-lg bg-white/10 mb-3 text-white outline-none"
            />

            <label className="block text-gray-400 mb-1">Upload New Images (optional)</label>
            <input type="file" name="images" multiple className="mb-4" />

            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="px-4 py-2 bg-gray-600 rounded-xl"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl"
              >
                Save
              </button>
            </div>
          </motion.form>
        </div>
      )}
    </div>
  )
}
