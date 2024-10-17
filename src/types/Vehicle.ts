export interface Vehicle {
    id?: number;
    name: string;
    make: string;
    model: string;
    year: number;
    is_available: boolean;
    price: number;
    price_per_day: number;
    price_per_week: number;
    price_per_month: number;
    picture1: string;
    picture2?: string;
    picture3?: string;
    picture4?: string;
    created_at?: string;
    updated_at?: string;
    is_deleted?: boolean;
}


export interface VehicleDetails {
    id?: number;
    vehicle: Vehicle;
    mileage: number;
    color: string;
    is_new: boolean;
    is_automatic: boolean;
    has_air_conditioning: boolean;
    description: string;
    created_at?: string;
    updated_at?: string;
}