import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { Public } from '../../decorators/public-auth.decorator.js';
import { LocalAuthGuard } from '../../guards/local-auth.guard.js';
import { CurrentPlayer } from '../../decorators/current-player.decorator.js';
import { Player } from '../../entities/player.entity.js';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(@CurrentPlayer() player: Player) {
    return this.authService.login(player);
  }

  @Post('register')
  @Public()
  async register(@Body() dto: RegisterDto) {
    const player = await this.authService.register(dto);
    return {
      id: player.id,
      username: player.username,
      email: player.email,
    };
  }

  @Get('me')
  me(@CurrentPlayer() player: Player) {
    return {
      id: player.id,
      username: player.username,
      email: player.email,
      isAdmin: player.isAdmin,
    };
  }
}
