import React from "react";
import tw from "twin.macro";
import { useNavigation } from "../utils/navigationProvider";

import ContentFooter from "./contentFooter";
import ContentHeader from "./contentHeader";
import ContentSidebarInline from "./contentSidebarInline";
import ContentSidebarVertical from "./contentSidebarVertical";
import ContentTOC from "./contentTOC";
import Generic from "./generic";

import MarkdownStatic from "./markdownStatic";
import TwContainer from "./twContainer";

function mapToc(item, i18n = item) {
  if (item.title) {
    return {
      title: item.title,
      items: (item.items || []).map((i) => mapToc(i, i18n)).filter((i) => i),
    };
  }
  return null;
}

export default function Content({ data = {}, i18n = {}, children, max }) {
  const { mdx, contributors } = data;
  const { sub } = useNavigation();
  const toc = mdx?.headings[0]
    ? mdx?.toc.items[0].items
    : mdx?.toc.items ?? [mapToc(i18n)].filter((i) => i)[0]?.items;
  const showLeft = sub?.navItems.length > 0;
  const showRight = toc?.length > 0;
  return (
    <TwContainer grid>
      {showLeft && (
        <div tw="hidden md:block md:col-span-3 lg:col-span-2 md:mr-10 lg:mr-0">
          <nav tw="sticky top-28 mt-10 md:mt-14">
            <ContentSidebarVertical items={sub.navItems} />
          </nav>
        </div>
      )}
      <main
        css={[
          tw`col-span-full md:col-span-9 lg:col-span-7 xl:col-span-7 mt-10 md:mt-14`,
          showLeft && tw`md:-ml-10 lg:ml-0`,
          !showRight && showLeft && tw`lg:col-span-8 xl:col-span-8`,
          showRight &&
            !showLeft &&
            tw`md:col-span-8 md:col-start-2 lg:col-start-2 xl:col-start-2 lg:col-span-8 xl:col-span-7`,
          !showRight &&
            !showLeft &&
            tw`sm:col-span-full md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-8`,
          max && !showRight && tw`lg:col-span-10`,
        ]}
      >
        {showLeft && (
          <nav tw="sticky top-14 md:hidden z-40">
            <ContentSidebarInline
              items={sub.navItems}
              disclaimer={mdx?.meta?.disclaimer || i18n.disclaimer}
            />
          </nav>
        )}
        {children || (
          <>
            <article tw="prose max-w-none">
              <ContentHeader {...{ mdx, i18n }} />
              {mdx ? (
                <MarkdownStatic {...{ mdx, i18n }} />
              ) : (
                <Generic {...{ i18n }} />
              )}
            </article>
            <ContentFooter {...{ mdx, i18n, contributors }} />
          </>
        )}
      </main>
      {showRight && (
        <aside
          css={[
            tw`hidden lg:block lg:col-span-3 mt-10 md:mt-14`,
            !showLeft && tw`md:block md:col-span-3`,
          ]}
        >
          <div tw="sticky top-24 space-y-4 ">
            <ContentTOC items={toc} />
          </div>
        </aside>
      )}
    </TwContainer>
  );
}
