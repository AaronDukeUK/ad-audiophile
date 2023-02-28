import "./Info.scss"
import { useSite } from "../../context/SiteContext"

export default function Info() {
  const { info } = useSite()

  if (info) {
    return (
      <div className="info">
        <div className="info__image" />
        <h4 className="info__title">{info[0].title}</h4>
        <p className="info__body">{info[0].text}</p>
      </div>
    )
  }
}
