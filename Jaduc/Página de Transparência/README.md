# 📊 Página de Transparência - JADUC

## 🎯 Visão Geral

Página web responsiva e interativa que exibe informações de transparência pública do orçamento municipal de Pimentas, Guarulhos - SP. Implementada com HTML5, CSS3 puro e JavaScript vanilla, seguindo os padrões de design do Figma e a semântica da Página de Login e Cadastro.

## ✨ Funcionalidades

### 🎨 Design e Layout
- ✅ Design fiel ao Figma com paleta de cores consistente
- ✅ Layout responsivo (Desktop, Tablet, Mobile)
- ✅ Animações suaves e transições elegantes
- ✅ Tipografia hierárquica e legível

### 📈 Componentes Interativos

#### 1. Header Navegação
- Logo JADUC clicável
- Menu de navegação com item ativo destacado
- Perfil do usuário com avatar
- Menu hambúrguer responsivo (mobile)

#### 2. Cards de Estatísticas
- **Orçamento Destinado**: R$ 15 MI (card azul destacado)
- **Projetos Ativos**: 8 projetos em andamento
- **Obras Atrasadas**: 1 obra com atraso
- Animação de entrada com efeito stagger
- Hover com elevação e sombra

#### 3. Gráfico de Rosca (Donut Chart)
- Visualização da distribuição do orçamento
- 5 categorias com cores distintas:
  - 🏥 Saúde (35%) - Azul escuro
  - 📚 Educação (25%) - Azul médio
  - 🏗️ Infraestrutura (20%) - Azul claro
  - 🚔 Segurança (10%) - Marrom
  - 🎭 Outros (10%) - Verde-azulado
- Animação progressiva ao entrar no viewport
- Interatividade: hover destaca segmentos
- Legenda clicável com scroll para detalhes

#### 4. Projetos em Destaque
- 3 cards de projetos com informações:
  - Nome do projeto
  - Status (Em andamento/Atrasado/Concluído)
  - Barra de progresso animada
  - Porcentagem de conclusão
- Cores diferentes por status
- Animação de preenchimento das barras

## 🗂️ Estrutura de Arquivos

```
Página de Transparência/
├── index.html          # Estrutura HTML semântica
├── globals.css         # Variáveis CSS e estilos globais
├── style.css           # Estilos específicos da página
├── script.js           # JavaScript para interatividade
└── README.md           # Esta documentação
```

## 🎨 Paleta de Cores

```css
/* Cores Principais */
--bg-page: #f8ede5           /* Fundo bege claro */
--primary-blue: #003d5c      /* Azul escuro */
--primary-dark: #016180      /* Azul principal */
--accent-blue: #4a8cb0       /* Azul claro */
--teal-light: #9ecdc9        /* Verde-azulado */

/* Cores de Texto */
--brown-dark: #4c2c17        /* Marrom escuro */
--brown-medium: #8c5c47      /* Marrom médio */
--white: #ffffff             /* Branco */
```

## 📱 Responsividade

### Breakpoints Implementados

| Dispositivo | Largura | Ajustes |
|------------|---------|---------|
| Desktop | 1920px+ | Layout completo |
| Laptop | 1440px | Espaçamentos reduzidos |
| Tablet | 1024px | Grid simplificado |
| Mobile | 768px | Stack vertical, menu hambúrguer |
| Mobile Pequeno | 480px | Tipografia reduzida |

### Adaptações Mobile
- Menu de navegação em overlay
- Cards empilhados verticalmente
- Gráfico de rosca redimensionado
- Tipografia escalada proporcionalmente
- Touch-friendly (botões maiores)

## 🚀 Como Usar

### Abrir a Página
1. Navegue até a pasta `Jaduc/Página de Transparência/`
2. Abra o arquivo [`index.html`](index.html:1) em um navegador moderno
3. Ou use um servidor local:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (http-server)
   npx http-server
   ```

### Navegação
- **Desktop**: Use o mouse para interagir com os elementos
- **Mobile**: Toque no menu hambúrguer para abrir a navegação
- **Gráfico**: Passe o mouse sobre os segmentos ou legenda
- **Projetos**: Scroll para ver as barras de progresso animarem

## 🎭 Animações Implementadas

### 1. Entrada da Página
- Fade-in com slide-up nos elementos principais
- Stagger effect nos cards (delay progressivo)

### 2. Gráfico de Rosca
```javascript
// Animação de preenchimento circular
// Duração: 1.5s com easing suave
// Delay entre segmentos: 200ms
```

### 3. Barras de Progresso
```javascript
// Preenchimento da esquerda para direita
// Ativado por Intersection Observer
// Transição: 1.5s cubic-bezier
```

### 4. Hover Effects
- Cards: `translateY(-8px)` + sombra aumentada
- Botões: Mudança de cor suave
- Segmentos do gráfico: Brightness + drop-shadow

### 5. Parallax Sutil
- Hero section com movimento leve no scroll
- Opacidade reduzida gradualmente

## 🔧 Personalização

### Alterar Cores
Edite as variáveis CSS em [`globals.css`](globals.css:3):
```css
:root {
    --primary-blue: #003d5c;  /* Sua cor aqui */
    --accent-blue: #4a8cb0;   /* Sua cor aqui */
}
```

### Modificar Dados do Gráfico
Em [`script.js`](script.js:73), altere o array de porcentagens:
```javascript
const percentages = [35, 25, 20, 10, 10]; // Seus valores aqui
```

### Adicionar Novos Projetos
Em [`index.html`](index.html:1), copie e cole um `.project-card`:
```html
<article class="project-card">
    <div class="project-header">
        <h3 class="project-title">Nome do Projeto</h3>
        <span class="project-badge project-badge--progress">Status</span>
    </div>
    <div class="project-progress">
        <div class="progress-bar">
            <div class="progress-fill progress-fill--progress" data-progress="75"></div>
        </div>
        <span class="progress-label">75% Concluído</span>
    </div>
</article>
```

## ♿ Acessibilidade

### Recursos Implementados
- ✅ Semântica HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`)
- ✅ ARIA labels para elementos interativos
- ✅ Contraste de cores WCAG 2.1 AA
- ✅ Foco visível para navegação por teclado
- ✅ Alt text para imagens e ícones
- ✅ Textos descritivos para screen readers

### Navegação por Teclado
- `Tab`: Navegar entre elementos interativos
- `Enter/Space`: Ativar botões e links
- `Esc`: Fechar menu mobile (se implementado)

## 🌐 Compatibilidade

### Navegadores Suportados
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

### Tecnologias Utilizadas
- HTML5 (Semântico)
- CSS3 (Grid, Flexbox, Custom Properties, Animations)
- JavaScript ES6+ (Vanilla, sem frameworks)
- SVG (Gráficos e ícones)

## 📊 Performance

### Otimizações Implementadas
- CSS puro (sem Tailwind ou frameworks pesados)
- JavaScript vanilla (sem jQuery ou bibliotecas)
- SVG inline (sem requisições HTTP extras)
- Intersection Observer (animações eficientes)
- RequestAnimationFrame (animações suaves 60fps)

### Métricas Esperadas
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Score: > 90

## 🐛 Troubleshooting

### Problema: Gráfico não anima
**Solução**: Verifique se o JavaScript está carregado corretamente e se não há erros no console.

### Problema: Estilos não aplicados
**Solução**: Confirme que os caminhos dos arquivos CSS estão corretos no HTML.

### Problema: Menu mobile não abre
**Solução**: Verifique se o JavaScript está habilitado e se a largura da tela é < 768px.

### Problema: Imagens não aparecem
**Solução**: Verifique os caminhos relativos das imagens em `../img/`.

## 🔄 Futuras Melhorias

### Sugestões de Expansão
- [ ] Integração com API para dados dinâmicos
- [ ] Filtros por período (mês, ano)
- [ ] Exportação de relatórios (PDF)
- [ ] Gráficos adicionais (barras, linhas)
- [ ] Modo escuro (dark mode)
- [ ] Internacionalização (i18n)
- [ ] PWA (Progressive Web App)
- [ ] Animações mais complexas com GSAP

## 📚 Referências

- **Design Original**: Figma - JADUC (node-id: 176-156)
- **Padrão de Código**: Página de Login e Cadastro
- **Fontes**: Google Fonts (Castoro, Open Sans, Palanquin, Poppins)

## 👨‍💻 Desenvolvimento

### Estrutura do Código
- **HTML**: Semântico, acessível, bem comentado
- **CSS**: BEM-like naming, mobile-first, variáveis CSS
- **JavaScript**: Modular, comentado, sem dependências

### Boas Práticas Seguidas
- ✅ Código limpo e legível
- ✅ Comentários explicativos
- ✅ Nomenclatura consistente
- ✅ Separação de responsabilidades
- ✅ Performance otimizada
- ✅ Acessibilidade em primeiro lugar

## 📄 Licença

Este projeto faz parte do sistema JADUC e segue as diretrizes do projeto principal.

---

**Desenvolvido com ❤️ para JADUC**  
**Versão**: 1.0.0  
**Data**: 2026-09-14
