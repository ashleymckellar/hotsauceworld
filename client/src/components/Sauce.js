// DIDN'T END UP USING THIS COMPONENT - RETAINING FOR FUTURE FEATURE



import React, { useState } from 'react'
import Form from './Form' // Form.js 
import { useNavigate } from 'react-router-dom'



export default function Sauce(props) {

    // const navigate = useNavigate();

    const { name, origin, _id } = props // Imported from Form.js
    const [editToggle, setEditToggle] = useState(false)

    return (

        <div className='sauce'>
            {!editToggle ?
                <>
                    <h1>Name: {name}</h1>
                    <p>Origin: {origin}</p>
                    <button
                        className='delete-btn'
                        onClick={() => props.deletedSauce(_id)}>
                        Delete
                    </button>
                    <button className='edit-btn'
                        onClick={() => setEditToggle(prevToggle => !prevToggle)}>
                        Edit
                    </button>
                </>
                :
                <>
                    <Form
                        name={name}
                        origin={origin}
                        btnText="Submit Edit"
                        submit={props.editSauce}
                        _id={_id}
                    />
                    <button
                        onClick={() => setEditToggle(prevToggle => !prevToggle)}>
                        Close
                    </button>
                </>
            }
        </div>

    )
};