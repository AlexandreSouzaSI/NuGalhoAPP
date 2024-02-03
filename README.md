# App

Nu Galho app.

## RFs (Requisitos funcionais)

- [ ] Deve ser possivel se cadastrar;
- [ ] Deve ser possivel se autenticar;
- [ ] Deve ser possivel obter o perfil de um usuário logado;
- [ ] Deve ser possível Cadastrar funcionarios;
- [ ] Deve ser possivel Editar funcionarios;
- [ ] Deve ser possivel Remover funcionarios;

## RNs (Regras de négocio)

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode cadastrar 2 funcionarios com o mesmo cpf;
- [ ] O usuário não pode visualizar empresa onde ele não tenha a permissão;

## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas as listas de dados precisam estar paginadas por 5 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);

