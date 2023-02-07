import { AzureFunction, Context } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, invocation): Promise<void> {
    context.log(JSON.stringify(invocation))
    context.log(`Receive ${context.bindingData.message} from ${invocation.ConnectionId}.`)
    context.bindings.signalRMessages = [{
        "target": "test",
        "arguments": [`Hello,world!! ${new Date().toISOString()}`]
    }];
};

export default httpTrigger;
