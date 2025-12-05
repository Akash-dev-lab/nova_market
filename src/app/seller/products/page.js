"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { getSellerProducts } from "../../../utils/sellerApi"
import { Pencil } from "lucide-react"

export default function SellerProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await getSellerProducts()
        setProducts(data.products || [])
      } catch (err) {
        console.log("Products fetch error:", err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

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
              className="rounded-2xl bg-white/10 border border-white/10 
                         backdrop-blur-xl shadow-lg p-5 flex flex-col justify-between"
            >
              {/* Image */}
              <div className="rounded-xl overflow-hidden h-48 bg-black/20">
                {product.Images?.[0]?.url && (
                  <img
                    src={product.Images[0].url}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Info */}
              <div className="mt-4">
                <h2 className="text-xl font-semibold">{product.title}</h2>
                <p className="text-gray-300 mt-1 line-clamp-2">{product.description}</p>

                <p className="text-lg font-bold mt-3 text-green-400">
                  ₹{product.price?.amount} {product.price?.currency}
                </p>

                <p className="text-gray-400 text-sm mt-1">Stock: {product.stock}</p>
              </div>

              {/* Update Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="mt-4 flex items-center justify-center gap-2 
                           bg-blue-600 hover:bg-blue-700 transition px-4 py-2 
                           rounded-xl font-semibold text-white shadow-md"
              >
                <Pencil size={18} />
                Update
              </motion.button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
