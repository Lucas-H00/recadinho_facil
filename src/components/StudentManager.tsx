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

  const groupedStudents = students.reduce<Record<string, Student[]>>((acc, student) => {
    if (!acc[student.classGroup]) acc[student.classGroup] = [];
    acc[student.classGroup].push(student);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {students.length} {students.length === 1 ? 'aluno cadastrado' : 'alunos cadastrados'}
        </p>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Adicionar Aluno
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border border-slate-200 p-5 space-y-4"
        >
          <h3 className="text-base font-semibold text-slate-800">
            {editingId ? 'Editar Aluno' : 'Novo Aluno'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Nome da Crian&#xe7;a
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Maria Luiza"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition text-slate-900 text-sm placeholder:text-slate-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Nome do Respons&#xe1;vel
              </label>
              <input
                type="text"
                value={guardianName}
                onChange={(e) => setGuardianName(e.target.value)}
                placeholder="Ex: Ana Paula"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition text-slate-900 text-sm placeholder:text-slate-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Turminha
              </label>
              <select
                value={classGroup}
                onChange={(e) => setClassGroup(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition text-slate-900 text-sm bg-white"
              >
                {DEFAULT_CLASS_GROUPS.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              {editingId ? 'Salvar Altera&#xe7;&#xf5;es' : 'Adicionar'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Empty State */}
      {students.length === 0 && !showForm && (
        <div className="text-center py-16">
          <p className="text-slate-500 text-sm">Nenhum aluno cadastrado ainda.</p>
          <p className="text-slate-400 text-xs mt-1">
            Clique em &#x201c;Adicionar Aluno&#x201d; para come&#xe7;ar.
          </p>
        </div>
      )}

      {/* Student List grouped by class */}
      {Object.entries(groupedStudents)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([group, groupStudents]) => (
          <div key={group} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-700">{group}</h3>
              <span className="text-xs text-slate-400">
                {groupStudents.length} {groupStudents.length === 1 ? 'aluno' : 'alunos'}
              </span>
            </div>

            {/* Desktop table */}
            <div className="hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-5 py-2.5">
                      Nome
                    </th>
                    <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-5 py-2.5">
                      Respons&#xe1;vel
                    </th>
                    <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-5 py-2.5">
                      A&#xe7;&#xf5;es
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {groupStudents
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((student) => (
                      <tr key={student.id} className="hover:bg-slate-50/50">
                        <td className="px-5 py-3 text-sm text-slate-800 font-medium">
                          {student.name}
                        </td>
                        <td className="px-5 py-3 text-sm text-slate-500">
                          {student.guardianName}
                        </td>
                        <td className="px-5 py-3 text-right">
                          <button
                            onClick={() => handleEdit(student)}
                            className="text-xs text-blue-600 hover:text-blue-800 font-medium mr-4"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(student.id)}
                            className="text-xs text-red-500 hover:text-red-700 font-medium"
                          >
                            Remover
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-slate-100">
              {groupStudents
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((student) => (
                  <div
                    key={student.id}
                    className="px-5 py-3 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">
                        {student.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        Resp: {student.guardianName}
                      </p>
                    </div>
                    <div className="flex gap-3 shrink-0">
                      <button
                        onClick={() => handleEdit(student)}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="text-xs text-red-500 hover:text-red-700 font-medium"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
}
