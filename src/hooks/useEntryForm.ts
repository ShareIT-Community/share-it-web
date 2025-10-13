import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { entryFormSchema } from 'src/modules/home/SocialLinks/schema/entryFormSchema';
import { z } from 'zod';

export type FormInputData = z.infer<typeof entryFormSchema>;

export const useEntryForm = () => {
  return useForm<FormInputData>({
    resolver: zodResolver(entryFormSchema),
    defaultValues: {
      email: '',
      age: undefined,
      firstName: '',
      lastName: '',
      phone: '',
      discord: '',
      country: '',
      otherCountry: '',
      role: '',
      stack: [],
      experience: '',
      linkedin: '',
      github: '',
      behance: '',
      website: '',
      otherNetwork: '',
      expectations: '',
    },
  });
};
