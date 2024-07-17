import { React, useState} from 'react'
import { ReactFlow, useReactFlow } from '@xyflow/react';

const EdgeOperationPanel = ({ data }) => {
    // const reactFlowInstance = useReactFlow()
    const [newData, setNewData] = useState(data);
  
    const onChange = (event) => {
      var result = { ...newData, [event.target.name]: event.target.value }
      setNewData(result);
    };

    const onApplyChanges = () => {
      // const edge = reactFlowInstance.getEdge(newData.id)
      console.log('target edge: onApplyChanges')
      // reactFlowInstance.setEdges([...reactFlowInstance.getEdges(), edge])
    }

    return (
      <div>
        <input
          type="text"
          name="label"
          value={newData.label || ''}
          onChange={onChange}
        />
        {/* 添加更多输入字段以修改边的其他属性 */}
        <button onClick={() => onApplyChanges()}>Apply Changes</button>
      </div>
    );
  };
  
  export default EdgeOperationPanel