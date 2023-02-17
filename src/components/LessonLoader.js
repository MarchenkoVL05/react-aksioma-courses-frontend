import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={442}
    height={460}
    viewBox="0 0 442 460"
    backgroundColor="#d6d6d6"
    foregroundColor="#dedede"
    {...props}
  >
    <rect x="0" y="280" rx="18" ry="18" width="442" height="63" />
    <rect x="0" y="11" rx="13" ry="13" width="442" height="263" />
  </ContentLoader>
);

export default MyLoader;
