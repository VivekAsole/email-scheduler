import React, { useState, useCallback, useMemo, useEffect } from 'react';

import ReactFlow, {
    useNodesState,
    useEdgesState,
    addEdge,
    MiniMap,
    Controls,
    Background,
} from "reactflow";

import "reactflow/dist/style.css";

import TaskNode from '../node/TaskNode';
import LeadSource from '../node/LeadSource';
import Email from '../node/Email';
import Wait from '../node/Wait'

import { useStore } from "../../store/StoreContext"; // Importing custom store hook

const FlowContainer = () => {

    // Using the context to get nodes and edges
    const { nodes, edges } = useStore();
    const [nodesState, setNodes, onNodesChange] = useNodesState(nodes)
    const [edgesState, setEdges, onEdgesChange] = useEdgesState(edges)

    const nodeTypes = useMemo(() => (
        {
            "task": TaskNode,
            "leadSource": LeadSource,
            "email": Email,
            "delay": Wait,
        }
    ), []);


    // Synchronize nodes and edges with context store
    useEffect(() => {
        setNodes(nodes);
        setEdges(edges);
    }, [nodes, setNodes, edges, setEdges])

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    )

    return (
        <div className='bg-slate-700 w-full h-full'>
            <ReactFlow
                nodes={nodesState}
                edges={edgesState}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
            >
                <Controls />
                <MiniMap />
                <Background color="white" variant="dots" gap={50} size={2} />
            </ReactFlow>
        </div>
    )
}

export default FlowContainer;
