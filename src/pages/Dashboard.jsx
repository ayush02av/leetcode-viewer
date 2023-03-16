import { useContext, useEffect, useState } from "react"
import { UserContext } from '../context'
import { useNavigate, useParams } from 'react-router-dom'
import { PieChart, Pie } from 'recharts'
import axios from 'axios'

const colors = [
    "#00ffff",
    "#f0ffff",
    "#f5f5dc",
    "#000000",
    "#0000ff",
    "#a52a2a",
    "#00ffff",
    "#00008b",
    "#008b8b",
    "#a9a9a9",
    "#006400",
    "#bdb76b",
    "#8b008b",
    "#556b2f",
    "#ff8c00",
    "#9932cc",
    "#8b0000",
    "#e9967a",
    "#9400d3",
    "#ff00ff",
    "#ffd700",
    "#008000",
    "#4b0082",
    "#f0e68c",
    "#add8e6",
    "#e0ffff",
    "#90ee90",
    "#d3d3d3",
    "#ffb6c1",
    "#ffffe0",
    "#00ff00",
    "#ff00ff",
    "#800000",
    "#000080",
    "#808000",
    "#ffa500",
    "#ffc0cb",
    "#800080",
    "#800080",
    "#ff0000",
    "#c0c0c0",
    "#ffff00"
]

export default function Dashboard() {
    const searchParams = useParams();

    const navigate = useNavigate()

    const { profile, updateProfile } = useContext(UserContext)
    const [laoding, setLoading] = useState(true)
    const [problems, setProblems] = useState([])
    const [features, setFeatures] = useState([])

    const [label0, setLabel0] = useState([])
    const [label1, setLabel1] = useState([])
    const [label2, setLabel2] = useState([])

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

                            const solved = []

                            for (let i = 0; i < Object.keys(data.data.problems).length; i++) {
                                const problem = Object.keys(data.data.problems)[i]
                                solved.push({
                                    title: problem,
                                    value: data.data.problems[problem],
                                    fill: colors[i]
                                })
                            }
                            setProblems(solved)

                            const label = data.data.analysis.label
                            const importantFeatures = data.data.analysis.features[label]
                            const important = []
                            for (let i = 0; i < importantFeatures.length; i++) {
                                important.push({
                                    title: importantFeatures[i][0],
                                    value: importantFeatures[i][1],
                                    fill: colors[i]
                                })
                            }
                            setFeatures(important.slice(0, 20))

                            const importantFeatures0 = data.data.analysis.features[0]
                            const important0 = []
                            for (let i = 0; i < importantFeatures0.length; i++) {
                                important0.push({
                                    title: importantFeatures0[i][0],
                                    value: importantFeatures0[i][1],
                                    fill: colors[i]
                                })
                            }
                            setLabel0(important0.slice(0, 10))

                            const importantFeatures1 = data.data.analysis.features[1]
                            const important1 = []
                            for (let i = 0; i < importantFeatures1.length; i++) {
                                important1.push({
                                    title: importantFeatures1[i][0],
                                    value: importantFeatures1[i][1],
                                    fill: colors[i]
                                })
                            }
                            setLabel1(important1.slice(0, 10))

                            const importantFeatures2 = data.data.analysis.features[2]
                            const important2 = []
                            for (let i = 0; i < importantFeatures2.length; i++) {
                                important2.push({
                                    title: importantFeatures2[i][0],
                                    value: importantFeatures2[i][1],
                                    fill: colors[i]
                                })
                            }
                            setLabel2(important2.slice(0, 10))
                        }
                    })
            }
    }, [searchParams])

    return (
        <div className="bg-slate-400 min-h-screen py-10 px-20">
            <a href="/" className="back-icon"></a>
            {(!laoding && profile) ? (
                <div className="flex flex-wrap">
                    <div className="flex-1 overflow-y-scroll">
                        <div>
                            <img src={profile.profile.userAvatar} alt="avatar" />
                            <div className="text-2xl">{profile.profile.realName} <span className="text-sm">({profile.profile.ranking})</span> </div>
                            <div className="italic">{profile.profile.aboutMe}</div>
                        </div>
                        <br />
                        <PieChart width={730} height={300} className="overflow-scroll">
                            <Pie
                                data={problems}
                                dataKey="value"
                                nameKey="title"
                                outerRadius={100}
                                fill="#8884d8"
                                overflow="allow"
                            />
                            <Pie
                                data={features}
                                dataKey="value"
                                nameKey="title"
                                innerRadius={80}
                                outerRadius={100}
                                fill="#82ca9d"
                                label={(e) => { return e.title }}
                                overflow="allow"
                            />
                        </PieChart>
                        Inner Circle: Problems Solved
                        <br />
                        Outer Circle: Your Category: {profile.analysis.label}
                    </div>
                    <div className="flex-1 overflow-y-scroll">
                        Category 0
                        <PieChart width={500} height={200} className="overflow-scroll">
                            <Pie
                                data={label0}
                                dataKey="value"
                                nameKey="title"
                                outerRadius={50}
                                fill="#82ca9d"
                                label={(e) => { return e.title }}
                                overflow="allow"
                            />
                        </PieChart>
                        <br />
                        Category 1
                        <PieChart width={500} height={200} className="overflow-scroll">
                            <Pie
                                data={label1}
                                dataKey="value"
                                nameKey="title"
                                outerRadius={50}
                                fill="#82ca9d"
                                label={(e) => { return e.title }}
                                overflow="allow"
                            />
                        </PieChart>
                        Category 2
                        <PieChart width={500} height={200} className="overflow-scroll">
                            <Pie
                                data={label2}
                                dataKey="value"
                                nameKey="title"
                                outerRadius={50}
                                fill="#82ca9d"
                                label={(e) => { return e.title }}
                                overflow="allow"
                            />
                        </PieChart>
                    </div>
                </div>
            ) : (<>Loading...</>)
            }
        </div >
    )
}