import { useState } from 'react'
const BASE_URL = process.env.REACT_APP_BASE_URL

export default function EditEmailForm({ user, onLogOut }) {
    const [formData, setFormData] = useState({
        email: `${user.email}`
    });

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    async function handleSubmit(e){
        e.preventDefault()
        const updatedUser = {email: formData.email}
        const response = await fetch(BASE_URL + `/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser)
        })
        const data = await response.json()
        if (response.ok) {
            onLogOut()
        } else {
            console.log(data)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="email" value={formData.email} onChange={handleChange}></input>
                <input type="submit"></input>
            </form>
        </div>
    )
}
