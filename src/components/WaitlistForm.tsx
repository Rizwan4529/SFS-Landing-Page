import { useRef, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../lib/cn'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ENDPOINT = import.meta.env.VITE_WAITLIST_ENDPOINT as string | undefined

export function WaitlistForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [err, setErr] = useState('')
  const [firstName, setFirstName] = useState('there')
  const [status, setStatus] = useState<Status>('idle')

  const honeypotRef = useRef<HTMLInputElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (honeypotRef.current?.value) {
      setStatus('success')
      return
    }

    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    if (!trimmedName) {
      setErr('Please enter your name.')
      return
    }
    if (!EMAIL_RE.test(trimmedEmail)) {
      setErr('Please enter a valid email address.')
      return
    }

    setErr('')
    setStatus('submitting')
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name: trimmedName, email: trimmedEmail }),
        })
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      } else {
        console.warn('VITE_WAITLIST_ENDPOINT is not set. Submission was not sent anywhere.')
        await new Promise((r) => setTimeout(r, 600))
      }
      setFirstName(trimmedName.split(' ')[0] || 'there')
      setStatus('success')
      requestAnimationFrame(() => successRef.current?.focus())
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="mt-[34px] flex flex-col items-center gap-[18px] px-0 py-3.5 text-center outline-none"
      >
        <div className="flex h-[74px] w-[74px] items-center justify-center rounded-full bg-gradient-gold shadow-[0_0_0_8px_rgba(232,194,90,0.14),0_14px_34px_rgba(207,159,52,0.45)]">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0b1f44"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </div>
        <h3 className="font-display text-[26px] font-bold tracking-tight text-white">
          You&apos;re on the list, {firstName}.
        </h3>
        <p className="max-w-[400px] text-base leading-relaxed text-[rgba(206,218,242,0.78)]">
          Thanks for joining. We&apos;ll send launch updates and early access straight to your inbox.
        </p>
      </div>
    )
  }

  const inputClass = cn(
    'w-full rounded-brand border border-white/16 bg-white/6 px-4 py-[15px] text-base text-white outline-none transition-[border-color,background-color] duration-[400ms] ease-[cubic-bezier(0.16,0.84,0.34,1)]',
    'placeholder:text-white/40 focus:border-gold focus:bg-white/10',
  )

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-[34px] flex flex-col gap-3.5 text-left">
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input ref={honeypotRef} id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="wl-name" className="mb-[7px] block text-[13px] font-semibold tracking-wide text-muted-light">
          Name
        </label>
        <input
          id="wl-name"
          type="text"
          placeholder="Your name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="wl-email" className="mb-[7px] block text-[13px] font-semibold tracking-wide text-muted-light">
          Email
        </label>
        <input
          id="wl-email"
          type="email"
          placeholder="you@email.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </div>

      <p className="m-0 min-h-[18px] text-[13.5px] text-[#f0a48a]">{err}</p>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="interactive-btn mt-1 w-full cursor-pointer rounded-brand border-none bg-gradient-gold py-[17px] font-display text-[16.5px] font-bold tracking-wide text-[#0b1f44] shadow-[0_12px_30px_rgba(207,159,52,0.4)] hover:shadow-[0_16px_40px_rgba(207,159,52,0.55)] disabled:pointer-events-none disabled:opacity-70"
      >
        {status === 'submitting' ? (
          <span className="inline-flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" size={18} aria-hidden="true" />
            Joining...
          </span>
        ) : (
          'Join the waitlist'
        )}
      </button>

      {status === 'error' && (
        <p role="alert" className="text-center text-[13px] font-medium text-[#f0a48a]">
          Something went wrong. Please try again.
        </p>
      )}

      <p className="m-0 mt-1.5 text-center text-[13px] text-[rgba(180,194,222,0.6)]">
        No payment required. Get launch updates and early access.
      </p>
    </form>
  )
}
