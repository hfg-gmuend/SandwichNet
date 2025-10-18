# SandwichNet
Artificial intelligence (AI) is increasingly crucial for designers, particularly in the field of human–computer interaction. A basic understanding of machine learning (ML) algorithms is essential for design students to effectively engage with this technology both conceptually and practically. However, teaching this complex content in disciplines outside of computer science requires a different approach. To address this, we introduce SandwichNet, an interactive web-based tool to teach the basic principles of neural networks. SandwichNet provides a playful interactive visualization of a neural net whose parameters can be manipulated to recreate and understand the learning behavior of the network.


### Tool Design
The SandwichNet visualizes a simple neural network consisting of a few fully connected layers. To optimize the network, the weights of the individual neurons can be manipulated by increasing or decreasing their values. By clicking on the "magic portal", data samples appear, represented by sandwiches with randomly selected ingredients.

When a sandwich combination is generated and emerges from the portal, the ingredients are translated into numerical values for the input layer of SandwichNet. An existing ingredient on the sandwich is represented by a 1, and a non-existent ingredient by a 0.

The weights can be set individually for each input neuron by clicking the plus or minus symbol. They are initially randomly initialized and limited to values between -10 and 10.

The neurons of the hidden (middle) layer are visually divided into two sections. The first section displays the result of the sum function, which takes the value from each connected input node, multiplies it by the respective weight, and then sums the results. The second section shows the result of the sigmoid activation function, which receives the result from the sum function as input. A graphical representation of the sigmoid function with its characteristic S-curve can be displayed for each hidden neuron individually by clicking on the small dot between the two section.

The output layer consists of a single neuron that predicts the edibility of each sandwich combination. This output neuron can attain values from 0 to 1. In addition to the numerical display, the result is indicated by a needle on a circular scale.

The needle moves upwards into the green area when the value is close to 1 and indicates a delicious sandwich. If the output value is close to 0, the needle moves into the gray area and represents an inedible sandwich. The visualization of a scale was chosen to illustrate that there is no binary classification of a sandwich as "tasty" or "not tasty." Instead, the prediction provides a continuous value and thus gradations of tasty or not tasty.

### Training procedure of the SandwichNet

With a given sandwich example as input, the goal is now to optimize the predictions of SandwichNet. This is achieved by adjusting the individual weights, which can be done in two ways: manually by experimenting with different values at the different nodes (levels one and two) or semi-automatically using backpropagation (level three).

You can switch between levels by changing the URLSearchParams:

Level 1:
index.html?level=1

Level 2:
index.html?level=2

Level 3:
index.html?level=3

Level 4:
index.html?level=4

To train SandwichNet manually, all weights can be adjusted individually. If a weight is changed using its plus and minus buttons, all results of the dependent sum and sigmoid functions are recalculated and updated instantly. The change is immediately visible at all connecting nodes, including the change on the output node.

To check whether the chosen configuration of weights performs well, various sandwich combinations must be tested.

If a sandwich combination does not achieve the desired result, the weights must be adjusted further.

In the third level of the SandwichNet, the weights are no longer manually adjusted but optimized in a semi-automated procedure using the backpropagation mechanism. This involves calculating the output with randomly initialized weights and then calculating the deviation between the resulting and expected values. This error is then distributed to the individual weights, and thus, the neural network is further optimized in each cycle. We call the process semi-automatic because the students must support the backpropagation process in each cycle by determining the error. 

In the fourth level, sandwichNet can be trained completely automatically. To do this, a dataset must be created by deciding which combinations are tasty and which are inedible for you. In the network and training settings, the learning rate, training steps, and number of hidden neurons can be changed.