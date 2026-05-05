# Guia de Instalação do Tailwind CSS

Seu projeto é um formulário web com front-end (HTML/CSS/JS) e back-end Node.js. Aqui estão as duas opções de instalação:

---

## OPÇÃO 1: VIA CDN (Mais simples)

Recomendado para projetos pequenos ou protótipos rápidos. Não requer Node.js.

### Passo a passo:

1. **Abra o arquivo `front/index.html`**

2. **Adicione a tag do Tailwind no `<head>`** (antes do seu `<style>` existente):
   ```html
   <script src="https://cdn.tailwindcss.com"></script>
   ```

3. **Pronto!** Agora você pode usar classes do Tailwind no seu HTML.

### Exemplo de uso:
```html
<!-- Antes (seu código atual) -->
<div class="form-group">
    <label>CPF ou CNPJ</label>
    <input type="text" id="documento" name="documento" maxlength="18" required>
</div>

<!-- Com Tailwind -->
<div class="mb-4">
    <label class="block font-bold mb-1">CPF ou CNPJ</label>
    <input type="text" id="documento" name="documento" maxlength="18" required 
           class="w-full max-w-xs px-3 py-2 border rounded">
</div>
```

---

## OPÇÃO 2: VIA NPM + POSTCSS (Recomendado para produção)

Provides:
- CSS otimizado e menor ( remove classes não usadas )
- Personalização completa via arquivo de configuração
- Integração com build tools

### Pré-requisitos:
- Node.js instalado ( https://nodejs.org/ )

### Passo a passo:

**1. Inicialize o npm no projeto:**
```bash
cd u:/Users/48655010880/vscode/frontend/formulário/exemplos/front
npm init -y
```

**2. Instale o Tailwind e suas dependências:**
```bash
npm install -D tailwindcss postcss autoprefixer
```

**3. Inicialize o Tailwind:**
```bash
npx tailwindcss init
```

**4. Configure o `tailwind.config.js`:**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**5. Crie o arquivo CSS principal:**
Crie um arquivo chamado `front/style.css` com:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**6. Configure o PostCSS:**
Crie um arquivo `postcss.config.js`:
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**7. Build o CSS:**
Adicione no `package.json` (scripts):
```json
"build": "npx tailwindcss -i ./style.css -o ./dist/style.css --watch"
```

Execute:
```bash
npm run build
```

**8. No HTML, inclua o CSS gerado:**
```html
<link href="dist/style.css" rel="stylesheet">
```

---

## Comparativo

| Característica | CDN | npm + PostCSS |
|---------------|-----|--------------|
| Setup | 1 minuto | 10-15 minutos |
| Tamanho do CSS | Maior (todas classes) | Otimizado |
| Personalização | Limitada | Total |
| Requer Node.js | Não | Sim |
| Recomendado para | Protótipos, testes | Projetos production |

---

## Recursos úteis

- Documentação oficial: https://tailwindcss.com/docs
- Playground: https://play.tailwindcss.com/
- Cheat Sheet: https://tailwindcss.com/cheat-sheet
