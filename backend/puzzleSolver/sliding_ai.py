from collections import deque
from . state import State
from heapq import heappop, heappush, heapify

move_map = {
    'up': 1,
    'down': 2,
    'left': 3,
    'right': 4
}

def move(state, direction, dimension):
    
    temp = state[:]
    idx = temp.index(dimension*dimension-1)

    if direction == 'up':
        if idx not in range(0, dimension):
            temp[idx], temp[idx-dimension] = temp[idx-dimension], temp[idx]
            return temp
        else:
            return None

    elif direction == 'down':
        if idx not in range(dimension*(dimension-1), dimension*dimension):
            temp[idx], temp[idx+dimension] = temp[idx+dimension], temp[idx]
            return temp
        else:
            return None

    elif direction == 'left':
        if idx not in range(0, dimension*dimension, dimension):
            temp[idx], temp[idx-1] = temp[idx-1], temp[idx]
            return temp
        else:
            return None

    elif direction == 'right':
        if idx not in range(dimension-1, dimension*dimension, dimension):
            temp[idx], temp[idx+1] = temp[idx+1], temp[idx]
            return temp
        else:
            return None

def expand(node, dimension):
    
    neighbours = []

    neighbours.append(State(move(node.state, 'up', dimension), node, node.cost+1, 'up', 0))
    neighbours.append(State(move(node.state, 'down', dimension), node, node.cost+1, 'down', 0))
    neighbours.append(State(move(node.state, 'left', dimension), node, node.cost+1, 'left', 0))
    neighbours.append(State(move(node.state, 'right', dimension), node, node.cost+1, 'right', 0))

    nodes = [neighbour for neighbour in neighbours if neighbour.state]

    return nodes

def get_path(node):
    
    path = []
    
    while(node.move):
        path.append(node.move)
        node = node.parent
    
    path.reverse()
    return path

def bfs(start, goal, dimension):
    
    explored = set()
    queue = [State(start, None, 0, None, 0)]

    while queue:
        node = queue.pop(0)
        explored.add(node.to_string)

        if node.state == goal:
            return get_path(node)

        children = expand(node, dimension)

        for child in children:
            if child.to_string not in explored:
                explored.add(child.to_string)
                queue.append(child)

def manhattan(start, goal, dimension):
    
    return sum(abs(a%dimension - b%dimension) + abs(a//dimension - b//dimension) for a, b in ((start.index(i), goal.index(i)) for i in range(0, dimension*dimension-1)))

def astar(start, goal, dimension):
    
    explored = set()
    heap = []
    heap_entries = {}

    key = manhattan(start, goal, dimension)
    root = State(start, None, 0, None, key)
    entry = (key, None, root)
    heappush(heap, entry)
    heap_entries[root.to_string] = entry

    while heap:

        heap_node = heappop(heap)
        node = heap_node[2]
        explored.add(node.to_string)
        
        if node.state == goal:
            return get_path(node)

        neighbours = expand(node, dimension)

        for neighbour in neighbours:
            
            neighbour.key = neighbour.cost + manhattan(neighbour.state, goal, dimension)
            entry = (neighbour.key, move_map[neighbour.move], neighbour)
            
            if neighbour.to_string not in explored:
                
                heappush(heap, entry)
                explored.add(neighbour.to_string)
                heap_entries[neighbour.to_string] = entry
            
            elif neighbour.to_string in heap_entries and neighbour.key < heap_entries[neighbour.to_string][2].key:
                
                hindex = heap.index((heap_entries[neighbour.to_string][2].key, move_map[heap_entries[neighbour.to_string][2].move],heap_entries[neighbour.to_string][2]))
                heap[int(hindex)] = entry
                heap_entries[neighbour.to_string] = entry
                heapify(heap)

def ida_rec(start, goal, dimension, threshold, costs):
    
    explored = set()
    stack = [State(start, None, 0, None, threshold)]

    while stack:
        node = stack.pop()
        explored.add(node.to_string)

        if node.state == goal:
            return get_path(node)

        if node.key > threshold:
            costs.add(node.key)

        if node.cost < threshold:
            neighbours = expand(node, dimension)

            for neighbour in neighbours:
                if neighbour.to_string not in explored:
                    neighbour.key = neighbour.cost+manhattan(neighbour.state, goal, dimension)
                    stack.append(neighbour)
                    explored.add(neighbour.to_string)

    return min(costs)

def ida(start, goal, dimension):
    
    threshold = manhattan(start, goal, dimension)
    costs = set()

    while True:
        response = ida_rec(start, goal, dimension, threshold, costs)

        if type(response) is list:
            return response
        
        threshold = response

        costs = set()

def sliding_puzzle_solver(start, dimension, algorithm):
    
    function_map = {
        'bfs': bfs,
        'ast': astar,
        'ida': ida
    }

    dimension = int(dimension)
    for i in range(len(start)):
        start[i] = int(start[i])
    
    goal = start[:]
    goal.sort()

    function = function_map[algorithm]
    moves = function(start, goal, dimension)

    return moves

# if __name__ == '__main__':
    # main([2,1,6,4,0,7,8,5,3], 3, 'ast')
    # main([8,4,3,6,1,2,7,5,0], 3, 'ast')
    # main([14,11,13,3,1,10,0,5,4,9,7,8,2,15,6,12], 4, 'ast')
    # main([0,1,2,3,4,6,15,7,8,5,10,11,12,9,13,14], 4, 'ast')