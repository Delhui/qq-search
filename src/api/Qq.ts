import axios from '../utils/axios'

export function fetchUserByQq(qq: number) {
    return new Promise((resolve, reject) => {
        axios.get(`/qq.info?qq=${qq}`).then(res => {
            resolve(res ? res : null)
        }).catch(err => {
            reject(err ? err : null)
        })
    })
}
