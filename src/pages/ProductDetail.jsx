import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import productsData from "../data/products.json";

/**
 * ProductDetail Component - Menampilkan detail informasi produk berdasarkan ID
 * 
 * Fitur:
 * - Mengambil ID produk dari URL parameter menggunakan useParams()
 * - Mencari data produk dari JSON lokal berdasarkan ID
 * - Menampilkan detail produk: gambar, nama, kategori, brand, harga, stock
 * - Handling error jika produk tidak ditemukan
 * - Tombol kembali ke halaman products
 * - Responsive design dengan Tailwind CSS
 */
export default function ProductDetail() {
  // Mengambil ID dari parameter URL (/products/:id)
  const { id } = useParams();
  
  // Hook untuk navigasi ke halaman lain
  const navigate = useNavigate();

  // State untuk menyimpan data produk yang ditemukan
  const [product, setProduct] = useState(null);

  // State untuk menyimpan pesan error jika ada
  const [error, setError] = useState(null);

  /**
   * useEffect Hook - Mencari produk dari data JSON lokal
   * 
   * Proses:
   * 1. Parse ID dari parameter menjadi number
   * 2. Cari produk di array productsData yang match dengan ID
   * 3. Set product state jika ditemukan, atau set error jika tidak
   * 
   * Dependencies: [id] - Efek akan dijalankan ulang jika ID berubah
   */
  useEffect(() => {
    try {
      const productId = parseInt(id, 10);
      const foundProduct = productsData.find((p) => p.id === productId);

      if (!foundProduct) {
        setError("Produk tidak ditemukan");
        return;
      }

      setProduct(foundProduct);
      setError(null);
    } catch (err) {
      setError("Terjadi kesalahan saat memuat produk");
    }
  }, [id]);

  /**
   * formatRupiah - Mengubah nilai angka menjadi format Rupiah
   * Contoh: 99900 menjadi "Rp 99.900"
   * 
   * @param {number} value - Nilai dalam bentuk angka
   * @returns {string} Format Rupiah dengan pemisah ribuan
   */
  function formatRupiah(value) {
    return `Rp ${new Intl.NumberFormat("id-ID").format(value)}`;
  }

  /**
   * getStockStatus - Menentukan status stock dan warna badge
   * Berdasarkan jumlah stock yang tersedia
   * 
   * @param {number} stock - Jumlah stock
   * @returns {object} Object berisi status text dan CSS class
   */
  function getStockStatus(stock) {
    if (stock > 50) {
      return { text: "In Stock", color: "bg-green-100 text-green-800" };
    } else if (stock > 20) {
      return { text: "Low Stock", color: "bg-yellow-100 text-yellow-800" };
    } else {
      return { text: "Very Low", color: "bg-red-100 text-red-800" };
    }
  }

  // Loading state - menampilkan saat produk sedang dimuat
  if (!product && !error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          <p className="text-gray-600 mt-4">Memuat produk...</p>
        </div>
      </div>
    );
  }

  // Error state - menampilkan saat produk tidak ditemukan
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 p-6">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
            <p className="text-red-600 mb-6 text-lg">{error}</p>
            <button
              onClick={() => navigate("/products")}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Kembali ke Produk
            </button>
          </div>
        </div>
      </div>
    );
  }

  const stockStatus = getStockStatus(product.stock);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Tombol kembali */}
        <button
          onClick={() => navigate("/products")}
          className="mb-6 inline-flex items-center text-emerald-500 hover:text-emerald-600 font-medium transition-colors"
        >
          <span className="mr-2">←</span> Kembali ke Produk
        </button>

        {/* Card detail produk */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Image Container */}
          <div className="bg-gray-100 h-96 overflow-hidden flex items-center justify-center">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>

          {/* Product Information Container */}
          <div className="p-8">
            {/* Product Title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {product.title}
            </h1>

            {/* Product Code */}
            <p className="text-sm text-gray-500 mb-6 font-mono">
              Kode: {product.code}
            </p>

            {/* Rating/Review Section (Optional) */}
            <div className="flex items-center mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <span className="text-gray-600 ml-2">(4.8) • 128 reviews</span>
            </div>

            {/* Product Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-gray-200">
              {/* Kategori */}
              <div>
                <p className="text-gray-600 text-sm mb-1">Kategori Produk</p>
                <p className="text-lg font-semibold text-gray-800">
                  {product.category}
                </p>
              </div>

              {/* Brand */}
              <div>
                <p className="text-gray-600 text-sm mb-1">Brand</p>
                <p className="text-lg font-semibold text-gray-800">
                  {product.brand}
                </p>
              </div>

              {/* Stock Status */}
              <div>
                <p className="text-gray-600 text-sm mb-1">Stok Tersedia</p>
                <p className="text-lg font-semibold text-gray-800">
                  {product.stock} pcs
                </p>
              </div>

              {/* Stock Badge */}
              <div>
                <p className="text-gray-600 text-sm mb-1">Status</p>
                <span
                  className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${stockStatus.color}`}
                >
                  {stockStatus.text}
                </span>
              </div>
            </div>

            {/* Price Section */}
            <div className="mb-8">
              <p className="text-gray-600 text-sm mb-2">Harga</p>
              <p className="text-4xl font-bold text-emerald-600">
                {formatRupiah(product.price)}
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Harga sudah termasuk pajak
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors text-white ${
                  product.stock > 0
                    ? "bg-emerald-500 hover:bg-emerald-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={product.stock <= 0}
              >
                {product.stock > 0 ? "Tambah ke Keranjang" : "Stok Habis"}
              </button>

              <button className="flex-1 py-3 rounded-lg font-semibold border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-50 transition-colors">
                Hubungi Kami
              </button>
            </div>

            {/* Product Description */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Deskripsi Produk
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Produk {product.title} dari brand {product.brand} adalah pilihan terbaik untuk
                kebutuhan {product.category.toLowerCase()} Anda. Dengan kualitas premium dan
                harga yang kompetitif, produk ini telah dipercaya oleh ribuan pelanggan setia
                kami. Dapatkan hasil maksimal dengan penggunaan yang rutin dan sesuai dengan
                instruksi penggunaan yang tertera pada kemasan.
              </p>
            </div>

            {/* Product Benefits */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Keunggulan Produk</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">Bahan berkualitas premium</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">Teruji dermatologis dan aman</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">Hasil terlihat dalam 2-4 minggu</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">Cocok untuk semua jenis kulit</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
