export type User = {
    username: string;
    email: string;
    password: string;
    role: 'cashier' | 'manager' | 'admin';
    createdAt: Date;
};

