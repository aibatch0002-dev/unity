import React, { useState } from 'react';
import { PageRoute, Language, CartItem } from '../types';
import { productsData, toBanglaNumber, SUPER_SHOP_AISLE_IMAGE } from '../data/mockData';
import { SuperShopAdminPanel } from '../components/SuperShopAdminPanel';
import { recordNewSaleOrder } from '../data/superShopSalesStore';

interface SuperShopPageProps {
  onNavigate: (route: PageRoute) => void;
  language: Language;
  cart: CartItem[];
  onAddToCart: (item: CartItem) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const SuperShopPage: React.FC<SuperShopPageProps> = ({
  onNavigate: _onNavigate,
  language,
  cart,
  onAddToCart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const isBn = language === 'bn';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceSort, setPriceSort] = useState<'default' | 'low-to-high' | 'high-to-low'>('default');
  const [stockFilter, setStockFilter] = useState<'all' | 'in-stock' | 'limited'>('all');
  const [deliveryZone, setDeliveryZone] = useState<'dhaka' | 'outside'>('dhaka');
  const [cardQuantities, setCardQuantities] = useState<{ [id: string]: number }>({});
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState<string | null>(null);

  // Admin Portal & Auto Calculation state
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);

  // Checkout form states for automatic calculation
  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutPhone, setCheckoutPhone] = useState('');
  const [checkoutAddress, setCheckoutAddress] = useState('');
  const [checkoutSlot, setCheckoutSlot] = useState('সকাল ৯:০০ - দুপুর ১২:০০');
  const [checkoutMemberId, setCheckoutMemberId] = useState('');
  const [checkoutPaymentMethod, setCheckoutPaymentMethod] = useState<'cod' | 'bkash'>('cod');

  // Tracking tool state
  const [trackingInput, setTrackingInput] = useState('');
  const [trackingResultVisible, setTrackingResultVisible] = useState(false);

  // Card quantity helper
  const getQty = (id: string) => cardQuantities[id] || 1;
  const updateCardQty = (id: string, delta: number) => {
    const current = getQty(id);
    const next = Math.max(1, Math.min(20, current + delta));
    setCardQuantities((prev) => ({ ...prev, [id]: next }));
  };

  // Filter products
  const filteredProducts = productsData
    .filter((p) => {
      const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchSearch =
        p.nameBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.nameEn.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStock = stockFilter === 'all' || p.stockStatus === stockFilter;
      return matchCategory && matchSearch && matchStock;
    })
    .sort((a, b) => {
      if (priceSort === 'low-to-high') return a.price - b.price;
      if (priceSort === 'high-to-low') return b.price - a.price;
      return 0;
    });

  // Calculate cart subtotal
  const subtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const deliveryFee = subtotal >= 1500 ? 0 : deliveryZone === 'dhaka' ? 60 : 120;
  const grandTotal = subtotal > 0 ? subtotal + deliveryFee : 0;
  const freeThreshold = 1500;
  const remainingForFree = Math.max(0, freeThreshold - subtotal);
  const freeDeliveryPercent = Math.min(100, Math.round((subtotal / freeThreshold) * 100));

  const handleAddToCart = (product: (typeof productsData)[0]) => {
    const qty = getQty(product.id);
    onAddToCart({
      id: product.id,
      name: isBn ? product.nameBn : product.nameEn || product.nameBn,
      unitPrice: product.price,
      unitLabel: isBn ? product.unitBn : 'Pack',
      quantity: qty,
      imageUrl: product.imageUrl,
    });
    setCardQuantities((prev) => ({ ...prev, [product.id]: 1 }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const rawId = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `UGG-${rawId}`;
    const orderId = isBn ? '#UGG-' + toBanglaNumber(rawId) : `#UGG-${rawId}`;

    // Auto-calculate: Record sale into store ledger immediately
    const saleItems = cart.map((item) => ({
      productId: item.id,
      productName: item.name,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
      total: item.unitPrice * item.quantity,
      unitLabel: item.unitLabel,
    }));

    recordNewSaleOrder({
      orderNumber,
      customerName: checkoutName.trim() || (isBn ? 'অনলাইন সম্মানিত গ্রাহক' : 'Online Customer'),
      customerPhone: checkoutPhone.trim() || '01700 000000',
      deliveryAddress: checkoutAddress.trim() || (isBn ? 'ঢাকা এক্সপ্রেস হোম ডেলিভারি' : 'Dhaka Express Delivery'),
      channel: 'online',
      items: saleItems,
      subtotal,
      deliveryFee,
      discount: 0,
      grandTotal,
      paymentMethod: checkoutPaymentMethod,
      status: 'processing',
    });

    setSuccessOrderId(orderId);
    setShowCheckoutModal(false);
    onClearCart();
    setCheckoutName('');
    setCheckoutPhone('');
    setCheckoutAddress('');
  };

  return (
    <div className="flex flex-col w-full relative">
      {/* Super Shop Management & Admin Access Bar */}
      <div className="w-full bg-[#070e1f] border-b border-amber-500/30 py-2.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-bold text-white tracking-wide">
              {isBn ? 'ইউজিজি ফ্রেশ মার্ট ও রিটেইল পিওএস নেটওয়ার্ক' : 'UGG Fresh Mart & Retail POS Network'}
            </span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="text-amber-300/90 hidden md:inline font-medium">
              {isBn ? 'স্বয়ংক্রিয় বিক্রয় হিসাব সক্রিয় (Auto Sales Sync Active)' : 'Automated Sales Ledger & Real-Time Analytics'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setAdminPanelOpen(true)}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
              <span>{isBn ? 'সুপার শপ অ্যাডমিন প্যানেল' : 'Super Shop Admin Portal'}</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-slate-950 text-amber-300 font-mono font-bold">
                {isBn ? 'আজকের সেল ও হিসাব' : 'Sales POS'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Super Shop Hero & Department Banner */}
      <section className="w-full relative overflow-hidden bg-[#000514] text-white py-16 px-6 lg:px-12 border-b border-[#eaedff]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#000514] via-[#000514]/95 to-[#000514]/80 z-10"></div>
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[#745b00]/15 blur-3xl pointer-events-none"></div>

        <div className="relative z-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#fcd358]/20 rounded-full w-fit border border-[#fcd358]/30">
                <span className="material-symbols-outlined text-[#ffe08b] text-[18px]">verified</span>
                <span className="text-xs font-bold text-[#ffe08b] tracking-wide uppercase">
                  {isBn ? '১০০% অর্গানিক ও রাসায়নিকমুক্ত গ্যারান্টি' : '100% Organic & Chemical-Free Guarantee'}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setAdminPanelOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 rounded-full text-xs font-bold border border-amber-400/40 transition cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">point_of_sale</span>
                <span>{isBn ? 'অ্যাডমিন সেলস প্যানেল ও লাইভ হিসাব' : 'Admin Sales POS & Live Stats'}</span>
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-bold tracking-tight">
                {isBn ? 'ইউজিজি ফ্রেশ মার্ট ও প্রিমিয়াম সুপার শপ' : 'UGG Fresh Mart & Gourmet Super Shop'}
              </h1>
              <p className="font-serif text-lg text-[#ffe08b] font-light">
                {isBn ? 'নিরাপদ খাদ্য, টেকসই সরবরাহ ও কমিউনিটি সমবায় সঞ্চালন' : 'Pure Nutrition, Farm-to-Table Logistics & Cooperative Retail'}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#b7c7eb] max-w-2xl leading-relaxed">
              {isBn
                ? 'ইউনাইটি গ্রোথ গ্রুপ (UGG)-এর সমবায় নেটওয়ার্কের সরাসরি তত্ত্বাবধানে চুক্তিভিত্তিক কৃষক ও স্থানীয় ডেইরি ফার্ম থেকে সংগৃহীত নির্ভেজাল গ্রোসারি, ফ্রেশ শাকসবজি ও স্বাস্থ্যসম্মত উপাদান এখন আপনার দ্বারে।'
                : 'Directly sourced from verified cooperative farms and certified cold-chain hubs. Delivering pristine groceries, cold-pressed oils, organic produce, and pure forest honey right to your doorstep.'}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-1">
              <div className="p-3.5 bg-white/10 rounded-xl backdrop-blur-sm flex items-center gap-3 border border-white/10">
                <span className="material-symbols-outlined text-[#ffe08b] text-[26px]">local_shipping</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">
                    {isBn ? 'দ্রুত ডেলিভারি' : 'Express Delivery'}
                  </span>
                  <span className="text-[11px] text-[#b7c7eb]">
                    {isBn ? 'ঢাকা ও রাজশাহীতে ২-৪ ঘণ্টা' : '2-4 Hrs in Dhaka & Rajshahi'}
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-white/10 rounded-xl backdrop-blur-sm flex items-center gap-3 border border-white/10">
                <span className="material-symbols-outlined text-[#ffe08b] text-[26px]">eco</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">
                    {isBn ? 'রাসায়নিকমুক্ত' : 'Chemical-Free'}
                  </span>
                  <span className="text-[11px] text-[#b7c7eb]">
                    {isBn ? 'ল্যাব টেস্টে পরীক্ষিত' : 'Lab Tested & Purity Assured'}
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-white/10 rounded-xl backdrop-blur-sm col-span-2 sm:col-span-1 flex items-center gap-3 border border-white/10">
                <span className="material-symbols-outlined text-[#ffe08b] text-[26px]">loyalty</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">
                    {isBn ? 'সদস্য ডিভিডেন্ড' : 'Member Benefit'}
                  </span>
                  <span className="text-[11px] text-[#b7c7eb]">
                    {isBn ? '৫% ক্যাশব্যাক পয়েন্ট' : '5% Cash Rebates & Points'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              <img
                src={SUPER_SHOP_AISLE_IMAGE}
                alt="UGG Gourmet Super Shop Fresh Aisles"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000514]/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 backdrop-blur-md rounded-xl shadow-lg text-[#131b2e] flex items-center justify-between border border-[#eaedff]">
                <div>
                  <p className="text-[11px] text-[#745b00] uppercase font-bold">
                    {isBn ? 'আজকের বিশেষ অফার' : "Today's Featured Selection"}
                  </p>
                  <p className="font-serif text-sm sm:text-base font-bold text-[#000514]">
                    {isBn ? 'ফার্ম ফ্রেশ খাঁটি ঘি ও সুন্দরবনের মধু' : 'Raw Forest Honey & Organic Cow Ghee'}
                  </p>
                </div>
                <span className="px-3 py-1 bg-[#745b00] text-white rounded-lg text-xs font-bold shadow-sm">
                  {isBn ? '১০% ছাড়' : '10% Off'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Delivery Tracker Notice */}
      <div className="w-full bg-[#e2e7ff] py-2.5 px-6 border-b border-[#dae2fd]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-[#131b2e]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#745b00] text-[18px]">local_mall</span>
            <span className="font-medium">
              {isBn
                ? 'সর্বোচ্চ মান নিশ্চিতকরণ: UGG সমবায় ভেন্ডর কোড ৩৪৩-বি দ্বারা প্রত্যয়িত।'
                : 'Purity Assured: Certified under UGG Cooperative Vendor Quality Code 343-B.'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#745b00] font-bold">
              {isBn
                ? '৳১,৫০০+ অর্ডারে সমগ্র ঢাকা ও রাজশাহীতে ফ্রি হোম ডেলিভারি!'
                : 'Free Home Delivery on orders over ৳1,500 in Dhaka & Rajshahi!'}
            </span>
            <span className="text-[#c5c6ce] hidden sm:inline">|</span>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('tracking-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[#000514] hover:text-[#745b00] font-bold underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>{isBn ? 'অর্ডার ট্র্যাক করুন' : 'Track Order'}</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Store Layout */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-10 w-full">
        {/* Category Navigation Pills */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs text-[#745b00] uppercase tracking-widest font-bold">
                {isBn ? 'বিভাগসমূহ / Departments' : 'Departments & Aisles'}
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#000514]">
                {isBn ? 'পণ্য ক্যাটাগরি ব্রাউজ করুন' : 'Browse Product Categories'}
              </h2>
            </div>
            <div className="text-xs text-[#75777e]">
              {isBn ? (
                <>মোট <span className="font-bold text-[#000514]">{toBanglaNumber(filteredProducts.length)}</span> টি নির্বাচিত প্রিমিয়াম পণ্য</>
              ) : (
                <>Showing <span className="font-bold text-[#000514]">{filteredProducts.length}</span> curated items</>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'all', labelBn: 'সবগুলো পণ্য', labelEn: 'All Items', icon: 'grid_view' },
              { id: 'produce', labelBn: 'অর্গানিক শাকসবজি ও ফলমূল', labelEn: 'Organic Fresh Produce', icon: 'nutrition' },
              { id: 'dairy', labelBn: 'ডেইরি ও ফার্ম ফ্রেশ খাদ্য', labelEn: 'Dairy & Farm Fresh', icon: 'egg' },
              { id: 'grains', labelBn: 'চাল, ডাল ও ঘানিভাঙা তেল', labelEn: 'Grains & Cold-Pressed Oils', icon: 'grain' },
              { id: 'spices', labelBn: 'মসলা ও ফ্রেশ মিট', labelEn: 'Spices & Meat', icon: 'soup_kitchen' },
              { id: 'bakery', labelBn: 'বেকারি ও কনফেকশনারি', labelEn: 'Bakery & Snacks', icon: 'bakery_dining' },
              { id: 'household', labelBn: 'গৃহস্থালি ও স্বাস্থ্যপণ্য', labelEn: 'Household & Wellness', icon: 'sanitizer' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#000514] text-white shadow-md'
                    : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                <span>{isBn ? cat.labelBn : cat.labelEn}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search & Filters Bar */}
        <div className="bg-[#f2f3ff] p-4 rounded-xl shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4 border border-[#eaedff]">
          <div className="relative w-full md:w-96">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#75777e] text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isBn ? 'পণ্য খুঁজুন (চাল, তেল, ফলমূল, ঘি...)' : 'Search items (honey, oil, rice, ghee...)'}
              className="w-full pl-9 pr-4 py-2 bg-white text-[#131b2e] rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#745b00] shadow-sm border border-[#eaedff]"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end overflow-x-auto text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-[#75777e] whitespace-nowrap">{isBn ? 'মূল্য ক্রম:' : 'Sort:'}</span>
              <select
                value={priceSort}
                onChange={(e) => setPriceSort(e.target.value as any)}
                className="bg-white py-1.5 px-3 rounded-lg text-[#131b2e] outline-none shadow-sm cursor-pointer border border-[#eaedff]"
              >
                <option value="default">{isBn ? 'সাধারণ ক্রম' : 'Featured'}</option>
                <option value="low-to-high">{isBn ? 'কম থেকে বেশি' : 'Price: Low to High'}</option>
                <option value="high-to-low">{isBn ? 'বেশি থেকে কম' : 'Price: High to Low'}</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[#75777e] whitespace-nowrap">{isBn ? 'স্টক:' : 'Stock:'}</span>
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value as any)}
                className="bg-white py-1.5 px-3 rounded-lg text-[#131b2e] outline-none shadow-sm cursor-pointer border border-[#eaedff]"
              >
                <option value="all">{isBn ? 'সকল স্টক' : 'All Availability'}</option>
                <option value="in-stock">{isBn ? 'ইন স্টক কেবল' : 'In Stock Only'}</option>
                <option value="limited">{isBn ? 'সীমিত স্টক' : 'Limited Reserve'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Layout: Product Grid + Sticky Shopping Cart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Product Grid (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {filteredProducts.length === 0 ? (
              <div className="p-12 bg-white text-center rounded-2xl border border-[#eaedff]">
                <span className="material-symbols-outlined text-[#75777e] text-4xl mb-2">
                  search_off
                </span>
                <p className="font-serif text-base text-[#000514] font-bold">
                  {isBn ? 'কোনো পণ্য পাওয়া যায়নি!' : 'No Products Matched!'}
                </p>
                <p className="text-xs text-[#75777e] mt-1">
                  {isBn ? 'অনুগ্রহ করে ভিন্ন কোনো শব্দ বা ক্যাটাগরি অনুসন্ধান করুন।' : 'Try altering your search keywords or resetting filters.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {filteredProducts.map((product) => {
                  const qty = getQty(product.id);
                  const displayTitle = isBn ? product.nameBn : product.nameEn || product.nameBn;
                  const displaySub = isBn ? product.nameEn : product.nameBn;

                  return (
                    <div
                      key={product.id}
                      className="product-card bg-white rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden border border-[#eaedff]"
                    >
                      <div className="relative h-44 overflow-hidden bg-[#eaedff]">
                        <img
                          src={product.imageUrl}
                          alt={product.nameEn}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span
                          className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm ${
                            product.stockStatus === 'in-stock'
                              ? 'bg-[#0e996b] text-white'
                              : 'bg-[#745b00] text-white'
                          }`}
                        >
                          {isBn ? product.stockStatusLabelBn : product.stockStatus === 'in-stock' ? 'In Stock' : 'Limited'}
                        </span>
                        <span className="absolute top-2 right-2 bg-white/90 text-[#131b2e] text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                          {isBn ? product.unitBn : 'Pack'}
                        </span>
                      </div>

                      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                        <div>
                          <span className="text-[10px] text-[#745b00] font-bold uppercase">
                            {isBn ? product.categoryLabelBn : product.category}
                          </span>
                          <h3 className="font-serif text-sm font-bold text-[#000514] leading-snug mt-0.5">
                            {displayTitle}
                          </h3>
                          <p className="text-[11px] text-[#75777e]">{displaySub}</p>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <div>
                            <span className="font-serif text-base font-bold text-[#000514]">
                              ৳{isBn ? toBanglaNumber(product.price) : product.price}
                            </span>
                            <span className="text-xs text-[#75777e] line-through ml-1 font-mono">
                              ৳{isBn ? toBanglaNumber(product.originalPrice) : product.originalPrice}
                            </span>
                          </div>

                          <div className="flex items-center bg-[#f2f3ff] rounded-lg p-0.5 border border-[#eaedff]">
                            <button
                              type="button"
                              onClick={() => updateCardQty(product.id, -1)}
                              className="w-6 h-6 flex items-center justify-center font-bold text-[#000514] hover:bg-[#eaedff] rounded text-xs cursor-pointer"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-[#000514]">
                              {isBn ? toBanglaNumber(qty) : qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateCardQty(product.id, 1)}
                              className="w-6 h-6 flex items-center justify-center font-bold text-[#000514] hover:bg-[#eaedff] rounded text-xs cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleAddToCart(product)}
                          className="w-full py-2 bg-[#000514] text-white hover:bg-[#0d1e3a] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                          <span>{isBn ? 'কার্টে যোগ করুন' : 'Add to Cart'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Real-Time Sticky Shopping Cart (4 Cols) */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col gap-4 border border-[#eaedff]">
              <div className="flex items-center justify-between pb-3 bg-[#f2f3ff] -mx-5 -mt-5 p-5 rounded-t-2xl border-b border-[#eaedff]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#745b00] text-[22px]">
                    shopping_bag
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#000514]">
                    {isBn ? 'আপনার শপিং ব্যাগ' : 'Shopping Basket'}
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#fcd358] text-[#735a00] text-xs font-bold">
                  {isBn
                    ? `${toBanglaNumber(cart.reduce((a, b) => a + b.quantity, 0))} আইটেম`
                    : `${cart.reduce((a, b) => a + b.quantity, 0)} Items`}
                </span>
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="bg-[#f2f3ff] p-3 rounded-xl flex flex-col gap-1.5 border border-[#eaedff]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#131b2e] font-medium">
                    {subtotal >= freeThreshold
                      ? isBn
                        ? 'অভিনন্দন! ফ্রি ডেলিভারি পাচ্ছেন!'
                        : 'Congratulations! You unlocked Free Delivery!'
                      : isBn
                      ? `ফ্রি ডেলিভারির জন্য আরও ৳${toBanglaNumber(remainingForFree)} যোগ করুন`
                      : `Add ৳${remainingForFree} more for Free Delivery`}
                  </span>
                  <span className="font-bold text-[#745b00]">
                    {isBn ? `${toBanglaNumber(freeDeliveryPercent)}%` : `${freeDeliveryPercent}%`}
                  </span>
                </div>
                <div className="w-full bg-[#dae2fd] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#745b00] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${freeDeliveryPercent}%` }}
                  ></div>
                </div>
              </div>

              {/* Itemized List Container */}
              <div className="flex flex-col gap-2.5 max-h-64 overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <div className="py-10 flex flex-col items-center justify-center text-center text-[#75777e]">
                    <span className="material-symbols-outlined text-4xl mb-1 text-[#c5c6ce]">
                      shopping_cart
                    </span>
                    <p className="text-xs text-[#44474d] font-semibold">
                      {isBn ? 'কার্ট এখনও খালি রয়েছে' : 'Your cart is empty'}
                    </p>
                    <p className="text-[11px] text-[#75777e]">
                      {isBn ? "পণ্য নির্বাচন করে 'কার্টে যোগ করুন' ক্লিক করুন" : 'Select items to add them here'}
                    </p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2.5 bg-[#faf8ff] rounded-xl gap-2 border border-[#eaedff]"
                    >
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-xs font-bold text-[#000514] truncate">{item.name}</span>
                        <span className="text-[10px] text-[#75777e]">
                          ৳{isBn ? toBanglaNumber(item.unitPrice) : item.unitPrice} / {item.unitLabel}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-white rounded-lg p-0.5 border border-[#eaedff]">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="w-5 h-5 flex items-center justify-center font-bold text-[#000514] hover:bg-[#f2f3ff] rounded text-xs cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-5 text-center text-xs font-bold text-[#000514]">
                            {isBn ? toBanglaNumber(item.quantity) : item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="w-5 h-5 flex items-center justify-center font-bold text-[#000514] hover:bg-[#f2f3ff] rounded text-xs cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-xs font-bold text-[#000514] min-w-[50px] text-right font-mono">
                          ৳{isBn ? toBanglaNumber(item.unitPrice * item.quantity) : item.unitPrice * item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#75777e] hover:text-red-600 transition p-0.5 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Delivery Zone Picker */}
              <div className="flex flex-col gap-1.5 pt-1">
                <label className="text-xs text-[#75777e] font-semibold">
                  {isBn ? 'ডেলিভারি এলাকা:' : 'Delivery Region:'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryZone('dhaka')}
                    className={`px-3 py-2 rounded-lg text-left text-xs font-bold flex items-center justify-between border cursor-pointer ${
                      deliveryZone === 'dhaka'
                        ? 'bg-[#000514] text-white border-[#000514]'
                        : 'bg-[#f2f3ff] text-[#131b2e] border-[#eaedff]'
                    }`}
                  >
                    <span>{isBn ? 'ঢাকা/রাজশাহী' : 'Dhaka / Rajshahi'}</span>
                    <span>৳{isBn ? '৬০' : '60'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryZone('outside')}
                    className={`px-3 py-2 rounded-lg text-left text-xs font-bold flex items-center justify-between border cursor-pointer ${
                      deliveryZone === 'outside'
                        ? 'bg-[#000514] text-white border-[#000514]'
                        : 'bg-[#f2f3ff] text-[#131b2e] border-[#eaedff]'
                    }`}
                  >
                    <span>{isBn ? 'অন্যান্য জেলা' : 'Other Districts'}</span>
                    <span>৳{isBn ? '১২০' : '120'}</span>
                  </button>
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className="pt-2 flex flex-col gap-1.5 text-xs">
                <div className="flex justify-between text-[#44474d]">
                  <span>{isBn ? 'উপ-মোট (Subtotal):' : 'Subtotal:'}</span>
                  <span className="font-bold text-[#131b2e] font-mono">
                    ৳{isBn ? toBanglaNumber(subtotal) : subtotal}
                  </span>
                </div>
                <div className="flex justify-between text-[#44474d]">
                  <span>{isBn ? 'ডেলিভারি ফি:' : 'Delivery Charge:'}</span>
                  <span className="font-bold text-[#131b2e]">
                    {deliveryFee === 0 ? (isBn ? 'ফ্রি' : 'FREE') : `৳${isBn ? toBanglaNumber(deliveryFee) : deliveryFee}`}
                  </span>
                </div>
                <div className="h-px bg-[#eaedff] my-1"></div>
                <div className="flex justify-between items-baseline font-bold text-[#131b2e]">
                  <span className="font-serif text-sm text-[#000514]">
                    {isBn ? 'সর্বমোট প্রদেয়:' : 'Grand Total:'}
                  </span>
                  <span className="font-serif text-xl text-[#745b00]">
                    ৳{isBn ? toBanglaNumber(grandTotal) : grandTotal}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                disabled={cart.length === 0}
                onClick={() => setShowCheckoutModal(true)}
                className="w-full py-3 bg-[#745b00] hover:bg-[#fcd358] hover:text-[#735a00] text-white transition-all rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">lock</span>
                <span>{isBn ? 'নিরাপদ চেকআউট সম্পন্ন করুন' : 'Proceed to Checkout'}</span>
              </button>

              <p className="text-[11px] text-[#75777e] text-center flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#0e996b]">verified_user</span>
                <span>{isBn ? '১০০% নিরাপদ ডেলিভারি ও দ্রুত রিটার্ন পলিসি' : '100% Safe Delivery & 24h Return Guarantee'}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 bg-[#000514]/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 flex flex-col gap-5 border border-[#eaedff]">
            <div className="flex items-center justify-between pb-3 bg-[#f2f3ff] -mx-6 -mt-6 md:-mx-8 md:-mt-8 p-6 rounded-t-2xl border-b border-[#eaedff]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#745b00] text-[24px]">
                  shopping_cart_checkout
                </span>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#000514]">
                    {isBn ? 'অর্ডার সম্পন্নকরণ ও চেকআউট' : 'Complete Express Order & Checkout'}
                  </h3>
                  <p className="text-[11px] text-[#75777e]">
                    {isBn ? 'ইউজিজি সুপার শপ দ্রুত ডেলিভারি ফরম' : 'UGG Super Shop Fast Dispatch'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowCheckoutModal(false)}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#131b2e] shadow-sm hover:bg-[#eaedff] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handlePlaceOrder} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-[#131b2e]">
                    {isBn ? 'গ্রাহকের পূর্ণ নাম *' : 'Recipient Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={checkoutName}
                    onChange={(e) => setCheckoutName(e.target.value)}
                    placeholder={isBn ? 'উদা: মোঃ আরিফুল ইসলাম' : 'e.g. Tariqul Islam'}
                    className="p-2.5 rounded-lg bg-[#f2f3ff] text-xs text-[#131b2e] outline-none border border-[#eaedff] focus:border-[#745b00]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-[#131b2e]">
                    {isBn ? 'মোবাইল নম্বর *' : 'Contact Mobile *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={checkoutPhone}
                    onChange={(e) => setCheckoutPhone(e.target.value)}
                    placeholder="01700 000000"
                    className="p-2.5 rounded-lg bg-[#f2f3ff] text-xs text-[#131b2e] outline-none border border-[#eaedff] focus:border-[#745b00]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-[#131b2e]">
                  {isBn ? 'পূর্ণ ডেলিভারি ঠিকানা *' : 'Delivery Address *'}
                </label>
                <textarea
                  rows={2}
                  required
                  value={checkoutAddress}
                  onChange={(e) => setCheckoutAddress(e.target.value)}
                  placeholder={isBn ? 'বাড়ি # ১২, রোড # ৪, সেক্টর # ৩, উত্তরা, ঢাকা' : 'House # 24, Road # 11, Sector # 4, Uttara, Dhaka'}
                  className="p-2.5 rounded-lg bg-[#f2f3ff] text-xs text-[#131b2e] outline-none border border-[#eaedff] focus:border-[#745b00]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-[#131b2e]">
                    {isBn ? 'ডেলিভারি সময় স্লট' : 'Preferred Slot'}
                  </label>
                  <select
                    value={checkoutSlot}
                    onChange={(e) => setCheckoutSlot(e.target.value)}
                    className="p-2.5 rounded-lg bg-[#f2f3ff] text-xs text-[#131b2e] outline-none cursor-pointer border border-[#eaedff]"
                  >
                    <option>{isBn ? 'সকাল ৯:০০ - দুপুর ১২:০০' : 'Morning: 9:00 AM - 12:00 PM'}</option>
                    <option>{isBn ? 'দুপুর ১২:০০ - বিকেল ৩:০০' : 'Afternoon: 12:00 PM - 3:00 PM'}</option>
                    <option>{isBn ? 'বিকেল ৩:০০ - সন্ধ্যা ৬:০০' : 'Evening: 3:00 PM - 6:00 PM'}</option>
                    <option>{isBn ? 'সন্ধ্যা ৬:০০ - রাত ৯:০০' : 'Night: 6:00 PM - 9:00 PM'}</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-[#131b2e]">
                    {isBn ? 'UGG সদস্যপদ নম্বর (যদি থাকে)' : 'Member ID (For 5% Rebate)'}
                  </label>
                  <input
                    type="text"
                    value={checkoutMemberId}
                    onChange={(e) => setCheckoutMemberId(e.target.value)}
                    placeholder="UGG-M-1024"
                    className="p-2.5 rounded-lg bg-[#f2f3ff] text-xs text-[#131b2e] outline-none border border-[#eaedff]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-1">
                <label className="text-xs font-bold text-[#131b2e]">
                  {isBn ? 'মূল্য পরিশোধের পদ্ধতি' : 'Payment Method'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <label
                    className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer border transition ${
                      checkoutPaymentMethod === 'cod' ? 'bg-[#fcd358]/20 border-[#745b00]' : 'bg-[#f2f3ff] border-[#eaedff]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={checkoutPaymentMethod === 'cod'}
                      onChange={() => setCheckoutPaymentMethod('cod')}
                      className="text-[#000514]"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#000514]">
                        {isBn ? 'ক্যাশ অন ডেলিভারি (COD)' : 'Cash on Delivery (COD)'}
                      </span>
                      <span className="text-[10px] text-[#75777e]">
                        {isBn ? 'পণ্য হাতে পেয়ে টাকা প্রদান' : 'Pay when you receive the package'}
                      </span>
                    </div>
                  </label>
                  <label
                    className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer border transition ${
                      checkoutPaymentMethod === 'bkash' ? 'bg-[#fcd358]/20 border-[#745b00]' : 'bg-[#f2f3ff] border-[#eaedff]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={checkoutPaymentMethod === 'bkash'}
                      onChange={() => setCheckoutPaymentMethod('bkash')}
                      className="text-[#000514]"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#000514]">
                        {isBn ? 'বিকাশ / নগদ / রকেট' : 'bKash / Nagad / Upay'}
                      </span>
                      <span className="text-[10px] text-[#75777e]">
                        {isBn ? 'মোবাইল ফাইন্যান্সিয়াল সার্ভিসেস' : 'Direct Mobile Banking'}
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="p-3 bg-[#e8edff] rounded-xl flex flex-col gap-1 border border-[#dae2fd]">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[#000514]">{isBn ? 'সর্বমোট প্রদেয় বিল:' : 'Total Payable:'}</span>
                  <span className="text-base text-[#745b00]">
                    ৳{isBn ? toBanglaNumber(grandTotal) : grandTotal}
                  </span>
                </div>
                <p className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">check_circle</span>
                  <span>
                    {isBn
                      ? 'অর্ডার কনফার্ম করার সাথে সাথে সুপার শপ অ্যাকাউন্টিং সিস্টেমে অটো সেল হিসাব যুক্ত হবে।'
                      : 'Order placement will immediately auto-record into store ledger and sales counters.'}
                  </span>
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCheckoutModal(false)}
                  className="px-4 py-2 rounded-lg bg-[#eaedff] text-[#000514] text-xs font-bold hover:bg-[#dae2fd] cursor-pointer"
                >
                  {isBn ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#745b00] text-white text-xs font-bold hover:bg-[#fcd358] hover:text-[#735a00] shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>{isBn ? 'অর্ডার কনফার্ম করুন' : 'Confirm Order'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Dialog */}
      {successOrderId && (
        <div className="fixed inset-0 z-50 bg-[#000514]/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center flex flex-col items-center gap-4 border border-[#eaedff]">
            <div className="w-16 h-16 rounded-full bg-[#85f8c4]/30 text-[#0e996b] flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl">task_alt</span>
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#000514]">
                {isBn ? 'আপনার অর্ডার সফল হয়েছে!' : 'Order Placed Successfully!'}
              </h3>
              <p className="text-xs text-[#75777e] mt-1">
                {isBn ? 'অর্ডার আইডি: ' : 'Order Reference: '}
                <span className="font-bold text-[#745b00] font-mono">{successOrderId}</span>
              </p>
            </div>
            <p className="text-xs text-[#44474d] leading-relaxed">
              {isBn
                ? 'ধন্যবাদ! ইউজিজি সুপার শপ প্রতিনিধি আপনার সাথে শীঘ্রই ফোনে যোগাযোগ করে ডেলিভারি নিশ্চিত করবেন।'
                : 'Thank you! Our dispatcher will contact you by telephone shortly to confirm and deliver your items.'}
            </p>
            <button
              type="button"
              onClick={() => setSuccessOrderId(null)}
              className="w-full py-2.5 bg-[#000514] text-white rounded-xl text-xs font-bold hover:bg-[#0d1e3a] cursor-pointer"
            >
              {isBn ? 'শপিংয়ে ফিরে যান' : 'Continue Shopping'}
            </button>
          </div>
        </div>
      )}

      {/* Customer Order Tracking & Policy Section */}
      <section className="w-full bg-[#eaedff]/40 py-16 mt-12 border-t border-[#eaedff]" id="tracking-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-10">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-[#eaedff] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex flex-col gap-1">
              <span className="text-xs text-[#745b00] uppercase font-bold tracking-wider">
                {isBn ? 'ডেলিভারি ট্র্যাকিং / Order Lookup' : 'Real-Time Order Lookup'}
              </span>
              <h3 className="font-serif text-xl font-bold text-[#000514]">
                {isBn ? 'আপনার অর্ডারের বর্তমান অবস্থা জানুন' : 'Track Your Package Status'}
              </h3>
              <p className="text-xs text-[#75777e] leading-relaxed">
                {isBn
                  ? 'আপনার অর্ডার ইনভয়েস নম্বর অথবা নিবন্ধিত মোবাইল নম্বর প্রবেশ করিয়ে রিয়েল-টাইম প্যাকেজিং ও রাইডার ডেলিভারি ট্র্যাক করুন।'
                  : 'Enter your invoice code or contact phone to monitor kitchen dispatch, packing, and courier progress.'}
              </p>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  placeholder={isBn ? 'উদা: UGG-83921 অথবা মোবাইল নম্বর' : 'e.g. UGG-83921 or Phone Number'}
                  className="flex-1 p-3 rounded-xl bg-[#f2f3ff] text-xs text-[#131b2e] outline-none border border-[#eaedff]"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!trackingInput.trim()) {
                      alert(isBn ? 'অনুগ্রহ করে অর্ডার আইডি অথবা মোবাইল নম্বর প্রদান করুন' : 'Please provide an Order ID or Phone number');
                      return;
                    }
                    setTrackingResultVisible(true);
                  }}
                  className="px-6 py-3 bg-[#000514] text-white hover:bg-[#0d1e3a] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">search</span>
                  <span>{isBn ? 'অনুসন্ধান করুন' : 'Track Order'}</span>
                </button>
              </div>

              {/* Tracking Timeline Simulation */}
              {trackingResultVisible && (
                <div className="mt-2 p-4 bg-[#f2f3ff] rounded-xl border border-[#eaedff] flex flex-col gap-3 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-[#eaedff] pb-2">
                    <span className="text-xs font-bold text-[#000514]">
                      {isBn ? 'অর্ডার স্ট্যাটাস: প্যাকেজিং সমাপ্ত' : 'Order Status: Packaged & Quality Checked'}
                    </span>
                    <span className="px-2 py-0.5 bg-[#fcd358] text-[#735a00] rounded text-[10px] font-bold">
                      {isBn ? 'রাইডার নির্ধারিত' : 'Rider Dispatched'}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 pt-1 text-center">
                    <div className="flex flex-col items-center">
                      <span className="w-7 h-7 rounded-full bg-[#000514] text-white flex items-center justify-center text-xs font-bold">
                        ✓
                      </span>
                      <span className="text-[11px] text-[#000514] mt-1 font-semibold">
                        {isBn ? 'অর্ডার গৃহীত' : 'Received'}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="w-7 h-7 rounded-full bg-[#000514] text-white flex items-center justify-center text-xs font-bold">
                        ✓
                      </span>
                      <span className="text-[11px] text-[#000514] mt-1 font-semibold">
                        {isBn ? 'প্যাকিং প্রস্তুত' : 'Packed'}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="w-7 h-7 rounded-full bg-[#745b00] text-white flex items-center justify-center text-xs font-bold animate-pulse">
                        3
                      </span>
                      <span className="text-[11px] text-[#745b00] font-bold mt-1">
                        {isBn ? 'অন দ্য ওয়ে' : 'On Route'}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="w-7 h-7 rounded-full bg-[#dae2fd] text-[#75777e] flex items-center justify-center text-xs font-bold">
                        4
                      </span>
                      <span className="text-[11px] text-[#75777e] mt-1">
                        {isBn ? 'ডেলিভার্ড' : 'Delivered'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#eaedff] flex items-start gap-4">
              <span className="material-symbols-outlined text-[#745b00] text-[32px] shrink-0">
                published_with_changes
              </span>
              <div className="flex flex-col gap-1">
                <h4 className="font-serif font-bold text-sm text-[#000514]">
                  {isBn ? '২৪ ঘণ্টার সহজ রিটার্ন নীতি' : '24-Hour Return Guarantee'}
                </h4>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  {isBn
                    ? 'পণ্য প্রাপ্তির সময় যেকোনো ত্রুটি বা গুণগত মানে অসঙ্গতি থাকলে কোনো প্রকার চার্জ ছাড়াই তাৎক্ষণিক প্রতিস্থাপন বা পূর্ণ অর্থ ফেরত সুবিধা।'
                    : 'Instant hassle-free replacement or full refund if any fresh item does not meet highest purity standards upon delivery.'}
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#eaedff] flex items-start gap-4">
              <span className="material-symbols-outlined text-[#745b00] text-[32px] shrink-0">
                health_and_safety
              </span>
              <div className="flex flex-col gap-1">
                <h4 className="font-serif font-bold text-sm text-[#000514]">
                  {isBn ? 'খাদ্য নিরাপত্তা ও হাইজিন' : 'Food Safety & Hygiene'}
                </h4>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  {isBn
                    ? 'সুপার শপের প্রতিটি কাঁচাবাজার ও খাদ্যসামগ্রী আন্তর্জাতিক HACCP স্ট্যান্ডার্ড মেনে গ্রেডিং, তাপমাত্রা নিয়ন্ত্রণ ও সিল্ড প্যাকেটে সরবরাহ করা হয়।'
                    : 'Every batch undergoes temperature control and sanitized, hermetic packaging compliant with HACCP food standards.'}
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#eaedff] flex items-start gap-4">
              <span className="material-symbols-outlined text-[#745b00] text-[32px] shrink-0">
                support_agent
              </span>
              <div className="flex flex-col gap-1">
                <h4 className="font-serif font-bold text-sm text-[#000514]">
                  {isBn ? '২৪/৭ কাস্টমার হেল্পডেস্ক' : '24/7 Member Helpdesk'}
                </h4>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  {isBn
                    ? 'যেকোনো জিজ্ঞাসা ও বিশেষ অর্ডারের জন্য কল করুন: 01700 000000 অথবা ইমেইল করুন support@unitygrowthgroup.com'
                    : 'For wholesale or priority assistance, call hotline: 01700 000000 or email support@unitygrowthgroup.com'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating POS / Admin Access Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setAdminPanelOpen(true)}
          className="px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-2xl border-2 border-slate-950 hover:scale-105 transition-all cursor-pointer group"
          title={isBn ? 'সুপার শপ অ্যাডমিন ও ক্যাশিয়ার কন্ট্রোল প্যানেল' : 'Super Shop Admin & POS Portal'}
        >
          <span className="material-symbols-outlined text-lg group-hover:rotate-12 transition-transform">
            point_of_sale
          </span>
          <span>{isBn ? 'অ্যাডমিন প্যানেল (আজকের সেল)' : 'Admin POS & Live Sales'}</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        </button>
      </div>

      {/* Super Shop Admin & POS Modal Portal */}
      <SuperShopAdminPanel
        language={language}
        isOpen={adminPanelOpen}
        onClose={() => setAdminPanelOpen(false)}
      />
    </div>
  );
};
