import { maxHeight } from '@mui/system';
import React, { useEffect, useRef } from 'react';

const TreeCanvas = ({ nestedArray }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

// Function to draw a tree on HTML canvas
    const drawTree = (node, x, y, level, parentX, height) => {
      if (Array.isArray(node) && node.length > 0) {
        const numChildren = node.length;
    
        // Draw child nodes
        // Spacing is determined by how tall the tree is
        let childSpacing = (2 ** (height - level)) * 10 + (2 ** (height - level - 1)) * 40
        const totalWidth = numChildren * childSpacing;
        
              
          // Adjust the starting position of child nodes to center them
          const startX = x - totalWidth / 2 + childSpacing;
    
        for (let i = 0; i < numChildren; i++) {
          const childX = startX + i * childSpacing;
          const childY = y + 50;
    
          drawTree(node[i], childX, childY, level + 1, x, height);
        }
        // Draw connecting lines for levels greater than 1
        if (level > 1) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(parentX, y - 50);
          ctx.strokeStyle = 'white';
          ctx.stroke();
        }
    
        // Draw node only for levels greater than 0
        if (level > 0) {
          ctx.beginPath();
          ctx.arc(x, y, 20, 0, 2 * Math.PI);
          ctx.fillStyle = '#242424';
          ctx.fill();
          ctx.strokeStyle = 'white';
          ctx.stroke();
          ctx.textAlign = 'center';
          ctx.fillStyle = 'white';
          ctx.fillText(node[node.length - 1], x, y + 5);
          //ctx.fillText(childSpacing, x, y + 5);
        }
    
      }
    };

    
    
  

    // Draw the tree
    drawTree(nestedArray, 0, 50, 0, canvas.width / 2, getHeight(nestedArray, 0));
    
  }, [nestedArray]);

  return <canvas ref={canvasRef} width={500} height={500} />;
};

function getHeight(array, height) {
  
  if (Array.isArray(array) && array.length == 1) {
    return getHeight(array[0], height);
  } else if (!(Array.isArray(array[0])) && !(Array.isArray(array[0]))) {
    return height;
  } else if (!(Array.isArray(array[0])) && Array.isArray(array[0])) {
    return getHeight(array[1], height + 1);
  } else if (!(Array.isArray(array[0])) && Array.isArray(array[0])) {
    return getHeight(array[0], height + 1);
  } else {
    return Math.max(getHeight(array[0], height + 1), getHeight(array[1], height + 1));
  }
  
}
export default TreeCanvas;
