export interface ICustomResponse{
    message: string;
    success: boolean;
    response_type: number;
    code: number;
}
export interface ICustomDataResponse<T> extends ICustomResponse{
    data: T
}
