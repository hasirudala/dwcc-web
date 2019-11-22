import React from "react"

export default ({ n=1 }) => {
    let lbs = []
    for (let i=0; i < n; i++) lbs.push(<br key={i}/>)
    return lbs;
}
