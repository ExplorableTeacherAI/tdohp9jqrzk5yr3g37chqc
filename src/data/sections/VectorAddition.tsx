import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout, SplitLayout } from "@/components/layouts";
import {
    EditableH2,
    EditableParagraph,
    InlineScrubbleNumber,
    InlineClozeInput,
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
    scrubVarsFromDefinitions,
} from "../variables";
import { useVar, useSetVar } from "@/stores";

// ─────────────────────────────────────────
// Reactive Vector Addition Visualization
// ─────────────────────────────────────────
function VectorAdditionViz() {
    const ax = useVar("vectorAx", 2) as number;
    const ay = useVar("vectorAy", 1) as number;
    const bx = useVar("vectorBx", 1) as number;
    const by = useVar("vectorBy", 2) as number;
    const setVar = useSetVar();

    // Sum vector
    const sumX = ax + bx;
    const sumY = ay + by;

    return (
        <div className="relative">
            <Cartesian2D
                height={400}
                viewBox={{ x: [-2, 8], y: [-2, 8] }}
                showGrid={true}
                movablePoints={[
                    // Vector A tip
                    {
                        initial: [ax, ay],
                        color: "#62D0AD",
                        position: [ax, ay],
                        onChange: (point: [number, number]) => {
                            const newX = Math.round(point[0] * 2) / 2;
                            const newY = Math.round(point[1] * 2) / 2;
                            setVar("vectorAx", Math.max(-4, Math.min(4, newX)));
                            setVar("vectorAy", Math.max(-4, Math.min(4, newY)));
                        },
                    },
                    // Vector B tip (positioned at end of A + B direction from origin for clarity)
                    {
                        initial: [ax + bx, ay + by],
                        color: "#8E90F5",
                        position: [ax + bx, ay + by],
                        onChange: (point: [number, number]) => {
                            // Calculate new B components based on where the tip is dragged
                            const newBx = Math.round((point[0] - ax) * 2) / 2;
                            const newBy = Math.round((point[1] - ay) * 2) / 2;
                            setVar("vectorBx", Math.max(-4, Math.min(4, newBx)));
                            setVar("vectorBy", Math.max(-4, Math.min(4, newBy)));
                        },
                    },
                ]}
                dynamicPlots={() => [
                    // Origin
                    { type: "point", x: 0, y: 0, color: "#64748b" },
                    // Vector A (from origin)
                    {
                        type: "vector",
                        tail: [0, 0],
                        tip: [ax, ay],
                        color: "#62D0AD",
                        weight: 3,
                    },
                    // Vector B (from tip of A - tip-to-tail method)
                    {
                        type: "vector",
                        tail: [ax, ay],
                        tip: [ax + bx, ay + by],
                        color: "#8E90F5",
                        weight: 3,
                    },
                    // Resultant vector (A + B)
                    {
                        type: "vector",
                        tail: [0, 0],
                        tip: [sumX, sumY],
                        color: "#F8A0CD",
                        weight: 4,
                    },
                    // Dashed parallel of B from origin (to show parallelogram)
                    {
                        type: "segment",
                        point1: [0, 0],
                        point2: [bx, by],
                        color: "#8E90F5",
                        weight: 1,
                        style: "dashed",
                    },
                    // Dashed parallel of A from tip of B
                    {
                        type: "segment",
                        point1: [bx, by],
                        point2: [sumX, sumY],
                        color: "#62D0AD",
                        weight: 1,
                        style: "dashed",
                    },
                ]}
            />
            <InteractionHintSequence
                hintKey="vector-addition-drag"
                steps={[
                    {
                        gesture: "drag",
                        label: "Drag the teal point to change vector A",
                        position: { x: "55%", y: "42%" },
                    },
                ]}
            />
            {/* Legend */}
            <div className="absolute top-3 left-3 bg-white/90 px-3 py-2 rounded text-sm space-y-1">
                <div><span className="text-[#62D0AD] font-medium">→ A</span> = ⟨{ax}, {ay}⟩</div>
                <div><span className="text-[#8E90F5] font-medium">→ B</span> = ⟨{bx}, {by}⟩</div>
                <div><span className="text-[#F8A0CD] font-medium">→ A+B</span> = ⟨{sumX}, {sumY}⟩</div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────
// Reactive Sum Display
// ─────────────────────────────────────────
function ReactiveSumX() {
    const ax = useVar("vectorAx", 2) as number;
    const bx = useVar("vectorBx", 1) as number;
    return <span className="text-[#F8A0CD] font-medium">{ax + bx}</span>;
}

function ReactiveSumY() {
    const ay = useVar("vectorAy", 1) as number;
    const by = useVar("vectorBy", 2) as number;
    return <span className="text-[#F8A0CD] font-medium">{ay + by}</span>;
}

// ─────────────────────────────────────────
// Section Blocks
// ─────────────────────────────────────────
export const vectorAdditionBlocks: ReactElement[] = [
    // Section heading
    <StackLayout key="layout-addition-heading" maxWidth="xl">
        <Block id="addition-heading" padding="md">
            <EditableH2 id="h2-addition-heading" blockId="addition-heading">
                Vector Addition
            </EditableH2>
        </Block>
    </StackLayout>,

    // Introduction
    <StackLayout key="layout-addition-intro" maxWidth="xl">
        <Block id="addition-intro" padding="sm">
            <EditableParagraph id="para-addition-intro" blockId="addition-intro">
                What happens when two forces act on an object? Or when you walk east then north? The result is a
                combination of both movements. This is{" "}
                <InlineTooltip
                    id="tooltip-vector-addition"
                    tooltip="Combining two vectors to find a single resultant vector."
                >
                    vector addition
                </InlineTooltip>
                , and there's a beautifully simple way to visualize it.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Tip-to-tail method
    <StackLayout key="layout-addition-tip-to-tail" maxWidth="xl">
        <Block id="addition-tip-to-tail" padding="sm">
            <EditableH2 id="h2-addition-tip-to-tail" blockId="addition-tip-to-tail">
                The Tip-to-Tail Method
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-addition-tip-explanation" maxWidth="xl">
        <Block id="addition-tip-explanation" padding="sm">
            <EditableParagraph id="para-addition-tip-explanation" blockId="addition-tip-explanation">
                To add two vectors graphically, place the{" "}
                <InlineSpotColor varName="vectorBx" color="#8E90F5">tail of the second vector</InlineSpotColor>{" "}
                at the{" "}
                <InlineSpotColor varName="vectorAx" color="#62D0AD">tip of the first vector</InlineSpotColor>.
                The{" "}
                <InlineSpotColor varName="answerSumX" color="#F8A0CD">resultant vector</InlineSpotColor>{" "}
                (the sum) goes from the tail of the first to the tip of the second. It's like following a path:
                walk along A, then walk along B, and the pink arrow shows where you end up!
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Interactive visualization
    <SplitLayout key="layout-addition-viz" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="addition-viz-explanation" padding="sm">
                <EditableParagraph id="para-addition-viz-explanation" blockId="addition-viz-explanation">
                    In the visualization, the{" "}
                    <InlineSpotColor varName="vectorAx" color="#62D0AD">teal arrow</InlineSpotColor>{" "}
                    is vector A = ⟨
                    <InlineScrubbleNumber
                        varName="vectorAx"
                        {...numberPropsFromDefinition(getVariableInfo("vectorAx"))}
                    />
                    ,{" "}
                    <InlineScrubbleNumber
                        varName="vectorAy"
                        {...numberPropsFromDefinition(getVariableInfo("vectorAy"))}
                    />
                    ⟩ and the{" "}
                    <InlineSpotColor varName="vectorBx" color="#8E90F5">indigo arrow</InlineSpotColor>{" "}
                    is vector B = ⟨
                    <InlineScrubbleNumber
                        varName="vectorBx"
                        {...numberPropsFromDefinition(getVariableInfo("vectorBx"))}
                    />
                    ,{" "}
                    <InlineScrubbleNumber
                        varName="vectorBy"
                        {...numberPropsFromDefinition(getVariableInfo("vectorBy"))}
                    />
                    ⟩.
                </EditableParagraph>
            </Block>
            <Block id="addition-result-explanation" padding="sm">
                <EditableParagraph id="para-addition-result-explanation" blockId="addition-result-explanation">
                    The{" "}
                    <InlineSpotColor varName="answerSumX" color="#F8A0CD">pink arrow</InlineSpotColor>{" "}
                    shows the sum A + B = ⟨<ReactiveSumX />, <ReactiveSumY />⟩. Drag the vector tips
                    to see how changing either vector affects the result. Notice the dashed lines forming
                    a parallelogram.
                </EditableParagraph>
            </Block>
        </div>
        <Block id="addition-viz" padding="sm" hasVisualization>
            <VectorAdditionViz />
        </Block>
    </SplitLayout>,

    // Component-wise addition
    <StackLayout key="layout-addition-component-heading" maxWidth="xl">
        <Block id="addition-component-heading" padding="sm">
            <EditableH2 id="h2-addition-component-heading" blockId="addition-component-heading">
                Adding Components
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-addition-component-explanation" maxWidth="xl">
        <Block id="addition-component-explanation" padding="sm">
            <EditableParagraph id="para-addition-component-explanation" blockId="addition-component-explanation">
                The graphical method is great for intuition, but for calculations, we simply add the
                corresponding components. Add the x-components together, and add the y-components together.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Addition formula
    <StackLayout key="layout-addition-formula" maxWidth="xl">
        <Block id="addition-formula" padding="sm">
            <FormulaBlock
                latex="\vec{A} + \vec{B} = \langle \scrub{vectorAx} + \scrub{vectorBx}, \scrub{vectorAy} + \scrub{vectorBy} \rangle"
                variables={scrubVarsFromDefinitions(["vectorAx", "vectorBx", "vectorAy", "vectorBy"])}
            />
        </Block>
    </StackLayout>,

    // Assessment heading
    <StackLayout key="layout-addition-assessment-heading" maxWidth="xl">
        <Block id="addition-assessment-heading" padding="sm">
            <EditableH2 id="h2-addition-assessment-heading" blockId="addition-assessment-heading">
                Check Your Understanding
            </EditableH2>
        </Block>
    </StackLayout>,

    // Question - Sum components
    <StackLayout key="layout-addition-question-sum" maxWidth="xl">
        <Block id="addition-question-sum" padding="sm">
            <EditableParagraph id="para-addition-question-sum" blockId="addition-question-sum">
                If vector A = ⟨2, 3⟩ and vector B = ⟨3, 4⟩, then A + B has x-component{" "}
                <InlineFeedback
                    varName="answerSumX"
                    correctValue="5"
                    position="mid"
                    successMessage="✓"
                    failureMessage="✗"
                    hint="Add the x-components: 2 + 3"
                >
                    <InlineClozeInput
                        varName="answerSumX"
                        correctAnswer="5"
                        {...clozePropsFromDefinition(getVariableInfo("answerSumX"))}
                    />
                </InlineFeedback>{" "}
                and y-component{" "}
                <InlineFeedback
                    varName="answerSumY"
                    correctValue="7"
                    position="terminal"
                    successMessage="— excellent! You've got the hang of component-wise addition"
                    failureMessage="— add the y-components: 3 + 4."
                    hint="Add the y-components together"
                >
                    <InlineClozeInput
                        varName="answerSumY"
                        correctAnswer="7"
                        {...clozePropsFromDefinition(getVariableInfo("answerSumY"))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
