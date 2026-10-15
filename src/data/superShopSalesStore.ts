import { SuperShopSaleOrder, SuperShopSaleItem } from '../types';

const STORAGE_KEY = 'ugg_supershop_sales_orders_v2';

// Helper to construct realistic dates based on current time
const getPastDate = (daysAgo: number, hoursAgo = 0, minutesAgo = 0): string => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(d.getHours() - hoursAgo);
  d.setMinutes(d.getMinutes() - minutesAgo);
  return d.toISOString();
};

const getSeedOrders = (): SuperShopSaleOrder[] => [
  // Today's orders
  {
    id: 'ord-today-1',
    orderNumber: 'UGG-84201',
    customerName: 'তানভীর আহমেদ',
    customerPhone: '01711-234567',
    deliveryAddress: 'হাউস #১২, রোড #৪, সেক্টর #৩, উত্তরা, ঢাকা',
    channel: 'online',
    items: [
      { productId: 'p2', productName: 'প্রিমিয়াম গাওয়া ঘি (Pure Organic Cow Ghee)', unitPrice: 1250, quantity: 2, total: 2500, unitLabel: '৯০০ গ্রাম' },
      { productId: 'p3', productName: 'সুগন্ধি চিনিগুঁড়া চাল (Chinigura Rice)', unitPrice: 160, quantity: 5, total: 800, unitLabel: '১ কেজি' }
    ],
    subtotal: 3300,
    deliveryFee: 0,
    discount: 0,
    grandTotal: 3300,
    paymentMethod: 'bkash',
    status: 'processing',
    createdAt: getPastDate(0, 1, 20)
  },
  {
    id: 'ord-today-2',
    orderNumber: 'UGG-84202',
    customerName: 'রাশেদ খান',
    customerPhone: '01819-987654',
    deliveryAddress: 'উপশহর মেইন রোড, রাজশাহী',
    channel: 'counter-pos',
    items: [
      { productId: 'p4', productName: 'ঘানিভাঙa সরিষার তেল (Mustard Oil)', unitPrice: 320, quantity: 3, total: 960, unitLabel: '১ লিটার' },
      { productId: 'p1', productName: 'অর্গানিক লাল টমেটো (Organic Tomatoes)', unitPrice: 85, quantity: 4, total: 340, unitLabel: '১ কেজি' }
    ],
    subtotal: 1300,
    deliveryFee: 0,
    discount: 50,
    grandTotal: 1250,
    paymentMethod: 'cash',
    status: 'delivered',
    createdAt: getPastDate(0, 3, 10)
  },
  {
    id: 'ord-today-3',
    orderNumber: 'UGG-84203',
    customerName: 'ড. রেহনুমা ফেরদৌস',
    customerPhone: '01912-345678',
    deliveryAddress: 'প্লট #৪৫, ধানমন্ডি আ/এ, ঢাকা',
    channel: 'online',
    items: [
      { productId: 'p2', productName: 'প্রিমিয়াম গাওয়া ঘি', unitPrice: 1250, quantity: 1, total: 1250, unitLabel: '৯০০ গ্রাম' },
      { productId: 'p5', productName: 'পাহাড়ি হলুদ গুঁড়া', unitPrice: 190, quantity: 2, total: 380, unitLabel: '৫০০ গ্রাম' },
      { productId: 'p6', productName: 'মাল্টিগ্রেন ওটস কুকিজ', unitPrice: 240, quantity: 2, total: 480, unitLabel: '৩০০ গ্রাম' }
    ],
    subtotal: 2110,
    deliveryFee: 0,
    discount: 105,
    grandTotal: 2005,
    paymentMethod: 'nagad',
    status: 'delivered',
    createdAt: getPastDate(0, 5, 45)
  },
  {
    id: 'ord-today-4',
    orderNumber: 'UGG-84204',
    customerName: 'মো: শরিফুল আলম',
    customerPhone: '01715-443322',
    deliveryAddress: 'কাউন্টার সরাসরি বিক্রয়',
    channel: 'counter-pos',
    items: [
      { productId: 'p3', productName: 'সুগন্ধি চিনিগুঁড়া চাল', unitPrice: 160, quantity: 10, total: 1600, unitLabel: '১ কেজি' }
    ],
    subtotal: 1600,
    deliveryFee: 0,
    discount: 0,
    grandTotal: 1600,
    paymentMethod: 'card',
    status: 'delivered',
    createdAt: getPastDate(0, 7, 15)
  },

  // Earlier this month (October 2026)
  {
    id: 'ord-month-1',
    orderNumber: 'UGG-83950',
    customerName: 'ফারহানা ইসলাম',
    customerPhone: '01678-112233',
    deliveryAddress: 'বনানী ডিওএইচএস, ঢাকা',
    channel: 'online',
    items: [
      { productId: 'p2', productName: 'প্রিমিয়াম গাওয়া ঘি', unitPrice: 1250, quantity: 4, total: 5000 },
      { productId: 'p4', productName: 'ঘানিভাঙা সরিষার তেল', unitPrice: 320, quantity: 5, total: 1600 }
    ],
    subtotal: 6600,
    deliveryFee: 0,
    discount: 300,
    grandTotal: 6300,
    paymentMethod: 'bkash',
    status: 'delivered',
    createdAt: getPastDate(3, 4)
  },
  {
    id: 'ord-month-2',
    orderNumber: 'UGG-83812',
    customerName: 'প্রকৌশলী মশিউর রহমান',
    customerPhone: '01712-998877',
    deliveryAddress: 'কাজলা, রাজশাহী',
    channel: 'counter-pos',
    items: [
      { productId: 'p3', productName: 'সুগন্ধি চিনিগুঁড়া চাল', unitPrice: 160, quantity: 25, total: 4000 }
    ],
    subtotal: 4000,
    deliveryFee: 0,
    discount: 100,
    grandTotal: 3900,
    paymentMethod: 'cash',
    status: 'delivered',
    createdAt: getPastDate(6, 2)
  },
  {
    id: 'ord-month-3',
    orderNumber: 'UGG-83640',
    customerName: 'মো: জাহিদুল করিম',
    customerPhone: '01844-556677',
    deliveryAddress: 'উত্তরা সেক্টর ৭, ঢাকা',
    channel: 'online',
    items: [
      { productId: 'p2', productName: 'প্রিমিয়াম গাওয়া ঘি', unitPrice: 1250, quantity: 6, total: 7500 },
      { productId: 'p5', productName: 'পাহাড়ি হলুদ গুঁড়া', unitPrice: 190, quantity: 5, total: 950 }
    ],
    subtotal: 8450,
    deliveryFee: 0,
    discount: 400,
    grandTotal: 8050,
    paymentMethod: 'bkash',
    status: 'delivered',
    createdAt: getPastDate(9, 6)
  },
  {
    id: 'ord-month-4',
    orderNumber: 'UGG-83490',
    customerName: 'সুলতানা পারভীন',
    customerPhone: '01911-002233',
    deliveryAddress: 'মিরপুর ডিওএইচএস, ঢাকা',
    channel: 'online',
    items: [
      { productId: 'p4', productName: 'ঘানিভাঙা সরিষার তেল', unitPrice: 320, quantity: 10, total: 3200 },
      { productId: 'p6', productName: 'মাল্টিগ্রেন ওটস কুকিজ', unitPrice: 240, quantity: 6, total: 1440 }
    ],
    subtotal: 4640,
    deliveryFee: 0,
    discount: 150,
    grandTotal: 4490,
    paymentMethod: 'card',
    status: 'delivered',
    createdAt: getPastDate(12, 5)
  },

  // Earlier this year (Earlier months in 2026)
  {
    id: 'ord-year-1',
    orderNumber: 'UGG-81200',
    customerName: 'গ্রোথ হোল্ডিংস কর্পোরেট বাল্ক অর্ডার',
    customerPhone: '01711-000111',
    deliveryAddress: 'মতিঝিল বাণিজ্যিক এলাকা, ঢাকা',
    channel: 'counter-pos',
    items: [
      { productId: 'p2', productName: 'প্রিমিয়াম গাওয়া ঘি', unitPrice: 1250, quantity: 50, total: 62500 },
      { productId: 'p3', productName: 'সুগন্ধি চিনিগুঁড়া চাল', unitPrice: 160, quantity: 150, total: 24000 }
    ],
    subtotal: 86500,
    deliveryFee: 0,
    discount: 2500,
    grandTotal: 84000,
    paymentMethod: 'card',
    status: 'delivered',
    createdAt: '2026-08-14T11:30:00.000Z'
  },
  {
    id: 'ord-year-2',
    orderNumber: 'UGG-79520',
    customerName: 'নর্থওয়েস্ট ক্যাটারিং সার্ভিস',
    customerPhone: '01819-223344',
    deliveryAddress: 'গ্রেটার রোড, রাজশাহী',
    channel: 'counter-pos',
    items: [
      { productId: 'p4', productName: 'ঘানিভাঙা সরিষার তেল', unitPrice: 320, quantity: 120, total: 38400 },
      { productId: 'p5', productName: 'পাহাড়ি হলুদ গুঁড়া', unitPrice: 190, quantity: 80, total: 15200 }
    ],
    subtotal: 53600,
    deliveryFee: 0,
    discount: 1600,
    grandTotal: 52000,
    paymentMethod: 'card',
    status: 'delivered',
    createdAt: '2026-06-20T14:15:00.000Z'
  },
  {
    id: 'ord-year-3',
    orderNumber: 'UGG-76340',
    customerName: 'ইউজিজি ডায়াসপোরা ইনভেস্টরস ফেস্ট কনসোর্টিয়াম',
    customerPhone: '01914-887766',
    deliveryAddress: 'গুলশান ক্লাস্টিক এভিনিউ, ঢাকা',
    channel: 'online',
    items: [
      { productId: 'p2', productName: 'প্রিমিয়াম গাওয়া ঘি', unitPrice: 1250, quantity: 80, total: 100000 },
      { productId: 'p3', productName: 'সুগন্ধি চিনিগুঁড়া চাল', unitPrice: 160, quantity: 200, total: 32000 }
    ],
    subtotal: 132000,
    deliveryFee: 0,
    discount: 4000,
    grandTotal: 128000,
    paymentMethod: 'bkash',
    status: 'delivered',
    createdAt: '2026-04-18T16:00:00.000Z'
  },
  {
    id: 'ord-year-4',
    orderNumber: 'UGG-72100',
    customerName: 'রাজশাহী মেডিকেল কনফারেন্স ইভেন্ট',
    customerPhone: '01713-556677',
    deliveryAddress: 'লক্ষ্মীপুর, রাজশাহী',
    channel: 'counter-pos',
    items: [
      { productId: 'p6', productName: 'মাল্টিগ্রেন ওটস কুকিজ', unitPrice: 240, quantity: 150, total: 36000 },
      { productId: 'p2', productName: 'প্রিমিয়াম গাওয়া ঘি', unitPrice: 1250, quantity: 30, total: 37500 }
    ],
    subtotal: 73500,
    deliveryFee: 0,
    discount: 2500,
    grandTotal: 71000,
    paymentMethod: 'card',
    status: 'delivered',
    createdAt: '2026-02-10T10:00:00.000Z'
  },

  // Past Year (2025) historical base
  {
    id: 'ord-prev-1',
    orderNumber: 'UGG-65100',
    customerName: 'বার্ষিক সমবায় এক্সপো ও রিটেইল বুথ ২০২৫',
    customerPhone: '01711-999000',
    deliveryAddress: 'বঙ্গবন্ধু আন্তর্জাতিক সম্মেলন কেন্দ্র, ঢাকা',
    channel: 'counter-pos',
    items: [
      { productId: 'p2', productName: 'প্রিমিয়াম গাওয়া ঘি', unitPrice: 1250, quantity: 180, total: 225000 },
      { productId: 'p4', productName: 'ঘানিভাঙা সরিষার তেল', unitPrice: 320, quantity: 300, total: 96000 }
    ],
    subtotal: 321000,
    deliveryFee: 0,
    discount: 10000,
    grandTotal: 311000,
    paymentMethod: 'card',
    status: 'delivered',
    createdAt: '2025-11-25T15:00:00.000Z'
  }
];

export function getStoredSalesOrders(): SuperShopSaleOrder[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = getSeedOrders();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    const initial = getSeedOrders();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  } catch (err) {
    console.error('Failed to load super shop sales', err);
    return getSeedOrders();
  }
}

export function saveSalesOrdersToStorage(orders: SuperShopSaleOrder[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    window.dispatchEvent(new CustomEvent('ugg_supershop_sales_updated', { detail: orders }));
  } catch (err) {
    console.error('Failed to save super shop sales', err);
  }
}

export interface SalesMetrics {
  todayTotal: number;
  todayCount: number;
  monthTotal: number;
  monthCount: number;
  yearTotal: number;
  yearCount: number;
  allTimeTotal: number;
  allTimeCount: number;
  totalItemsSold: number;
}

export function computeSalesMetrics(orders: SuperShopSaleOrder[]): SalesMetrics {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDate = now.getDate();

  let todayTotal = 0;
  let todayCount = 0;
  let monthTotal = 0;
  let monthCount = 0;
  let yearTotal = 0;
  let yearCount = 0;
  let allTimeTotal = 0;
  let allTimeCount = orders.length;
  let totalItemsSold = 0;

  for (const order of orders) {
    if (order.status === 'cancelled') continue;
    const orderDate = new Date(order.createdAt);
    const orderYear = orderDate.getFullYear();
    const orderMonth = orderDate.getMonth();
    const orderDay = orderDate.getDate();

    const isThisYear = orderYear === currentYear;
    const isThisMonth = isThisYear && orderMonth === currentMonth;
    const isToday = isThisMonth && orderDay === currentDate;

    allTimeTotal += order.grandTotal;

    const itemCount = order.items.reduce((sum, it) => sum + it.quantity, 0);
    totalItemsSold += itemCount;

    if (isThisYear) {
      yearTotal += order.grandTotal;
      yearCount += 1;
    }

    if (isThisMonth) {
      monthTotal += order.grandTotal;
      monthCount += 1;
    }

    if (isToday) {
      todayTotal += order.grandTotal;
      todayCount += 1;
    }
  }

  return {
    todayTotal,
    todayCount,
    monthTotal,
    monthCount,
    yearTotal,
    yearCount,
    allTimeTotal,
    allTimeCount,
    totalItemsSold
  };
}

export function recordNewSaleOrder(orderData: {
  orderNumber?: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress?: string;
  channel: 'online' | 'counter-pos';
  items: SuperShopSaleItem[];
  subtotal: number;
  deliveryFee: number;
  discount?: number;
  grandTotal: number;
  paymentMethod: 'cod' | 'bkash' | 'nagad' | 'card' | 'cash';
  status?: 'pending' | 'processing' | 'delivered';
}): SuperShopSaleOrder {
  const currentOrders = getStoredSalesOrders();
  const rawId = Math.floor(10000 + Math.random() * 90000);
  const newOrder: SuperShopSaleOrder = {
    id: 'ord-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    orderNumber: orderData.orderNumber || `UGG-${rawId}`,
    customerName: orderData.customerName || 'সম্মানিত ক্রেতা',
    customerPhone: orderData.customerPhone || '01700-000000',
    deliveryAddress: orderData.deliveryAddress || 'সুপার শপ কাউন্টার ডেলিভারি',
    channel: orderData.channel,
    items: orderData.items,
    subtotal: orderData.subtotal,
    deliveryFee: orderData.deliveryFee,
    discount: orderData.discount || 0,
    grandTotal: orderData.grandTotal,
    paymentMethod: orderData.paymentMethod,
    status: orderData.status || (orderData.channel === 'counter-pos' ? 'delivered' : 'processing'),
    createdAt: new Date().toISOString()
  };

  const updated = [newOrder, ...currentOrders];
  saveSalesOrdersToStorage(updated);
  return newOrder;
}

export function resetSalesOrdersToDefault(): SuperShopSaleOrder[] {
  const initial = getSeedOrders();
  saveSalesOrdersToStorage(initial);
  return initial;
}
