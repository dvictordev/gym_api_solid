#App

GymPass style app

## RFs (Requisitos funcionais)

- [x] Deve ser possivel se cadastrar;
- [x] Deve ser possivel ser autenticar;
- [x] Deve ser possivel obter o perfil de um usuario logado;
- [ ] Deve ser possivel obter o numero de check-ins realizados pelo usuario;
- [ ] Deve ser possivel o usuario obter seu histórico de check-ins;
- [ ] Deve ser possivel o usuario buscar academias proximas.
- [ ] Deve ser possivel o usuario buscar academias pelo nome;
- [x] Deve ser possivel o usuario realizar check-in em uma academia;
- [ ] Deve ser possivel validar o check-in de um usuario;
- [x] Deve ser possivel cadastrar uma academia;

## RNs (Regras de negócio)

- [x] O usuario não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuario não pode fazer dois check-ins no mesmo dia;
- [x] o usuario não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] o check-in só pode ser validado até 20 minutos após criado;
- [ ] o check-in só pode ser validado por administradores;
- [ ] a academina só poder ser cadastrada por administradores;

## RNFs (Requisitos não funcionais)

- [x] a senha do usuario precisa estar criptografada;
- [x] os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] todas as listas de dadso precisam estar paginadas com 20 itens por pagina;
- [ ] o usuario deve ser identificado por um JWT (JSON Web Token);
