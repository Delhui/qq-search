import React, {useState} from "react"
import './Qq.css'

import Debounce from "../../utils/debounce";
import {fetchUserByQq} from '../../api/Qq'

// 资料显示子组件
const ProfileView: React.FC<any> = ({props, status}) => {
    return (
        <div className={`profile ${status === 0 ? "" : "status-info"}`}>
            {
                status === 0 && <>
                    {props?.qlogo && <img className={"avatar"} src={props?.qlogo}/>}
                    <div className={"right font-12"}>
                        <div className={"name"}>{props?.name}</div>
                        <div className={"qq"}>{props?.qq}</div>
                    </div>
                </>
            }
            {
                status === 1 && "Loading..."
            }
            {
                status === 2 && "QQ error."
            }
            {
                status > 2 && ""
            }
        </div>
    )
}

// 主视图
export default function QqTsx(): JSX.Element {

    const [profile, setProfile] = useState({})
    // status: -1-不显示, 0-success, 1-loading, 2-error
    const [status, setStatus] = useState(-1)

    const inputChange = Debounce(1000, async () => {

        const inputDom: any = window.document.getElementById("input")
        const QQ_REG = "[1-9][0-9]{4,}"
        const qqNumber = inputDom.value || ""

        if (qqNumber === "") {
            setStatus(-1)
            return
        }
        if (!qqNumber.match(QQ_REG)) {
            setStatus(2)
            return
        }

        setStatus(1)
        let res: any = await fetchUserByQq(qqNumber);
        const {name, qlogo, qq} = (res?.data?.code === 1) ? res.data : null
        setProfile({name, qlogo, qq})
        setStatus(res?.data?.code === 1 ? 0 : 2)
    })

    return (
        <div className={"qq-con"}>
            <h2>QQ号查询</h2>
            <div>
                QQ <input type="number" id={"input"} onChange={() => inputChange()}/>
            </div>
            {status !== -1 && <ProfileView props={profile} status={status}/>}
        </div>
    )
}
