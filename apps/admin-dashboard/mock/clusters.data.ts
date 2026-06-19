export interface ClusterQuestion {
  id: string;
  original_question: string;
  district: string;
  language: string;
  created_at: string;
}

export interface Cluster {
  id: string;
  cluster_name: string;
  canonical_question: string;
  confidence: number;
  question_count: number;
  department: string;
  scheme?: string;
  trend: 'rising' | 'stable' | 'declining';
  created_at: string;
  sample_questions: ClusterQuestion[];
}

export const mockClusters: Cluster[] = [
  {
    id: 'cl-045',
    cluster_name: 'Lakshmir Bhandar Payment Delays',
    canonical_question: 'When will the Lakshmir Bhandar scheme payment be credited to my account?',
    confidence: 0.94,
    question_count: 1842,
    department: 'Women & Child Development',
    scheme: 'Lakshmir Bhandar',
    trend: 'rising',
    created_at: '2026-06-10T00:00:00Z',
    sample_questions: [
      { id: 'qs-001', original_question: 'লক্ষ্মীর ভান্ডার প্রকল্পের অর্থ কবে আসবে?', district: 'Birbhum', language: 'bengali', created_at: '2026-06-19T08:30:00Z' },
      { id: 'qs-091', original_question: 'Lakshmir Bhandar amount not received this month', district: 'Howrah', language: 'english', created_at: '2026-06-18T10:00:00Z' },
    ],
  },
  {
    id: 'cl-012',
    cluster_name: 'Road Infrastructure Queries',
    canonical_question: 'What is the timeline for road repair and construction projects in my district?',
    confidence: 0.87,
    question_count: 634,
    department: 'Public Works Department',
    scheme: undefined,
    trend: 'stable',
    created_at: '2026-06-05T00:00:00Z',
    sample_questions: [
      { id: 'qs-002', original_question: 'When will the road repairs on BT Road be completed?', district: 'Kolkata', language: 'english', created_at: '2026-06-19T09:15:00Z' },
    ],
  },
  {
    id: 'cl-028',
    cluster_name: 'Kanyashree Application Process',
    canonical_question: 'What is the step-by-step process and required documents for Kanyashree scheme application?',
    confidence: 0.91,
    question_count: 921,
    department: 'School Education',
    scheme: 'Kanyashree',
    trend: 'stable',
    created_at: '2026-06-08T00:00:00Z',
    sample_questions: [
      { id: 'qs-005', original_question: 'কন্যাশ্রী প্রকল্পের জন্য আবেদন করতে কোন কাগজ লাগবে?', district: 'North 24 Parganas', language: 'bengali', created_at: '2026-06-18T14:00:00Z' },
    ],
  },
  {
    id: 'cl-003',
    cluster_name: 'Swasthya Sathi Hospital Coverage',
    canonical_question: 'Which hospitals and nursing homes accept the Swasthya Sathi card in my district?',
    confidence: 0.89,
    question_count: 1130,
    department: 'Health & Family Welfare',
    scheme: 'Swasthya Sathi',
    trend: 'rising',
    created_at: '2026-06-01T00:00:00Z',
    sample_questions: [
      { id: 'qs-003', original_question: 'Is Swasthya Sathi card still valid at North Bengal Medical College?', district: 'Darjeeling', language: 'english', created_at: '2026-06-19T10:45:00Z' },
    ],
  },
];
