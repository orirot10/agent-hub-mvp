// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document'

/**
 * The custom Document for the application.
 *
 * Next.js 15 with React 19 supports a functional Document component rather
 * than the legacy class-based approach. Using the functional style avoids
 * issues with the React dev runtime (`jsxDEV`), which surfaced when rendering
 * the class component in development mode.
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
