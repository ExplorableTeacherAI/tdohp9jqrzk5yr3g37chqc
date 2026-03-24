import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout, SplitLayout } from "@/components/layouts";
import {
    EditableH2,
    EditableParagraph,
    InlineScrubbleNumber,
    InlineClozeInput,
    InlineClozeChoice,
    InlineFeedback,
    InlineTooltip,
    InlineSpotColor,
    Cartesian2D,
    InteractionHintSequence,
} from "@/components/atoms";
import { FormulaBlock } from "@/components/molecules";
import {
    getVariableInfo,
    numberPropsFromDefinition,
    clozePropsFromDefinition,
    choicePropsFromDefinition,
    scrubVarsFromDefinitions,
} from "../variables";
import { useVar, useSetVar } from "@/stores";

// ─────────────────────────────────────────
// Reactive Vector Representation Visualization
// ─────────────────────────────────────────
function VectorRepresentationViz() {
    const x = useVar("vectorComponentX", 3) as number;
    const y = useVar("vectorComponentY", 4) as number;
    const setVar = useSetVar();

    const magnitude = Math.sqrt(x * x + y * y);

    return (
        <div className="relative">
            <Cartesian2D
                height={380}
                viewBox={{ x: [-6, 6], y: [-6, 6] }}
                showGrid={true}
                movablePoints={[
                    {
                        initial: [x, y],
                        color: "#AC8BF9",
                        position: [x, y],
                        onChange: (point: [number, number]) => {
                            // Round to nearest 0.5
                            const newX = Math.round(point[0] * 2) / 2;
                            const newY = Math.round(point[1] * 2) / 2;
                            setVar("vectorComponentX", Math.max(-5, Math.min(5, newX)));
                            setVar("vectorComponentY", Math.max(-5, Math.min(5, newY)));
                        },
                    },
                ]}
                dynamicPlots={() => [
                    // Origin point
                    { type: "point", x: 0, y: 0, color: "#64748b" },
                    // Main vector
                    {
                        type: "vector",
                        tail: [0, 0],
                        tip: [x, y],
                        color: "#AC8BF9",
                        weight: 3,
                    },
                    // X component (horizontal dashed line)
                    {
                        type: "segment",
                        point1: [0, 0],
                        point2: [x, 0],
                        color: "#62D0AD",
                        weight: 2,
                        style: "dashed",
                    },
                    // Y component (vertical dashed line)
                    {
                        type: "segment",
                        point1: [x, 0],
                        point2: [x, y],
                        color: "#8E90F5",
                        weight: 2,
                        style: "dashed",
                    },
                ]}
            />
            <InteractionHintSequence
                hintKey="vector-representation-drag"
                steps={[
                    {
                        gesture: "drag",
                        label: "Drag the purple point to change the vector",
                        position: { x: "70%", y: "30%" },
                    },
                ]}
            />
            {/* Component labels */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-white/90 px-3 py-1 rounded text-sm">
                <span className="text-[#62D0AD] font-medium">x = {x}</span>
                <span className="mx-2 text-slate-400">|</span>
                <span className="text-[#8E90F5] font-medium">y = {y}</span>
                <span className="mx-2 text-slate-400">|</span>
                <span className="text-[#AC8BF9] font-medium">|v| = {magnitude.toFixed(2)}</span>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────
// Reactive Magnitude Display
// ─────────────────────────────────────────
function ReactiveMagnitude() {
    const x = useVar("vectorComponentX", 3) as number;
    const y = useVar("vectorComponentY", 4) as number;
    const magnitude = Math.sqrt(x * x + y * y);
    return <span className="text-[#AC8BF9] font-medium">{magnitude.toFixed(2)}</span>;
}

// ─────────────────────────────────────────
// Section Blocks
// ─────────────────────────────────────────
export const representingVectorsBlocks: ReactElement[] = [
    // Section heading
    <StackLayout key="layout-representing-heading" maxWidth="xl">
        <Block id="representing-heading" padding="md">
            <EditableH2 id="h2-representing-heading" blockId="representing-heading">
                Representing Vectors
            </EditableH2>
        </Block>
    </StackLayout>,

    // Introduction
    <StackLayout key="layout-representing-intro" maxWidth="xl">
        <Block id="representing-intro" padding="sm">
            <EditableParagraph id="para-representing-intro" blockId="representing-intro">
                Now that we understand what vectors are, how do we write them down? Mathematicians have developed
                several ways to represent vectors, and the most useful one for calculations is{" "}
                <InlineTooltip
                    id="tooltip-component-form"
                    tooltip="Writing a vector using its horizontal (x) and vertical (y) parts."
                >
                    component form
                </InlineTooltip>
                .
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Component form explanation
    <StackLayout key="layout-representing-components-explanation" maxWidth="xl">
        <Block id="representing-components-explanation" padding="sm">
            <EditableParagraph id="para-representing-components-explanation" blockId="representing-components-explanation">
                Any vector in a plane can be broken into two parts: how far it goes{" "}
                <InlineSpotColor varName="vectorComponentX" color="#62D0AD">horizontally</InlineSpotColor> (the{" "}
                <InlineSpotColor varName="vectorComponentX" color="#62D0AD">x-component</InlineSpotColor>) and
                how far it goes{" "}
                <InlineSpotColor varName="vectorComponentY" color="#8E90F5">vertically</InlineSpotColor> (the{" "}
                <InlineSpotColor varName="vectorComponentY" color="#8E90F5">y-component</InlineSpotColor>).
                We write this as ⟨x, y⟩ using angle brackets.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Interactive visualization with explanation
    <SplitLayout key="layout-representing-viz" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="representing-viz-explanation" padding="sm">
                <EditableParagraph id="para-representing-viz-explanation" blockId="representing-viz-explanation">
                    In the diagram, the purple arrow is our vector. It starts at the origin and ends at the point (
                    <InlineScrubbleNumber
                        varName="vectorComponentX"
                        {...numberPropsFromDefinition(getVariableInfo("vectorComponentX"))}
                    />
                    ,{" "}
                    <InlineScrubbleNumber
                        varName="vectorComponentY"
                        {...numberPropsFromDefinition(getVariableInfo("vectorComponentY"))}
                    />
                    ). The{" "}
                    <InlineSpotColor varName="vectorComponentX" color="#62D0AD">teal dashed line</InlineSpotColor>{" "}
                    shows the x-component, and the{" "}
                    <InlineSpotColor varName="vectorComponentY" color="#8E90F5">indigo dashed line</InlineSpotColor>{" "}
                    shows the y-component.
                </EditableParagraph>
            </Block>
            <Block id="representing-component-form" padding="sm">
                <EditableParagraph id="para-representing-component-form" blockId="representing-component-form">
                    Drag the purple point to different positions. Notice how the x and y components change.
                    The vector ⟨3, 4⟩ means "go 3 units right and 4 units up". What about ⟨−2, 3⟩? That means
                    "go 2 units left and 3 units up".
                </EditableParagraph>
            </Block>
        </div>
        <Block id="representing-viz" padding="sm" hasVisualization>
            <VectorRepresentationViz />
        </Block>
    </SplitLayout>,

    // Magnitude explanation
    <StackLayout key="layout-representing-magnitude-heading" maxWidth="xl">
        <Block id="representing-magnitude-heading" padding="sm">
            <EditableH2 id="h2-representing-magnitude-heading" blockId="representing-magnitude-heading">
                Finding the Magnitude
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-representing-magnitude-explanation" maxWidth="xl">
        <Block id="representing-magnitude-explanation" padding="sm">
            <EditableParagraph id="para-representing-magnitude-explanation" blockId="representing-magnitude-explanation">
                The{" "}
                <InlineTooltip
                    id="tooltip-magnitude"
                    tooltip="The length or size of a vector, written as |v| (with vertical bars)."
                >
                    magnitude
                </InlineTooltip>{" "}
                of a vector is its length. For a vector ⟨x, y⟩, we find the magnitude using the Pythagorean theorem.
                The x and y components form the two legs of a right triangle, and the vector itself is the hypotenuse!
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Magnitude formula
    <StackLayout key="layout-representing-magnitude-formula" maxWidth="xl">
        <Block id="representing-magnitude-formula" padding="sm">
            <FormulaBlock
                latex="|v| = \sqrt{\scrub{vectorComponentX}^2 + \scrub{vectorComponentY}^2}"
                variables={scrubVarsFromDefinitions(["vectorComponentX", "vectorComponentY"])}
            />
        </Block>
    </StackLayout>,

    // Magnitude result
    <StackLayout key="layout-representing-magnitude-result" maxWidth="xl">
        <Block id="representing-magnitude-result" padding="sm">
            <EditableParagraph id="para-representing-magnitude-result" blockId="representing-magnitude-result">
                For the current vector, the magnitude is <ReactiveMagnitude />. Try changing the components in the
                visualization above and watch how the magnitude changes. The classic 3-4-5 right triangle gives a
                magnitude of exactly 5.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Assessment heading
    <StackLayout key="layout-representing-assessment-heading" maxWidth="xl">
        <Block id="representing-assessment-heading" padding="sm">
            <EditableH2 id="h2-representing-assessment-heading" blockId="representing-assessment-heading">
                Check Your Understanding
            </EditableH2>
        </Block>
    </StackLayout>,

    // Question 1 - Magnitude calculation
    <StackLayout key="layout-representing-question-magnitude" maxWidth="xl">
        <Block id="representing-question-magnitude" padding="sm">
            <EditableParagraph id="para-representing-question-magnitude" blockId="representing-question-magnitude">
                A vector has components ⟨3, 4⟩. Using the Pythagorean theorem, its magnitude is{" "}
                <InlineFeedback
                    varName="answerMagnitude"
                    correctValue="5"
                    position="terminal"
                    successMessage="— correct! √(3² + 4²) = √(9 + 16) = √25 = 5"
                    failureMessage="— remember, magnitude = √(x² + y²)."
                    hint="Calculate √(3² + 4²)"
                    reviewBlockId="representing-magnitude-formula"
                    reviewLabel="Review the formula"
                >
                    <InlineClozeInput
                        varName="answerMagnitude"
                        correctAnswer="5"
                        {...clozePropsFromDefinition(getVariableInfo("answerMagnitude"))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Question 2 - Component form
    <StackLayout key="layout-representing-question-component" maxWidth="xl">
        <Block id="representing-question-component" padding="sm">
            <EditableParagraph id="para-representing-question-component" blockId="representing-question-component">
                A vector points from the origin to the point (2, 3). In component form, this vector is written as{" "}
                <InlineFeedback
                    varName="answerComponentForm"
                    correctValue="⟨2, 3⟩"
                    position="terminal"
                    successMessage="— that's right! We use angle brackets ⟨x, y⟩ for component form"
                    failureMessage="— remember, component form uses angle brackets ⟨ ⟩ with x first, then y."
                    hint="Component form uses angle brackets: ⟨x, y⟩"
                >
                    <InlineClozeChoice
                        varName="answerComponentForm"
                        correctAnswer="⟨2, 3⟩"
                        options={["⟨3, 2⟩", "⟨2, 3⟩", "(2, 3)", "2 + 3"]}
                        {...choicePropsFromDefinition(getVariableInfo("answerComponentForm"))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
