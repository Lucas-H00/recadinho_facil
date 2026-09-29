interface StatusButtonProps {
  emoji: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
  colorClass?: string;
}

export default function StatusButton({
  emoji,
  label,
  isSelected,
  onClick,
  colorClass = 'bg-pastel-pink-light border-pastel-pink',
}: StatusButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-200 text-left active:scale-[0.97] ${
        isSelected
          ? `${colorClass} shadow-md ring-2 ring-offset-1 ring-pastel-pink/50 font-semibold`
          : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'
      }`}
    >
      <span className="text-2xl">{emoji}</span>
      <span className={`text-sm ${
        isSelected ? 'text-warm-text' : 'text-warm-text-light'
      }`}>
        {label}
      </span>
      {isSelected && (
        <span className="ml-auto text-pastel-pink text-lg">✓</span>
      )}
    </button>
  );
}
