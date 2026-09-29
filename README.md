# RecadinhoFacil

Aplicacao web para professoras de educacao infantil gerarem recados diarios carinhosos para enviar aos pais pelo WhatsApp.

## Stack

- React + TypeScript
- Tailwind CSS (mobile-first, cores pastel)
- Vite
- localStorage para persistencia de dados

## Como rodar

```bash
npm install
npm run dev
```

Acesse http://localhost:5173 no navegador.

## Login

A aplicacao possui uma tela de login. Utilize as credenciais abaixo para acessar:

- **E-mail:** admin@email.com
- **Senha:** 123456

## Funcionalidades

- Gestao de alunos (cadastrar, editar, remover) organizados por turminha
- Painel de status diarios com marcacao rapida (alimentacao, descanso, humor)
- Geracao automatica de texto carinhoso para o WhatsApp
- Botao de copia rapida com feedback visual
- Tela de login com autenticacao por sessao

## Build de producao

```bash
npm run build
```

Os arquivos gerados estarao na pasta `dist/`.
