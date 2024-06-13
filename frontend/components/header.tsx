import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { IconGitHub } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { NewChatButton } from './new-chat-button'
import { ThemeToggle } from './theme-toggle'
import { Dialog, DialogTrigger } from './ui/dialog'
import { HelpCircle } from 'lucide-react'
import DialogButton from './dialog-button'

export const HumanloopLogomark = (
  props: React.ComponentProps<'svg'>
): JSX.Element => (
  <svg viewBox="590.4 499.17 2294.5 1952.02" {...props}>
    <path
      fill="currentColor"
      d="M2884.9,1452.45h-.12c-.66-72.43-4.8-237.4-27.08-408.16-33.87-259.52-94.36-422.1-184.95-497-49.17-40.65-107.46-56-168.63-44.31-145.85,27.85-233.72,263.86-349.24,680.4-108.42-375.74-221.31-660.72-395.55-682.54v-1.34H1716v1.34c-174.2,21.81-287.07,306.68-395.55,682.57C1204.92,766.85,1117.05,530.81,971.17,503,910,491.31,851.7,506.62,802.54,547.27c-90.58,74.92-151.08,237.5-184.94,497-22.28,170.76-26.42,335.73-27.08,408.16h-.12v45.48h.11c.67,72.64,4.8,238.21,27.07,408.87,33.8,259,94.25,421.39,184.79,496.26,38.06,31.5,82.85,48.15,129.52,48.15a209.84,209.84,0,0,0,39.29-3.78c145.83-27.84,233.69-263.76,349.24-680.42,108.43,375.76,221.32,660.77,395.56,682.56v1.34h43.34v-1.34c174.24-21.79,287.13-306.78,395.55-682.54,115.51,416.52,203.37,652.55,349.25,680.4a210,210,0,0,0,39.3,3.78c46.66,0,91.45-16.65,129.52-48.13,90.54-74.89,151-237.21,184.78-496.28,22.27-170.66,26.4-336.23,27.07-408.87h.11v-45.48ZM1240.2,1475.2q-5.4,20.19-10.83,40.52c-55.89,209.11-108.67,406.63-164.08,557.53-76.83,209.3-122.59,223.18-122.91,223.27-16.25,3.11-28.06-.23-42.1-11.81-26.44-21.89-92.08-104.45-130.36-397.8-23.75-182.1-25.84-358.58-25.89-411.07.05-338.41,53.78-725.26,156.44-810.19,14-11.57,25.71-14.85,41.79-11.81.45.12,46.21,14,123,223.3,55.38,150.84,108.14,348.26,164.23,558.12Zm1491.07.64c-.05,52.48-2.13,228.91-25.9,411.07-38.26,293.35-103.92,375.91-130.36,397.78-14,11.61-25.78,15-42,11.85-.45-.11-46.23-14-123.06-223.29-55.45-151-108.28-348.73-164.2-558q-5.37-20.1-10.71-40l10.71-40.06c55.92-209.28,108.75-407,164.2-558,76.83-209.29,122.59-223.18,122.93-223.27,16.21-3.09,27.93.23,41.91,11.8C2677.49,750.58,2731.22,1137.43,2731.27,1475.84Zm-1158.73,566.6c-61.13-156.79-118.14-361.88-173.28-567.24,55.11-205.23,112.14-410.41,173.28-567.26,60.36-154.79,125.16-254.82,165.11-254.83s104.74,100,165.1,254.83c61.16,156.84,118.18,362,173.28,567.25-55.1,205.25-112.12,410.4-173.28,567.25-60.34,154.81-125.15,254.84-165.09,254.84h0C1697.71,2297.28,1632.9,2197.25,1572.54,2042.44Z"
      shapeRendering="geometricPrecision"
    />
  </svg>
)

export async function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
      <div className="mr-12 flex items-center">
        <Link href="/" target="_blank" rel="nofollow">
          <HumanloopLogomark className="mr-2 h-6 w-6 text-black dark:text-white" />
        </Link>
      </div>

      <NewChatButton />
      <Dialog>
        <DialogTrigger>
          <span className="flex  items-center rounded-md bg-white px-2 shadow-md apy-1 text-black">
            What is this
          </span>
        </DialogTrigger>
        <DialogButton />
      </Dialog>
      <div className="flex items-center justify-end space-x-2">
        <ThemeToggle />

        <a
          target="_blank"
          href="https://github.com/chiatzeheng/laws-of-singapore"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: 'outline' }))}
        >
          <IconGitHub />
          <span className="ml-2 hidden md:flex">GitHub</span>
        </a>
      </div>
    </header>
  )
}
