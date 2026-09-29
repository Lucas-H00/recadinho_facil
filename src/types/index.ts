export interface Student {
  id: string;
  name: string;
  guardianName: string;
  classGroup: string;
}

export type FeedingStatus = 'comeu_tudo' | 'comeu_parcialmente' | 'nao_quis' | null;
export type RestStatus = 'dormiu_bem' | 'dormiu_pouco' | 'nao_quis_dormir' | null;
export type MoodStatus = 'feliz_participativo' | 'calmo' | 'manhoso' | null;

export interface DailyStatus {
  studentId: string;
  date: string;
  feeding: FeedingStatus;
  rest: RestStatus;
  mood: MoodStatus;
  extraNote: string;
}

export const FEEDING_OPTIONS: { value: FeedingStatus; label: string }[] = [
  { value: 'comeu_tudo', label: 'Comeu tudo' },
  { value: 'comeu_parcialmente', label: 'Comeu parcialmente' },
  { value: 'nao_quis', label: 'N\u00e3o quis lanchar' },
];

export const REST_OPTIONS: { value: RestStatus; label: string }[] = [
  { value: 'dormiu_bem', label: 'Dormiu bem' },
  { value: 'dormiu_pouco', label: 'Dormiu pouco' },
  { value: 'nao_quis_dormir', label: 'N\u00e3o quis dormir' },
];

export const MOOD_OPTIONS: { value: MoodStatus; label: string }[] = [
  { value: 'feliz_participativo', label: 'Feliz e participativo' },
  { value: 'calmo', label: 'Calmo' },
  { value: 'manhoso', label: 'Um pouco manhoso' },
];

export const DEFAULT_CLASS_GROUPS = [
  'Ber\u00e7\u00e1rio',
  'Maternal I',
  'Maternal II',
  'Jardim I',
  'Jardim II',
  'Pr\u00e9-escola',
];
