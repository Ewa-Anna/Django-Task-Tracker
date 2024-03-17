import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DatePicker } from '@/components/ui/shared/DatePicker'
import Loader from '@/components/ui/shared/Loader'
import { Textarea } from '@/components/ui/textarea'
import { useAuthContext } from "@/contexts/AuthContext";
import { getUserDetails, updateProfile } from '@/features/user-api/user-api'
import { ProfileFormValidationSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { z } from 'zod'

const ProfileForm:React.FC = () => {

  const {...state} = useAuthContext()
  const userId = state?.user?.user?.user_id
const {data:userProfile}=useQuery(["userDetails"],()=>getUserDetails(userId),{
  enabled: !!userId,
  
})
const {mutate,isLoading}= useMutation(updateProfile)


  const form = useForm<z.infer<typeof ProfileFormValidationSchema>>({
    resolver: zodResolver(ProfileFormValidationSchema),
    defaultValues: {
    first_name:userProfile?userProfile.first_name:'',
    last_name:userProfile?userProfile.last_name:'',
    bio:userProfile?userProfile?.profile?.bio:'xdddddddddddddd'
    },
  });

   function onSubmit(values) {

    const finalValues = {...values,id:userId}


    mutate(finalValues)
    // form.reset();

  }








useEffect(() => {
  if (userProfile) {
    const {first_name, last_name, profile } = userProfile;

    form.reset({
      first_name: first_name,
      last_name: last_name,
      bio: profile?.bio || '',
    });
  }
}, [userProfile]);


  return (
    <div className='flex-1 pl-16'>
        <h2 className='text-xl font-semibold'>Profile</h2>
        <p className='text-gray-400'>This is how others will see you on the site.</p>
          <hr className=" mt-3 h-0 border-2 border-dark-4" />


              <Form {...form}>
    

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-4/5 mt-4 ">
 
<div className='flex gap-6 justify-between'>
                                <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Firstname</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input"{...field} />
                </FormControl>
         
                <FormMessage className="shad-form_message"/>
              </FormItem>
            )}
          />
                              <FormField
                              
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Lastname</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input "{...field} />
                </FormControl>
         
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
</div>

<div className='flex gap-6 justify-between'>
           <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="shad-input">
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    <SelectItem className="cursor-pointer " value={"male"}>
                        <span className="flex gap-2">
                    Male
                        </span>
                      </SelectItem>
                      <SelectItem className="cursor-pointer " value={"female"}>
                        <span className="flex gap-2">
                     Female
                        </span>
                      </SelectItem>
            
                    </SelectContent>
                  </Select>

                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
                              <FormField
                              
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Lastname</FormLabel>
                <FormControl>
                      <DatePicker
                        onChange={(newDate) => field.onChange(newDate)}
                        minAge='18'
                        maxAge='65'
                      />
                </FormControl>
         
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
</div>
                 <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                 Bio
              </FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>

              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
  <div className=' flex justify-end'>
        <Button disabled={isLoading} className="shad-button_primary px-6" type="submit">
            {isLoading?"Loading":"Save"}
   
          </Button>
  </div>
  

        </form>
      
    </Form>

    </div>
  )
}

export default ProfileForm