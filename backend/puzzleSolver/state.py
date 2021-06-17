
class State:

    def __init__(self, state, parent, cost, move, key):
        super().__init__()
        self.state = state
        self.parent = parent
        self.cost = cost
        self.move = move
        self.key = key
        if self.state:
            self.to_string = ''.join(str(ch)+"," for ch in self.state)
    
    def __eq__(self, other):
        return self.to_string == other.to_string

    def __lt__(self, other):
        return self.to_string < other.to_string 
