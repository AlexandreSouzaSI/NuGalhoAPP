# App

Nu Galho app.

## RFs (Requisitos funcionais)

- [x] Deve ser possivel se cadastrar;
- [x] Deve ser possivel se autenticar;
- [x] Deve ser possivel obter o perfil de um usuário logado;
- [x] Deve ser possível Cadastrar funcionarios;
- [ ] Deve ser possivel Editar funcionarios;
- [x] Deve ser possivel Remover funcionarios;
- [x] Deve ser possivel Cadastrar uma empresa;
- [ ] Deve ser possivel Remover uma empresa;
- [ ] Deve ser possivel editar uma empresa;
- [x] Deve ser possivel listar todos os funcionarios pela Id da empresa
- [ ] Deve ser possivel listar todas as empresas

## RNs (Regras de négocio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode cadastrar 2 funcionarios com o mesmo cpf;
- [ ] O usuário não pode visualizar empresa onde ele não tenha a permissão;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas as listas de dados precisam estar paginadas por 5 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);

