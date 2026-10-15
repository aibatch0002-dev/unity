import React, { useState, useEffect } from 'react';
import { Language, SuperShopSaleOrder, Product } from '../types';
import { productsData, toBanglaNumber, UGG_LOGO_URL } from '../data/mockData';
import {
  getStoredSalesOrders,
  computeSalesMetrics,
  recordNewSaleOrder,
  saveSalesOrdersToStorage,
  resetSalesOrdersToDefault,
  SalesMetrics
} from '../data/superShopSalesStore';

interface SuperShopAdminPanelProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
}

export const SuperShopAdminPanel: React.FC<SuperShopAdminPanelProps> = ({
  language,
  isOpen,
  onClose
}) => {
  const isBn = language === 'bn';

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('ugg_supershop_admin_logged_in') === 'true';
  });
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // Sales Orders & Metrics State
  const [orders, setOrders] = useState<SuperShopSaleOrder[]>(() => getStoredSalesOrders());
  const [metrics, setMetrics] = useState<SalesMetrics>(() => computeSalesMetrics(getStoredSalesOrders()));

  // Active filter tab
  const [activeFilter, setActiveFilter] = useState<'all' | 'today' | 'month' | 'year' | 'online' | 'counter'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Counter POS Quick Sale State
  const [selectedProductId, setSelectedProductId] = useState<string>(productsData[0]?.id || 'p1');
  const [posQuantity, setPosQuantity] = useState<number>(1);
  const [posPaymentMethod, setPosPaymentMethod] = useState<'cash' | 'bkash' | 'nagad' | 'card'>('cash');
  const [posCustomerName, setPosCustomerName] = useState<string>('');
  const [posCustomerPhone, setPosCustomerPhone] = useState<string>('');
  const [quickSaleSuccessToast, setQuickSaleSuccessToast] = useState<string | null>(null);

  // Digital Invoice Modal
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<SuperShopSaleOrder | null>(null);

  // Animation pulse triggers for live auto updates
  const [highlightKey, setHighlightKey] = useState<number>(0);

  // Refresh sales data and listen for updates
  const refreshSales = () => {
    const current = getStoredSalesOrders();
    setOrders(current);
    setMetrics(computeSalesMetrics(current));
    setHighlightKey((prev) => prev + 1);
  };

  useEffect(() => {
    const handleSalesUpdated = () => {
      refreshSales();
    };

    window.addEventListener('ugg_supershop_sales_updated', handleSalesUpdated);
    return () => {
      window.removeEventListener('ugg_supershop_sales_updated', handleSalesUpdated);
    };
  }, []);

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = userId.trim().toLowerCase();
    const cleanPass = password.trim();

    // Accepted demo credentials
    if (
      (cleanId === 'admin' && cleanPass === 'admin123') ||
      (cleanId === 'uggadmin' && cleanPass === 'ugg2024') ||
      (cleanId === 'manager' && cleanPass === '123456')
    ) {
      setIsAuthenticated(true);
      localStorage.setItem('ugg_supershop_admin_logged_in', 'true');
      setAuthError('');
    } else {
      setAuthError(
        isBn
          ? 'ভুল ইউজার আইডি অথবা পাসওয়ার্ড! (ডেমো: admin / admin123)'
          : 'Invalid User ID or Password! (Demo: admin / admin123)'
      );
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('ugg_supershop_admin_logged_in');
    setUserId('');
    setPassword('');
  };

  const handleAutofillDemo = () => {
    setUserId('admin');
    setPassword('admin123');
    setAuthError('');
  };

  // Quick Counter Sale submission
  const handleQuickPosSale = (e: React.FormEvent) => {
    e.preventDefault();
    const product = productsData.find((p) => p.id === selectedProductId) || productsData[0];
    const unitPrice = product.price;
    const itemTotal = unitPrice * posQuantity;

    const newOrder = recordNewSaleOrder({
      customerName: posCustomerName.trim() || (isBn ? 'কাউন্টার ওয়াক-ইন ক্রেতা' : 'Counter Walk-in Customer'),
      customerPhone: posCustomerPhone.trim() || '01700-000000',
      deliveryAddress: isBn ? 'সুপার শপ কাউন্টার সরাসরি বিক্রয়' : 'Super Shop Counter Direct POS',
      channel: 'counter-pos',
      items: [
        {
          productId: product.id,
          productName: isBn ? product.nameBn : (product.nameEn || product.nameBn),
          unitPrice,
          quantity: posQuantity,
          total: itemTotal,
          unitLabel: isBn ? product.unitBn : 'Unit'
        }
      ],
      subtotal: itemTotal,
      deliveryFee: 0,
      discount: 0,
      grandTotal: itemTotal,
      paymentMethod: posPaymentMethod,
      status: 'delivered'
    });

    refreshSales();

    setQuickSaleSuccessToast(
      isBn
        ? `✅ বিক্রয় সম্পন্ন! #${newOrder.orderNumber} - ৳${toBanglaNumber(itemTotal)} অটো হিসাবে যোগ করা হয়েছে!`
        : `✅ Sale Recorded! #${newOrder.orderNumber} - ৳${itemTotal} automatically credited!`
    );

    setTimeout(() => {
      setQuickSaleSuccessToast(null);
    }, 4000);

    // Reset inputs
    setPosQuantity(1);
    setPosCustomerName('');
    setPosCustomerPhone('');
  };

  // Simulate Instant Customer Sale
  const handleSimulateOnlineSale = () => {
    const demoItems = [
      { product: productsData[1], qty: 2 }, // Ghee
      { product: productsData[2], qty: 3 }  // Chinigura Rice
    ];

    const items = demoItems.map(({ product, qty }) => ({
      productId: product.id,
      productName: isBn ? product.nameBn : (product.nameEn || product.nameBn),
      unitPrice: product.price,
      quantity: qty,
      total: product.price * qty,
      unitLabel: isBn ? product.unitBn : 'Pack'
    }));

    const subtotal = items.reduce((s, it) => s + it.total, 0);
    const grandTotal = subtotal;

    const simulatedOrder = recordNewSaleOrder({
      customerName: isBn ? 'অনলাইন ক্রেতা (সিমুলেশন)' : 'Online Customer (Simulation)',
      customerPhone: '01712-334455',
      deliveryAddress: isBn ? 'উত্তরা সেক্টর ১১, ঢাকা' : 'Sector 11, Uttara, Dhaka',
      channel: 'online',
      items,
      subtotal,
      deliveryFee: 0,
      discount: 0,
      grandTotal,
      paymentMethod: 'bkash',
      status: 'processing'
    });

    refreshSales();

    setQuickSaleSuccessToast(
      isBn
        ? `⚡ অটো বিক্রয় সিমুলেশন সফল! অর্ডার #${simulatedOrder.orderNumber} - ৳${toBanglaNumber(grandTotal)} যোগ হয়েছে!`
        : `⚡ Simulated Sale Added! Order #${simulatedOrder.orderNumber} - ৳${grandTotal} auto calculated!`
    );

    setTimeout(() => {
      setQuickSaleSuccessToast(null);
    }, 4500);
  };

  // Filter orders
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDate = now.getDate();

  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    const matchesFilter = (() => {
      if (activeFilter === 'today') {
        return (
          orderDate.getFullYear() === currentYear &&
          orderDate.getMonth() === currentMonth &&
          orderDate.getDate() === currentDate
        );
      }
      if (activeFilter === 'month') {
        return orderDate.getFullYear() === currentYear && orderDate.getMonth() === currentMonth;
      }
      if (activeFilter === 'year') {
        return orderDate.getFullYear() === currentYear;
      }
      if (activeFilter === 'online') {
        return order.channel === 'online';
      }
      if (activeFilter === 'counter') {
        return order.channel === 'counter-pos';
      }
      return true;
    })();

    const matchesSearch =
      searchQuery === '' ||
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerPhone.includes(searchQuery) ||
      order.items.some((it) => it.productName.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  const handleUpdateStatus = (orderId: string, newStatus: SuperShopSaleOrder['status']) => {
    const updated = orders.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord));
    saveSalesOrdersToStorage(updated);
    setOrders(updated);
    setMetrics(computeSalesMetrics(updated));
  };

  const handleResetData = () => {
    if (
      window.confirm(
        isBn
          ? 'আপনি কি নিশ্চিত যে সকল টেস্ট সেল রিসেট করে ডিফল্ট সেটিংসে ফিরতে চান?'
          : 'Are you sure you want to reset all test sales back to default baseline?'
      )
    ) {
      const reset = resetSalesOrdersToDefault();
      setOrders(reset);
      setMetrics(computeSalesMetrics(reset));
      setQuickSaleSuccessToast(
        isBn ? 'সকল সেল ডেটা সফলভাবে রিসেট করা হয়েছে!' : 'Sales data restored to default baseline.'
      );
      setTimeout(() => setQuickSaleSuccessToast(null), 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#000514]/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-[#0b1329] border border-amber-500/30 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[92vh] flex flex-col text-slate-100 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="bg-[#0e1a38] px-5 py-4 border-b border-amber-500/20 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-md">
              <span className="material-symbols-outlined text-2xl font-bold">point_of_sale</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">
                  {isBn ? 'সুপার শপ অ্যাডমিন ও ক্যাশিয়ার কন্ট্রোল প্যানেল' : 'Super Shop Admin & POS Portal'}
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {isBn ? 'স্বয়ংক্রিয় হিসাব' : 'Auto Calculate'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {isBn
                  ? 'দৈনিক, মাসিক, বার্ষিক ও সর্বমোট বিক্রয়ের রিয়েল-টাইম হিসাব'
                  : 'Real-time sales analytics: Today, Month, Year & Lifetime'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>{isBn ? 'লাইভ অটো হিসাব সক্রিয়' : 'Live Auto Sync Active'}</span>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition flex items-center gap-1 cursor-pointer"
                  title={isBn ? 'অ্যাডমিন থেকে লগআউট' : 'Sign Out'}
                >
                  <span className="material-symbols-outlined text-[16px]">logout</span>
                  <span className="hidden sm:inline">{isBn ? 'লগআউট' : 'Sign Out'}</span>
                </button>
              </>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-rose-900/60 text-slate-400 hover:text-white transition cursor-pointer"
              aria-label="Close"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>

        {/* Success Toast */}
        {quickSaleSuccessToast && (
          <div className="bg-emerald-600 text-white px-5 py-2.5 text-xs sm:text-sm font-semibold flex items-center justify-between border-b border-emerald-500 animate-in fade-in">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base">check_circle</span>
              <span>{quickSaleSuccessToast}</span>
            </div>
            <button
              type="button"
              onClick={() => setQuickSaleSuccessToast(null)}
              className="text-white/80 hover:text-white text-xs underline cursor-pointer"
            >
              {isBn ? 'বন্ধ' : 'Dismiss'}
            </button>
          </div>
        )}

        {/* Panel Content */}
        {!isAuthenticated ? (
          /* ================= LOGIN FORM ================= */
          <div className="p-6 sm:p-10 flex flex-col items-center justify-center my-auto">
            <div className="max-w-md w-full bg-[#111c3d] rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col gap-5">
              <div className="text-center flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-1">
                  <span className="material-symbols-outlined text-3xl">lock</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-white">
                  {isBn ? 'অ্যাডমিন প্রবেশাধিকার' : 'Admin Portal Login'}
                </h3>
                <p className="text-xs text-slate-400 max-w-sm">
                  {isBn
                    ? 'সুপার শপের আজকের, চলতি মাসের, বার্ষিক বিক্রয় ও অটো সিস্টেম দেখতে ইউজার আইডি ও পাসওয়ার্ড দিন।'
                    : 'Enter authorized admin credentials to inspect today, month, and year sales and live auto calculations.'}
                </p>
              </div>

              {authError && (
                <div className="p-3 rounded-lg bg-rose-950/70 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-base shrink-0">error</span>
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    {isBn ? 'ইউজার আইডি / অ্যাডমিন কোড' : 'User ID / Admin Username'}
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-500 text-[18px]">
                      person
                    </span>
                    <input
                      type="text"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      placeholder="admin"
                      required
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-amber-400 focus:outline-none transition"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    {isBn ? 'পাসওয়ার্ড' : 'Password'}
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-500 text-[18px]">
                      key
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-amber-400 focus:outline-none transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-amber-400/10 rounded-xl border border-amber-400/20 text-xs flex flex-col gap-2 text-amber-200">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">info</span>
                      {isBn ? 'ডেমো অ্যাডমিন তথ্য:' : 'Demo Credentials:'}
                    </span>
                    <button
                      type="button"
                      onClick={handleAutofillDemo}
                      className="text-amber-400 hover:text-amber-300 underline font-bold cursor-pointer"
                    >
                      {isBn ? 'অটো-ফিল করুন' : 'Autofill Demo'}
                    </button>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[11px] text-amber-300 bg-amber-950/40 px-2.5 py-1.5 rounded-lg border border-amber-500/20">
                    <span>User: <strong>admin</strong></span>
                    <span>Pass: <strong>admin123</strong></span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2 cursor-pointer mt-1"
                >
                  <span className="material-symbols-outlined text-lg">login</span>
                  <span>{isBn ? 'লগইন করে ড্যাশবোর্ডে প্রবেশ করুন' : 'Log In & Access Sales Dashboard'}</span>
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* ================= LOGGED IN SALES DASHBOARD ================= */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-6">

            {/* Top Auto-Hisab Announcement Bar */}
            <div className="p-3.5 bg-gradient-to-r from-amber-950/40 via-[#13234d] to-emerald-950/40 rounded-xl border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold shrink-0">
                  <span className="material-symbols-outlined text-[20px]">sync_alt</span>
                </div>
                <div>
                  <div className="text-white font-bold flex items-center gap-2">
                    <span>{isBn ? 'অটো হিসাব সিস্টেম সক্রিয় (Auto Calculation System Live)' : 'Automatic Sales Calculation System Active'}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                      LIVE
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    {isBn
                      ? 'সুপার শপে কোনো গ্রাহক পণ্য অর্ডার করলে অথবা কাউন্টারে বিক্রি হলে সাথে সাথে আজকের, চলতি মাসের, চলতি বছরের ও সর্বমোট সেল অটো আপডেট হয়।'
                      : 'When any item is purchased online or at the counter, Today, Month, Year, and Lifetime sales immediately update automatically.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleSimulateOnlineSale}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition cursor-pointer"
                  title={isBn ? 'একটি টেস্ট কাস্টমার অর্ডার তৈরি করে অটো হিসাব পরীক্ষা করুন' : 'Simulate an instant customer order to test auto calculation'}
                >
                  <span className="material-symbols-outlined text-[16px]">bolt</span>
                  <span>{isBn ? '⚡ টেস্ট সেল যোগ করুন' : '⚡ Simulate Test Sale'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetData}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition cursor-pointer"
                  title={isBn ? 'ডিফল্ট ডেটা রিসেট' : 'Reset Data'}
                >
                  <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                </button>
              </div>
            </div>

            {/* ================= 4 PRIMARY SALES STATS CARDS ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" key={highlightKey}>
              
              {/* Card 1: Today's Sale */}
              <div className="bg-[#111d40] rounded-2xl p-5 border border-amber-500/40 shadow-lg relative overflow-hidden group hover:border-amber-400 transition">
                <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-amber-500/10 pointer-events-none"></div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">today</span>
                    {isBn ? 'আজকের মোট বিক্রয়' : "Today's Sale"}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300">
                    {isBn ? `${toBanglaNumber(metrics.todayCount)} টি অর্ডার` : `${metrics.todayCount} Orders`}
                  </span>
                </div>

                <div className="flex items-baseline gap-1 my-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    ৳{isBn ? toBanglaNumber(metrics.todayTotal.toLocaleString()) : metrics.todayTotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-700/60 text-[11px] text-slate-400">
                  <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[13px]">trending_up</span>
                    {isBn ? 'রিয়েল-টাইম লাইভ' : 'Real-time live'}
                  </span>
                  <span>{isBn ? 'আজকের তারিখ অনুযায়ী' : 'For current day'}</span>
                </div>
              </div>

              {/* Card 2: This Month's Sale */}
              <div className="bg-[#111d40] rounded-2xl p-5 border border-sky-500/40 shadow-lg relative overflow-hidden group hover:border-sky-400 transition">
                <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-sky-500/10 pointer-events-none"></div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                    {isBn ? 'চলতি মাসের মোট বিক্রয়' : "This Month's Sale"}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-400/20 text-sky-300">
                    {isBn ? `${toBanglaNumber(metrics.monthCount)} টি অর্ডার` : `${metrics.monthCount} Orders`}
                  </span>
                </div>

                <div className="flex items-baseline gap-1 my-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    ৳{isBn ? toBanglaNumber(metrics.monthTotal.toLocaleString()) : metrics.monthTotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-700/60 text-[11px] text-slate-400">
                  <span className="text-sky-300 font-medium">
                    {isBn ? 'অক্টোবর ২০২৬' : 'October 2026'}
                  </span>
                  <span>{isBn ? 'চলতি ক্যালেন্ডার মাস' : 'Current month'}</span>
                </div>
              </div>

              {/* Card 3: This Year's Sale */}
              <div className="bg-[#111d40] rounded-2xl p-5 border border-violet-500/40 shadow-lg relative overflow-hidden group hover:border-violet-400 transition">
                <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-violet-500/10 pointer-events-none"></div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-violet-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">event</span>
                    {isBn ? 'চলতি বছরের মোট বিক্রয়' : "This Year's Sale"}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-400/20 text-violet-300">
                    {isBn ? `${toBanglaNumber(metrics.yearCount)} টি অর্ডার` : `${metrics.yearCount} Orders`}
                  </span>
                </div>

                <div className="flex items-baseline gap-1 my-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    ৳{isBn ? toBanglaNumber(metrics.yearTotal.toLocaleString()) : metrics.yearTotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-700/60 text-[11px] text-slate-400">
                  <span className="text-violet-300 font-medium">
                    {isBn ? 'অর্থবছর ২০২৬' : 'FY 2026'}
                  </span>
                  <span>{isBn ? 'চলতি অর্থবছর' : 'Year to date'}</span>
                </div>
              </div>

              {/* Card 4: All-Time Lifetime Sale */}
              <div className="bg-[#111d40] rounded-2xl p-5 border border-emerald-500/40 shadow-lg relative overflow-hidden group hover:border-emerald-400 transition">
                <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-emerald-500/10 pointer-events-none"></div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    {isBn ? 'সর্বমোট বিক্রয় (লাইফটাইম)' : 'Total All-Time Sale'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-400/20 text-emerald-300">
                    {isBn ? `${toBanglaNumber(metrics.allTimeCount)} টি অর্ডার` : `${metrics.allTimeCount} Orders`}
                  </span>
                </div>

                <div className="flex items-baseline gap-1 my-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    ৳{isBn ? toBanglaNumber(metrics.allTimeTotal.toLocaleString()) : metrics.allTimeTotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-700/60 text-[11px] text-slate-400">
                  <span>
                    {isBn
                      ? `মোট পণ্য ইউনিট: ${toBanglaNumber(metrics.totalItemsSold)}`
                      : `Total Units Sold: ${metrics.totalItemsSold}`}
                  </span>
                  <span className="text-emerald-400 font-bold">{isBn ? 'সর্বমোট সমবায় বিক্রয়' : 'All channels'}</span>
                </div>
              </div>
            </div>

            {/* ================= QUICK POS / COUNTER SALE SECTION ================= */}
            <div className="bg-[#101b3b] rounded-2xl p-5 border border-slate-800 shadow-md">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-400 text-xl">shopping_bag</span>
                  <h3 className="font-serif text-base font-bold text-white">
                    {isBn ? 'কাউন্টার বিক্রয় ও পিওএস এন্ট্রি (ইনস্ট্যান্ট অটো হিসাব)' : 'Counter POS Sale Entry (Instant Auto Sync)'}
                  </h3>
                </div>
                <span className="text-xs text-slate-400">
                  {isBn
                    ? 'সরাসরি শপে বিক্রি হওয়া পণ্য যুক্ত করুন, সাথে সাথে আজকের সেল ও সব হিসাব বেড়ে যাবে।'
                    : 'Record walk-in counter sales to automatically update today, month & year revenues.'}
                </span>
              </div>

              <form onSubmit={handleQuickPosSale} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-end">
                {/* Select Product */}
                <div className="lg:col-span-2 flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-300">
                    {isBn ? 'পণ্য নির্বাচন করুন *' : 'Select Product *'}
                  </label>
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-amber-400 outline-none"
                  >
                    {productsData.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {isBn ? prod.nameBn : (prod.nameEn || prod.nameBn)} - ৳{isBn ? toBanglaNumber(prod.price) : prod.price} ({isBn ? prod.unitBn : 'Pack'})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity */}
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-300">
                    {isBn ? 'পরিমাণ (Quantity) *' : 'Quantity *'}
                  </label>
                  <div className="flex items-center rounded-xl bg-slate-900 border border-slate-700 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setPosQuantity((q) => Math.max(1, q - 1))}
                      className="px-2.5 py-2 hover:bg-slate-800 text-slate-300 text-xs font-bold"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={posQuantity}
                      onChange={(e) => setPosQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full text-center bg-transparent text-white text-xs font-bold outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setPosQuantity((q) => q + 1)}
                      className="px-2.5 py-2 hover:bg-slate-800 text-slate-300 text-xs font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-300">
                    {isBn ? 'পেমেন্ট মাধ্যম' : 'Payment Method'}
                  </label>
                  <select
                    value={posPaymentMethod}
                    onChange={(e) => setPosPaymentMethod(e.target.value as any)}
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-amber-400 outline-none"
                  >
                    <option value="cash">{isBn ? 'ক্যাশ (নগদ)' : 'Cash'}</option>
                    <option value="bkash">{isBn ? 'বিকাশ' : 'bKash'}</option>
                    <option value="nagad">{isBn ? 'নগদ' : 'Nagad'}</option>
                    <option value="card">{isBn ? 'ডেবিট/ক্রেডিট কার্ড' : 'Card'}</option>
                  </select>
                </div>

                {/* Customer Phone (Optional) */}
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-300">
                    {isBn ? 'ক্রেতার ফোন (ঐচ্ছিক)' : 'Phone (Optional)'}
                  </label>
                  <input
                    type="text"
                    placeholder="017XX-XXXXXX"
                    value={posCustomerPhone}
                    onChange={(e) => setPosCustomerPhone(e.target.value)}
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-amber-400 outline-none"
                  />
                </div>

                {/* Sell Now Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[17px]">point_of_sale</span>
                    <span>{isBn ? 'বিক্রয় কনফার্ম করুন' : 'Confirm Sale'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* ================= SALES LEDGER & TRANSACTIONS ================= */}
            <div className="bg-[#101b3b] rounded-2xl p-5 border border-slate-800 shadow-md flex flex-col gap-4">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 flex-wrap">
                <div>
                  <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-amber-400 text-lg">receipt_long</span>
                    <span>{isBn ? 'বিক্রয় ও অর্ডার বিস্তারিত তালিকা' : 'Sales & Orders Ledger'}</span>
                    <span className="text-xs font-normal text-slate-400">
                      ({isBn ? `${toBanglaNumber(filteredOrders.length)} টি রেকর্ড` : `${filteredOrders.length} records`})
                    </span>
                  </h3>
                </div>

                {/* Search Bar */}
                <div className="relative w-full sm:w-64">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">
                    search
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isBn ? 'অর্ডার কোড, নাম বা ফোন নম্বর...' : 'Order #, Name, Phone...'}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-amber-400 outline-none"
                  />
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'all', labelBn: 'সকল সেল', labelEn: 'All Sales' },
                  { id: 'today', labelBn: 'আজকের সেল', labelEn: "Today's Sales" },
                  { id: 'month', labelBn: 'চলতি মাস (অক্টোবর)', labelEn: 'This Month' },
                  { id: 'year', labelBn: 'চলতি বছর (২০২৬)', labelEn: 'This Year' },
                  { id: 'online', labelBn: 'অনলাইন শপ অর্ডার', labelEn: 'Online Store' },
                  { id: 'counter', labelBn: 'কাউন্টার পিওএস বিক্রয়', labelEn: 'Counter POS' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveFilter(tab.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                      activeFilter === tab.id
                        ? 'bg-amber-400 text-slate-950 shadow-sm'
                        : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    {isBn ? tab.labelBn : tab.labelEn}
                  </button>
                ))}
              </div>

              {/* Transactions Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#0b1329] text-[11px] text-slate-400 uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">{isBn ? 'অর্ডার নং' : 'Order ID'}</th>
                      <th className="py-3 px-4">{isBn ? 'তারিখ ও সময়' : 'Date & Time'}</th>
                      <th className="py-3 px-4">{isBn ? 'ক্রেতা ও চ্যানেল' : 'Customer & Channel'}</th>
                      <th className="py-3 px-4">{isBn ? 'পণ্যসমূহ' : 'Purchased Items'}</th>
                      <th className="py-3 px-4">{isBn ? 'মোট মূল্য' : 'Grand Total'}</th>
                      <th className="py-3 px-4">{isBn ? 'পেমেন্ট' : 'Payment'}</th>
                      <th className="py-3 px-4">{isBn ? 'স্ট্যাটাস' : 'Status'}</th>
                      <th className="py-3 px-4 text-right">{isBn ? 'অ্যাকশন' : 'Action'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-[#0f1836]">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-slate-500">
                          {isBn ? 'কোনো অর্ডার পাওয়া যায়নি।' : 'No sales orders found matching your filter.'}
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => {
                        const dateObj = new Date(order.createdAt);
                        const dateFormatted = dateObj.toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        });
                        const timeFormatted = dateObj.toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        });

                        return (
                          <tr key={order.id} className="hover:bg-slate-800/50 transition">
                            <td className="py-3 px-4 font-mono font-bold text-amber-300 whitespace-nowrap">
                              {order.orderNumber}
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap text-slate-400 text-[11px]">
                              <div>{dateFormatted}</div>
                              <div className="text-[10px] text-slate-500">{timeFormatted}</div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="font-semibold text-white">{order.customerName}</div>
                              <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                                <span>{order.customerPhone}</span>
                                <span
                                  className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                                    order.channel === 'online'
                                      ? 'bg-sky-950 text-sky-300 border border-sky-800'
                                      : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                  }`}
                                >
                                  {order.channel === 'online' ? (isBn ? 'অনলাইন' : 'Online') : (isBn ? 'কাউন্টার' : 'POS')}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4 max-w-xs">
                              <div className="text-[11px] text-slate-200 line-clamp-2">
                                {order.items.map((it, idx) => (
                                  <span key={idx} className="mr-1">
                                    {it.productName} × {isBn ? toBanglaNumber(it.quantity) : it.quantity}
                                    {idx < order.items.length - 1 ? ', ' : ''}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="py-3 px-4 font-bold text-white whitespace-nowrap">
                              ৳{isBn ? toBanglaNumber(order.grandTotal.toLocaleString()) : order.grandTotal.toLocaleString()}
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                                {order.paymentMethod}
                              </span>
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              <select
                                value={order.status}
                                onChange={(e) => handleUpdateStatus(order.id, e.target.value as any)}
                                className={`text-[10px] font-bold rounded-lg px-2 py-1 outline-none border cursor-pointer ${
                                  order.status === 'delivered'
                                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/50'
                                    : order.status === 'processing'
                                    ? 'bg-amber-950/80 text-amber-300 border-amber-700/50'
                                    : 'bg-slate-800 text-slate-300 border-slate-700'
                                }`}
                              >
                                <option value="processing">{isBn ? 'প্যাকিং চলছে' : 'Processing'}</option>
                                <option value="delivered">{isBn ? 'সম্পন্ন / পেইড' : 'Delivered / Paid'}</option>
                                <option value="cancelled">{isBn ? 'বাতিল' : 'Cancelled'}</option>
                              </select>
                            </td>
                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => setSelectedOrderForInvoice(order)}
                                className="px-2.5 py-1 rounded-lg bg-amber-400/20 hover:bg-amber-400 text-amber-300 hover:text-slate-950 font-semibold text-xs border border-amber-400/30 transition flex items-center gap-1 ml-auto cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-[14px]">receipt</span>
                                <span>{isBn ? 'ইনভয়েস' : 'Receipt'}</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Bottom Metrics Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800 gap-2">
                <div>
                  {isBn
                    ? `ফিল্টারকৃত বিক্রয় যোগফল: ৳${toBanglaNumber(filteredOrders.reduce((sum, o) => sum + o.grandTotal, 0).toLocaleString())}`
                    : `Filtered Total: ৳${filteredOrders.reduce((sum, o) => sum + o.grandTotal, 0).toLocaleString()}`}
                </div>
                <div className="text-[11px] text-slate-500">
                  {isBn
                    ? 'ইউজিজি সমবায় রিটেইল ফাইন্যান্সিয়াল লেজার • সুরক্ষিত এনক্রিপ্টেড ডাটাবেজ'
                    : 'UGG Cooperative Retail Financial Ledger • End-to-End Audited'}
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* ================= INVOICE / RECEIPT MODAL ================= */}
      {selectedOrderForInvoice && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-4 border border-slate-200 animate-in fade-in zoom-in-95">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <img src={UGG_LOGO_URL} alt="UGG" className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <h4 className="font-serif font-bold text-sm text-slate-900 leading-tight">
                    {isBn ? 'ইউজিজি সুপার শপ ও ফ্রেশ মার্ট' : 'UGG Super Shop & Fresh Mart'}
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    {isBn ? 'ক্যাশ মেমো ও অফিসিয়াল বিক্রয় চালান' : 'Official Sales Receipt & Invoice'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrderForInvoice(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Order meta */}
            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div>
                <span className="text-[10px] text-slate-500 uppercase">{isBn ? 'ইনভয়েস নং' : 'Invoice #'}:</span>
                <p className="font-mono font-bold text-slate-800">{selectedOrderForInvoice.orderNumber}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase">{isBn ? 'তারিখ' : 'Date'}:</span>
                <p className="font-semibold text-slate-800">
                  {new Date(selectedOrderForInvoice.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase">{isBn ? 'ক্রেতা' : 'Customer'}:</span>
                <p className="font-semibold text-slate-800">{selectedOrderForInvoice.customerName}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase">{isBn ? 'ফোন / চ্যানেল' : 'Phone / Channel'}:</span>
                <p className="font-semibold text-slate-800">
                  {selectedOrderForInvoice.customerPhone} ({selectedOrderForInvoice.channel.toUpperCase()})
                </p>
              </div>
            </div>

            {/* Items table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-[10px] uppercase text-slate-600 font-bold">
                  <tr>
                    <th className="py-2 px-3">{isBn ? 'পণ্য' : 'Item'}</th>
                    <th className="py-2 px-3 text-center">{isBn ? 'পরিমাণ' : 'Qty'}</th>
                    <th className="py-2 px-3 text-right">{isBn ? 'দর' : 'Rate'}</th>
                    <th className="py-2 px-3 text-right">{isBn ? 'মোট' : 'Total'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedOrderForInvoice.items.map((it, idx) => (
                    <tr key={idx}>
                      <td className="py-2 px-3 font-medium text-slate-800">{it.productName}</td>
                      <td className="py-2 px-3 text-center text-slate-600">
                        {isBn ? toBanglaNumber(it.quantity) : it.quantity}
                      </td>
                      <td className="py-2 px-3 text-right text-slate-600">
                        ৳{isBn ? toBanglaNumber(it.unitPrice) : it.unitPrice}
                      </td>
                      <td className="py-2 px-3 text-right font-bold text-slate-900">
                        ৳{isBn ? toBanglaNumber(it.total) : it.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary calculation */}
            <div className="flex flex-col gap-1 text-xs border-t border-slate-200 pt-2">
              <div className="flex justify-between text-slate-600">
                <span>{isBn ? 'সাবটোটাল' : 'Subtotal'}:</span>
                <span>৳{isBn ? toBanglaNumber(selectedOrderForInvoice.subtotal) : selectedOrderForInvoice.subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{isBn ? 'ডেলিভারি ফি' : 'Delivery Fee'}:</span>
                <span>৳{isBn ? toBanglaNumber(selectedOrderForInvoice.deliveryFee) : selectedOrderForInvoice.deliveryFee}</span>
              </div>
              {selectedOrderForInvoice.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>{isBn ? 'সদস্য ছাড়' : 'Member Rebate'}:</span>
                  <span>-৳{isBn ? toBanglaNumber(selectedOrderForInvoice.discount) : selectedOrderForInvoice.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-slate-900 border-t border-slate-200 pt-1">
                <span>{isBn ? 'সর্বমোট প্রদেয় বিল' : 'Grand Total'}:</span>
                <span className="text-amber-700">
                  ৳{isBn ? toBanglaNumber(selectedOrderForInvoice.grandTotal) : selectedOrderForInvoice.grandTotal}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                {isBn ? 'পেমেন্ট মেথড: ' : 'Payment Method: '}
                <span className="font-bold uppercase text-slate-700">{selectedOrderForInvoice.paymentMethod}</span>
              </div>
            </div>

            {/* Print & Close */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">print</span>
                <span>{isBn ? 'প্রিন্ট রশিদ' : 'Print Receipt'}</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedOrderForInvoice(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold cursor-pointer"
              >
                {isBn ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
