import ContentLoader from "react-content-loader"
import '../../scss/app.scss';

export const Skeleton = () => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={480}
    viewBox="0 0 280 480"
  >
    <circle cx="130" cy="130" r="130" /> 
    <rect x="0" y="274" rx="15" ry="15" width="280" height="26" /> 
    <rect x="0" y="323" rx="10" ry="10" width="280" height="90" /> 
    <rect x="0" y="433" rx="15" ry="15" width="90" height="27" /> 
    <rect x="123" y="423" rx="25" ry="25" width="153" height="46" />
  </ContentLoader>
)