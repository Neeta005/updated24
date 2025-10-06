import Link from "next/link"

type Props = {
  title: string
  src: string
  alt: string
  description?: string
  backHref?: string
  className?: string
}

export function ImageShowcase({ title, src, alt, description, backHref = "/question-papers", className }: Props) {
  return (
    <main className={`p-4 md:p-8 space-y-4 ${className ?? ""}`}>
      <header className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-semibold text-white text-balance">{title}</h1>
        <Link
          href={backHref}
          className="text-sm text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-700/70 border border-slate-700 px-3 py-1.5 rounded-lg transition-colors"
        >
          Back
        </Link>
      </header>

      {description ? <p className="text-slate-300/90 max-w-3xl text-pretty">{description}</p> : null}

      <section className="rounded-xl border border-slate-700 bg-slate-900/60 p-2">
        {/* Use the provided Source URL directly per instruction */}
        <img src={src || "/placeholder.svg"} alt={alt} className="w-full h-auto rounded-lg" />
      </section>
    </main>
  )
}
