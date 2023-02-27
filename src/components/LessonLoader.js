import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={380}
    height={318}
    viewBox="0 0 380 318"
    backgroundColor="#d6d6d6"
    foregroundColor="#e6e6e6"
    {...props}
  >
    <rect x="1" y="0" rx="14" ry="14" width="380" height="318" />
  </ContentLoader>
);

export default MyLoader;
