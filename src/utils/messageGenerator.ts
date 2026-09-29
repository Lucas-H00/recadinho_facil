import type { DailyStatus, FeedingStatus, RestStatus, MoodStatus, Student } from '../types';

function getFeedingText(status: FeedingStatus, name: string): string {
  switch (status) {
    case 'comeu_tudo':
      return `${name} comeu todo o lanchinho com muito apetite`;
    case 'comeu_parcialmente':
      return `${name} comeu uma parte do lanchinho hoje`;
    case 'nao_quis':
      return `${name} não quis lanchar hoje, mas está tudo bem`;
    default:
      return '';
  }
}

function getRestText(status: RestStatus): string {
  switch (status) {
    case 'dormiu_bem':
      return 'tirou um soninho tranquilo e reparador no repouso';
    case 'dormiu_pouco':
      return 'descansou um pouquinho no repouso, mas logo quis voltar a brincar';
    case 'nao_quis_dormir':
      return 'não quis dormir no repouso, preferiu ficar acordado(a) brincando';
    default:
      return '';
  }
}

function getMoodText(status: MoodStatus): string {
  switch (status) {
    case 'feliz_participativo':
      return 'passou o dia super feliz e participativo(a) em todas as atividades';
    case 'calmo':
      return 'ficou calminho(a) e tranquilo(a) durante o dia';
    case 'manhoso':
      return 'ficou um pouquinho manhoso(a) em alguns momentos, mas nada que um carinho não resolvesse';
    default:
      return '';
  }
}

export function generateMessage(student: Student, status: DailyStatus): string {
  const firstName = student.name.split(' ')[0];
  const parts: string[] = [];

  const greeting = `Olá, mamãe/papai do(a) ${student.name}! 💛\n\nPassando para compartilhar como foi o dia do(a) ${firstName} na escolinha hoje! ✨`;

  if (status.feeding) {
    parts.push(getFeedingText(status.feeding, firstName));
  }
  if (status.rest) {
    parts.push(getRestText(status.rest));
  }
  if (status.mood) {
    parts.push(getMoodText(status.mood));
  }

  let body = '';
  if (parts.length === 1) {
    body = `\n\n${parts[0].charAt(0).toUpperCase() + parts[0].slice(1)}. 😊`;
  } else if (parts.length === 2) {
    body = `\n\n${parts[0].charAt(0).toUpperCase() + parts[0].slice(1)} e ${parts[1]}. 😊`;
  } else if (parts.length === 3) {
    body = `\n\n${parts[0].charAt(0).toUpperCase() + parts[0].slice(1)}, ${parts[1]} e ${parts[2]}. 😊`;
  }

  let extra = '';
  if (status.extraNote && status.extraNote.trim()) {
    extra = `\n\n📝 Recadinho: ${status.extraNote.trim()}`;
  }

  const closing = `\n\nUm abraço carinhoso da tia! 🤗💕`;

  return `${greeting}${body}${extra}${closing}`;
}
