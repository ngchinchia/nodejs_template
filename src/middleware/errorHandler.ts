import { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError";
import { ErrorResponse } from "../types/error.types";
import { MongoError } from "mongodb";

export const errorHandler = (
  err: Error | AppError | MongoError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err);

  let errorResponse: ErrorResponse = {
    status: "error",
    code: 500,
    message: "Internal server error",
  };

  // Handle custom AppError
  if (err instanceof AppError) {
    errorResponse.code = err.code;
    errorResponse.message = err.message;
  }

  // Handle MongoDB errors
  else if (err instanceof MongoError) {
    if (err.code === 11000) {
      errorResponse.code = 409;
      errorResponse.message = "Duplicate entry";
    }
  }

  // Handle validation errors from MongoDB/Mongoose
  else if (err.name === "ValidationError") {
    errorResponse.code = 400;
    errorResponse.message = "Validation error";
  }

  // Send error response
  res.status(errorResponse.code).json(errorResponse);
};
