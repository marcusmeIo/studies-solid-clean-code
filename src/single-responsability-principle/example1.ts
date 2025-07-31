// FORMA ERRADA
/*class UserService {
  public createUser(email: string, name: string) {
    if (!email || !name) {
      throw new Error('Dados inválidos.');
    }

    // 1. Responsabilidade: Lógica de negócio e validação
    const user = { email, name, createdAt: new Date() };

    // 2. Responsabilidade: Persistência no banco de dados (simulado)
    console.log('Salvando usuário no banco de dados...', user);

    // 3. Responsabilidade: Envio de e-mail
    console.log('Enviando email...')

    return user;
  }
}
*/

// FORMA CORRETA

export class User {
  email: string;
  name: string;
  createdAt: Date;

  constructor(email: string, name: string) {
    if (!email || !name) {
      throw new Error('Email e nome são obrigatórios.');
    }
    this.email = email;
    this.name = name;
    this.createdAt = new Date();
  }
}

// Responsável apenas por interagir com o banco de dados de usuários
export class UserRepository {
  public save(user: User): void {
    console.log('Salvando usuário no banco de dados...', user);
    // Lógica de DB (ex: await prisma.user.create({ data: user }))
  }
}

// Responsável apenas por enviar e-mails
export class EmailService {
  public sendWelcomeEmail(to: string, name: string): void {
    console.log(`Enviando e-mail de boas-vindas para ${to}...`);
  }
}

// Orquestra as outras peças - sua única responsabilidade é a lógica de negócio de criar um usuário
export class CreateUserService {
  constructor(
    private userRepository: UserRepository,
    private emailService: EmailService
  ) { }

  public execute(email: string, name: string): User {
    const user = new User(email, name);
    this.userRepository.save(user);
    this.emailService.sendWelcomeEmail(user.email, user.name);
    return user;
  }
}