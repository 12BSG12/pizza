import ContentLoader from "react-content-loader"

export const Skeleton = () => (
  <ContentLoader 
    speed={2}
    width={1260}
    height={686}
    viewBox="0 0 1260 686"
  >
    <circle cx="292" cy="292" r="292" /> 
    <rect x="0" y="598" rx="15" ry="15" width="626" height="30" /> 
    <rect x="0" y="638" rx="25" ry="25" width="100" height="46" />
    <rect x="630" y="14" rx="3" ry="3" width="410" height="6" /> 
    <rect x="630" y="40" rx="3" ry="3" width="380" height="6" /> 
    <rect x="630" y="56" rx="3" ry="3" width="178" height="6" /> 
    <rect x="630" y="0" rx="3" ry="3" width="410" height="6" /> 
    <rect x="630" y="27" rx="3" ry="3" width="410" height="6" />
  </ContentLoader>
)