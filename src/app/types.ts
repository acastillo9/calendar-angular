export type Slot = {
    day: number;
    disabled: boolean;
}

export type Event = {
    title: string;
    startDate: Date;
    endDate: Date;
}

export type EventsPerMonth = {
    [index: number]: Event[]
}