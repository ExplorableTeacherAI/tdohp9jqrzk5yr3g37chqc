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
// Reactive Scalar Multiplication Visualization
// ─────────────────────────────────────────
function ScalarMultiplicationViz() {
    const k = useVar("scalarMultiplier", 2) as number;
    const vx = useVar("baseVectorX", 2) as number;
    const vy = useVar("baseVectorY", 1) as number;
    const setVar = useSetVar();

    // Scaled vector
    const scaledX = k * vx;
    const scaledY = k * vy;

    return (
        <div className="relative">
            <Cartesian2D
                height={400}
                viewBox={{ x: [-8, 8], y: [-8, 8] }}
                showGrid={true}
                movablePoints={[
                    // Base vector tip
                    {
                        initial: [vx, vy],
                        color: "#62D0AD",
                        position: [vx, vy],
                        onChange: (point: [number, number]) => {
                            const newX = Math.round(point[0] * 2) / 2;
                            const newY = Math.round(point[1] * 2) / 2;
                            setVar("baseVectorX", Math.max(-3, Math.min(3, newX)));
                            setVar("baseVectorY", Math.max(-3, Math.min(3, newY)));
                        },
                    },
                ]}
                dynamicPlots={() => [
                    // Origin
                    { type: "point", x: 0, y: 0, color: "#64748b" },
                    // Original vector (base)
                    {
                        type: "vector",
                        tail: [0, 0],
                        tip: [vx, vy],
                        color: "#62D0AD",
                        weight: 3,
                    },
                    // Scaled vector
                    {
                        type: "vector",
                        tail: [0, 0],
                        tip: [scaledX, scaledY],
                        color: "#F7B23B",
                        weight: 4,
                    },
                ]}
            />
            <InteractionHintSequence
                hintKey="scalar-multiplication-drag"
                steps={[
                    {
                        gesture: "drag",
                        label: "Drag the teal point to change the base vector",
                        position: { x: "60%", y: "42%" },
                    },
                ]}
            />
            {/* Legend */}
            <div className="absolute top-3 left-3 bg-white/90 px-3 py-2 rounded text-sm space-y-1">
                <div><span className="text-[#62D0AD] font-medium">→ v</span> = ⟨{vx}, {vy}⟩</div>
                <div><span className="text-[#F7B23B] font-medium">→ kv</span> = ⟨{scaledX.toFixed(1)}, {scaledY.toFixed(1)}⟩</div>
                <div className="text-slate-600">k = {k}</div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────
// Reactive Scaled Components
// ─────────────────────────────────────────
function ReactiveScaledX() {
    const k = useVar("scalarMultiplier", 2) as number;
    const vx = useVar("baseVectorX", 2) as number;
    return <span className="text-[#F7B23B] font-medium">{(k * vx).toFixed(1)}</span>;
}

function ReactiveScaledY() {
    const k = useVar("scalarMultiplier", 2) as number;
    const vy = useVar("baseVectorY", 1) as number;
    return <span className="text-[#F7B23B] font-medium">{(k * vy).toFixed(1)}</span>;
}

// ─────────────────────────────────────────
// Section Blocks
// ─────────────────────────────────────────
export const scalarMultiplicationBlocks: ReactElement[] = [
    // Section heading
    <StackLayout key="layout-scalar-heading" maxWidth="xl">
        <Block id="scalar-heading" padding="md">
            <EditableH2 id="h2-scalar-heading" blockId="scalar-heading">
                Scalar Multiplication
            </EditableH2>
        </Block>
    </StackLayout>,

    // Introduction
    <StackLayout key="layout-scalar-intro" maxWidth="xl">
        <Block id="scalar-intro" padding="sm">
            <EditableParagraph id="para-scalar-intro" blockId="scalar-intro">
                What if you want to make a vector longer, shorter, or point in the opposite direction?
                This is where{" "}
                <InlineTooltip
                    id="tooltip-scalar-mult"
                    tooltip="Multiplying a vector by a single number (scalar), which changes its length and possibly its direction."
                >
                    scalar multiplication
                </InlineTooltip>{" "}
                comes in. When we multiply a vector by a number, we scale it.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Explanation
    <StackLayout key="layout-scalar-explanation" maxWidth="xl">
        <Block id="scalar-explanation" padding="sm">
            <EditableParagraph id="para-scalar-explanation" blockId="scalar-explanation">
                Multiplying a vector by a{" "}
                <InlineSpotColor varName="scalarMultiplier" color="#F7B23B">scalar</InlineSpotColor>{" "}
                (a plain number) changes each component by that factor. If you multiply by 2, the vector
                becomes twice as long. If you multiply by 0.5, it becomes half as long. And here's the
                interesting part: if you multiply by a negative number, the vector flips direction!
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Interactive visualization
    <SplitLayout key="layout-scalar-viz" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="scalar-viz-explanation" padding="sm">
                <EditableParagraph id="para-scalar-viz-explanation" blockId="scalar-viz-explanation">
                    The{" "}
                    <InlineSpotColor varName="baseVectorX" color="#62D0AD">teal arrow</InlineSpotColor>{" "}
                    is the original vector v = ⟨
                    <InlineScrubbleNumber
                        varName="baseVectorX"
                        {...numberPropsFromDefinition(getVariableInfo("baseVectorX"))}
                    />
                    ,{" "}
                    <InlineScrubbleNumber
                        varName="baseVectorY"
                        {...numberPropsFromDefinition(getVariableInfo("baseVectorY"))}
                    />
                    ⟩. The{" "}
                    <InlineSpotColor varName="scalarMultiplier" color="#F7B23B">amber arrow</InlineSpotColor>{" "}
                    shows the result after multiplying by k ={" "}
                    <InlineScrubbleNumber
                        varName="scalarMultiplier"
                        {...numberPropsFromDefinition(getVariableInfo("scalarMultiplier"))}
                    />
                    .
                </EditableParagraph>
            </Block>
            <Block id="scalar-result-explanation" padding="sm">
                <EditableParagraph id="para-scalar-result-explanation" blockId="scalar-result-explanation">
                    The scaled vector is kv = ⟨<ReactiveScaledX />, <ReactiveScaledY />⟩. Try setting k to
                    negative values like −1 or −2 to see the vector flip direction. What happens when k = 0?
                </EditableParagraph>
            </Block>
        </div>
        <Block id="scalar-viz" padding="sm" hasVisualization>
            <ScalarMultiplicationViz />
        </Block>
    </SplitLayout>,

    // Formula
    <StackLayout key="layout-scalar-formula-heading" maxWidth="xl">
        <Block id="scalar-formula-heading" padding="sm">
            <EditableH2 id="h2-scalar-formula-heading" blockId="scalar-formula-heading">
                The Formula
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-scalar-formula-explanation" maxWidth="xl">
        <Block id="scalar-formula-explanation" padding="sm">
            <EditableParagraph id="para-scalar-formula-explanation" blockId="scalar-formula-explanation">
                To multiply a vector by a scalar, simply multiply each component by that scalar.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Scalar multiplication formula
    <StackLayout key="layout-scalar-formula" maxWidth="xl">
        <Block id="scalar-formula" padding="sm">
            <FormulaBlock
                latex="k \cdot \vec{v} = \scrub{scalarMultiplier} \cdot \langle \scrub{baseVectorX}, \scrub{baseVectorY} \rangle = \langle k \cdot x, k \cdot y \rangle"
                variables={scrubVarsFromDefinitions(["scalarMultiplier", "baseVectorX", "baseVectorY"])}
            />
        </Block>
    </StackLayout>,

    // Key insights
    <StackLayout key="layout-scalar-insights" maxWidth="xl">
        <Block id="scalar-insights" padding="sm">
            <EditableParagraph id="para-scalar-insights" blockId="scalar-insights">
                Three key things to remember: When |k| {">"} 1, the vector gets longer. When 0 {"<"} |k| {"<"} 1,
                it gets shorter. When k {"<"} 0, it flips to point in the opposite direction. The magnitude of the
                scaled vector is |k| times the original magnitude.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Assessment heading
    <StackLayout key="layout-scalar-assessment-heading" maxWidth="xl">
        <Block id="scalar-assessment-heading" padding="sm">
            <EditableH2 id="h2-scalar-assessment-heading" blockId="scalar-assessment-heading">
                Check Your Understanding
            </EditableH2>
        </Block>
    </StackLayout>,

    // Question 1 - Scaled component
    <StackLayout key="layout-scalar-question-scaled" maxWidth="xl">
        <Block id="scalar-question-scaled" padding="sm">
            <EditableParagraph id="para-scalar-question-scaled" blockId="scalar-question-scaled">
                If v = ⟨2, 4⟩ and we multiply by k = 3, the x-component of the result is{" "}
                <InlineFeedback
                    varName="answerScaledX"
                    correctValue="6"
                    position="terminal"
                    successMessage="— correct! 3 × 2 = 6"
                    failureMessage="— multiply the x-component by the scalar: 3 × 2."
                    hint="Multiply the scalar by the x-component"
                    reviewBlockId="scalar-formula"
                    reviewLabel="Review the formula"
                >
                    <InlineClozeInput
                        varName="answerScaledX"
                        correctAnswer="6"
                        {...clozePropsFromDefinition(getVariableInfo("answerScaledX"))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Question 2 - Negative scalar effect
    <StackLayout key="layout-scalar-question-negative" maxWidth="xl">
        <Block id="scalar-question-negative" padding="sm">
            <EditableParagraph id="para-scalar-question-negative" blockId="scalar-question-negative">
                When you multiply a vector by a negative scalar like −1, the vector{" "}
                <InlineFeedback
                    varName="answerNegativeEffect"
                    correctValue="reverses direction"
                    position="terminal"
                    successMessage="— exactly! Multiplying by −1 flips the vector to point the opposite way while keeping the same length"
                    failureMessage="— think about what happens in the visualization when k is negative."
                    hint="Try setting k to −1 in the visualization above"
                    reviewBlockId="scalar-viz"
                    reviewLabel="See it in the visualization"
                    visualizationHint={{
                        blockId: "scalar-viz",
                        hintKey: "feedback-negative-scalar-hint",
                        steps: [
                            {
                                gesture: "drag-horizontal",
                                label: "Scrub the k value to -1 and watch the amber arrow flip!",
                                position: { x: "50%", y: "80%" },
                            },
                        ],
                        label: "See it yourself",
                        resetVars: { scalarMultiplier: 2 },
                    }}
                >
                    <InlineClozeChoice
                        varName="answerNegativeEffect"
                        correctAnswer="reverses direction"
                        options={["doubles length", "reverses direction", "makes it zero"]}
                        {...choicePropsFromDefinition(getVariableInfo("answerNegativeEffect"))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Conclusion
    <StackLayout key="layout-scalar-conclusion" maxWidth="xl">
        <Block id="scalar-conclusion" padding="sm">
            <EditableParagraph id="para-scalar-conclusion" blockId="scalar-conclusion">
                Congratulations! You now understand the fundamentals of vectors: what they are, how to represent
                them using components, how to add them together, and how to scale them. These operations form the
                foundation for everything from physics simulations to computer graphics to machine learning.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
