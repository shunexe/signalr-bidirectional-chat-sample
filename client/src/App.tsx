import React, {useEffect, useState} from 'react';
import './App.css';
import * as signalR from '@microsoft/signalr'
const host ='http://localhost:7071/api';

const connection = new signalR.HubConnectionBuilder()
  .withUrl(host,{
    withCredentials:false,
    accessTokenFactory:()=>{
      return Promise.resolve('test')
    }}
  )
  // .withUrl(host,{withCredentials:false})
  .configureLogging(signalR.LogLevel.Trace)
  .withAutomaticReconnect()
  .build()

function App() {
  const [data,setData] = useState<string|null>(null)

  useEffect(()=>{
    connection.on("ReceiveMessage", (user: string, message: string) => {
      console.log(`${user}: ${message}`);
    });
    connection.on('test', data => {
      console.log("Received data from signalR")
      setData(data)
    })
    connection.onclose(function() {
      console.log('signalr disconnected')
    })
    connection.onreconnecting(err =>
        console.log('err reconnecting  ', err)
    )
    connection
        .start()
        .then((res:any) => {console.log(res)})
        .catch(console.error)
  },[])

  const sendMessage = async (user: string, message: string) => {
    // await connection.send("SendMessage", "message").then(console.log)
    await connection.invoke("SendMessage",'user1','userId').then(console.log).catch(console.log)
    // connection.invoke("invocation", user, message).catch(err => console.error(err.toString()));
  };
  return (
      <>
        <button onClick={()=>sendMessage('test','hello')}>Send Message</button>
        <div>
          <div>Message from SignalR</div>
          <div style={{padding:2,border:'1px solid black',height:20,width:200}}>
            {data}
          </div>
        </div>
      </>
  );
}

export default App;
