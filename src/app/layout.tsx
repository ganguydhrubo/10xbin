import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'10xbin | Autonomous Enterprise Infrastructure',description:'Neural workflow orchestration, autonomous execution, and enterprise AI infrastructure by 10xbin.'};
export default function RootLayout({children}: Readonly<{children:React.ReactNode}>) {return <html lang="en"><body>{children}</body></html>}
