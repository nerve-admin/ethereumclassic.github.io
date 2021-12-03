import React from "react";
import ReactMarkdown from "react-markdown";
import tw from "twin.macro";

import Link from "./link";

function unwrapParagraphs(props) {
  const { children } = props;
  if (children.length === 1 && children[0].type === "p") {
    return children[0].props.children;
  }
  return children;
}

export default function Markdown({
  children,
  components: comps,
  unwrap,
  styleLinks,
  ...props
}) {
  if (children === undefined) {
    return null;
  }
  const components = {
    a: (myProps) => (
      <Link
        {...myProps}
        css={styleLinks && [tw`font-bold hover:underline`]}
        showExternal
      />
    ),
  };
  if (unwrap) {
    components.root = unwrapParagraphs;
  }
  return (
    <ReactMarkdown children={children} components={components} {...props} />
  );
}
