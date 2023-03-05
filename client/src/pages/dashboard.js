import Footer from '../components/footer';
import Navbar from '../components/navbar';
import Head from 'next/head';
import styles from '@/styles/Dashboard.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

export default function Dashboard(props) {
    const router = useRouter();
    const [name, setName] = useState();

    // temporary testing function
    useEffect(() => {
        const fetchData = async() => {
            const response = await fetch(`api/check_if_logged_in`);
            if (!response.ok) {
              router.push('/login');
              return;
            }
            const data = await response.json();
            setName(data.name);
        }
        fetchData();
    }, [])

    if (!name) {
      return <></>
    } else {
      return (
        <>
            <Head>
                <title>Dashboard | Application Tracker</title>
                <meta name="description" content="Application tracker" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/icon.png" />
            </Head>
          <Navbar />
          <main className={styles.dashboard}>
          </main>
          <Footer />
        </>
    )
    }
}
