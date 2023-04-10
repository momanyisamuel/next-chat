import AddFriendButton from '@/components/AddFriendButton'
import { FC } from 'react'



const page: FC= () => {
  return <main className='px-2 mt-8'>
    <h2 className='text-xl font-bold'>Add a friend</h2>
    <AddFriendButton />
    </main>
}

export default page