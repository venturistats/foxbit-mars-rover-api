# 📊 Diagramas do Sistema

Esta pasta contém os diagramas Mermaid que ilustram a arquitetura e fluxo do sistema Foxbit Mission.

## 🏗️ Diagrama de Arquitetura

**Arquivo**: `architecture.mmd`

Este diagrama mostra a estrutura geral do sistema e como as diferentes camadas se relacionam:

```mermaid
flowchart LR
  subgraph Mission_HTTP
    Controller[MissionController]
    Service[MissionService]
  end
  subgraph UseCases
    UC[ProcessMissionUseCase]
    Parser[parseMissionInput]
    Exec[executeMission]
  end
  subgraph Domain
    Plateau[Plateau]
    Rover[Rover]
    Command[Command]
    Direction[Direction]
  end
  subgraph Common
    Filter[DomainExceptionFilter]
    Logger[LoggingInterceptor + AppLogger]
    Err[InvalidInputError]
  end

  Controller --> Service --> UC
  UC --> Parser --> Plateau
  Parser --> Rover
  Parser --> Command
  Parser --> Direction
  UC --> Exec --> Rover
  Exec --> Err
  Err --> Filter
  Controller -- logs --> Logger
```

## 🔄 Diagrama de Sequência

**Arquivo**: `sequence.mmd`

Este diagrama mostra o fluxo de execução de uma missão, desde a requisição HTTP até a resposta:

```mermaid
sequenceDiagram
  participant C as Client
  participant Ctrl as MissionController
  participant Svc as MissionService
  participant UC as ProcessMissionUseCase
  participant Parser as parseMissionInput
  participant Exec as executeMission
  participant Rover as Rover
  participant Filter as DomainExceptionFilter

  C->>Ctrl: POST /mission/run (file)
  Ctrl->>Svc: runFromText(input)
  Svc->>UC: run(input)
  UC->>Parser: parse(input)
  Parser-->>UC: plateau, rovers+commands
  loop each rover
    UC->>Exec: execute(plateau, rover, cmds)
    Exec->>Rover: turn/move
    alt invalid move
      Rover-->>Exec: InvalidInputError
      Exec-->>UC: error
      UC-->>Ctrl: error
      Ctrl-->>Filter: handle
    end
  end
  UC-->>Svc: positions string
  Svc-->>Ctrl: result
  Ctrl-->>C: { result }
```

## 📝 Descrição dos Componentes

### Mission HTTP Layer
- **MissionController**: Recebe requisições HTTP e gerencia uploads de arquivo
- **MissionService**: Conecta o controller com os casos de uso

### Use Cases Layer
- **ProcessMissionUseCase**: Orquestra todo o processo da missão
- **parseMissionInput**: Converte texto de entrada em objetos estruturados
- **executeMission**: Executa comandos em um rover específico

### Domain Layer
- **Plateau**: Define os limites e valida posições
- **Rover**: Representa um rover com posição, direção e comandos
- **Command**: Enumera os comandos disponíveis (L, R, M)
- **Direction**: Enumera as direções (N, E, S, W)

### Common Layer
- **DomainExceptionFilter**: Captura e trata erros de domínio
- **LoggingInterceptor + AppLogger**: Sistema de logging centralizado
- **InvalidInputError**: Erro customizado para entradas inválidas

## 🔍 Como Interpretar os Diagramas

### Fluxo de Arquitetura
1. **Entrada**: Client → Controller → Service → UseCase
2. **Processamento**: UseCase → Parser → Domain Objects
3. **Execução**: UseCase → Executor → Rover
4. **Saída**: Rover → UseCase → Service → Controller → Client

### Fluxo de Sequência
1. **Upload**: Cliente envia arquivo via POST
2. **Parse**: Sistema converte texto em objetos estruturados
3. **Execução**: Comandos são executados em cada rover
4. **Validação**: Movimentos inválidos geram erros
5. **Resultado**: Posições finais são retornadas

## 🚀 Próximos Passos

Para adicionar novos diagramas:
1. Crie um arquivo `.mmd` com sintaxe Mermaid
2. Adicione uma descrição neste README
3. Inclua o diagrama renderizado usando blocos de código
4. Atualize a documentação principal se necessário 