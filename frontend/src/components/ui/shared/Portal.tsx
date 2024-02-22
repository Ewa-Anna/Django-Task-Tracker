import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
   
  export function Portal({children,triggerFn,button,background}) {


        return (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                {/* <Button variant="outline">Show Dialog</Button> */}
              {button}
              </AlertDialogTrigger>
              <AlertDialogContent className={background}>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
               
                    {children}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-rose-900 border-none">Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-green-800" onClick={triggerFn}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )
    
  
  }

  export default Portal