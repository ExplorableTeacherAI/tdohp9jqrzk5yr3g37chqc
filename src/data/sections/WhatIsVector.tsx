import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout, SplitLayout } from "@/components/layouts";
import {
    EditableH1,
    EditableH2,
    EditableParagraph,
    InlineScrubbleNumber,
    InlineClozeChoice,
    InlineFeedback,
    InlineTooltip,
    Cartesian2D,
    InteractionHintSequence,
} from "@/components/atoms";
import {
    getVariableInfo,
    numberPropsFromDefinition,
    choicePropsFromDefinition,
} from "../variables";
import { useVar, useSetVar } from "@/stores";

// ─────────────────────────────────────────
// Reactive Navigation Visualization
// ─────────────────────────────────────────
function NavigationVisualization() {
    const distance = useVar("scalarDistance", 5) as number;
    const angle = useVar("vectorAngle", 45) as number;
    const setVar = useSetVar();

    // Convert angle to radians and calculate endpoint
    const angleRad = (angle * Math.PI) / 180;
    const endX = distance * Math.cos(angleRad);
    const endY = distance * Math.sin(angleRad);

    // Destination marker (fixed)
    const destinationX = 4;
    const destinationY = 4;

    // Check if vector points to destination (within tolerance)
    const distToDestination = Math.hypot(endX - destinationX, endY - destinationY);
    const reachedDestination = distToDestination < 1;

    return (
        <div className="relative">
            <Cartesian2D
                height={380}
                viewBox={{ x: [-2, 12], y: [-2, 12] }}
                showGrid={true}
                movablePoints={[
                    {
                        initial: [endX, endY],
                        color: "#62D0AD",
                        constrain: (point: [number, number]) => {
                            // Constrain to circle of current distance
                            const mag = Math.hypot(point[0], point[1]);
                            if (mag === 0) return [distance, 0];
                            return [
                                (point[0] / mag) * distance,
                                (point[1] / mag) * distance,
                            ];
                        },
                        onChange: (point: [number, number]) => {
                            // Calculate angle from point position
                            let newAngle = Math.atan2(point[1], point[0]) * (180 / Math.PI);
                            if (newAngle < 0) newAngle += 360;
                            // Round to nearest 15 degrees
                            newAngle = Math.round(newAngle / 15) * 15;
                            setVar("vectorAngle", newAngle);
                        },
                    },
                ]}
                dynamicPlots={() => [
                    // Starting point (you are here)
                    { type: "point", x: 0, y: 0, color: "#3b82f6" },
                    // Destination flag
                    { type: "point", x: destinationX, y: destinationY, color: reachedDestination ? "#22c55e" : "#ef4444" },
                    // Vector arrow showing direction
                    {
                        type: "vector",
                        tail: [0, 0],
                        tip: [endX, endY],
                        color: "#62D0AD",
                        weight: 3,
                    },
                    // Distance circle (scalar - just magnitude)
                    {
                        type: "circle",
                        center: [0, 0],
                        radius: distance,
                        color: "#F7B23B",
                        fillOpacity: 0.05,
                        strokeStyle: "dashed",
                    },
                ]}
            />
            <InteractionHintSequence
                hintKey="navigation-direction-drag"
                steps={[
                    {
                        gesture: "drag-circular",
                        label: "Drag the teal point to change direction",
                        position: { x: "65%", y: "35%" },
                        dragPath: { type: "arc", startAngle: -45, endAngle: 45, radius: 40 },
                    },
                ]}
            />
            {/* Labels */}
            <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded text-sm">
                <span className="text-blue-500 font-medium">● You are here</span>
            </div>
            <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded text-sm">
                <span className={reachedDestination ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                    ● Destination {reachedDestination ? "(Reached!)" : ""}
                </span>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────
// Section Blocks
// ─────────────────────────────────────────
export const whatIsVectorBlocks: ReactElement[] = [
    // Title
    <StackLayout key="layout-vectors-title" maxWidth="xl">
        <Block id="vectors-title" padding="md">
            <EditableH1 id="h1-vectors-title" blockId="vectors-title">
                Understanding Vectors
            </EditableH1>
        </Block>
    </StackLayout>,

    // Introduction - The hook
    <StackLayout key="layout-vectors-intro" maxWidth="xl">
        <Block id="vectors-intro" padding="sm">
            <EditableParagraph id="para-vectors-intro" blockId="vectors-intro">
                Imagine you are lost in the wilderness and someone tells you that your camp is{" "}
                <InlineScrubbleNumber
                    varName="scalarDistance"
                    {...numberPropsFromDefinition(getVariableInfo("scalarDistance"))}
                    formatValue={(v) => `${v} km`}
                />{" "}
                away. Would you know which way to walk? That single number tells you how far, but not which direction.
                You could walk in circles at exactly that distance and never find your camp!
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Section heading
    <StackLayout key="layout-vectors-scalar-heading" maxWidth="xl">
        <Block id="vectors-scalar-heading" padding="sm">
            <EditableH2 id="h2-vectors-scalar-heading" blockId="vectors-scalar-heading">
                Scalars vs Vectors: What's the Difference?
            </EditableH2>
        </Block>
    </StackLayout>,

    // Explanation of scalar
    <StackLayout key="layout-vectors-scalar-explanation" maxWidth="xl">
        <Block id="vectors-scalar-explanation" padding="sm">
            <EditableParagraph id="para-vectors-scalar-explanation" blockId="vectors-scalar-explanation">
                A{" "}
                <InlineTooltip
                    id="tooltip-scalar"
                    tooltip="A quantity that has only magnitude (size), like temperature, mass, or speed."
                >
                    scalar
                </InlineTooltip>{" "}
                is a quantity that has only <strong>magnitude</strong> (size or amount). Think of temperature: 25°C is just a number.
                Your mass of 60 kg is just a number. The distance of {" "}
                <InlineScrubbleNumber
                    varName="scalarDistance"
                    {...numberPropsFromDefinition(getVariableInfo("scalarDistance"))}
                    formatValue={(v) => `${v} km`}
                />{" "}
                is also just a number. These quantities don't point anywhere.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Explanation of vector
    <StackLayout key="layout-vectors-vector-explanation" maxWidth="xl">
        <Block id="vectors-vector-explanation" padding="sm">
            <EditableParagraph id="para-vectors-vector-explanation" blockId="vectors-vector-explanation">
                A{" "}
                <InlineTooltip
                    id="tooltip-vector"
                    tooltip="A quantity that has both magnitude (size) AND direction, like velocity, force, or displacement."
                >
                    vector
                </InlineTooltip>{" "}
                is different. It has both <strong>magnitude AND direction</strong>. If someone says "walk 5 km <em>north</em>",
                now you know exactly where to go. That's a vector: the distance combined with a direction.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Interactive visualization
    <SplitLayout key="layout-vectors-navigation-viz" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="vectors-navigation-explanation" padding="sm">
                <EditableParagraph id="para-vectors-navigation-explanation" blockId="vectors-navigation-explanation">
                    In the visualization, you start at the blue point and need to reach the red destination. The dashed circle shows all places that are exactly{" "}
                    <InlineScrubbleNumber
                        varName="scalarDistance"
                        {...numberPropsFromDefinition(getVariableInfo("scalarDistance"))}
                        formatValue={(v) => `${v} km`}
                    />{" "}
                    away. That's what a scalar tells you: just the distance, nothing more.
                </EditableParagraph>
            </Block>
            <Block id="vectors-navigation-direction" padding="sm">
                <EditableParagraph id="para-vectors-navigation-direction" blockId="vectors-navigation-direction">
                    But the teal arrow is a vector. It shows both the distance AND the direction at{" "}
                    <InlineScrubbleNumber
                        varName="vectorAngle"
                        {...numberPropsFromDefinition(getVariableInfo("vectorAngle"))}
                        formatValue={(v) => `${v}°`}
                    />
                    . Drag the teal point around the circle to change the direction. Can you point the arrow toward the destination to turn it green?
                </EditableParagraph>
            </Block>
        </div>
        <Block id="vectors-navigation-viz" padding="sm" hasVisualization>
            <NavigationVisualization />
        </Block>
    </SplitLayout>,

    // Key insight
    <StackLayout key="layout-vectors-insight" maxWidth="xl">
        <Block id="vectors-insight" padding="sm">
            <EditableParagraph id="para-vectors-insight" blockId="vectors-insight">
                This is exactly why vectors matter in real life. When pilots navigate, they don't just need to know
                "fly 500 km". They need "fly 500 km at heading 045°". When physicists describe forces, they don't
                just say "10 newtons". They say "10 newtons to the right". The direction is just as important as the size.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Assessment heading
    <StackLayout key="layout-vectors-assessment-heading" maxWidth="xl">
        <Block id="vectors-assessment-heading" padding="sm">
            <EditableH2 id="h2-vectors-assessment-heading" blockId="vectors-assessment-heading">
                Check Your Understanding
            </EditableH2>
        </Block>
    </StackLayout>,

    // Question 1
    <StackLayout key="layout-vectors-question-scalar" maxWidth="xl">
        <Block id="vectors-question-scalar" padding="sm">
            <EditableParagraph id="para-vectors-question-scalar" blockId="vectors-question-scalar">
                A pilot reports "heading 270° at 400 km/h". This velocity is a{" "}
                <InlineFeedback
                    varName="answerScalarVector"
                    correctValue="vector"
                    position="terminal"
                    successMessage="— exactly! Velocity includes both speed (400 km/h) and direction (270°), making it a vector"
                    failureMessage="— not quite."
                    hint="Does the pilot's report include a direction?"
                >
                    <InlineClozeChoice
                        varName="answerScalarVector"
                        correctAnswer="vector"
                        options={["scalar", "vector"]}
                        {...choicePropsFromDefinition(getVariableInfo("answerScalarVector"))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Question 2
    <StackLayout key="layout-vectors-question-direction" maxWidth="xl">
        <Block id="vectors-question-direction" padding="sm">
            <EditableParagraph id="para-vectors-question-direction" blockId="vectors-question-direction">
                When giving directions, why does adding direction to a distance matter? Because direction tells you{" "}
                <InlineFeedback
                    varName="answerWhyDirection"
                    correctValue="where you end up"
                    position="terminal"
                    successMessage="— correct! Two people walking the same distance in different directions end up in completely different places"
                    failureMessage="— think about what happens if you walk 5 km north versus 5 km south."
                    hint="Think about walking the same distance in two opposite directions"
                >
                    <InlineClozeChoice
                        varName="answerWhyDirection"
                        correctAnswer="where you end up"
                        options={["how fast you go", "where you end up", "how long it takes"]}
                        {...choicePropsFromDefinition(getVariableInfo("answerWhyDirection"))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
