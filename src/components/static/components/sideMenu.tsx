import { useState } from "react"
import styles from "../style/sideMenu.module.scss"
import Link from 'next/link';

export function SideMenu() {

    const [isOpen, setIsOpenMenu] = useState(false);

    return <div className={styles.menu}>
        <h5 className="title">
            Calculator <Link href="/calculator">is here</Link>
        </h5>
        <h5 className="title">
            Categories <Link href="/categories">is here</Link>
        </h5>
    </div>
}