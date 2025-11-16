import { i18n } from "../../i18n"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  // If baseUrl contains a pathname after the domain, use this as the home link
  const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
  const baseDir = url.pathname

  return (
    <article class="popover-hint">
      <h1>404 - Not Found</h1>
      <p>This page or reference does not exist.</p>
      <a href={baseDir}>Return to the Homepage</a>
    </article>
  )
}

export default (() => NotFound) satisfies QuartzComponentConstructor
