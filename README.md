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
- Swagger / Swashbuckle para documentação interativa

## Como executar

### Pré-requisitos

- .NET SDK 10 instalado

### Iniciar a aplicação

No terminal, acesse a pasta do projeto e execute:

```bash
dotnet restore
dotnet run --launch-profile http
```

A API ficará disponível em `http://localhost:5194`. A interface do Swagger fica em `http://localhost:5194/swagger`.

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
