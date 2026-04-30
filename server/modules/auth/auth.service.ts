import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { PlayersService } from '../players/players.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { Player } from '../../entities/player.entity.js';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private playersService: PlayersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<Player> {
    const { username, password, email } = dto;

    let existing = await this.playersService.findOneByUsername(username);
    if (existing) {
      throw new BadRequestException('Username already in use');
    }

    existing = await this.playersService.findOneByEmail(email);
    if (existing) {
      throw new BadRequestException('Email already in use');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = await this.hashPassword(password, salt);

    return this.playersService.create({
      username,
      email,
      password: `${salt}.${hash}`,
    });
  }

  async authenticate(
    username: string,
    password: string,
  ): Promise<Player | null> {
    const player = await this.playersService.findOneByUsername(username);
    if (!player) {
      throw new NotFoundException('User not found');
    }

    const [salt, storedHash] = player.password.split('.');
    const hash = await this.hashPassword(password, salt);

    if (storedHash !== hash) {
      throw new BadRequestException('Invalid password');
    }

    return player;
  }

  async login(player: Player) {
    await this.playersService.update(player.id, { lastSeenAt: new Date() });

    const payload = { username: player.username, sub: player.id };
    return {
      token: this.jwtService.sign(payload),
      player: {
        id: player.id,
        username: player.username,
        email: player.email,
        isAdmin: player.isAdmin,
      },
    };
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    const hash = (await scrypt(password, salt, 64)) as Buffer;
    return hash.toString('hex');
  }
}
