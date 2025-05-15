import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AxiosError } from 'axios';

export function formatError(error: AxiosError): never {
  if (error.response) {
    const { message: respMessage, errors } =
      (error.response.data as {
        message?: string;
        errors?: { description?: string }[];
      }) || {};

    const errorMessage =
      errors?.[0]?.description ?? respMessage ?? error.message;
    const statusCode = error.response.status as HttpStatus;

    switch (statusCode) {
      case HttpStatus.UNAUTHORIZED:
        throw new UnauthorizedException(errorMessage);
      case HttpStatus.FORBIDDEN:
        throw new ForbiddenException(errorMessage);
      case HttpStatus.NOT_FOUND:
        throw new NotFoundException(errorMessage);
      case HttpStatus.BAD_REQUEST:
        throw new BadRequestException(errorMessage);
      default:
        throw new HttpException(errorMessage, statusCode);
    }
  }

  throw new InternalServerErrorException(error.message);
}
