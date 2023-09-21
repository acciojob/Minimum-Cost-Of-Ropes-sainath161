function calculateMinCost() {
  //your code here
	// Get the input value from the text element
  const inputElement = document.getElementById("ropesInput");
  const inputText = inputElement.value;

  // Split the input string into an array of rope lengths
  const ropeLengths = inputText.split(",").map((str) => parseInt(str.trim()));

  // Check if the input is valid
  if (ropeLengths.length < 2) {
    // Handle the case when there are not enough ropes to connect
    document.getElementById("result").textContent = "Minimum cost is 0";
    return;
  }

  // Define a function to calculate the minimum cost
  function findMinCost(ropes) {
    let totalCost = 0;

    while (ropes.length > 1) {
      // Sort the ropes in ascending order
      ropes.sort((a, b) => a - b);

      // Connect the two smallest ropes
      const combinedRope = ropes[0] + ropes[1];

      // Update the total cost
      totalCost += combinedRope;

      // Remove the two smallest ropes and add the combined one
      ropes.splice(0, 2, combinedRope);
    }

    return totalCost;
  }

  // Calculate the minimum cost
  const minCost = findMinCost(ropeLengths);

  // Display the result in the result div
  document.getElementById("result").textContent = "Minimum cost is " + minCost;  
}  
