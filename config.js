import absoluteUrl from "next-absolute-url";
const origin = absoluteUrl().host;

export const config = {
    title: "Dodzs.dev",
    author: "Dodzs",
    description: "I'm a front-end developer base in Hungary! I enjoy building webs using Tailwind CSS, Next.js, and other stuffs.",
    theme_color: "#909090",
    type: "website",
    url: origin,
    keywords: "developer, front-end, web, nextjs, dodzs, magyar, hungarian, portfolio",
    smoothTransition: true,
}
