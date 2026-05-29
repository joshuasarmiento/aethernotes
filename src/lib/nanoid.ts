import { nanoid as baseNanoid } from 'nanoid';

export function nanoid(): string {
  return baseNanoid(10);
}
