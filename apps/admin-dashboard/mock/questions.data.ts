export type QuestionStatus = 'unprocessed' | 'processing' | 'completed' | 'failed';
export type AreaType = 'rural' | 'urban';
export type Language = 'english' | 'bengali' | 'mixed';

export interface Question {
  id: string;
  district: string;
  subdivision: string;
  block: string;
  gram_panchayat?: string;
  municipality?: string;
  ward?: string;
  police_station: string;
  pincode: string;
  rural_urban: AreaType;
  age: number;
  occupation: string;
  language: Language;
  original_question: string;
  translated_question: string;
  normalized_question: string;
  ai_processing_status: QuestionStatus;
  assigned_department?: string;
  detected_scheme?: string;
  cluster_id?: string;
  created_at: string;
}

export const mockQuestions: Question[] = [
  {
    id: 'qs-001',
    district: 'Birbhum',
    subdivision: 'Suri',
    block: 'Suri I',
    gram_panchayat: 'Baligeria',
    police_station: 'Suri',
    pincode: '731101',
    rural_urban: 'rural',
    age: 45,
    occupation: 'Farmer',
    language: 'bengali',
    original_question: 'লক্ষ্মীর ভান্ডার প্রকল্পের অর্থ কবে আসবে?',
    translated_question: 'When will the Lakshmir Bhandar scheme payment be released?',
    normalized_question: 'lakshmir bhandar scheme payment release date query',
    ai_processing_status: 'completed',
    assigned_department: 'Women & Child Development',
    detected_scheme: 'Lakshmir Bhandar',
    cluster_id: 'cl-045',
    created_at: '2026-06-19T08:30:00Z',
  },
  {
    id: 'qs-002',
    district: 'Kolkata',
    subdivision: 'Kolkata North',
    block: 'N/A',
    municipality: 'Kolkata Municipal Corporation',
    ward: 'Ward 4',
    police_station: 'Shyambazar',
    pincode: '700004',
    rural_urban: 'urban',
    age: 32,
    occupation: 'Teacher',
    language: 'english',
    original_question: 'When will the road repairs on BT Road be completed?',
    translated_question: 'When will the road repairs on BT Road be completed?',
    normalized_question: 'bt road repair completion date public works query',
    ai_processing_status: 'completed',
    assigned_department: 'Public Works Department',
    detected_scheme: undefined,
    cluster_id: 'cl-012',
    created_at: '2026-06-19T09:15:00Z',
  },
  {
    id: 'qs-003',
    district: 'Darjeeling',
    subdivision: 'Siliguri',
    block: 'Siliguri I',
    gram_panchayat: 'Fulbari',
    police_station: 'Bhaktinagar',
    pincode: '734008',
    rural_urban: 'rural',
    age: 58,
    occupation: 'Retired',
    language: 'english',
    original_question: 'Is Swasthya Sathi card still valid at North Bengal Medical College?',
    translated_question: 'Is Swasthya Sathi card still valid at North Bengal Medical College?',
    normalized_question: 'swasthya sathi validity north bengal medical college health query',
    ai_processing_status: 'processing',
    assigned_department: 'Health & Family Welfare',
    detected_scheme: 'Swasthya Sathi',
    cluster_id: undefined,
    created_at: '2026-06-19T10:45:00Z',
  },
  {
    id: 'qs-004',
    district: 'Howrah',
    subdivision: 'Howrah Sadar',
    block: 'Uluberia I',
    gram_panchayat: 'Bauria',
    police_station: 'Uluberia',
    pincode: '711316',
    rural_urban: 'rural',
    age: 28,
    occupation: 'Daily Labourer',
    language: 'bengali',
    original_question: 'কৃষক বন্ধু প্রকল্পে নতুন নিবন্ধন কিভাবে করব?',
    translated_question: 'How do I register newly for the Krishak Bandhu scheme?',
    normalized_question: 'krishak bandhu new registration process agriculture query',
    ai_processing_status: 'unprocessed',
    assigned_department: undefined,
    detected_scheme: 'Krishak Bandhu',
    cluster_id: undefined,
    created_at: '2026-06-19T11:20:00Z',
  },
  {
    id: 'qs-005',
    district: 'North 24 Parganas',
    subdivision: 'Barasat',
    block: 'Deganga',
    gram_panchayat: 'Berachampa',
    police_station: 'Deganga',
    pincode: '743423',
    rural_urban: 'rural',
    age: 19,
    occupation: 'Student',
    language: 'bengali',
    original_question: 'কন্যাশ্রী প্রকল্পের জন্য আবেদন করতে কোন কাগজ লাগবে?',
    translated_question: 'What documents are needed to apply for the Kanyashree scheme?',
    normalized_question: 'kanyashree scheme application documents required education query',
    ai_processing_status: 'completed',
    assigned_department: 'School Education',
    detected_scheme: 'Kanyashree',
    cluster_id: 'cl-028',
    created_at: '2026-06-18T14:00:00Z',
  },
];

export const mockQuestionsTotal = 12847;
