interface MessagePreviewProps {
  message: string;
}

export default function MessagePreview({ message }: MessagePreviewProps) {
  if (!message) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
        <h3 className="text-sm font-semibold text-slate-700">Prévia do Recado</h3>
      </div>
      <div className="p-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-slate-800 whitespace-pre-line leading-relaxed">
          {message}
        </div>
      </div>
    </div>
  );
}
