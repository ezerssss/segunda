import { StatusCodes } from "http-status-codes";

export type GenericReturnMessage = {
    message: string;
    status: StatusCodes;
};
