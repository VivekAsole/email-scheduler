// import React, { useState } from 'react';
import { Handle, Position } from "reactflow";

import { useStore } from "../../store/StoreContext";

export default function LeadSource({ id }) {
    const { nodes } = useStore();

    return (
        <>
            <Handle type="target" position={Position.Top} />
            <div className='flex  items-center justify-center bg-slate-300 w-48 h-16 text-slate-700 font-bold text-center rounded-2xl'>
                <img className="w-8 h-8 mr-4" src="/leadSource.png" alt="" />
                {/* <span>{nodes[Number(id - 1)].type}</span> */}
                <span>Lead Source</span>
            </div>
            <Handle type="source" position={Position.Bottom} id="a" />
        </>
    );
}
