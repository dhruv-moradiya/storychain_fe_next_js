interface IBaseResponse<T> {
  data: T;
  message: string;
  success: boolean;
  code: string;
}

export type { IBaseResponse };
