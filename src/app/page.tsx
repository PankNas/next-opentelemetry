import styles from "./page.module.css";

import {metrics} from '@opentelemetry/api';

export const dynamic = 'force-dynamic';

async function request() {
  const res = await fetch(`${process.env.BASE_URL}/fetch`);

  return await res.json();
}

export default async function Home() {
  try {
    // const data = await request();
    //
    // console.log('data', data)

    const metricsPage = metrics.getMeter('route')

    const counter = metricsPage.createCounter('metric-from-route');
    counter.add(10, {'key': 'I am from next app'});

    return (
      <main className={styles.main}>
        <p>success</p>
      </main>
    );
  } catch {
    return <main className={styles.main}>
      <p>fail</p>
    </main>
  }
}
