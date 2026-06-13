import type { Node } from "@xyflow/react";
import { entries, type Entry } from "./entries";

const COLS = 4;
const CARD_W = 280;
const CARD_H = 180;
const GAP_X = 48;
const GAP_Y = 48;
const CELL_W = CARD_W + GAP_X;
const CELL_H = CARD_H + GAP_Y;

// reserve the center 2×2 block (cols 1–2, rows 1–2) for the intro node
const reserved = new Set(["1,1", "1,2", "2,1", "2,2"]);

const cellPos = (col: number, row: number) => ({
  x: col * CELL_W,
  y: row * CELL_H,
});

// fill cells row-major, skipping the reserved ones
function* freeCells() {
  for (let row = 0; ; row++) {
    for (let col = 0; col < COLS; col++) {
      if (!reserved.has(`${col},${row}`)) yield { col, row };
    }
  }
}

const cells = freeCells();

const entryNodes: Node[] = entries.map((entry: Entry) => {
  const { col, row } = cells.next().value!;
  return {
    id: entry.id,
    type: "guestbookEntry",
    position: cellPos(col, row),
    data: entry,
    draggable: false,
    selectable: false,
  };
});

const introNode: Node = {
  id: "intro",
  type: "intro",
  position: cellPos(1, 1), // top-left of the reserved 2×2 block
  data: {},
  draggable: false,
  selectable: false,
};

export const guestbookNodes: Node[] = [introNode, ...entryNodes];
