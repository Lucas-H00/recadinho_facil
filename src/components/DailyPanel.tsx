import { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import type {
  FeedingStatus,
  RestStatus,
  MoodStatus,
} from '../types';
import {
  FEEDING_OPTIONS,
  REST_OPTIONS,
  MOOD_OPTIONS,
} from '../types';
import { generateMessage } from '../utils/messageGenerator';
import StatusButton from './StatusButton';
import MessagePreview from './MessagePreview';
import CopyButton from './CopyButton';
import { Link } from 'react-router-dom';

export default function DailyPanel() {
  const { students } = useAppContext();
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [feeding, setFeeding] = useState<FeedingStatus>(null);
  const [rest, setRest] = useState<RestStatus>(null);
  const [mood, setMood] = useState<MoodStatus>(null);
  const [extraNote, setExtraNote] = useState('');

  const selectedStudent = students.find((s) => s.id === selectedStudentId) || null;

  const today = new Date().toISOString().split('T')[0];

  const message = useMemo(() => {
    if (!selectedStudent || (!feeding && !rest && !mood)) return '';
    return generateMessage(selectedStudent, {
      studentId: selectedStudent.id,
      date: today,
      feeding,
      rest,
      mood,
      extraNote,
    });
  }, [selectedStudent, feeding, rest, mood, extraNote, today]);

  const handleStudentChange = (id: string) => {
    setSelectedStudentId(id);
    setFeeding(null);
    setRest(null);
    setMood(null);
    setExtraNote('');
  };

  // Group students by class for the selector
  const groupedStudents = students.reduce<Record<string, typeof students>>((acc, student) => {
    if (!acc[student.classGroup]) acc[student.classGroup] = [];
    acc[student.classGroup].push(student);
    return acc;
  }, {});

  if (students.length === 0) {
    return (
      <div className="text-center py-16 space-y-4">
        <p className="text-6xl">📝</p>
        <h2 className="text-xl font-bold text-warm-text">
          Bem-vinda ao RecadinhoFácil!
        </h2>
        <p className="text-warm-text-light">
          Para começar, cadastre seus alunos primeiro.
        </p>
        <Link
          to="/alunos"
          className="inline-block mt-2 px-6 py-3 bg-pastel-lavender hover:bg-pastel-lavender/80 text-warm-text font-medium rounded-xl transition-all active:scale-[0.98]"
        >
          ➕ Cadastrar Alunos
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Student Selector */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-pastel-pink/20">
        <label className="block text-sm font-semibold text-warm-text mb-2">
          👦 Selecione o aluno
        </label>
        <select
          value={selectedStudentId}
          onChange={(e) => handleStudentChange(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pastel-pink focus:ring-2 focus:ring-pastel-pink/30 outline-none transition-all text-warm-text bg-white text-base"
        >
          <option value="">Escolha um aluno...</option>
          {Object.entries(groupedStudents)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([group, groupStudents]) => (
              <optgroup key={group} label={group}>
                {groupStudents
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
              </optgroup>
            ))}
        </select>
      </div>

      {selectedStudent && (
        <>
          {/* Feeding */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-pastel-peach/20 space-y-3">
            <h3 className="text-sm font-semibold text-warm-text flex items-center gap-2">
              <span className="bg-pastel-peach/40 p-1.5 rounded-lg">🍽️</span>
              Alimentação
            </h3>
            <div className="space-y-2">
              {FEEDING_OPTIONS.map((option) => (
                <StatusButton
                  key={option.value}
                  emoji={option.emoji}
                  label={option.label}
                  isSelected={feeding === option.value}
                  onClick={() =>
                    setFeeding(feeding === option.value ? null : option.value)
                  }
                  colorClass="bg-pastel-peach-light border-pastel-peach"
                />
              ))}
            </div>
          </div>

          {/* Rest */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-pastel-blue/20 space-y-3">
            <h3 className="text-sm font-semibold text-warm-text flex items-center gap-2">
              <span className="bg-pastel-blue/40 p-1.5 rounded-lg">😴</span>
              Descanso / Repouso
            </h3>
            <div className="space-y-2">
              {REST_OPTIONS.map((option) => (
                <StatusButton
                  key={option.value}
                  emoji={option.emoji}
                  label={option.label}
                  isSelected={rest === option.value}
                  onClick={() =>
                    setRest(rest === option.value ? null : option.value)
                  }
                  colorClass="bg-pastel-blue-light border-pastel-blue"
                />
              ))}
            </div>
          </div>

          {/* Mood */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-pastel-yellow/20 space-y-3">
            <h3 className="text-sm font-semibold text-warm-text flex items-center gap-2">
              <span className="bg-pastel-yellow/40 p-1.5 rounded-lg">😊</span>
              Humor / Comportamento
            </h3>
            <div className="space-y-2">
              {MOOD_OPTIONS.map((option) => (
                <StatusButton
                  key={option.value}
                  emoji={option.emoji}
                  label={option.label}
                  isSelected={mood === option.value}
                  onClick={() =>
                    setMood(mood === option.value ? null : option.value)
                  }
                  colorClass="bg-pastel-yellow-light border-pastel-yellow"
                />
              ))}
            </div>
          </div>

          {/* Extra Note */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-pastel-mint/20 space-y-3">
            <h3 className="text-sm font-semibold text-warm-text flex items-center gap-2">
              <span className="bg-pastel-mint/40 p-1.5 rounded-lg">📝</span>
              Recado Extra (opcional)
            </h3>
            <textarea
              value={extraNote}
              onChange={(e) => setExtraNote(e.target.value)}
              placeholder="Ex: Levou tarefinha de arte hoje, apresentou o trabalho na rodinha..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pastel-mint focus:ring-2 focus:ring-pastel-mint/30 outline-none transition-all text-warm-text placeholder:text-gray-300 text-sm resize-none"
            />
          </div>

          {/* Message Preview */}
          {message && <MessagePreview message={message} />}

          {/* Copy Button */}
          <CopyButton text={message} disabled={!message} />
        </>
      )}
    </div>
  );
}
