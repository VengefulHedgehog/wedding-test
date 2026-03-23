// src/types/index.ts

export type Step = 0 | 1 | 2;

export interface ScreenProps {
    onNext?: () => void;
    onBack?: () => void;
}

export interface FormData {
    name: string;
    attendance: 'yes' | 'no' | '';
    allergies: string;
    alcohol: string[];
}

export interface CountdownTime {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export type SpriteName = 
    | 'decor-1' 
    | 'decor-2' 
    | 'decor-3' 
    | 'decor-4' 
    | 'decor-5' 
    | 'decor-6' 
    | 'decor-7';