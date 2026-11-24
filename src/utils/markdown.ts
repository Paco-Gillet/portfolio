import { marked } from 'marked'

// Configure marked with custom link and image renderers for clean styling
const renderer = new marked.Renderer()

renderer.link = ({ href, title, text }) => {
  const titleAttr = title ? ` title="${title}"` : ''
  return `<a href="${href}"${titleAttr} target="_blank" rel="noopener noreferrer" class="text-emerald-500 hover:underline font-medium inline-flex items-center gap-1">${text} <i class="pi pi-external-link text-[10px] opacity-70"></i></a>`
}

renderer.image = ({ href, title, text }) => {
  const altText = text || ''
  const titleText = title || ''
  return `
    <figure class="my-5 overflow-hidden rounded-xl border border-zinc-500/20 bg-zinc-500/5">
      <img src="${href}" alt="${altText}" title="${titleText}" class="w-full h-auto object-cover max-h-96" loading="lazy" />
      ${altText ? `<figcaption class="text-xs text-center text-(--text-secondary) py-2 border-t border-zinc-500/10">${altText}</figcaption>` : ''}
    </figure>
  `
}

marked.use({
  renderer,
  gfm: true,
  breaks: true
})

/**
 * Parses markdown string to sanitized HTML using marked.
 */
export function renderMarkdown(markdown: string): string {
  if (!markdown) return ''
  return marked.parse(markdown) as string
}
