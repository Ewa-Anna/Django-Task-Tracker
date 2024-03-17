import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ContentCard= ({children})=> {
  return (
    <Card className="w-[90%]  m-auto">
      <CardHeader>
        <CardTitle>Account Email</CardTitle>
        <CardDescription>change your email</CardDescription>
      </CardHeader>
      <CardContent>
{children}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline">Save</Button>

      </CardFooter>
    </Card>
  )
}

export default ContentCard