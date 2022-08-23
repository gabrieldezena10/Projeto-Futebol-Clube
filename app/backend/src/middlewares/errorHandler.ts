import { NextFunction, Request, Response } from 'express';
import CustomError from '../utils/customError';
import HTTP_STATUS from '../utils/httpStatus';

// https://www.becomebetterprogrammer.com/how-to-use-error-handler-middleware-with-express-js-and-typescript/

class ErrorHandler {
  errorDefault: number;

  constructor(errorDefault = HTTP_STATUS.INTERNAL_ERROR) {
    this.errorDefault = errorDefault;
  }

  errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof CustomError) {
      res.status(err.status).json({ message: err.message });

      return next();
    }
    res.status(this.errorDefault).json({ message: err.message });

    return next();
  }
}

const middlewareError = new ErrorHandler();

export default middlewareError;
