"use server"

import {z} from "zod";
import User from "@/models/user";
import connectDB from "@/lib/mongodb";
import Company from "@/models/company";
import { redirect } from "next/navigation";

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

    } catch (error) {
        return {
          errors: { general: ['Failed to create user'] },
          message: 'User creation failed.',
        };
    }

    redirect(`/sessions?address=${address}&firstName=${firstName}&lastName=${lastName}&role=user`)
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
    } catch (error) {
        return {
          errors: { general: ['Failed to create company'] },
          message: 'Company creation failed.',
        };
    }

    redirect(`/sessions?address=${address}&companyName=${companyName}&role=${role}`)

}

const SignInSchema = z.object({
    address : z.string().refine((data) => data.trim() !== "", {message: "Please click on the button to connect your wallet"})
});

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
    const validatedSignInFields = SignInSchema.safeParse({
        address: formData.get("address")
    })
    
    if (!validatedSignInFields.success) {
        return "Please click on the button to connect your wallet";
    }  
      
    const  { address } = validatedSignInFields.data;

    connectDB();

    let user = await User.findOne({ address: address });
    let company = await Company.findOne({ address: address });

    if (user){
        redirect(`/sessions?address=${user.address}&firstName=${user.firstName}&lastName=${user.lastName}&role=${user.role}`)
    } else if (company){
        redirect(`/sessions?address=${company.address}&companyName=${company.companyName}&role=${company.role}`)
    } else {
        return "This wallet is not associated with any account. Click the button below to sign up!"
    }
}