interface StatusButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function StatusButton({ label, isSelected, onClick }: StatusButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg border text-sm transition-all ${
        isSelected
          ? 'bg-blue-50 border-blue-300 text-blue-800 font-medium'
          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
      }`}
    >
      <span>{label}</span>
      {isSelected && (
        <svg className="w-4 h-4 text-blue-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  );
}
