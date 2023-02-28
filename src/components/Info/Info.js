import { urlFor } from "../../lib/client"
import "./Info.scss"
import { useSite } from "../../context/SiteContext"

export default function Info() {
  const { info } = useSite()
  if (info) {
    return (
      <div className="info">
        <img
          src={urlFor(info[0].image.asset.url)}
          alt={info[0].title}
          className="info__image"
        />
        <h4 className="info__title">{info[0].title}</h4>
        <p className="info__body">{info[0].text}</p>
      </div>
    )
  }
}
