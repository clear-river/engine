import { React, useState } from 'react'
import { Handle, Position } from '@xyflow/react'

const DocumentNode = ({ data, id }) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
    data.value = event.target.value
    // 你可以在这里更新节点的 data，或者调用外部函数
  };

  return (
    <div style={{ border: '1px solid black', padding: 10, width: 200 }}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        style={{ width: '100%' }}
      />
      {/* <Handle type="target" position={Position.Top} /> */}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default DocumentNode;