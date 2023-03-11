import { useContext, useEffect, useState } from "react"
import { UserContext } from '../context'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from "react-router-dom"

const showSelected = (key, data, index, margin = 0) => {
    return (
        <div key={index} style={{
            marginLeft: `${margin}px`
        }}>
            <span style={{
                fontWeight: margin == 0 ? 'bold' : 'none'
            }}>
                {(typeof (data) == 'number' || typeof (data) == 'string') && (
                    <>
                        {key} : {data}
                    </>
                )}
            </span>
            {
                typeof (data) == 'object'
                &&
                (
                    <>
                        {key}:
                        {Object.keys(data).map((key, index) => {
                            return (
                                showSelected(key, data[key], index, margin + 15)
                            )
                        })}
                    </>
                )
            }
        </div>
    )
}

export default function Dashboard() {
    const searchParams = useParams();

    const navigate = useNavigate()

    const { profile, updateProfile } = useContext(UserContext)
    const [laoding, setLoading] = useState(true)

    useEffect(function () {
        if (laoding)
            if (searchParams['username']) {
                setLoading(false)
                axios({
                    method: 'GET',
                    url: `https://leetcodeviewer-api-production.up.railway.app/profile/${searchParams['username']}`
                })
                    .then(function ({ data }) {
                        console.log(data)
                        setLoading(false)
                        if (data.data == null) {
                            window.alert('No data')
                            navigate('/')
                        } else {
                            updateProfile(data.data)
                        }
                    })
            }
    }, [searchParams])

    return (
        <div className="bg-blue-200 min-h-screen pt-10 pl-20">
            <Link href="/" className="back-icon"></Link>
            {(!laoding && profile) ? (
                <>
                    <div>
                        <img src={profile.profile.userAvatar} alt="avatar" />
                        <div className="text-2xl">{profile.profile.realName} <span className="text-sm">({profile.profile.ranking})</span> </div>
                        <div className="italic">{profile.profile.aboutMe}</div>
                    </div>
                    <br />
                    <div>
                        {showSelected('User Details', profile, 0)}
                    </div>
                </>
            ) : (<>Loading...</>)}
        </div>
    )
}