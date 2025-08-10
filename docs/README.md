# 📚 Documentação do Projeto

Esta pasta contém a documentação técnica do projeto Foxbit Mission, incluindo diagramas de arquitetura e fluxos de execução.

## 🏗️ Diagramas de Arquitetura

### 1. Diagrama de Arquitetura Geral (`architecture.mmd`)
Este diagrama mostra a estrutura geral do sistema e como as diferentes camadas se relacionam:

- **Mission HTTP**: Camada de apresentação (Controller e Service)
- **Use Cases**: Camada de casos de uso da aplicação
- **Domain**: Camada de domínio com entidades
- **Common**: Utilitários compartilhados

### 2. Diagrama de Sequência (`sequence.mmd`)
Este diagrama mostra o fluxo de execução de uma missão, desde a requisição HTTP até a resposta:

- Fluxo de upload de arquivo
- Processamento da missão
- Execução dos comandos
- Tratamento de erros
- Retorno dos resultados

## 🔍 Como Visualizar os Diagramas

### Opção 1: GitHub (Recomendado)
Os diagramas Mermaid são renderizados automaticamente no GitHub. Basta navegar para os arquivos `.mmd` na interface web do GitHub.

### Opção 2: Mermaid Live Editor
1. Acesse [Mermaid Live Editor](https://mermaid.live/)
2. Copie o conteúdo do arquivo `.mmd` desejado
3. Cole no editor
4. O diagrama será renderizado automaticamente

### Opção 3: Extensões do VS Code
Instale uma das seguintes extensões:
- **Mermaid Preview**: Visualiza diagramas Mermaid
- **Markdown Preview Mermaid Support**: Suporte a Mermaid no preview do Markdown

### Opção 4: Ferramentas Online
- **Mermaid.js**: [https://mermaid.js.org/](https://mermaid.js.org/)
- **Mermaid Chart**: [https://www.mermaidchart.com/](https://www.mermaidchart.com/)

## 📝 Formato dos Arquivos

Os diagramas estão escritos em **Mermaid**, uma linguagem de descrição de diagramas baseada em texto. Cada arquivo `.mmd` contém:

- **architecture.mmd**: Diagrama de fluxo (flowchart) mostrando a estrutura do sistema
- **sequence.mmd**: Diagrama de sequência mostrando a interação entre componentes

## 🚀 Exemplos de Uso

### Visualizando no GitHub
1. Navegue para `docs/diagrams/`
2. Clique em qualquer arquivo `.mmd`
3. O diagrama será renderizado automaticamente

### Editando Diagramas
1. Abra o arquivo `.mmd` no VS Code
2. Instale a extensão Mermaid Preview
3. Use `Ctrl+Shift+P` e digite "Mermaid Preview"
4. Visualize as mudanças em tempo real

### Adicionando Novos Diagramas
1. Crie um novo arquivo `.mmd` na pasta `diagrams/`
2. Use a sintaxe Mermaid para criar o diagrama
3. Adicione uma descrição neste README
4. Commit e push para o repositório

## 📚 Recursos Adicionais

- [Documentação Mermaid](https://mermaid.js.org/intro/)
- [Sintaxe de Flowcharts](https://mermaid.js.org/syntax/flowchart.html)
- [Sintaxe de Sequence Diagrams](https://mermaid.js.org/syntax/sequenceDiagram.html)
- [Editor Online](https://mermaid.live/) 