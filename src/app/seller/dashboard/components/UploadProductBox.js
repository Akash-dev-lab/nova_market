"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Upload } from "lucide-react"
import { createProduct } from "../../../../utils/sellerApi"

export default function UploadProductBox() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priceAmount, setPriceAmount] = useState("")
  const [priceCurrency, setPriceCurrency] = useState("INR")
  const [stock, setStock] = useState("")
  const [images, setImages] = useState([])
  const [uploading, setUploading] = useState(false)

  function handleFiles(e) {
    setImages([...e.target.files])
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!title || !description || !priceAmount || !stock || images.length === 0) {
      alert("Please fill all fields & upload at least one image.")
      return
    }

    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("priceAmount", priceAmount)
    formData.append("priceCurrency", priceCurrency)
    formData.append("stock", stock)

    images.forEach((img) => formData.append("images", img))

    try {
      setUploading(true)
      const res = await createProduct(formData)
      console.log("Product Created:", res)
      alert("Product created successfully!")

      // Reset form
      setTitle("")
      setDescription("")
      setPriceAmount("")
      setStock("")
      setImages([])

    } catch (err) {
      console.error(err)
      alert("Failed to upload product.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl"
    >
      <h2 className="text-2xl font-bold flex items-center gap-3 mb-3">
        <Upload size={26} className="text-blue-300" /> Upload New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Drag + Select Images Box */}
        <label className="border-2 border-dashed border-white/20 p-8 rounded-2xl flex flex-col items-center hover:bg-white/10 cursor-pointer transition">
          <Upload size={40} className="text-white/50" />
          <p className="mt-2 text-gray-300">Click or drag to upload images</p>
          <input type="file" multiple className="hidden" onChange={handleFiles} />
        </label>

        {/* Preview */}
        {images.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex gap-3 flex-wrap mt-2"
          >
            {images.map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                className="w-20 h-20 rounded-lg object-cover shadow-md"
              />
            ))}
          </motion.div>
        )}

        {/* Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <input 
            className="input" 
            placeholder="Product Title" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
          />

          <input 
            className="input" 
            placeholder="Price Amount" 
            type="number"
            value={priceAmount} 
            onChange={e => setPriceAmount(e.target.value)} 
          />

          <input 
            className="input" 
            placeholder="Stock" 
            type="number"
            value={stock} 
            onChange={e => setStock(e.target.value)} 
          />

          <select 
            className="input bg-black/20" 
            value={priceCurrency} 
            onChange={e => setPriceCurrency(e.target.value)}
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>

          <textarea 
            className="input col-span-2" 
            placeholder="Product Description" 
            rows="3" 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
          />
        </div>

        {/* Submit Button */}
        <button
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold hover:scale-[1.03] transition"
        >
          {uploading ? "Uploading..." : "Upload Product"}
        </button>

      </form>
    </motion.div>
  )
}
