import cl from "./Header.module.css"
import logoIcon from '../../assets/logo.svg'
import decimalIcon from '../../assets/decimal.svg'
import langIcon from '../../assets/lang.svg'
import { useState } from "react"
const langs = ['RU', 'ENG']
export default function Header() {
    const [langActive, setLangActive] = useState(false)
    const [lang, setLang] = useState(langs[0])

    return (
        <div className={cl.header}>
            <div className="container">
                {
                    langActive &&
                    <div onClick={() => setLangActive(false)} className="overlay"></div>
                }
                <div className={cl.headerInner}>

                    <div className={cl.headerLeft}>
                        <div className={cl.logo}>
                            <img src={logoIcon} alt="logo" />
                            <p>Canyon Swap</p>
                        </div>
                        <nav>
                            <ul className={cl.nav}>
                                <li><a href="#">Главная</a></li>
                                <li><a href="#">Лендинг</a></li>
                                <li><a href="#">FAQ</a></li>
                                <li><a href="#">Обратная связь</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div className={cl.services}>
                        <div className={cl.langBody}>
                            <button onClick={() => setLangActive(!langActive)} className={cl.headerBtn}>
                                <img src={langIcon} alt="wallet" />
                                <span>{lang}</span>
                                <svg width="10" height="10" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.9984 2.24229L7.6758 6.56491C7.48621 6.75455 7.26112 6.90498 7.01337 7.00762C6.76563 7.11026 6.5001 7.16309 6.23194 7.16309C5.96378 7.16309 5.69824 7.11026 5.4505 7.00762C5.20276 6.90498 4.97766 6.75455 4.78807 6.56491L0.465454 2.24229L2.19842 0.510138L6.23194 4.54692L10.2655 0.513405L11.9984 2.24229Z" fill="#ffffff99" />
                                </svg>
                            </button>
                            {
                                langActive && (
                                    <ul className={cl.langs}>
                                        {
                                            langs?.map(item => (
                                                <li key={item} onClick={() => {
                                                    setLang(item)
                                                    setLangActive(false)
                                                }}>{item}</li>
                                            ))
                                        }
                                    </ul>
                                )
                            }
                        </div>
                        <button className={cl.headerBtn}>
                            <img src={decimalIcon} alt="wallet" />
                            <span>Decimal</span>
                        </button>
                        <button className={cl.headerBtn}>
                            <svg width="15" height="14.25" strokeWidth={1.5} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.5 6.5H6.5" stroke="#ffffff99" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14.6248 7.25H12.6733C11.3345 7.25 10.25 8.25725 10.25 9.5C10.25 10.7427 11.3352 11.75 12.6725 11.75H14.6248C14.6878 11.75 14.7185 11.75 14.7448 11.7485C15.1498 11.7237 15.4722 11.4245 15.4985 11.0488C15.5 11.0248 15.5 10.9955 15.5 10.9377V8.06225C15.5 8.0045 15.5 7.97525 15.4985 7.95125C15.4715 7.5755 15.1498 7.27625 14.7448 7.2515C14.7185 7.25 14.6878 7.25 14.6248 7.25Z" stroke="#ffffff99" />
                                <path d="M14.7238 7.25C14.6653 5.846 14.4778 4.985 13.871 4.379C12.9928 3.5 11.5783 3.5 8.75 3.5H6.5C3.67175 3.5 2.25725 3.5 1.379 4.379C0.5 5.25725 0.5 6.67175 0.5 9.5C0.5 12.3282 0.5 13.7427 1.379 14.621C2.25725 15.5 3.67175 15.5 6.5 15.5H8.75C11.5783 15.5 12.9928 15.5 13.871 14.621C14.4778 14.015 14.666 13.154 14.7238 11.75" stroke="#ffffff99" />
                                <path d="M3.5 3.50039L6.30125 1.64264C6.6952 1.3864 7.15505 1.25 7.625 1.25C8.09495 1.25 8.5548 1.3864 8.94875 1.64264L11.75 3.50039" stroke="#ffffff99" strokeLinecap="round" />
                                <path d="M12.4932 9.5H12.5014" stroke="#ffffff99" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Connect wallet</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
