import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { join } from 'path';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';

// Core modules
import { AuthModule } from './modules/auth/auth.module.js';
import { MetadataModule } from './modules/metadata/metadata.module.js';
import { PlayersModule } from './modules/players/players.module.js';

// Domain modules
import { CharactersModule } from './modules/characters/characters.module.js';
import { CombatModule } from './modules/combat/combat.module.js';
import { CraftingModule } from './modules/crafting/crafting.module.js';
import { EquipmentModule } from './modules/equipment/equipment.module.js';
import { InventoryModule } from './modules/inventory/inventory.module.js';
import { MagicModule } from './modules/magic/magic.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./config/.env.${process.env.NODE_ENV || 'dev'}`,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api/{*path}'],
    }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: join(__dirname, '..', '..', 'data', 'game.sqlite'),
      autoLoadEntities: true,
      synchronize: false,
    }),

    // Core
    AuthModule,
    MetadataModule,
    PlayersModule,

    // Domain modules
    CharactersModule,
    CombatModule,
    CraftingModule,
    EquipmentModule,
    InventoryModule,
    MagicModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}
