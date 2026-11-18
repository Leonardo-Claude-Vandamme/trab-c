# MinhaBiblioteca

## Integrantes

- Leonardo Soares — RGM: 114.006
- Joao Lucas — RGM: 114.008
- Renan Santos — RGM: 114.030
- Theo — RGM: 114.024

## Descrição do sistema

API REST para gerenciamento de materiais de uma biblioteca. O sistema permite listar, consultar, cadastrar, atualizar e remover livros e revistas. Os materiais são mantidos em memória; portanto, os dados voltam aos valores iniciais quando a aplicação é reiniciada.

Livros e revistas compartilham os campos `id` e `titulo`. Livros também possuem `autor` e `paginas`, enquanto revistas possuem `edicao` e `mesPublicacao`. O prazo de empréstimo calculado é de 14 dias para livros e 7 dias para revistas.

## Tecnologias utilizadas

- C#
- .NET 10
- ASP.NET Core Web API

## Como executar

### Pré-requisitos

- .NET SDK 10 instalado

### Iniciar a aplicação

No terminal, acesse a pasta do projeto e execute:

```bash
dotnet restore
dotnet run --launch-profile http
```

A API ficará disponível em `http://localhost:5194`.

## Principais endpoints

Todos os endpoints usam o prefixo `/api/materiais`.

| Método | Endpoint | Descrição | Respostas comuns |
|---|---|---|---|
| GET | `/api/materiais` | Lista todos os materiais | `200 OK` |
| GET | `/api/materiais/{id}` | Consulta um material pelo ID | `200 OK`, `404 Not Found` |
| POST | `/api/materiais` | Cadastra um livro ou uma revista | `201 Created` |
| PUT | `/api/materiais/{id}` | Atualiza um material existente | `204 No Content`, `404 Not Found` |
| DELETE | `/api/materiais/{id}` | Remove um material | `204 No Content`, `404 Not Found` |

O campo `tipo` identifica o tipo de material no JSON: use `livro` para livros e `revista` para revistas.

## Exemplos de testes manuais

Com a aplicação em execução, os comandos abaixo podem ser usados no terminal. No Windows, utilize `curl.exe` no PowerShell.

### Listar materiais

```bash
curl.exe http://localhost:5194/api/materiais
```

### Cadastrar um livro

```bash
curl.exe -X POST http://localhost:5194/api/materiais -H "Content-Type: application/json" -d "{\"tipo\":\"livro\",\"titulo\":\"Dom Casmurro\",\"autor\":\"Machado de Assis\",\"paginas\":256}"
```

### Consultar um material

```bash
curl.exe http://localhost:5194/api/materiais/1
```

### Atualizar um material

```bash
curl.exe -X PUT http://localhost:5194/api/materiais/1 -H "Content-Type: application/json" -d "{\"tipo\":\"livro\",\"titulo\":\"Dom Casmurro - edição revisada\",\"autor\":\"Machado de Assis\",\"paginas\":256}"
```

### Remover um material

```bash
curl.exe -X DELETE http://localhost:5194/api/materiais/1
```

Para verificar as respostas de erro, consulte um ID inexistente, por exemplo `GET http://localhost:5194/api/materiais/999`; a API deve responder `404 Not Found`.

## Front-end

O front fica na pasta `front` e foi feito com HTML, Bootstrap e JavaScript. A página tem um formulário para livros e revistas e uma tabela para mostrar os materiais cadastrados.

Para executar o sistema, inicie a aplicação com `dotnet run --launch-profile http` e abra `http://localhost:5194` no navegador. O ASP.NET Core serve o front e a API no mesmo endereço. O JavaScript usa o caminho `/api/Materiais`.

O JavaScript está em `front/script.js`. Ele usa `fetch` para listar, cadastrar, atualizar e excluir materiais. O formulário envia os dados de livros (`titulo`, `autor` e `paginas`) ou de revistas (`titulo`, `edicao` e `mesPublicacao`). O Bootstrap é usado no container, formulário, tabela responsiva, botões e mensagens.

Os campos obrigatórios são conferidos pelo formulário. Páginas e mês de publicação são campos numéricos; o mês deve estar entre 1 e 12. Antes de excluir um material, a página pede confirmação. Se a API retornar erro, uma mensagem é exibida.

### Teste do front

Com a API em execução, é possível cadastrar um livro e uma revista, atualizar os dados pelo botão **Editar** e removê-los pelo botão **Excluir**. O botão **Atualizar lista** consulta novamente os dados da API.

### Problemas comuns e soluções

- **A página não carrega os materiais:** confira se a aplicação está em execução e se foi aberta em `http://localhost:5194`.
- **Cadastro ou atualização não funciona:** confira se o tipo (`livro` ou `revista`) e os nomes dos campos enviados correspondem ao modelo da API.
- **A lista parece desatualizada depois de uma alteração:** use o botão **Atualizar lista** para consultar novamente a API.
- **Erro ao iniciar o projeto:** a API foi configurada para .NET 10, então é necessário ter um SDK compatível instalado.

### O que aprendemos

Com este projeto, praticamos a criação de formulários HTML, o uso do Bootstrap e o envio de dados JSON com `fetch`. Também trabalhamos com os métodos GET, POST, PUT e DELETE e com mensagens para indicar o resultado das operações.
