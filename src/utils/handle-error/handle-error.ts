import { toast } from 'sonner'

export function handleError (msg: string) {
  console.error(msg)
  toast.error(msg)
}
