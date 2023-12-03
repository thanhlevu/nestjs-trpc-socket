import { trpc } from './trpc';

export default async function Home() {
  const res = await trpc.hello.query({ name: 'abuw' });
  console.log('>>> ', res);
  return <p>hello</p>;
}
