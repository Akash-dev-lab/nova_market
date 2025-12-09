'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  getCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
} from '../../utils/cartApi'; // adjust path if needed
// import { toast } from 'react-hot-toast'; // optional - add react-hot-toast if you want toasts

export default function CartPage() {
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  async function loadCart() {
    setLoading(true);
    try {
      const res = await getCart();
      // if API returns { message: 'Cart empty' } treat as empty
      if (res?.message) {
        setCartData({ cart: null, message: res.message });
      } else {
        setCartData(res);
      }
    } catch (err) {
      // server returns 404 with message 'Cart empty' sometimes
      if (err?.message) {
        setCartData({ cart: null, message: err.message });
      } else {
        setCartData({ cart: null, message: 'Failed to load cart' });
        console.error('Cart fetch error:', err);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCart();
  }, []);

  const handleQtyChange = async (item, newQty) => {
    if (newQty < 1) return;
    const id = item.productId || item._id;
    setUpdatingId(id);
    try {
      await updateCartItem(id, newQty); 
      setCartData(prev => ({
      ...prev,
      cart: {
        ...prev.cart,
        items: prev.cart.items.map(i =>
          (i.productId === id || i._id === id)
            ? { ...i, quantity: newQty }
            : i
        )
      }
    }));
      // toast.success('Quantity updated');
    } catch (err) {
      console.error('Update error', err);
      // toast.error(err?.message || 'Update failed');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (item) => {
    const id = item.productId;
    setUpdatingId(id);
    try {
      await deleteCartItem(id);
      await loadCart();
      // toast.success('Item removed');
    } catch (err) {
      console.error('Delete error', err);
      // toast.error(err?.message || 'Delete failed');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleClear = async () => {
    if (!confirm('Clear entire cart?')) return;
    setLoading(true);
    try {
      await clearCart();
      await loadCart();
      // toast.success('Cart cleared');
    } catch (err) {
      console.error('Clear cart error', err);
      // toast.error(err?.message || 'Clear failed');
    } finally {
      setLoading(false);
    }
  };

  // derive totals
  const totals = cartData?.cart
    ? cartData.cart.items.reduce(
        (acc, it) => {
           const priceAmount = Number(it.price?.amount || 0);
        acc.subTotal += priceAmount * it.quantity;
          acc.count += 1;
          acc.totalQuantity += it.quantity;
          return acc;
        },
        { subTotal: 0, count: 0, totalQuantity: 0 }
      )
    : { subTotal: 0, count: 0, totalQuantity: 0 };

  return (
    <div className="min-h-screen p-6 text-white">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-6"
        >
          Your Cart
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: Cart Items */}
          <div className="lg:col-span-2">
            <div className="glass p-6 rounded-2xl border border-white/8 shadow-lg">
              {loading ? (
                <div className="py-20 text-center opacity-70">Loading cart...</div>
              ) : !cartData?.cart || (cartData?.cart?.items?.length || 0) === 0 ? (
                <div className="text-center py-20">
                  <div className="text-2xl font-semibold mb-2">OOPs...!</div>
                  <div className="opacity-70 mb-6">{cartData?.message || 'No items yet. Add from products.'}</div>
                  <button
                    className="px-5 py-3 cursor-pointer rounded-md bg-gradient-to-r from-[#00fff0] to-[#00d9c9] text-black font-semibold shadow"
                    onClick={() => (window.location.href = '/')}
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {cartData.cart.items.map((item) => (
                      <motion.div
                        key={item.productId || item._id}
                        layout
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-4 p-4 rounded-lg bg-white/3 border border-white/5"
                      >
                        <div className="w-24 h-24 rounded-md bg-white/5 flex items-center justify-center overflow-hidden">
                          {item.images && item.images.length ? (
                            <img src={item?.images?.[0]?.url} alt={item.title} className="object-cover w-full h-full" />
                          ) : (
                            <div className="text-xs opacity-60">No image</div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="font-semibold">{item.title}</div>
                              <div className="text-sm opacity-70">{/* maybe seller or sku */}</div>
                            </div>
                            <div className="text-lg font-semibold">₹{(item.price.amount || 0).toFixed(2)}</div>
                          </div>

                          <div className="mt-3 flex items-center gap-3">
                            <div className="flex items-center bg-white/5 rounded-md p-1">
                              <button
                                className="px-3 py-1 rounded-md hover:bg-white/6"
                                onClick={() => handleQtyChange(item, item.quantity - 1)}
                                disabled={updatingId === (item.productId || item._id) || item.quantity <= 1}
                              >
                                -
                              </button>
                              <div className="px-4 text-sm font-medium">{item.quantity}</div>
                              <button
                                className="px-3 py-1 rounded-md hover:bg-white/6"
                                onClick={() => handleQtyChange(item, item.quantity + 1)}
                                disabled={updatingId === (item.productId || item._id)}
                              >
                                +
                              </button>
                            </div>

                            <button
                              className="text-sm text-red-400 hover:underline"
                              onClick={() => handleDelete(item)}
                              disabled={updatingId === (item.productId || item._id)}
                            >
                              {updatingId === (item.productId || item._id) ? 'Working...' : 'Remove'}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-between items-center">
                    <button
                      className="px-4 py-2 rounded-md bg-red-600/80 hover:bg-red-600 text-white"
                      onClick={handleClear}
                    >
                      Clear Cart
                    </button>
                    <div className="opacity-80 text-sm">Items: {totals.count} • Qty: {totals.totalQuantity}</div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-6 rounded-2xl border border-white/8 shadow-lg"
            >
              <div className="text-sm opacity-70">Order Summary</div>
              <div className="mt-4 flex justify-between">
                <div className="opacity-80">Subtotal</div>
                <div className="font-semibold">₹{totals.subTotal.toFixed(2)}</div>
              </div>

              <div className="mt-3 flex justify-between">
                <div className="opacity-80">Shipping</div>
                <div className="font-semibold">Calculated at checkout</div>
              </div>

              <div className="mt-5">
                <button
                  disabled={!cartData?.cart}
                  onClick={() => (window.location.href = '/checkout')}
                  className="w-full py-3 cursor-pointer rounded-lg text-black font-semibold bg-gradient-to-r from-[#00fff0] to-[#00d9c9] shadow"
                >
                  Checkout
                </button>
              </div>

              <div className="mt-4 text-xs opacity-60">
                Secure checkout • 30-day returns
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
