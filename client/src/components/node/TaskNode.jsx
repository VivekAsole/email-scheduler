import React, { useState } from 'react';
import { Handle, Position } from "reactflow";
import PopUpForm from '../flowChart/PopUpForm';

export default function TaskNode({ id }) {
    const [popUp, setPopUp] = useState(false)

    return (
        <>
            <Handle type="target" position={Position.Top} />
            {
                popUp &&
                <div className='z-10 fixed'>
                    <PopUpForm setPopUp={setPopUp} id={id} />
                </div>
            }
            <div>
                <button
                    onClick={() => setPopUp(true)}
                    className='rounded-xl w-40 h-10 bg-green-500 text-white font-bold'
                >ADD NODE</button>
            </div >
            <Handle type="source" position={Position.Bottom} id="a" />
        </>
    );
}
