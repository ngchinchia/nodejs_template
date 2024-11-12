export class AppError extends Error {
    public readonly code: number;
  
    constructor(message: string, code: number) {
      super(message);
      this.code = code;
      Error.captureStackTrace(this, this.constructor);
    }
  
    static badRequest(message: string): AppError {
      return new AppError(message, 400);
    }
  
    static unauthorized(message: string): AppError {
      return new AppError(message, 401);
    }
  
    static forbidden(message: string): AppError {
      return new AppError(message, 403);
    }
  
    static notFound(message: string): AppError {
      return new AppError(message, 404);
    }
  
    static internal(message: string): AppError {
      return new AppError(message, 500);
    }
  }