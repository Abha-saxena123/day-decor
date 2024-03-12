import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { ServerStyleSheet } from "styled-components";
/*
  Usage of @material-ui/core is only restricted to this files and only to support fix ssr issues with components
  of @sapiens/insured-component-library, We may remove this package in future if issues are resolved from @sapiens/insured-component-library end
  We shall not import any component from @material-ui/core
  or any other dependency of @material-ui/core
  For components we only depends on @sapiens/insured-component-library
*/

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const styledSheet = new ServerStyleSheet();
    // const muiSheet = new ServerStyleSheets();

    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            styledSheet.collectStyles(<App {...props} />),
        })


      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {/* {muiSheet.getStyleElement()} */}
            {styledSheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      styledSheet.seal();
    }
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
