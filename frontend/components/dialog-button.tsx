import { Github, Link, LinkIcon, Youtube } from 'lucide-react'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const dialog = () => {
  return (
    <DialogContent className="max-h-screen w-[70vw] max-w-[100vw] md:w-[50vw]">
      <DialogHeader>
        <DialogTitle className="text-2xl">Welcome to AIPP</DialogTitle>
        <DialogDescription>
          This is our submission to the{' '}
          <Link
            className="underline"
            href="https://tidbhackathon2023.devpost.com"
          >
            TiDB Future App Hackathon 2023
          </Link>
          <div className="my-2 flex items-center gap-3">
            <p className="flex items-center">
              <LinkIcon className="h-5 w-5" />
              <Link
                className="ml-1 underline"
                href="https://devpost.com/software/quizmefy"
              >
                DevPost
              </Link>
            </p>
            <p className="flex items-center">
              <Github className="h-5 w-5" />
              <Link
                className="ml-1 underline"
                href="https://github.com/reluvate/tidb"
              >
                GitHub
              </Link>
            </p>
            <p className="flex items-center">
              <Youtube className="h-5 w-5" />
              <Link
                className="ml-1 underline"
                href="https://youtube.com/@elliottchong"
              >
                YouTube
              </Link>
            </p>
          </div>
          <p className="my-2 mt-4 text-black">
            I am a student from Singapore Polytechnic passionate in technology
            <br />
            <br />
            In this AI powered platform, you can also chat with the AI to get
            queries from Singapore Statutes .This project is built using
            QDrantDB, Next.js, Langchain and TypeScript
          </p>
          <hr />
          <p className="my-2 text-black">
            <h4 className="text-base font-semibold">Built with</h4>
            <div className="mt-2 grid grid-cols-4 justify-around gap-y-3">
              <div className="flex items-center gap-2">
                <img alt="tidb" src="/tidb.png" width={35} height={35} />
                <span className="text-slate-600">Langchain</span>
              </div>
              <div className="flex items-center gap-2">
                <img alt="nextjs" src="/nextjs.png" width={35} height={35} />
                <span className="text-slate-600">Next.js</span>
              </div>
              <div className="flex items-center gap-2">
                <img
                  alt="tailwind"
                  src="/tailwind.png"
                  width={35}
                  height={35}
                />
                <span className="text-slate-600">Tailwind</span>
              </div>
              <div className="flex items-center gap-2">
                <img
                  alt="nextauth"
                  src="/nextauth.png"
                  width={30}
                  height={30}
                />
                <span className="text-slate-600">QDrant</span>
              </div>
              <div className="flex items-center gap-2">
                <img alt="openai" src="/openai.png" width={30} height={30} />
                <span className="text-slate-600">OpenAI</span>
              </div>
              <div className="flex items-center gap-2">
                <img
                  alt="typescript"
                  src="/typescript.png"
                  width={30}
                  height={30}
                />
                <span className="text-slate-600">TypeScript</span>
              </div>
              <div className="flex items-center gap-2">
                <img alt="trpc" src="/trpc.png" width={30} height={30} />
                <span className="text-slate-600">TRPC</span>
              </div>
            </div>
          </p>
          {/* <hr />
          <p className="my-2 text-black">
            <h4 className="text-base font-semibold">Special Mention</h4>
            <p>
              I would like to thank GCP for
              <br />
              <br />
            </p>
          </p>
          <hr /> */}
          <p className="my-2 text-black">
            <h4 className="mb-2 text-base font-semibold">Team Members</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Avatar>
                  <AvatarImage src="https://avatars.githubusercontent.com/u/101942239?height=180&v=4&width=180" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="ml-2 flex flex-col">
                  <h3 className="text-base font-bold">Timothy Chia</h3>
                  <span className="text-sm text-slate-500">engineer</span>
                </div>
              </div>
            </div>
          </p>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  )
}

export default dialog
