# App node testable

### Descrição
Este projeto é uma API backend testável e totalmente independente de frameworks, banco de dados e interface. Desenvolvida para resolver um problema comum enfrentado por clientes: a dificuldade em realizar agendamentos devido à falta de informações claras sobre horários disponíveis. O sistema permite que os clientes agendem compromissos de forma simples e organizada, garantindo que conflitos de horários sejam evitados.

---

## 🛠 Framework Utilizado

**Framework de Testes: [Vitest](https://vitest.dev)**
O Vitest foi selecionado como framework de testes por sua rapidez, integração com projetos JavaScript modernos e suporte nativo a TypeScript. Ele oferece uma experiência de desenvolvimento fluida e simplifica o processo de escrita de testes unitários e de integração.regras de negócio complexas, como as necessárias para gerenciar agendamentos.

---

## 🧪 Importância dos Testes

Implementar testes no projeto é essencial para:
- Garantir que as regras de negócio críticas (como evitar agendamentos conflitantes) estejam sempre funcionando.
- Reduzir o risco de introduzir erros ao fazer alterações no código.
- Proporcionar maior confiança na estabilidade do sistema, especialmente à medida que ele cresce.

---

## ✨ Código Independente

**Motivação:** Construir um código desacoplado garante que:
- O sistema não dependa exclusivamente de uma tecnologia específica (framework ou banco de dados).
- O código seja mais fácil de manter, escalar e testar.
- Partes do sistema possam ser reutilizadas em diferentes contextos ou substituídas por soluções melhores no futuro.

**Como aplicamos isso:**
- **Banco de Dados:** Usamos um repositório para abstrair operações no banco, tornando fácil trocar entre SQL e NoSQL, por exemplo.
- **Framework:** A lógica de negócio é implementada de forma independente, permitindo trocar de framework sem reescrever as regras.
- **Interface:** A camada de API é separada da lógica, permitindo futuras integrações com outras interfaces.

---

## 🎯 Objetivo do Projeto

Criar uma API para gestão de agendamentos, que:
1. Mostre horários disponíveis.
2. Permita aos clientes realizar agendamentos sem conflitos de horário.
3. Aplique regras de negócio específicas para garantir a validade dos dados.

---

## 📂 Estrutura de Pastas

```bash
src/
├── entities/       # Entidades na qual serão feitas a lógica
├── repositories/   # Acesso ao banco de dados (desacoplado da lógica)
├── tests/utils     # Testes unitários dos utilitários
├── use-cases/      # Lógica de negócio e regras específicas
```

---

## 🛡 Regras de Negócio

1. **Não pode criar agendamentos em datas anteriores a hoje.**
   - O sistema rejeitará agendamentos com datas passadas.

2. **O término do agendamento não pode ser antes do início.**
   - A duração deve ser positiva e válida.

3. **Apenas um agendamento permitido por data e horário.**
   - O sistema validará conflitos antes de confirmar o agendamento.

**Nota:** Neste estágio, foi priorizado a implementação dessas regras sobre decisões de arquitetura ou escolha de frameworks, pois a precisão nas regras de negócio é essencial para o sucesso do projeto.

---

## 🔄 Como Resolver Conflitos de Agendamento

- Antes de criar um agendamento, verificamos se o horário já está reservado.
- Caso o horário esteja ocupado, retornamos um erro indicando a indisponibilidade.
- A lógica para evitar conflitos é centralizada no **use-cases** para garantir consistência.

---

## 🧩 Por que Regras de Negócio são Prioridade?
No momento, as regras de negócio têm prioridade sobre questões arquiteturais. Isso garante que o problema principal do cliente seja resolvido com precisão, enquanto refinamentos no design e arquitetura podem ser feitos em etapas futuras.

