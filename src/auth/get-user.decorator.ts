import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';
import { GqlExecutionContext } from '@nestjs/graphql';


export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    const user = { ...req.user };
    user.password = 'Blocked';
    return user;
  },
);
export const GetUserID = createParamDecorator(
  (data, ctx: ExecutionContext): string => ctx.switchToHttp().getRequest().user.id,
);
export const GetGQLUserID = createParamDecorator(
  (data, ctx): void => GqlExecutionContext.create(ctx).getContext().req.user.id,
  //GqlExecutionContext.create(ctx).getContext().req
);

export const GetGQLRes = createParamDecorator(
  (data, ctx): Response => GqlExecutionContext.create(ctx).getContext().req.res,
);
