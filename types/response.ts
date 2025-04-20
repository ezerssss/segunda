import { StatusCodes } from "http-status-codes";

export type GenericResponseMessage = {
    message: string;
    status: StatusCodes;
};
