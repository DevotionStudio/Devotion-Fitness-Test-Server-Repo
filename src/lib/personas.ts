export type Persona = {
  id: string;
  label: string;
  profile: {
    age: number;
    heightCm: number;
    weightKg: number;
    gender?: "male" | "female" | "other";
    goal: "fat-loss" | "muscle" | "strength" | "health" | "endurance";
    level: "beginner" | "intermediate" | "advanced";
    daysPerWeek: number;
    sessionLengthMin: number;
    equipment: string[];
  };
  recentPerformance: {
    completedThisWeek: number;
    plannedThisWeek: number;
    last14DayConsistencyPct: number;
    streakDays: number;
    notableLifts: { name: string; topSetKg: number; trend: "up" | "flat" | "down"; deltaKg?: number }[];
    missedSessions: { day: string; reason?: string }[];
  };
};

export const PERSONAS: Persona[] = [
  {
    id: "returning-beginner",
    label: "Returning beginner — gym, fat loss",
    profile: {
      age: 32,
      heightCm: 178,
      weightKg: 88,
      gender: "male",
      goal: "fat-loss",
      level: "beginner",
      daysPerWeek: 4,
      sessionLengthMin: 45,
      equipment: ["Full commercial gym"],
    },
    recentPerformance: {
      completedThisWeek: 3,
      plannedThisWeek: 4,
      last14DayConsistencyPct: 75,
      streakDays: 12,
      notableLifts: [
        { name: "Goblet squat", topSetKg: 22.5, trend: "up", deltaKg: 2.5 },
        { name: "DB bench", topSetKg: 22.5, trend: "up", deltaKg: 2.5 },
      ],
      missedSessions: [{ day: "Friday", reason: "skipped" }],
    },
  },
  {
    id: "plateaued-intermediate",
    label: "Plateaued intermediate — gym, muscle",
    profile: {
      age: 28,
      heightCm: 182,
      weightKg: 81,
      gender: "male",
      goal: "muscle",
      level: "intermediate",
      daysPerWeek: 5,
      sessionLengthMin: 60,
      equipment: ["Full commercial gym"],
    },
    recentPerformance: {
      completedThisWeek: 5,
      plannedThisWeek: 5,
      last14DayConsistencyPct: 95,
      streakDays: 41,
      notableLifts: [
        { name: "Bench press", topSetKg: 100, trend: "flat" },
        { name: "Squat", topSetKg: 140, trend: "flat" },
        { name: "Deadlift", topSetKg: 170, trend: "up", deltaKg: 5 },
      ],
      missedSessions: [],
    },
  },
  {
    id: "home-mum",
    label: "Home / time-poor — minimal equipment, health",
    profile: {
      age: 38,
      heightCm: 165,
      weightKg: 68,
      gender: "female",
      goal: "health",
      level: "beginner",
      daysPerWeek: 3,
      sessionLengthMin: 30,
      equipment: ["Dumbbells (max 12.5kg)", "Bands", "Bodyweight"],
    },
    recentPerformance: {
      completedThisWeek: 1,
      plannedThisWeek: 3,
      last14DayConsistencyPct: 35,
      streakDays: 0,
      notableLifts: [
        { name: "DB row", topSetKg: 10, trend: "flat" },
        { name: "Goblet squat", topSetKg: 12.5, trend: "up", deltaKg: 2.5 },
      ],
      missedSessions: [
        { day: "Tuesday", reason: "kid sick" },
        { day: "Thursday", reason: "skipped" },
      ],
    },
  },
  {
    id: "strength-focused",
    label: "Strength-focused — home gym, intermediate",
    profile: {
      age: 41,
      heightCm: 175,
      weightKg: 92,
      gender: "male",
      goal: "strength",
      level: "intermediate",
      daysPerWeek: 4,
      sessionLengthMin: 75,
      equipment: ["Home gym (rack + bar)", "Dumbbells (max 30kg)"],
    },
    recentPerformance: {
      completedThisWeek: 4,
      plannedThisWeek: 4,
      last14DayConsistencyPct: 88,
      streakDays: 23,
      notableLifts: [
        { name: "Squat", topSetKg: 160, trend: "up", deltaKg: 2.5 },
        { name: "Bench press", topSetKg: 120, trend: "up", deltaKg: 2.5 },
        { name: "Deadlift", topSetKg: 200, trend: "flat" },
      ],
      missedSessions: [],
    },
  },
  {
    id: "stop-start",
    label: "Stop-start — gym, endurance, slipping",
    profile: {
      age: 26,
      heightCm: 170,
      weightKg: 72,
      gender: "female",
      goal: "endurance",
      level: "beginner",
      daysPerWeek: 4,
      sessionLengthMin: 45,
      equipment: ["Full commercial gym"],
    },
    recentPerformance: {
      completedThisWeek: 0,
      plannedThisWeek: 4,
      last14DayConsistencyPct: 12,
      streakDays: 0,
      notableLifts: [],
      missedSessions: [
        { day: "Monday", reason: "tired" },
        { day: "Wednesday", reason: "skipped" },
        { day: "Friday", reason: "social" },
        { day: "Saturday", reason: "skipped" },
      ],
    },
  },
];
