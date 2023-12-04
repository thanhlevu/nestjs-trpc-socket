import { useEffect } from 'react';
import { trpc } from './trpc';

import EucForm from './components/eucForm';
import { useEucStore } from './store';

function App() {
  const { eucList, updateEucList, updateEucId } = useEucStore();

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
          <button>Add New</button>
        </div>
        {eucList.map((euc) => (
          <button key={euc.id} onClick={() => updateEucId(euc.id)}>
            {euc.productName}
          </button>
        ))}
      </div>
      <div className="flex-1">
        <EucForm />
      </div>
      <div className="w-[460px]">This is the retailer column</div>
    </div>
  );
}

export default App;
