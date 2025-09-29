// import { createClient } from '@/lib/supabase/server'
import { register } from './actions'

// ไม่ต้องใช้ cookieStore อีกแล้ว
export default async function Index() {
  // ลบบรรทัดนี้ทิ้ง
  // const cookieStore = cookies();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className=" flex-1 flex flex-col gap-20  max-w-4xl px-3">
        <main className="mt-4">
          <form action={register} encType="multipart/form-data">
            <h1>Register Form</h1>
            <div className='flex gap-2 items-center'>
                <label className='text-md' htmlFor="fullname">
                  fullname
                </label>
                <input
                  className='rounded-md px-4 py-2 bg-inherit border '
                  id="fullname"
                  name='fullname'
                  placeholder="kam lukham"
                  required
                />
            </div>
            <div className='flex gap-2 items-center'>
                <label className='text-md' htmlFor="email">
                  email
                </label>
                <input
                  className='rounded-md px-4 py-2 bg-inherit border '
                  id="email"
                  name='email'
                  placeholder="m@example.com"
                  required
                />
            </div>
            <div className='flex gap-2 items-center'>
                <label className='text-md' htmlFor="tel">
                  tel
                </label>
                <input
                  className='rounded-md px-4 py-2 bg-inherit border '
                  id="tel"
                  name='tel'
                  placeholder="ex 0888888888"
                  required
                />
            </div>
            <input
                  className='rounded-md px-4 py-2 bg-inherit border '
                  id="file"
                  type="file"
                  name='attachment'
                  required
                />
            <button type="submit" className="w-full bg-green-700 rounded-md px-4 py-2 mb-2 mt-2" >
              Register
            </button>
          </form>

        </main>
      </div>
    </div>
  )
}