import { cn } from '@/lib/utils'


const ProjectFormStepThree = ({form,formStep}) => {
  return (
    <div
    className={cn("flex flex-col gap-9 w-full max-w-5xl  min-h-[500px] max-h-[500px] ", {
      hidden:
        formStep === 1 ||
        formStep === 2 ||
        formStep === 4 ||
        formStep === 5 ||
        formStep === 6,
    })}
  >
    Select technologies
  </div>
  )
}

export default ProjectFormStepThree