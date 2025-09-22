import { z } from 'zod';

// Login validation schema
export const loginSchema = z.object({
    username: z
        .string()
        .min(1, 'Username is required')
        .min(3, 'Username must be at least 3 characters')
        .max(50, 'Username must not exceed 50 characters')
        .regex(
            /^[a-zA-Z0-9._-]+$/,
            'Username can only contain letters, numbers, dots, hyphens, and underscores'
        ),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must be at least 8 characters')
        .max(128, 'Password must not exceed 128 characters')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
            'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.'
        ),
    rememberMe: z.boolean(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Default values for the form
export const loginDefaultValues: LoginFormData = {
    username: '',
    password: '',
    rememberMe: false,
};

// Validation messages for better error handling
export const validationMessages = {
    username: {
        required: 'Username is required',
        minLength: 'Username must be at least 3 characters',
        maxLength: 'Username must not exceed 50 characters',
        pattern: 'Username can only contain letters, numbers, dots, hyphens, and underscores',
    },
    password: {
        required: 'Password is required',
        minLength: 'Password must be at least 8 characters',
        maxLength: 'Password must not exceed 128 characters',
        pattern: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.',
    },
} as const;

// Helper function for password strength checking
export const checkPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const length = password.length;

    if (length < 8) return 'weak';
    if (hasLower && hasUpper && hasNumber && hasSpecial && length >= 12) return 'strong';
    if ((hasLower && hasUpper && hasNumber) || (hasLower && hasUpper && hasSpecial) || (hasLower && hasNumber && hasSpecial) || (hasUpper && hasNumber && hasSpecial)) return 'medium';
    return 'weak';
};