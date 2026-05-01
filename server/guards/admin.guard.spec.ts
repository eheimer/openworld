import { ForbiddenException, ExecutionContext } from '@nestjs/common';
import { AdminGuard } from './admin.guard';

function createMockContext(user: any): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ user }),
    }),
  } as unknown as ExecutionContext;
}

describe('AdminGuard', () => {
  const guard = new AdminGuard();

  it('returns true for an admin player', () => {
    const context = createMockContext({ id: 1, isAdmin: true });
    expect(guard.canActivate(context)).toBe(true);
  });

  it('throws ForbiddenException for a non-admin player', () => {
    const context = createMockContext({ id: 2, isAdmin: false });
    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });

  it('throws ForbiddenException when user is missing', () => {
    const context = createMockContext(undefined);
    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });
});
