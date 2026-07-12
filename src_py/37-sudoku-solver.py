"""
37. Sudoku Solver
Difficulty: Hard

Write a program to solve a Sudoku puzzle by filling the empty cells. Empty
cells are marked with '.'. The board is modified in place; a valid solution is
guaranteed to exist and be unique.
"""

from typing import List


def solve_sudoku(board: List[List[str]]) -> None:
    rows = [set() for _ in range(9)]
    cols = [set() for _ in range(9)]
    boxes = [set() for _ in range(9)]
    empties: List[tuple] = []

    def box_index(r: int, c: int) -> int:
        return (r // 3) * 3 + (c // 3)

    for r in range(9):
        for c in range(9):
            val = board[r][c]
            if val == ".":
                empties.append((r, c))
            else:
                rows[r].add(val)
                cols[c].add(val)
                boxes[box_index(r, c)].add(val)

    def backtrack(idx: int) -> bool:
        if idx == len(empties):
            return True
        r, c = empties[idx]
        b = box_index(r, c)
        for d in "123456789":
            if d in rows[r] or d in cols[c] or d in boxes[b]:
                continue
            board[r][c] = d
            rows[r].add(d)
            cols[c].add(d)
            boxes[b].add(d)

            if backtrack(idx + 1):
                return True

            board[r][c] = "."
            rows[r].remove(d)
            cols[c].remove(d)
            boxes[b].remove(d)
        return False

    backtrack(0)


def _is_solved(board: List[List[str]]) -> bool:
    digits = set("123456789")
    # rows and cols
    for i in range(9):
        if set(board[i]) != digits:
            return False
        if {board[r][i] for r in range(9)} != digits:
            return False
    # boxes
    for br in range(0, 9, 3):
        for bc in range(0, 9, 3):
            box = {board[br + dr][bc + dc] for dr in range(3) for dc in range(3)}
            if box != digits:
                return False
    return True


if __name__ == "__main__":
    board = [
        ["5", "3", ".", ".", "7", ".", ".", ".", "."],
        ["6", ".", ".", "1", "9", "5", ".", ".", "."],
        [".", "9", "8", ".", ".", ".", ".", "6", "."],
        ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
        ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
        ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
        [".", "6", ".", ".", ".", ".", "2", "8", "."],
        [".", ".", ".", "4", "1", "9", ".", ".", "5"],
        [".", ".", ".", ".", "8", ".", ".", "7", "9"],
    ]
    solve_sudoku(board)
    assert _is_solved(board)
    assert board[0] == ["5", "3", "4", "6", "7", "8", "9", "1", "2"]
    print("37 OK:", board[0])
