import React, { useState, useEffect } from 'react';
import { PageRoute, Language, CartItem } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { NotificationsModal } from './components/NotificationsModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { MembersPage } from './pages/MembersPage';
import { SuperShopPage } from './pages/SuperShopPage';
import { FinancialReportsPage } from './pages/FinancialReportsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { MemberHubPage } from './pages/MemberHubPage';
import { AdminPortalPage } from './pages/AdminPortalPage';
import { LoginPage } from './pages/LoginPage';
import { ApplyMembershipPage } from './pages/ApplyMembershipPage';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('ugg_language');
    return saved === 'en' || saved === 'bn' ? (saved as Language) : 'bn';
  });
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userRole, setUserRole] = useState<'guest' | 'member' | 'admin'>('guest');

  useEffect(() => {
    localStorage.setItem('ugg_language', language);
    document.documentElement.lang = language;
  }, [language]);

  // Shared shopping cart state for SuperShop and Header badge
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'p1',
      name: 'প্রিমিয়াম খাঁটি সরিষার তেল (ঘানি ভাঙা)',
      unitPrice: 280,
      unitLabel: '১ লিটার বোতল',
      quantity: 1,
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCQl62dYlW7l40mB3X04tHk4R0y7v8Mv0z6v07z81N9xZ8Y',
    },
    {
      id: 'p2',
      name: 'সুন্দরবনের প্রাকৃতিক চাকের মধু (র-হানি)',
      unitPrice: 650,
      unitLabel: '৫০০ গ্রাম জার',
      quantity: 1,
    },
  ]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, item];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageRoute;
      const validRoutes: PageRoute[] = [
        'home',
        'about-us',
        'projects',
        'members',
        'super-shop-and-business',
        'financial-reports',
        'gallery',
        'contact',
        'member-hub',
        'admin-portal',
        'login',
        'apply-for-membership',
      ];
      if (validRoutes.includes(hash)) {
        setCurrentRoute(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (route: PageRoute) => {
    setCurrentRoute(route);
    window.location.hash = route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (role: 'member' | 'admin') => {
    setUserRole(role);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#000514] text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-900">
      {/* Sovereign Header Navigation */}
      <Header
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        language={language}
        onToggleLanguage={setLanguage}
        cartCount={cartCount}
        onOpenNotifications={() => setNotificationsOpen(true)}
      />

      {/* Main Content Area with Header offset */}
      <main className="flex-1 w-full pt-[7.5rem]">
        {currentRoute === 'home' && (
          <HomePage onNavigate={handleNavigate} language={language} />
        )}
        {currentRoute === 'about-us' && (
          <AboutPage onNavigate={handleNavigate} language={language} />
        )}
        {currentRoute === 'projects' && (
          <ProjectsPage onNavigate={handleNavigate} language={language} />
        )}
        {currentRoute === 'members' && (
          <MembersPage onNavigate={handleNavigate} language={language} />
        )}
        {currentRoute === 'super-shop-and-business' && (
          <SuperShopPage
            onNavigate={handleNavigate}
            language={language}
            cart={cart}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
          />
        )}
        {currentRoute === 'financial-reports' && (
          <FinancialReportsPage onNavigate={handleNavigate} language={language} />
        )}
        {currentRoute === 'gallery' && (
          <GalleryPage onNavigate={handleNavigate} language={language} />
        )}
        {currentRoute === 'contact' && (
          <ContactPage onNavigate={handleNavigate} language={language} />
        )}
        {currentRoute === 'member-hub' && (
          <MemberHubPage onNavigate={handleNavigate} language={language} />
        )}
        {currentRoute === 'admin-portal' && (
          <AdminPortalPage onNavigate={handleNavigate} language={language} />
        )}
        {currentRoute === 'login' && (
          <LoginPage
            onNavigate={handleNavigate}
            language={language}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
        {currentRoute === 'apply-for-membership' && (
          <ApplyMembershipPage onNavigate={handleNavigate} language={language} />
        )}
      </main>

      {/* Institutional Corporate Footer */}
      <Footer onNavigate={handleNavigate} language={language} />

      {/* Global Notifications Modal */}
      <NotificationsModal
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        language={language}
      />
    </div>
  );
}
