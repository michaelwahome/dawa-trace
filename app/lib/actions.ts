"use server"

import {z} from "zod";
import User from "@/models/user";
import connectDB from "@/lib/mongodb";
import Company from "@/models/company";

export const isAddressUnique = async (address: String) => {
    try {
        const existingUser = await User.findOne({ address: address });
        const existingCompany = await Company.findOne({ address: address });
        return !existingUser && !existingCompany;
    } catch (error) {
        console.error('Error checking address uniqueness:', error);
        return false;
    }
};

export type SignUpState = {
    errors?: {
        firstName?: string[];
        lastName?: string[];
        dob?: string[];
        email?: string[];
        phone?: string[];
        physicalAddress?: string[];
        address?: string[];
        general?: string[];
    };
    message?: string | null;
  };

const SignUpSchema = z.object({
    firstName : z.string().refine((data) => data.trim() !== "", {message: "This field is required"}),
    lastName : z.string().refine((data) => data.trim() !== "", {message: "This field is required"}),
    dob : z.coerce.date().refine((data) => !!data, {message: "This field is required"}),
    email : z.string().email().refine((data) => data.trim() !== "", {message: "This field is required"}),
    phone : z.string()
    .refine((data) => /^(\+\d{1,})?\d+$/.test(data), { message: "Invalid phone number format (no spaces allowed)" })
    .refine((data) => data.length >= 5, {
        message: "Phone number should have at least 5 digits",
    }),
    physicalAddress : z.string(),
    address : z.string().refine((data) => data.trim() !== "", {message: "Please click on the button to connect your wallet"}),
  })
  .required()
  .partial({
    phone: true,
    physicalAddress: true,
  });

export const processSignup = async (prevState: SignUpState, formData: FormData ): Promise<SignUpState> => {
    const validatedSignUpFields = SignUpSchema.safeParse({
        firstName : formData.get("firstName"),
        lastName : formData.get("lastName"),
        dob : formData.get("dob"),
        email : formData.get("email"),
        phone : formData.get("phone"),
        physicalAddress : formData.get("physicalAddress"),
        address : formData.get("address"),
    });
    
    if (!validatedSignUpFields.success) {
        return {
            errors: validatedSignUpFields.error.flatten().fieldErrors,
            message: 'Validation failed.',
        };
    }  
      
    const  { firstName, lastName, dob, email, phone, physicalAddress, address } = validatedSignUpFields.data;

    try {
        connectDB();
    
        if (!(await isAddressUnique(address))) {
          return {
            errors: { address: ["An account with this address already exists"] },
            message: "Validation failed",
          };
        }
    
        const newUser = new User({
            firstName,
            lastName,
            dob,
            email,
            phone,
            physicalAddress,
            address
        });
    
        const savedUser = await newUser.save();
    
        return {
          errors: {},
          message: 'User created successfully.',
        };
    } catch (error) {
        return {
          errors: { general: ['Failed to create user'] },
          message: 'User creation failed.',
        };
    }
}

export type CompanyRegisterState = {
    errors?: {
        companyName?: string[];
        email?: string[];
        phone?: string[];
        physicalAddress?: string[];
        role?: string[];
        address?: string[];
        general?: string[];
    };
    message?: string | null;
  };

const CompanyRegisterSchema = z.object({
    companyName : z.string().refine((data) => data.trim() !== "", {message: "This field is required"}),
    email : z.string().email().refine((data) => data.trim() !== "", {message: "This field is required"}),
    phone : z.string()
    .refine((data) => /^(\+\d{1,})?\d+$/.test(data), { message: "Invalid phone number format (no spaces allowed)"})
    .refine((data) => data.length >= 5, {
        message: "Phone number should have at least 5 digits",
    }),
    physicalAddress : z.string().refine((data) => data.trim() !== "", { message: "This field is required" }),
    role: z.string().min(1, {message: "Please select a role"}),
    address : z.string().refine((data) => data.trim() !== "", {message: "Please click on the button to connect your wallet"}),
  })
  .required()
  .partial({
    phone: true,
  });

export const processRegisterCompany = async (prevState: CompanyRegisterState, formData: FormData ): Promise<CompanyRegisterState> => {
    const validatedCompanyRegisterFields = CompanyRegisterSchema.safeParse({
        companyName : formData.get("companyName"),
        email : formData.get("email"),
        phone : formData.get("phone"),
        physicalAddress : formData.get("physicalAddress"),
        role : formData.get("role") || "",
        address : formData.get("address"),
    });
    
    if (!validatedCompanyRegisterFields.success) {
        return {
            errors: validatedCompanyRegisterFields.error.flatten().fieldErrors,
            message: 'Validation failed.',
        };
    }  
      
    const  { companyName, email, phone, physicalAddress, role, address } = validatedCompanyRegisterFields.data;

    try {
        connectDB();
    
        if (!(await isAddressUnique(address))) {
          return {
            errors: { address: ["An account with this address already exists"] },
            message: "Validation failed",
          };
        }
    
        const newCompany = new Company({
            companyName,
            email,
            phone,
            physicalAddress,
            role,
            address
        });
    
        const savedCompany = await newCompany.save();
    
        return {
          errors: {},
          message: 'Company created successfully.',
        };
    } catch (error) {
        return {
          errors: { general: ['Failed to create company'] },
          message: 'Company creation failed.',
        };
    }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
//   try {
//     await signIn('credentials', formData);
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case 'CredentialsSignin':
//           return 'Invalid credentials.';
//         default:
//           return 'Something went wrong.';
//       }
//     }
//     throw error;
//   }
    return "Error logging in"
}