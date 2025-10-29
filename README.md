FilaZero Backend API - Documentação
Autenticação
POST /auth/login
Autentica o usuário e retorna um token JWT.
Body: { "email": "email", "password": "senha" }
Response: { user, token }
Usuários
POST /users/register
Cadastra um novo usuário.
Body: { "name": "...", "email": "...", "phone": "...", "password_hash": "..." }

GET users
Lista todos os usuários (requer JWT).

PUT /users/:id
Atualiza dados do usuário (requer JWT).

Profissionais
POST /professionals/register
Cadastra um profissional (requer JWT).

GET /professionals/establishment/:establishmentId
Lista profissionais de um estabelecimento (requer JWT).

PUT /professionals/:id
Atualiza dados do profissional (requer JWT).

Serviços
POST /services/register
Cadastra um serviço (requer JWT).

GET /services/establishment/:establishmentId
Lista serviços de um estabelecimento (requer JWT).

PUT /services/:id
Atualiza dados do serviço (requer JWT).

Agendamentos
POST /appointments/schedule
Agenda um serviço (requer JWT).

GET /appointments/establishment/:establishmentId
Lista agendamentos do estabelecimento (requer JWT).

GET /appointments/user/:userId
Lista agendamentos do usuário (requer JWT).

GET /appointments/professional/:professionalId
Lista agendamentos do profissional (requer JWT).

PATCH /appointments/:id/approve
Aprova ou recusa agendamento (requer JWT).
Body: { "status": "confirmed" } ou { "status": "cancelled" }

Notificações
POST /notifications/create
Cria uma notificação (requer JWT).

GET /notifications/user/:userId
Lista notificações do usuário (requer JWT).

Avaliações
POST /ratings/create
Cadastra uma avaliação (requer JWT).

GET /ratings/professional/:professionalId
Lista avaliações de um profissional (requer JWT).

Bloqueios de Horário
POST /timeblocks/create
Cadastra bloqueio de horário (requer JWT).

GET /timeblocks/professional/:professionalId
Lista bloqueios de um profissional (requer JWT).

Histórico de Agendamentos
POST /appointment-history/create
Cadastra histórico de agendamento (requer JWT).

GET /appointment-history/appointment/:appointmentId
Lista histórico de um agendamento (requer JWT).

Serviços por Profissional
POST /professional-services/assign
Associa serviço ao profissional (requer JWT).

GET /professional-services/professional/:professionalId
Lista serviços de um profissional (requer JWT).

GET /professional-services/service/:serviceId
Lista profissionais de um serviço (requer JWT).

Obs:
Todas as rotas protegidas exigem o envio do token JWT no header:
Authorization: Bearer <token>