import { useEffect, useRef, useState } from 'react'
import cl from './Swaper.module.css'
import classNames from 'classnames'
import selectArrow from "../../assets/select-arrow.svg"
import CRYGicon from "../../assets/cryptos/CRYG.png"
import DELicon from "../../assets/cryptos/DEL.png"
import transBtn from "../../assets/trans-btn.svg"
import { getRate } from '../../services/useRate'
import { getCSRF, postLogin } from '../../services/useAuth'
import infoIcon from "../../assets/info.svg"
import React from 'react'
import { ConfigKey } from '../../types'

export default function Swaper() {

    const focusRef = useRef<HTMLInputElement>(null)

    const [rateData, setRateData] = useState<ConfigKey>()
    const [loadingRate, setLoadingRate] = useState(false)
    const [activeTab, setActiveTab] = useState("Swap")
    const [firstInput, setFirstInput] = useState("1")
    const [secondInput, setSecondInput] = useState(0)

    const tabStyleFirst = classNames({
        tabs: true,
        [cl.active]: activeTab === "Swap",
    })
    const tabStyleSecond = classNames({
        [cl.active]: activeTab === "Pools",
    })

    const handleChangeFirstInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const isValid = /^(?!0\d)(\d+|\d{1,3}(,\d{3})*)(\.\d{0,8})?$/.test(value)

        if (isValid || value === "") {
            setFirstInput(value)
        }
    }

    const fetchNecessaryData = async () => {
        setLoadingRate(true);
        try {
            const csrfToken = await getCSRF();
            if (csrfToken.csrfToken === "") {
                alert("Не смог получить CSRF Token");
                return;
            }
            await postLogin(csrfToken.csrfToken);
            const rate = await getRate();
            setRateData(rate);
        } catch (error) {
            alert("Не смог получить данные: " + error);
        }
        setLoadingRate(false);
    };

    useEffect(() => {
        fetchNecessaryData()
        const intervalId = setInterval(async () => {

            const rate = await getRate()
            if (rate.data.status === "error") {
                fetchNecessaryData()
            }
            else {
                setRateData(rate)
            }

        }, 10000)

        const handleVisibilityChange = async () => {
            if (document.visibilityState === 'visible') {
                try {
                    const response = await getRate()
                    if (response) {
                        setRateData(response)
                    }
                    console.log("Revalidated data:", response)
                } catch (error) {
                    console.error("Error during revalidation:", error)
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange)

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
            clearInterval(intervalId)
        };
    }, [])

    useEffect(() => {
        if (rateData && rateData.status === "success") {
            setSecondInput(parseFloat((+firstInput * +rateData.data.configurationKey.key).toFixed(8)))
        }
    }, [firstInput, rateData])

    useEffect(() => {
        if (loadingRate === false) {
            focusRef.current?.focus()
        }
    }, [loadingRate])

    return (
        <div className={cl.mainShell}>
            <div className={cl.tabs}>
                <p className={tabStyleFirst} onClick={() => setActiveTab("Swap")}>Swap</p>
                <p className={tabStyleSecond} onClick={() => setActiveTab("Pools")}>Pools</p>
            </div>
            <div className={cl.form}>
                <div className={cl.transBtn}>
                    <img src={transBtn} alt="" />
                </div>
                <div className={cl.formShell}>
                    <p className={cl.info}>Вы продаете</p>
                    <div className={cl.formMiddle}>
                        <div className={cl.formLeft}>
                            <img src={CRYGicon} alt="" />
                            <p>CRYG</p>
                            <img src={selectArrow} alt="" />
                        </div>
                        <div className={cl.formRight}>
                            <input disabled={loadingRate} ref={focusRef} value={firstInput} onChange={handleChangeFirstInput} />
                        </div>
                    </div>
                    <div className={cl.formBottom}>
                        <p>CRYG</p>
                        <p>${+firstInput * 1}</p>
                    </div>
                </div>
                <div className={cl.formShellSec}>
                    <p className={cl.info}>Вы покупаете</p>
                    <div className={cl.formMiddle}>
                        <div className={cl.formLeft}>
                            <img src={DELicon} alt="" />
                            <p>DEL</p>
                            <img src={selectArrow} alt="" />
                        </div>
                        <div className={cl.formRightDiv}>
                            <div>{secondInput}</div>
                        </div>
                    </div>
                    <div className={cl.formBottom}>
                        <p>DEL</p>
                        <p>${parseFloat((+firstInput * 1 * (99.37 / 100)).toFixed(8))} (-0.63%)</p>
                    </div>
                </div>
            </div>
            <div className={cl.rateInfo}>
                <img src={infoIcon} alt="" />
                <p>1 CRYG = {rateData?.data.configurationKey.key} DEL <span>($1)</span></p>
            </div>
            <button className={cl.connectBtn}>
                <svg width="22" height="22" strokeWidth={1.5} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.5 6.5H6.5" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14.6248 7.25H12.6733C11.3345 7.25 10.25 8.25725 10.25 9.5C10.25 10.7427 11.3352 11.75 12.6725 11.75H14.6248C14.6878 11.75 14.7185 11.75 14.7448 11.7485C15.1498 11.7237 15.4722 11.4245 15.4985 11.0488C15.5 11.0248 15.5 10.9955 15.5 10.9377V8.06225C15.5 8.0045 15.5 7.97525 15.4985 7.95125C15.4715 7.5755 15.1498 7.27625 14.7448 7.2515C14.7185 7.25 14.6878 7.25 14.6248 7.25Z" stroke="white" />
                    <path d="M14.7238 7.25C14.6653 5.846 14.4778 4.985 13.871 4.379C12.9928 3.5 11.5783 3.5 8.75 3.5H6.5C3.67175 3.5 2.25725 3.5 1.379 4.379C0.5 5.25725 0.5 6.67175 0.5 9.5C0.5 12.3282 0.5 13.7427 1.379 14.621C2.25725 15.5 3.67175 15.5 6.5 15.5H8.75C11.5783 15.5 12.9928 15.5 13.871 14.621C14.4778 14.015 14.666 13.154 14.7238 11.75" stroke="white" />
                    <path d="M3.5 3.50039L6.30125 1.64264C6.6952 1.3864 7.15505 1.25 7.625 1.25C8.09495 1.25 8.5548 1.3864 8.94875 1.64264L11.75 3.50039" stroke="white" strokeLinecap="round" />
                    <path d="M12.4932 9.5H12.5014" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <span>Connect wallet</span>
            </button>
        </div>
    )
}
