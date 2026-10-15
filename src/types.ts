export type Language = 'bn' | 'en';

export type PageRoute =
  | 'home'
  | 'about-us'
  | 'projects'
  | 'members'
  | 'super-shop-and-business'
  | 'financial-reports'
  | 'gallery'
  | 'contact'
  | 'member-hub'
  | 'admin-portal'
  | 'login'
  | 'apply-for-membership';

export interface Member {
  id: string;
  nameBn: string;
  nameEn: string;
  roleBn: string;
  roleEn: string;
  category: 'founder' | 'life' | 'general' | 'advisor';
  categoryLabelBn: string;
  categoryLabelEn: string;
  sectorBn: string;
  sector: 'tech' | 'retail' | 'agro' | 'finance';
  imageUrl: string;
  joinedYear: string;
  tags: string[];
  bioBn: string;
  projectsBn: string;
  verified: boolean;
  isInvestor: boolean;
  status: string;
}

export interface Project {
  id: string;
  code: string;
  titleBn: string;
  titleEn: string;
  category: 'ongoing' | 'completed' | 'proposed';
  categoryBadgeBn: string;
  sectorBn: string;
  descriptionBn: string;
  progressPercent: number;
  startDateBn: string;
  completionDateBn: string;
  budgetTotalBn: string;
  budgetSpentBn: string;
  expectedRoiBn: string;
  teamLeadBn: string;
  teamLeadRoleBn: string;
  imageUrl: string;
  locationBn: string;
  expenses: { label: string; val: string }[];
  isSdgsCompliant?: boolean;
}

export interface Product {
  id: string;
  nameBn: string;
  nameEn: string;
  category: 'produce' | 'dairy' | 'grains' | 'spices' | 'bakery' | 'household';
  categoryLabelBn: string;
  price: number;
  originalPrice: number;
  unitBn: string;
  stockStatus: 'in-stock' | 'limited';
  stockStatusLabelBn: string;
  imageUrl: string;
}

export interface CartItem {
  id: string;
  name: string;
  unitPrice: number;
  unitLabel: string;
  quantity: number;
  imageUrl?: string;
}

export interface GalleryAlbum {
  id: string;
  titleBn: string;
  titleEn?: string;
  category: 'agm' | 'site' | 'retail' | 'agro' | 'csr';
  categoryLabelBn: string;
  categoryLabelEn?: string;
  photoCount: number;
  dateBn: string;
  dateEn?: string;
  locationBn: string;
  locationEn?: string;
  descriptionBn: string;
  descriptionEn?: string;
  coverImageUrl: string;
  photos: string[];
  featured?: boolean;
}

export interface RepositoryDoc {
  id: string;
  code: string;
  titleBn: string;
  titleEn?: string;
  fileType: 'pdf' | 'xls' | 'form';
  fileSize: string;
  dateBn: string;
  dateEn?: string;
  category: 'constitution' | 'agm' | 'contract' | 'audit' | 'form' | 'notice';
  badgeBn: string;
  badgeEn?: string;
  badgeType: 'verified' | 'signature' | 'encrypted' | 'official' | 'urgent';
  accessLevelBn: string;
  accessLevelEn?: string;
  detailsBn?: string;
  detailsEn?: string;
}

export interface SuperShopSaleItem {
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  total: number;
  unitLabel?: string;
}

export interface SuperShopSaleOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress?: string;
  channel: 'online' | 'counter-pos';
  items: SuperShopSaleItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  grandTotal: number;
  paymentMethod: 'cod' | 'bkash' | 'nagad' | 'card' | 'cash';
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  createdAt: string; // ISO string
}
