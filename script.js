function calculateMinCost() {
  //your code here
  const inputElement = document.getElementById("ropesInput");
  const input = inputElement.value;

  // Split the comma-separated input into an array of rope lengths
  const ropeLengths = input.split(',').map(Number);

  // Create a min-heap (priority queue) using an array
  const minHeap = [...ropeLengths];

  // Function to calculate the minimum cost
  function connectRopes(minHeap) {
    let totalCost = 0;

    while (minHeap.length > 1) {
      // Extract the two shortest ropes from the min-heap
      const firstRope = minHeap.shift();
      const secondRope = minHeap.shift();

      // Calculate the cost of connecting these two ropes
      const cost = firstRope + secondRope;

      // Add the cost back to the min-heap
      minHeap.push(cost);

      // Add the cost to the total cost
      totalCost += cost;

      // Reheapify the min-heap
      minHeap.sort((a, b) => a - b);
    }

    return totalCost;
  }

  // Calculate the minimum cost
  const minimumCost = connectRopes(minHeap);

  // Display the result in the "result" div
  const resultElement = document.getElementById("result");
  resultElement.textContent = "Minimum Cost: " + minimumCost; 
}  
