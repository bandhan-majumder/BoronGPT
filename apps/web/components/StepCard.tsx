import React from 'react'
import { Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle, } from '@repo/ui/index'

function StepCard({ check, actionNumber, actionText }: { check: boolean; actionNumber: number; actionText: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Step {actionNumber}</CardTitle>
        <CardAction>{check ? 'Completed' : 'In Progress'}</CardAction>
      </CardHeader>
      <CardContent>
        <CardDescription>{actionText}</CardDescription>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  )
}

export default StepCard