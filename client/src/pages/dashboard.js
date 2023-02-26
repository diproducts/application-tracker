import Footer from '../components/footer';
import Navbar from '../components/navbar';
import Head from 'next/head';
import styles from '@/styles/Dashboard.module.css';
import {useEffect} from 'react';

const API_URI = process.env.apiURL;

export default function Dashboard(props) {

    // temporary testing function
    useEffect(() => {
        const fetchData = async() => {
            const response = await fetch(`${API_URI}/check_if_logged_in`);
            const data = await response.json();
            console.log(data);
        }
        fetchData();
    }, [])


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

// export async function getStaticProps() {
//     const response = await fetch(`${API_URI}/check_if_logged_in`);
//     const data = await response.json();

//     return {
//       props: {
//         data: data.response
//       }
//     }
//   }