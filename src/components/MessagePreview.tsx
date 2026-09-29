interface MessagePreviewProps {
  message: string;
}

export default function MessagePreview({ message }: MessagePreviewProps) {
  if (!message) return null;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-md border border-pastel-mint/30 space-y-3">
      <h3 className="text-sm font-semibold text-warm-text-light flex items-center gap-2">
        <span>💬</span> Prévia do Recado
      </h3>
      <div className="bg-[#dcf8c6] rounded-xl rounded-tl-none p-4 text-sm text-gray-800 whitespace-pre-line leading-relaxed shadow-sm">
        {message}
      </div>
    </div>
  );
}
