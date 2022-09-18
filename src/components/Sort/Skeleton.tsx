import ContentLoader from "react-content-loader"

export const Skeleton = () => (
  <ContentLoader 
    speed={2}
    width={308}
    height={24}
    viewBox="0 0 308 24"
  >
    <rect x="0" y="0" rx="15" ry="15" width="308" height="24" />
  </ContentLoader>
)
