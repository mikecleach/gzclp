export interface Exercise {
    id: number;
    name: string;
    description: string;
}

export interface Routine {
    id: number;
    name: string;
    description: string;
    T1: Exercise;
    T2: Exercise;
    T3: Exercise;
}

export interface UserInterface {
    id: number;
    login: string;
    email: string;
    routines: Routine[];
}
