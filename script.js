function calculateMinCost() {
    // Get the input from the user
    const ropeLengthsInput = document.getElementById("rope-lengths").value;

    // Split the input string into an array of integers
    const ropeLengths = ropeLengthsInput.split(',').map(Number);

    // Check if there are enough ropes to calculate the cost
    if (ropeLengths.length < 2) {
        document.getElementById("result").innerHTML = "Minimum two rope lengths are required.";
        return;
    }

    // Create a min heap
    const minHeap = new MinHeap();

    // Insert all rope lengths into the min heap
    ropeLengths.forEach(length => {
        minHeap.insert(length);
    });

    // Initialize the minimum cost
    let minCost = 0;

    // Combine ropes until there is only one rope left
    while (minHeap.size() > 1) {
        // Get the two smallest ropes
        const rope1 = minHeap.extractMin();
        const rope2 = minHeap.extractMin();

        // Calculate the cost of combining them
        const cost = rope1 + rope2;

        // Add the cost to the total cost
        minCost += cost;

        // Insert the combined rope back into the heap
        minHeap.insert(cost);
    }

    // Display the minimum cost in the result div
    document.getElementById("result").innerHTML = "Minimum Cost: " + minCost;
}

// MinHeap implementation (to be included in script.js)
class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(value) {
        this.heap.push(value);
        this.bubbleUp();
    }

    extractMin() {
        if (this.isEmpty()) {
            return null;
        }

        const minValue = this.heap[0];
        const lastValue = this.heap.pop();

        if (!this.isEmpty()) {
            this.heap[0] = lastValue;
            this.bubbleDown();
        }

        return minValue;
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.size() === 0;
    }

    bubbleUp() {
        let currentIndex = this.size() - 1;

        while (currentIndex > 0) {
            const parentIndex = Math.floor((currentIndex - 1) / 2);

            if (this.heap[currentIndex] < this.heap[parentIndex]) {
                [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];
                currentIndex = parentIndex;
            } else {
                break;
            }
        }
    }

    bubbleDown() {
        let currentIndex = 0;

        while (true) {
            const leftChildIndex = 2 * currentIndex + 1;
            const rightChildIndex = 2 * currentIndex + 2;
            let smallestChildIndex = null;

            if (leftChildIndex < this.size()) {
                smallestChildIndex = leftChildIndex;
            }

            if (rightChildIndex < this.size() && this.heap[rightChildIndex] < this.heap[leftChildIndex]) {
                smallestChildIndex = rightChildIndex;
            }

            if (smallestChildIndex === null || this.heap[currentIndex] <= this.heap[smallestChildIndex]) {
                break;
            }

            [this.heap[currentIndex], this.heap[smallestChildIndex]] = [this.heap[smallestChildIndex], this.heap[currentIndex]];
            currentIndex = smallestChildIndex;
        }
    }
}
