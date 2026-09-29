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
      // Fallback for older browsers
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
        className={`w-full py-4 px-6 rounded-2xl text-base font-bold transition-all duration-300 active:scale-[0.97] shadow-lg ${
          copied
            ? 'bg-pastel-mint text-warm-text shadow-pastel-mint/30'
            : disabled
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-pastel-pink to-pastel-lavender text-warm-text hover:shadow-xl hover:shadow-pastel-pink/20'
        }`}
      >
        {copied ? '✅ Texto copiado com sucesso! 🚀' : '📋 Copiar Recado para o WhatsApp'}
      </button>
      {copied && (
        <p className="text-center text-sm text-pastel-mint font-medium copy-success">
          Agora é só colar no WhatsApp! 💬
        </p>
      )}
    </div>
  );
}
