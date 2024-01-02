import Header from "@/components/Header/header";
import styles from "./page.module.css";

export default function Invoices() {
    return (
        <main className={styles.main}>
            <Header page="INVOICES"/>
            <h1>Invoices</h1>
        </main>
    );
}