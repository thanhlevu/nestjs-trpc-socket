import { trpc } from './trpc';

export default async function Home() {
  const res = await trpc.createUser.mutate({ name: 'gonzo' });
  return <p>{JSON.stringify(res)}</p>;
}
