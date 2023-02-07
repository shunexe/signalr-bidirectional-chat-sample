import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest, connectionInfo: any): Promise<void> {
    context.log(req.headers.authorization)
    context.log(connectionInfo)
    connectionInfo.UserId="hello"
    context.res.body = connectionInfo;
};

export default httpTrigger;
