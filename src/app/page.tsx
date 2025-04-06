"use client";

import styles from "./page.module.css";

export default async function Index() {

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Multi Tenant SaaS Application</h1>
      </main>
    </div>
  );
}