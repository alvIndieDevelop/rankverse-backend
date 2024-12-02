import { Injectable } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtModule) {}

  async loginIn(email: string, password: string): Promise<any> {}

  async Register() {}
}
