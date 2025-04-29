export type RequestMethodsType = keyof typeof RequestMethodsEnum;
export const RequestMethodsEnum = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;
