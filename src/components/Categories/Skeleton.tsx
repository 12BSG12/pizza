import ContentLoader from "react-content-loader"

export const Skeleton = () => (
  <ContentLoader 
    speed={2}
    width={818}
    height={48}
    viewBox="0 0 818 48"
  >
    <rect x="0" y="0" rx="25" ry="25" width="87" height="48" /> 
    <rect x="92" y="0" rx="25" ry="25" width="121" height="48" /> 
    <rect x="220" y="0" rx="25" ry="25" width="185" height="48" /> 
    <rect x="410" y="0" rx="25" ry="25" width="105" height="48" /> 
    <rect x="522" y="0" rx="25" ry="25" width="119" height="48" />
    <rect x="650" y="0" rx="25" ry="25" width="139" height="48" />
  </ContentLoader>
)