import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../../entities/player.entity.js';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly repository: Repository<Player>,
  ) {}

  findOne(id: number): Promise<Player | null> {
    return this.repository.findOneBy({ id });
  }

  findOneByUsername(username: string): Promise<Player | null> {
    return this.repository.findOneBy({ username });
  }

  findOneByEmail(email: string): Promise<Player | null> {
    return this.repository.findOneBy({ email });
  }

  async create(data: Partial<Player>): Promise<Player> {
    const player = this.repository.create(data);
    return this.repository.save(player);
  }

  async update(id: number, data: Partial<Player>): Promise<Player> {
    await this.repository.update(id, data);
    const player = await this.findOne(id);
    if (!player) {
      throw new NotFoundException(`Player with id ${id} not found`);
    }
    return player;
  }
}
