import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    // testowe dane
    const hardcodedUser = {
      id: 1,
      email: 'admin@example.com',
      password: '123456', // niehashowane – tylko na testy!
    };

    if (
      email === hardcodedUser.email &&
      password === hardcodedUser.password
    ) {
      const { password, ...user } = hardcodedUser;
      return user;
    }

    return null;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
