import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppContext } from '../context/AppContext';
import type { Student } from '../types';
import { DEFAULT_CLASS_GROUPS } from '../types';

export default function StudentManager() {
  const { students, setStudents } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [classGroup, setClassGroup] = useState(DEFAULT_CLASS_GROUPS[0]);

  const resetForm = () => {
    setName('');
    setGuardianName('');
    setClassGroup(DEFAULT_CLASS_GROUPS[0]);
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !guardianName.trim()) return;

    if (editingId) {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === editingId
            ? { ...s, name: name.trim(), guardianName: guardianName.trim(), classGroup }
            : s
        )
      );
    } else {
      const newStudent: Student = {
        id: uuidv4(),
        name: name.trim(),
        guardianName: guardianName.trim(),
        classGroup,
      };
      setStudents((prev) => [...prev, newStudent]);
    }
    resetForm();
  };

  const handleEdit = (student: Student) => {
    setName(student.name);
    setGuardianName(student.guardianName);
    setClassGroup(student.classGroup);
    setEditingId(student.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja remover este aluno?')) {
      setStudents((prev) => prev.filter((s) => s.id !== id));
    }
  };

  // Group students by class
  const groupedStudents = students.reduce<Record<string, Student[]>>((acc, student) => {
    if (!acc[student.classGroup]) acc[student.classGroup] = [];
    acc[student.classGroup].push(student);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {/* Add Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full py-3 px-4 bg-pastel-lavender/60 hover:bg-pastel-lavender/80 text-warm-text font-medium rounded-xl border-2 border-dashed border-pastel-lavender transition-all active:scale-[0.98]"
        >
          ➕ Adicionar Novo Aluno
        </button>
      )}

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-5 shadow-md border border-pastel-lavender/30 space-y-4"
        >
          <h3 className="text-lg font-semibold text-warm-text">
            {editingId ? '✏️ Editar Aluno' : '➕ Novo Aluno'}
          </h3>

          <div>
            <label className="block text-sm font-medium text-warm-text-light mb-1">
              Nome da Criança
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Maria Luiza"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pastel-lavender focus:ring-2 focus:ring-pastel-lavender/30 outline-none transition-all text-warm-text placeholder:text-gray-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-warm-text-light mb-1">
              Nome do Responsável
            </label>
            <input
              type="text"
              value={guardianName}
              onChange={(e) => setGuardianName(e.target.value)}
              placeholder="Ex: Ana Paula"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pastel-lavender focus:ring-2 focus:ring-pastel-lavender/30 outline-none transition-all text-warm-text placeholder:text-gray-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-warm-text-light mb-1">
              Turminha
            </label>
            <select
              value={classGroup}
              onChange={(e) => setClassGroup(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pastel-lavender focus:ring-2 focus:ring-pastel-lavender/30 outline-none transition-all text-warm-text bg-white"
            >
              {DEFAULT_CLASS_GROUPS.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 py-3 bg-pastel-lavender hover:bg-pastel-lavender/80 text-warm-text font-medium rounded-xl transition-all active:scale-[0.98]"
            >
              {editingId ? 'Salvar Alterações' : 'Adicionar'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-warm-text-light font-medium rounded-xl transition-all"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Empty State */}
      {students.length === 0 && !showForm && (
        <div className="text-center py-12 space-y-3">
          <p className="text-5xl">👦👧</p>
          <p className="text-warm-text-light">
            Nenhum aluno cadastrado ainda.
          </p>
          <p className="text-sm text-warm-text-light/70">
            Adicione seus alunos para começar a gerar recadinhos!
          </p>
        </div>
      )}

      {/* Student List grouped by class */}
      {Object.entries(groupedStudents)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([group, groupStudents]) => (
          <div key={group} className="space-y-2">
            <h3 className="text-sm font-semibold text-warm-text-light uppercase tracking-wider flex items-center gap-2 px-1">
              <span className="bg-pastel-yellow/60 px-2 py-0.5 rounded-full text-xs">
                {group}
              </span>
              <span className="text-xs text-warm-text-light/60">
                ({groupStudents.length} {groupStudents.length === 1 ? 'aluno' : 'alunos'})
              </span>
            </h3>
            {groupStudents
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((student) => (
                <div
                  key={student.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-50 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-warm-text truncate">
                      {student.name}
                    </p>
                    <p className="text-xs text-warm-text-light truncate">
                      Responsável: {student.guardianName}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => handleEdit(student)}
                      className="p-2 rounded-lg hover:bg-pastel-blue-light/50 transition-colors"
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                      title="Remover"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ))}
    </div>
  );
}
