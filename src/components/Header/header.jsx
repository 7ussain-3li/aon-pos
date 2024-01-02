import Link from "next/link";
import AppContainer from "../Contaner/container";
import styles from "./header.module.css";

const Header = ({page="HOME"}) => {
  return (
    <div className={styles.header}>
      <AppContainer width={1300}>
        <div className={styles.content}>
          <h2>LOGO</h2>
          <ul>
            <li className={page === "HOME" ? styles.active : ""}><Link href="/">Home</Link></li>
            <li className={page === "PRODUCTS" ? styles.active : ""}><Link href="/products">Products</Link></li>
            <li className={page === "CATEGORIES" ? styles.active : ""}><Link href="/categories">Categories</Link></li>
            <li className={page === "INVOICES" ? styles.active : ""}><Link href="/invoices">Invoices</Link></li>
          </ul>
        </div>
      </AppContainer>
    </div>
  );
};

export default Header;
