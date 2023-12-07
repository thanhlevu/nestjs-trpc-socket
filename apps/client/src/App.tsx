import { useCallback, useEffect, useState } from 'react';
import { trpc } from './trpc';

import { Socket, io } from 'socket.io-client';
import EucForm from './components/eucForm';
import { useEucStore } from './store';

function App() {
  const { eucList, updateEucList, updateEucId } = useEucStore();
  const [socket, setSocket] = useState<Socket>();

  const sendMessage = (value: string) => {
    socket?.emit('message', value);
  };

  const listenMessage = useCallback(async () => {
    const res = await trpc.getAllEucWithRetailers.query();

    updateEucList(res);
  }, [updateEucList]);

  useEffect(() => {
    const newSocket = io('http://localhost:8001');
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    socket?.on('message', listenMessage);
    return () => {
      socket?.off('message', listenMessage);
    };
  }, [listenMessage, socket]);

  useEffect(() => {
    const fetchEucs = async () => {
      const res = await trpc.getAllEucWithRetailers.query();
      updateEucList(res);
    };
    fetchEucs();
  }, [updateEucList]);

  return (
    <div className="flex gap-10 w-screen h-screen bg-gradient-to-b bg-gray-900">
      <div className="flex flex-col w-[460px] bg-">
        <div className="flex justify-between">
          <p>list of EUC</p>
          <button onClick={() => updateEucId(null)}>Add New</button>
        </div>
        {eucList
          .sort((a, b) => a.productName.localeCompare(b.productName))
          .map((euc) => (
            <button key={euc.id} onClick={() => updateEucId(euc.id)}>
              {euc.productName}
            </button>
          ))}
      </div>
      <div className="flex-1">
        <EucForm sendMessage={sendMessage} />
      </div>
      <div className="w-[460px]">This is the retailer column</div>
    </div>
  );
}

export default App;
