import Head from 'next/head'
import Link from 'next/link';
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Application Tracker</title>
        <meta name="description" content="Application tracker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <main className={styles.main}>
        <div></div>
        <div className={styles.center}>
          <h1>Application tracker</h1>
        </div>
        <div className={styles.grid}>
          <Link href="/signup" className={styles.card}>
            <h2 className={inter.className}>
              Sign Up <span>-&gt;</span>
            </h2>
          </Link>

          <Link href="/login" className={styles.card}>
              <h2 className={inter.className}>
                  Log In <span>-&gt;</span>
              </h2>
          </Link>
        </div>
      </main>
    </>
  )
}
