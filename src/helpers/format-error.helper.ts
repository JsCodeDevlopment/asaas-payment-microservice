import { AxiosError } from 'axios';
import { ErrorResponseDto } from 'src/types/dto/error-response.dto';

export function formatError(error: AxiosError): ErrorResponseDto {
  let code = 500;
  let message = 'Internal server error';

  if (error.response) {
    code = error.response.status;

    const { message: respMessage, errors } =
      (error.response.data as {
        message?: string;
        errors?: { description?: string }[];
      }) || {};

    message =
      errors?.[0]?.description ?? respMessage ?? error.message ?? message;
  } else if (error.message) {
    message = error.message;
  }

  return { code, message };
}
