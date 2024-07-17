import { ReactFlow, Controls, Background } from '@xyflow/react';
import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import {
  addEdge,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import { useReactFlow, ReactFlowProvider } from '@xyflow/react'

import DocumentNode from './docNode';
import EdgeOperationPanel from './edgeOpPnl';

import ShortUniqueId from "short-unique-id"

import '@xyflow/react/dist/style.css';

const uid = new ShortUniqueId();
const getNodeId = () => uid.randomUUID(5);

// const initialNodes = [
//     {
//       id: '1',
//       position: { x: 0, y: 0 },
//       data: { label: 'Hello' },
//       type: 'input',
//     },
//     {
//       id: '2',
//       position: { x: 100, y: 100 },
//       data: { label: 'World' },
//     },
//   ];

  // const initialEdges = [
  //   { id: '1-2', source: '1', target: '2', label: 'to the', type: 'step' },
  // ];

function Flow3() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);



    // const onNodesChange = useCallback(
    //     (changes) => {
    //         // console.log('onNodeChange' + changes)
    //         setNodes((nds) => applyNodeChanges(changes, nds))
    //     },
    //     [],
    // );

    // const onEdgesChange = useCallback(
    //     (changes) => {
    //         console.log('onEdgeChange', changes)
    //         setEdges((eds) => applyEdgeChanges(changes, eds))
    //     },
    //     [],
    // );

    const clickAddNode = (node_type) => {
      const newnode = {
        id: getNodeId(),
        position: { x: 1, y: 1},
        type: node_type,
        label: node_type,
        data: {}
      }
      if ('id' in selectedNode){
        newnode.parentId = selectedNode.id
      }

      // if (node_type === 'document') {
      //   newnode.value = ''
      // }
      var curr_nodes = nodes.concat(newnode)
      setNodes(curr_nodes)
    }

    const onConnect = useCallback(
      (connection) => {
        setEdges((oldEdges) => addEdge(connection, oldEdges));
      },
      [setEdges],
    );

    // const onConnect = (params) => {
    //   // console.log('连接', params);
    //   const newedge = {
    //     source: params.source,
    //     target: params.target,
    //     id: params.source + "-" + params.target
    //   }

    //   var all_edges = edges.concat(newedge)
    //   setEdges(all_edges)
    // };
    const [selectedNode, setSelectedNode] = useState({})
    const onNodeClick = (event, node) => {
      console.log('onNodeClick', node)
      node.selected = true
      setSelectedNode(node)
    };
    
    useEffect(() => {
      console.log('selectedNode', selectedNode)
    }, [selectedNode]);


    const onPaneClick = (event) => {
      setSelectedNode({})
    }

    const onEdgeClick = (event, edge) => {
      console.log('点击连接', edge);
      const panel = React.createElement(EdgeOperationPanel, { data: edge.data });
      const op_panel = ReactDOM.createRoot(document.getElementById('op_panel'));
      op_panel.render(panel)
      // TODO: how would we know this panel has changed some attributes of an edge?
    };
    
    const onNodeDrag = (event, node) => {
      // console.log('拖动节点', node);
    };
    
    const onEdgeDrag = (event, edge) => {
      console.log('拖动连接', edge);
    };
    
    const onNodeDoubleClick = (event, node) => {
      console.log('双击节点', node);
    };
    
    const onEdgeDoubleClick = (event, edge) => {
      console.log('双击连接', edge);
    };
    
    const onNodeContextMenu = (event, node) => {
      console.log('右键菜单节点', node);
    };
    
    const onEdgeContextMenu = (event, edge) => {
      console.log('右键菜单连接', edge);
    };
    
    const onNodeDragStop = (event, node) => {
      console.log('拖动节点结束', node);
    };
    
    const onEdgeDragStop = (event, edge) => {
      console.log('拖动连接结束', edge);
    };
        
    const onZoom = (event, zoom) => {
      console.log('缩放', zoom);
    };
    
    const onPan = (event, dx, dy) => {
      console.log('平移', { dx, dy });
    };
    
    const onInit = (reactFlowInstance) => {
      console.log('实例', reactFlowInstance);
    };

    const nodeTypes = { document:DocumentNode };

    const reactFlowInstance = useReactFlow();
    const exportToJson = () => {
      const elements = reactFlowInstance.toObject();
      const json = JSON.stringify(elements, null, 4)
      console.log('graph json', json)
    }

    return (
      <div style={{ height: 1024, width: 1280 }}>
        <button id='add_start_node' onClick={() => clickAddNode('input')}>Add Start Node</button>
        {/* <button id='add_default_node' onClick={() => clickAddNode('default')}>Add Default Node</button> */}
        <button id='add_doc_node' onClick={() => clickAddNode('document')}>Add Document Node</button>
        <button id='add_group_node' onClick={() => clickAddNode('group')}>Add Group Node</button>
        <button id='add_end_node' onClick={() => clickAddNode('output')}>Add End Node</button>
        <button id='get_json' onClick={() => exportToJson()}>Get JSON</button>
        <ReactFlow         
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        onNodeDrag={onNodeDrag}
        onEdgeDrag={onEdgeDrag}
        onNodeDoubleClick={onNodeDoubleClick}
        onEdgeDoubleClick={onEdgeDoubleClick}
        onNodeContextMenu={onNodeContextMenu}
        onEdgeContextMenu={onEdgeContextMenu}
        onNodeDragStop={onNodeDragStop}
        onEdgeDragStop={onEdgeDragStop}
        onZoom={onZoom}
        onPan={onPan}
        onPaneClick={onPaneClick}
        onInit={onInit}
        nodeTypes={nodeTypes}
        fitView>
          <Background />
          <Controls />
        </ReactFlow>
        <div id='op_panel'></div>
      </div>
    );
  }
  
  function FlowWithProvider(props) {
    return (
      <ReactFlowProvider>
        <Flow3 {...props} />
      </ReactFlowProvider>
    )
  }
  export default FlowWithProvider;