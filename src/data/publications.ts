import type { Publication } from './types';
export const publications = [
  {
    "id": "fahu-mamba",
    "title": "A Frequency-Aware Hybrid U-Mamba for Breast Tumor Segmentation",
    "authors": "Chi-An Chen, Sara Katharina Alessia Bosshart, Liang-Ying Ke, and Chih-Hsien Hsia.",
    "venue": "AIxMHC",
    "year": "2025",
    "description": "A hybrid U-Mamba approach incorporating frequency-aware modeling for breast tumor segmentation.",
    "award": false,
    "lang": "en"
  },
  {
    "id": "ssiu-net",
    "title": "A State Space-Inspired U-Net with Linear Attention for Breast Tumor Segmentation",
    "authors": "Chi-An Chen, Sean Chuan-En Shen, Liang-Ying Ke, and Chih-Hsien Hsia.",
    "venue": "AIxMHC",
    "year": "2025",
    "description": "A state space-inspired segmentation architecture with linear attention.",
    "award": false,
    "lang": "en"
  },
  {
    "id": "transformer-mamba-unet",
    "title": "A Transformer-Mamba UNet for Breast Tumor Segmentation",
    "authors": "Chi-An Chen, Liang-Ying Ke, Zih-Ching Chen, and Chih-Hsien Hsia.",
    "venue": "AVSS",
    "year": "2025",
    "description": "Transformer and Mamba components for breast tumor segmentation.",
    "award": true,
    "lang": "en"
  },
  {
    "id": "lvit-cb",
    "title": "A Lightweight Vision Transformer with Competitive Blocks for Finger Vein Recognition",
    "authors": "Chi-An Chen, Tzu-Hung Chien, Liang-Ying Ke, and Chih-Hsien Hsia.",
    "venue": "IS3C",
    "year": "2025",
    "description": "Lightweight vision modeling with competitive blocks for finger vein recognition.",
    "award": true,
    "lang": "en"
  },
  {
    "id": "lvit-cb-itaoi",
    "title": "輕量級視覺變壓器結合競爭模組於指靜脈辨識系統",
    "authors": "陳麒安、柯良頴、夏至賢、陳勝濤。",
    "venue": "ITAOI",
    "year": "2025",
    "description": "Research on lightweight vision transformers for finger vein recognition.",
    "award": true,
    "lang": "zh-Hant"
  },
  {
    "id": "virtual-try-on-itac",
    "title": "基於可組裝串聯外觀流之虛擬服裝試穿",
    "authors": "柯良頴、夏至賢、許良亦、陳麒安。",
    "venue": "ITAC",
    "year": "2024",
    "description": "Virtual try-on using composable sequential appearance flow.",
    "award": false,
    "lang": "zh-Hant"
  }
] as const satisfies readonly Publication[];
