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

export const FEEDING_OPTIONS: { value: FeedingStatus; label: string; emoji: string }[] = [
  { value: 'comeu_tudo', label: 'Comeu tudo', emoji: '🍽️' },
  { value: 'comeu_parcialmente', label: 'Comeu parcialmente', emoji: '🍴' },
  { value: 'nao_quis', label: 'Não quis lanchar', emoji: '🚫' },
];

export const REST_OPTIONS: { value: RestStatus; label: string; emoji: string }[] = [
  { value: 'dormiu_bem', label: 'Dormiu bem', emoji: '😴' },
  { value: 'dormiu_pouco', label: 'Dormiu pouco', emoji: '😐' },
  { value: 'nao_quis_dormir', label: 'Não quis dormir', emoji: '👀' },
];

export const MOOD_OPTIONS: { value: MoodStatus; label: string; emoji: string }[] = [
  { value: 'feliz_participativo', label: 'Feliz e participativo', emoji: '😄' },
  { value: 'calmo', label: 'Calmo', emoji: '😊' },
  { value: 'manhoso', label: 'Um pouco manhoso', emoji: '😢' },
];

export const DEFAULT_CLASS_GROUPS = [
  'Berçário',
  'Maternal I',
  'Maternal II',
  'Jardim I',
  'Jardim II',
  'Pré-escola',
];
