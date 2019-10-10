import React from "react"
import MDXRenderer from "gatsby-mdx/mdx-renderer"
import MdxLink from "./mdxLink"

const Mdx = ({ code, components }) => {
  console.log('rendering with', components);
  return (
    <MDXRenderer
      components={{
        a: MdxLink,
        ...components
      }}
    >
      {code}
    </MDXRenderer>
  )
}

export default Mdx
