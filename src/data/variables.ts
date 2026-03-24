/**
 * Variables Configuration
 * =======================
 *
 * CENTRAL PLACE TO DEFINE ALL SHARED VARIABLES
 *
 * This file defines all variables that can be shared across sections.
 * AI agents should read this file to understand what variables are available.
 *
 * USAGE:
 * 1. Define variables here with their default values and metadata
 * 2. Use them in any section with: const x = useVar('variableName', defaultValue)
 * 3. Update them with: setVar('variableName', newValue)
 */

import { type VarValue } from '@/stores';

/**
 * Variable definition with metadata
 */
export interface VariableDefinition {
    /** Default value */
    defaultValue: VarValue;
    /** Human-readable label */
    label?: string;
    /** Description for AI agents */
    description?: string;
    /** Variable type hint */
    type?: 'number' | 'text' | 'boolean' | 'select' | 'array' | 'object' | 'spotColor' | 'linkedHighlight';
    /** Unit (e.g., 'Hz', '°', 'm/s') - for numbers */
    unit?: string;
    /** Minimum value (for number sliders) */
    min?: number;
    /** Maximum value (for number sliders) */
    max?: number;
    /** Step increment (for number sliders) */
    step?: number;
    /** Display color for InlineScrubbleNumber / InlineSpotColor (e.g. '#D81B60') */
    color?: string;
    /** Options for 'select' type variables */
    options?: string[];
    /** Placeholder text for text inputs */
    placeholder?: string;
    /** Correct answer for cloze input validation */
    correctAnswer?: string;
    /** Whether cloze matching is case sensitive */
    caseSensitive?: boolean;
    /** Background color for inline components */
    bgColor?: string;
    /** Schema hint for object types (for AI agents) */
    schema?: string;
}

/**
 * =====================================================
 * 🎯 VECTOR LESSON VARIABLES
 * =====================================================
 */
export const variableDefinitions: Record<string, VariableDefinition> = {
    // ─────────────────────────────────────────
    // SECTION 1: What is a Vector?
    // ─────────────────────────────────────────
    scalarDistance: {
        defaultValue: 5,
        type: 'number',
        label: 'Distance',
        description: 'A scalar quantity representing distance only',
        unit: 'km',
        min: 1,
        max: 10,
        step: 1,
        color: '#F7B23B',
    },
    vectorAngle: {
        defaultValue: 45,
        type: 'number',
        label: 'Direction Angle',
        description: 'The angle of the vector direction in degrees',
        unit: '°',
        min: 0,
        max: 360,
        step: 15,
        color: '#62D0AD',
    },
    vectorHighlight: {
        defaultValue: '',
        type: 'text',
        label: 'Vector Highlight',
        description: 'Active highlight for vector visualization',
    },

    // ─────────────────────────────────────────
    // SECTION 1: Assessment Questions
    // ─────────────────────────────────────────
    answerScalarVector: {
        defaultValue: '',
        type: 'select',
        label: 'Scalar or Vector Answer',
        description: 'Student answer for scalar vs vector question',
        placeholder: '???',
        correctAnswer: 'vector',
        options: ['scalar', 'vector'],
        color: '#8E90F5',
    },
    answerWhyDirection: {
        defaultValue: '',
        type: 'select',
        label: 'Why Direction Matters',
        description: 'Student answer for why direction matters',
        placeholder: '???',
        correctAnswer: 'where you end up',
        options: ['how fast you go', 'where you end up', 'how long it takes'],
        color: '#8E90F5',
    },

    // ─────────────────────────────────────────
    // SECTION 2: Representing Vectors
    // ─────────────────────────────────────────
    vectorComponentX: {
        defaultValue: 3,
        type: 'number',
        label: 'X Component',
        description: 'The horizontal component of the vector',
        min: -5,
        max: 5,
        step: 0.5,
        color: '#62D0AD',
    },
    vectorComponentY: {
        defaultValue: 4,
        type: 'number',
        label: 'Y Component',
        description: 'The vertical component of the vector',
        min: -5,
        max: 5,
        step: 0.5,
        color: '#8E90F5',
    },
    representationHighlight: {
        defaultValue: '',
        type: 'text',
        label: 'Representation Highlight',
        description: 'Active highlight for vector representation',
    },

    // ─────────────────────────────────────────
    // SECTION 2: Assessment Questions
    // ─────────────────────────────────────────
    answerMagnitude: {
        defaultValue: '',
        type: 'text',
        label: 'Magnitude Answer',
        description: 'Student answer for magnitude calculation',
        placeholder: '???',
        correctAnswer: '5',
        color: '#AC8BF9',
    },
    answerComponentForm: {
        defaultValue: '',
        type: 'select',
        label: 'Component Form Answer',
        description: 'Student answer for component form',
        placeholder: '???',
        correctAnswer: '⟨2, 3⟩',
        options: ['⟨3, 2⟩', '⟨2, 3⟩', '(2, 3)', '2 + 3'],
        color: '#AC8BF9',
    },

    // ─────────────────────────────────────────
    // SECTION 3: Vector Addition
    // ─────────────────────────────────────────
    vectorAx: {
        defaultValue: 2,
        type: 'number',
        label: 'Vector A - X',
        description: 'X component of vector A',
        min: -4,
        max: 4,
        step: 0.5,
        color: '#62D0AD',
    },
    vectorAy: {
        defaultValue: 1,
        type: 'number',
        label: 'Vector A - Y',
        description: 'Y component of vector A',
        min: -4,
        max: 4,
        step: 0.5,
        color: '#62D0AD',
    },
    vectorBx: {
        defaultValue: 1,
        type: 'number',
        label: 'Vector B - X',
        description: 'X component of vector B',
        min: -4,
        max: 4,
        step: 0.5,
        color: '#8E90F5',
    },
    vectorBy: {
        defaultValue: 2,
        type: 'number',
        label: 'Vector B - Y',
        description: 'Y component of vector B',
        min: -4,
        max: 4,
        step: 0.5,
        color: '#8E90F5',
    },
    additionHighlight: {
        defaultValue: '',
        type: 'text',
        label: 'Addition Highlight',
        description: 'Active highlight for vector addition',
    },

    // ─────────────────────────────────────────
    // SECTION 3: Assessment Questions
    // ─────────────────────────────────────────
    answerSumX: {
        defaultValue: '',
        type: 'text',
        label: 'Sum X Component',
        description: 'Student answer for sum X component',
        placeholder: '???',
        correctAnswer: '5',
        color: '#F8A0CD',
    },
    answerSumY: {
        defaultValue: '',
        type: 'text',
        label: 'Sum Y Component',
        description: 'Student answer for sum Y component',
        placeholder: '???',
        correctAnswer: '7',
        color: '#F8A0CD',
    },

    // ─────────────────────────────────────────
    // SECTION 4: Scalar Multiplication
    // ─────────────────────────────────────────
    scalarMultiplier: {
        defaultValue: 2,
        type: 'number',
        label: 'Scalar Multiplier',
        description: 'The scalar value to multiply the vector by',
        min: -3,
        max: 3,
        step: 0.5,
        color: '#F7B23B',
    },
    baseVectorX: {
        defaultValue: 2,
        type: 'number',
        label: 'Base Vector X',
        description: 'X component of the base vector',
        min: -3,
        max: 3,
        step: 0.5,
        color: '#62D0AD',
    },
    baseVectorY: {
        defaultValue: 1,
        type: 'number',
        label: 'Base Vector Y',
        description: 'Y component of the base vector',
        min: -3,
        max: 3,
        step: 0.5,
        color: '#62D0AD',
    },
    scalarHighlight: {
        defaultValue: '',
        type: 'text',
        label: 'Scalar Highlight',
        description: 'Active highlight for scalar multiplication',
    },

    // ─────────────────────────────────────────
    // SECTION 4: Assessment Questions
    // ─────────────────────────────────────────
    answerScaledX: {
        defaultValue: '',
        type: 'text',
        label: 'Scaled X Answer',
        description: 'Student answer for scaled X component',
        placeholder: '???',
        correctAnswer: '6',
        color: '#F4A89A',
    },
    answerNegativeEffect: {
        defaultValue: '',
        type: 'select',
        label: 'Negative Scalar Effect',
        description: 'Student answer for negative scalar effect',
        placeholder: '???',
        correctAnswer: 'reverses direction',
        options: ['doubles length', 'reverses direction', 'makes it zero'],
        color: '#F4A89A',
    },
};

/**
 * Get all variable names (for AI agents to discover)
 */
export const getVariableNames = (): string[] => {
    return Object.keys(variableDefinitions);
};

/**
 * Get a variable's default value
 */
export const getDefaultValue = (name: string): VarValue => {
    return variableDefinitions[name]?.defaultValue ?? 0;
};

/**
 * Get a variable's metadata
 */
export const getVariableInfo = (name: string): VariableDefinition | undefined => {
    return variableDefinitions[name];
};

/**
 * Get all default values as a record (for initialization)
 */
export const getDefaultValues = (): Record<string, VarValue> => {
    const defaults: Record<string, VarValue> = {};
    for (const [name, def] of Object.entries(variableDefinitions)) {
        defaults[name] = def.defaultValue;
    }
    return defaults;
};

/**
 * Get number props for InlineScrubbleNumber from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx, or getExampleVariableInfo(name) in exampleBlocks.tsx.
 */
export function numberPropsFromDefinition(def: VariableDefinition | undefined): {
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    color?: string;
} {
    if (!def || def.type !== 'number') return {};
    return {
        defaultValue: def.defaultValue as number,
        min: def.min,
        max: def.max,
        step: def.step,
        ...(def.color ? { color: def.color } : {}),
    };
}

/**
 * Get cloze input props for InlineClozeInput from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx, or getExampleVariableInfo(name) in exampleBlocks.tsx.
 */
/**
 * Get cloze choice props for InlineClozeChoice from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx.
 */
export function choicePropsFromDefinition(def: VariableDefinition | undefined): {
    placeholder?: string;
    color?: string;
    bgColor?: string;
} {
    if (!def || def.type !== 'select') return {};
    return {
        ...(def.placeholder ? { placeholder: def.placeholder } : {}),
        ...(def.color ? { color: def.color } : {}),
        ...(def.bgColor ? { bgColor: def.bgColor } : {}),
    };
}

/**
 * Get toggle props for InlineToggle from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx.
 */
export function togglePropsFromDefinition(def: VariableDefinition | undefined): {
    color?: string;
    bgColor?: string;
} {
    if (!def || def.type !== 'select') return {};
    return {
        ...(def.color ? { color: def.color } : {}),
        ...(def.bgColor ? { bgColor: def.bgColor } : {}),
    };
}

export function clozePropsFromDefinition(def: VariableDefinition | undefined): {
    placeholder?: string;
    color?: string;
    bgColor?: string;
    caseSensitive?: boolean;
} {
    if (!def || def.type !== 'text') return {};
    return {
        ...(def.placeholder ? { placeholder: def.placeholder } : {}),
        ...(def.color ? { color: def.color } : {}),
        ...(def.bgColor ? { bgColor: def.bgColor } : {}),
        ...(def.caseSensitive !== undefined ? { caseSensitive: def.caseSensitive } : {}),
    };
}

/**
 * Get spot-color props for InlineSpotColor from a variable definition.
 * Extracts the `color` field.
 *
 * @example
 * <InlineSpotColor
 *     varName="radius"
 *     {...spotColorPropsFromDefinition(getVariableInfo('radius'))}
 * >
 *     radius
 * </InlineSpotColor>
 */
export function spotColorPropsFromDefinition(def: VariableDefinition | undefined): {
    color: string;
} {
    return {
        color: def?.color ?? '#8B5CF6',
    };
}

/**
 * Get linked-highlight props for InlineLinkedHighlight from a variable definition.
 * Extracts the `color` and `bgColor` fields.
 *
 * @example
 * <InlineLinkedHighlight
 *     varName="activeHighlight"
 *     highlightId="radius"
 *     {...linkedHighlightPropsFromDefinition(getVariableInfo('activeHighlight'))}
 * >
 *     radius
 * </InlineLinkedHighlight>
 */
export function linkedHighlightPropsFromDefinition(def: VariableDefinition | undefined): {
    color?: string;
    bgColor?: string;
} {
    return {
        ...(def?.color ? { color: def.color } : {}),
        ...(def?.bgColor ? { bgColor: def.bgColor } : {}),
    };
}

/**
 * Build the `variables` prop for FormulaBlock from variable definitions.
 *
 * Takes an array of variable names and returns the config map expected by
 * `<FormulaBlock variables={...} />`.
 *
 * @example
 * import { scrubVarsFromDefinitions } from './variables';
 *
 * <FormulaBlock
 *     latex="\scrub{mass} \times \scrub{accel}"
 *     variables={scrubVarsFromDefinitions(['mass', 'accel'])}
 * />
 */
export function scrubVarsFromDefinitions(
    varNames: string[],
): Record<string, { min?: number; max?: number; step?: number; color?: string }> {
    const result: Record<string, { min?: number; max?: number; step?: number; color?: string }> = {};
    for (const name of varNames) {
        const def = variableDefinitions[name];
        if (!def) continue;
        result[name] = {
            ...(def.min !== undefined ? { min: def.min } : {}),
            ...(def.max !== undefined ? { max: def.max } : {}),
            ...(def.step !== undefined ? { step: def.step } : {}),
            ...(def.color ? { color: def.color } : {}),
        };
    }
    return result;
}
