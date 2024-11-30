import React, { createContext, useState, useContext } from "react"

const StoreContext = createContext();

// Custom Hook to use the Context
export const useStore = () => {
    return useContext(StoreContext);
};

// Function to generate a new node
const addNode = (object) => {
    const newNode = {
        id: `${Number(object.id) + 1}`,
        type: "task",
        position: { x: object.position.x, y: object.position.y + 125 },
        data: { value: "" },
    };
    return newNode;
};

// Function to generate a new edge
const addEdge = (object) => {
    const newEdge = {
        id: `${object.id}->${Number(object.id) + 1}`,
        source: `${object.id}`,
        target: `${Number(object.id) + 1}`,
    };
    return newEdge;
};

// StoreProvider Component
export const StoreProvider = ({ children }) => {
    
    const [isAuthenticated, setisAuthenticated] = useState(false)
    const [user, setUser] = useState({})
    const [loader_msg, setLoader_msg] = useState(null)

    const initialNode = {
        id: "1",
        type: "task",
        position: { x: 400, y: 50 },
    }

    const [nodes, setNodes] = useState([{
        id: "1",
        type: "task",
        position: { x: 400, y: 50 },
    }]);
    const [edges, setEdges] = useState([]);

    // Function to add a new node and edge
    const addNewNodeAndEdge = () => {
        const newNode = addNode(nodes[nodes.length - 1]);
        const newEdge = addEdge(nodes[nodes.length - 1]);

        setNodes((prevNodes) => [...prevNodes, newNode]);
        setEdges((prevEdges) => [...prevEdges, newEdge]);
    };

    // Function to update node value
    const updateNodeValue = (id, { task, data }) => {
        setNodes((prevNodes) =>
            prevNodes.map((node) =>
                node.id === id ? { ...node, type: task, data: { ...data } } : node
            )
        );
    };

    return (
        <StoreContext.Provider value={{
            nodes, setNodes, 
            edges, setEdges,
            initialNode,
            addNewNodeAndEdge, updateNodeValue,
            isAuthenticated, setisAuthenticated,
            user, setUser,
            loader_msg, setLoader_msg,
        }}>
            {children}
        </StoreContext.Provider>
    );
};
