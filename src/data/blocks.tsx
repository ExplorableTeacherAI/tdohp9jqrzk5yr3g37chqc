import { type ReactElement } from "react";

// Initialize variables and their colors from this file's variable definitions
import { useVariableStore, initializeVariableColors } from "@/stores";
import { getDefaultValues, variableDefinitions } from "./variables";
useVariableStore.getState().initialize(getDefaultValues());
initializeVariableColors(variableDefinitions);

// Import all section blocks
import { whatIsVectorBlocks } from "./sections/WhatIsVector";
import { representingVectorsBlocks } from "./sections/RepresentingVectors";
import { vectorAdditionBlocks } from "./sections/VectorAddition";
import { scalarMultiplicationBlocks } from "./sections/ScalarMultiplication";

/**
 * ------------------------------------------------------------------
 * VECTORS LESSON
 * ------------------------------------------------------------------
 * This lesson introduces vectors as quantities with magnitude and direction.
 *
 * SECTIONS:
 * 1. What is a Vector? - Scalars vs Vectors, real-world navigation example
 * 2. Representing Vectors - Component form, magnitude calculation
 * 3. Vector Addition - Tip-to-tail method, component-wise addition
 * 4. Scalar Multiplication - Scaling and flipping vectors
 * ------------------------------------------------------------------
 */

export const blocks: ReactElement[] = [
    ...whatIsVectorBlocks,
    ...representingVectorsBlocks,
    ...vectorAdditionBlocks,
    ...scalarMultiplicationBlocks,
];
