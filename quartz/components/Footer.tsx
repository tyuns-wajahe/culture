import { QuartzComponentConstructor } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  function Footer() {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    return (
      <footer>
        <hr />
        <p>
          This website is a part of <a href="https://discord.gg/bgkPDvMY67">Tyuns</a> - a collective conlanging and worldbuilding community project.
        </p>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
