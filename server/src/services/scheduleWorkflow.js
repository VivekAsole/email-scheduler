import parseDelay from '../utils/delayParser.js';

export default function scheduleWorkflow(agenda, workflow) {
    
    const nodeMap = new Map();
    const edges = workflow.edges;

    workflow.nodes.forEach((node) => {
        nodeMap.set(node.id, node);
    });

    function processNode(node, previousDelay = 0) {
        const currentId = node.id;

        if (node.type === 'email') {
            node.data.emailContent["recipients"] = workflow.nodes[0].data.email
            agenda.schedule(new Date(Date.now() + previousDelay), 'sendEmail', node.data.emailContent);
        } else if (node.type === 'delay') {
            previousDelay += parseDelay(node.data.delayTime)
        }

        const nextEdges = edges.filter((edge) => edge.source === currentId);
        nextEdges.forEach((edge) => {
            const nextNode = nodeMap.get(edge.target);
            processNode(nextNode, previousDelay);
        });
    }

    workflow.nodes.forEach((node) => {
        if (node.type === 'leadSource') {
            processNode(node);
        }
    });
}
