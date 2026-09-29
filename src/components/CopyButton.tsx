import { useState } from 'react';

interface CopyButtonProps {
  text: string;
  disabled?: boolean;
}

export default function CopyButton({ text, disabled }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleCopy}
        disabled={disabled}
        className={`w-full py-3 px-4 rounded-lg text-sm font-medium transition-all ${
          copied
            ? 'bg-green-600 text-white'
            : disabled
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
        }`}
      >
        {copied ? 'Texto copiado com sucesso!' : 'Copiar Recado para o WhatsApp'}
      </button>
      {copied && (
        <p className="text-center text-xs text-green-600 font-medium copy-success">
          Agora é só colar no WhatsApp.
        </p>
      )}
    </div>
  );
}
