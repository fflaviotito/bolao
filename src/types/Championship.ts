export interface Championship {
    id: number;
    name: string;
    division: string;
    year: string;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    createdBy: number;
    updatedAt: Date | null;
    updatedBy: number | null;
}

export interface ChampionshipCreateInput {
    name: string;
    division: string;
    year: string;
    startDate: Date;
    endDate: Date;
    createdBy: number;
}

export interface ChampionshipUpdateInput {
    id: number;
    name?: string;
    division?: string;
    year?: string;
    startDate?: Date;
    endDate?: Date;
    updatedBy: number;
}
