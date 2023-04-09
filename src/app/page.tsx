import Image from 'next/image'
import { Inter } from 'next/font/google'
import Button from '@/components/ui/Button';
import { db } from '@/lib/db';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <div className="p-8 bg-white shadow">
      <h2 className="text-red-500 uppercase">hello world</h2>
      <Button>Show</Button>
      </div>
    </main>
  );
}
