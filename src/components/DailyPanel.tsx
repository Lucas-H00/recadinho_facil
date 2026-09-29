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

  const groupedStudents = students.reduce<Record<string, typeof students>>((acc, student) => {
    if (!acc[student.classGroup]) acc[student.classGroup] = [];
    acc[student.classGroup].push(student);
    return acc;
  }, {});

  if (students.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold text-slate-800">
            Bem-vinda ao RecadinhoF&#xe1;cil
          </h2>
          <p className="text-slate-500 text-sm">
            Para come&#xe7;ar, cadastre seus alunos primeiro.
          </p>
          <Link
            to="/alunos"
            className="inline-block mt-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Cadastrar Alunos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Left Column: Form */}
      <div className="lg:col-span-3 space-y-5">
        {/* Student Selector */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Selecione o aluno
          </label>
          <select
            value={selectedStudentId}
            onChange={(e) => handleStudentChange(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition text-slate-900 bg-white text-sm"
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
            {/* Status Sections - 3 columns on md+ */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Feeding */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
                <h3 className="text-sm font-semibold text-slate-700">Alimenta&#xe7;&#xe3;o</h3>
                <div className="space-y-2">
                  {FEEDING_OPTIONS.map((option) => (
                    <StatusButton
                      key={option.value}
                      label={option.label}
                      isSelected={feeding === option.value}
                      onClick={() =>
                        setFeeding(feeding === option.value ? null : option.value)
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Rest */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
                <h3 className="text-sm font-semibold text-slate-700">Descanso / Repouso</h3>
                <div className="space-y-2">
                  {REST_OPTIONS.map((option) => (
                    <StatusButton
                      key={option.value}
                      label={option.label}
                      isSelected={rest === option.value}
                      onClick={() =>
                        setRest(rest === option.value ? null : option.value)
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Mood */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
                <h3 className="text-sm font-semibold text-slate-700">Humor / Comportamento</h3>
                <div className="space-y-2">
                  {MOOD_OPTIONS.map((option) => (
                    <StatusButton
                      key={option.value}
                      label={option.label}
                      isSelected={mood === option.value}
                      onClick={() =>
                        setMood(mood === option.value ? null : option.value)
                      }
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Extra Note */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
              <h3 className="text-sm font-semibold text-slate-700">Recado Extra (opcional)</h3>
              <textarea
                value={extraNote}
                onChange={(e) => setExtraNote(e.target.value)}
                placeholder="Ex: Levou tarefinha de arte hoje, apresentou o trabalho na rodinha..."
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition text-slate-900 text-sm placeholder:text-slate-400 resize-none"
              />
            </div>
          </>
        )}
      </div>

      {/* Right Column: Preview + Copy */}
      <div className="lg:col-span-2 space-y-4 lg:sticky lg:top-20 lg:self-start">
        {message ? (
          <>
            <MessagePreview message={message} />
            <CopyButton text={message} disabled={!message} />
          </>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
            <p className="text-sm text-slate-400">
              {selectedStudent
                ? 'Selecione pelo menos um status para gerar o recado.'
                : 'Selecione um aluno para come&#xe7;ar.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
