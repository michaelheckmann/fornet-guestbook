import { Background, Controls, ReactFlow, type Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useState } from "react";
import type { Entry } from "./entries";
import { EntryModal } from "./entry-modal";
import { GuestbookNode } from "./guest-book-node";
import { IntroNode } from "./intro-node";
import { guestbookNodes } from "./layout";

const nodeTypes = { guestbookEntry: GuestbookNode, intro: IntroNode };

export default function App() {
  const [selected, setSelected] = useState<Entry | null>(null);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    if (node.type === "guestbookEntry") setSelected(node.data as Entry);
  }, []);

  return (
    <div className="h-screen w-screen bg-neutral-50">
      <ReactFlow
        nodes={guestbookNodes}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        onlyRenderVisibleElements
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        proOptions={{ hideAttribution: true }}
        fitView
        minZoom={0.2}
        maxZoom={2}
      >
        <Background gap={32} color="#e5e5e5" />
        <Controls showInteractive={false} />
      </ReactFlow>

      <EntryModal entry={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
