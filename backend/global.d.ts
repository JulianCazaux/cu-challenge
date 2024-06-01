import { $Enums } from '@prisma/client';

declare global {
  namespace PrismaJson {
    type AttackType = { name: string; damageAmount: number };
    type WeaknessType = { type: $Enums.TypeEnum; times: number };
    type ResistanceType = { type: $Enums.TypeEnum; value: number };
  }
}

export {};
