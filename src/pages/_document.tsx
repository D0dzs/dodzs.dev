import { Html, Head, Main, NextScript } from "next/document";

export default function Document(props: any) {
  return (
    <Html lang="hu">
      <Head>
        <meta name="robots" content="follow, index" />
      </Head>
      <body>
        <Main {...props} />
        <NextScript />
      </body>
    </Html>
  );
}
