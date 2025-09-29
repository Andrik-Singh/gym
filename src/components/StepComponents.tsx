"use client"
import { useFormContext } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { User, Target, Calendar, Dumbbell, Heart, Activity } from "lucide-react"

export function PersonalStep() {
  const { register, setValue } = useFormContext()
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
          <User className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-2xl">Personal Information</CardTitle>
        <CardDescription>Tell us about yourself to create a personalized fitness plan</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              {...register("age", { valueAsNumber: true })}
              type="number"
              placeholder="25"
              min="13"
              max="100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select onValueChange={(value) => setValue("gender", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              {...register("height", { valueAsNumber: true })}
              type="number"
              placeholder="175"
              min="100"
              max="250"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              {...register("weight", { valueAsNumber: true })}
              type="number"
              placeholder="70"
              min="30"
              max="300"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function GoalsStep() {
  const { setValue } = useFormContext()

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
          <Target className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-2xl">Fitness Goals</CardTitle>
        <CardDescription>What do you want to achieve with your fitness journey?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="goal">Primary Goal</Label>
          <Select onValueChange={(value) => setValue("goal", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your main goal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="muscle_gain">💪 Muscle Gain</SelectItem>
              <SelectItem value="fat_loss">🔥 Fat Loss</SelectItem>
              <SelectItem value="strength">⚡ Strength</SelectItem>
              <SelectItem value="endurance">🏃 Endurance</SelectItem>
              <SelectItem value="general">🎯 General Fitness</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience">Experience Level</Label>
          <Select onValueChange={(value) => setValue("experience", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Beginner</Badge>
                  <span className="text-sm text-muted-foreground">0-6 months</span>
                </div>
              </SelectItem>
              <SelectItem value="intermediate">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Intermediate</Badge>
                  <span className="text-sm text-muted-foreground">6 months - 2 years</span>
                </div>
              </SelectItem>
              <SelectItem value="advanced">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Advanced</Badge>
                  <span className="text-sm text-muted-foreground">2+ years</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}

export function HealthGoalStep() {
  const { setValue, watch } = useFormContext()
  const selectedHealthGoals = watch("healthGoals") || []

  const healthGoalOptions = [
    { id: "weight_management", label: "Weight Management", description: "Lose, gain, or maintain current weight", icon: "⚖️" },
    { id: "blood_pressure", label: "Blood Pressure Control", description: "Lower blood pressure naturally", icon: "💓" },
    { id: "diabetes_management", label: "Blood Sugar Control", description: "Improve insulin sensitivity and glucose levels", icon: "🩺" },
    { id: "cholesterol", label: "Cholesterol Management", description: "Improve cholesterol profile", icon: "🫀" },
    { id: "bone_health", label: "Bone Strength", description: "Prevent osteoporosis and improve bone density", icon: "🦴" },
    { id: "mental_health", label: "Mental Wellness", description: "Reduce stress, anxiety, and improve mood", icon: "🧠" },
    { id: "sleep_quality", label: "Better Sleep", description: "Improve sleep quality and duration", icon: "😴" },
    { id: "energy_levels", label: "Energy & Vitality", description: "Increase daily energy and reduce fatigue", icon: "⚡" },
  ]

  const handleHealthGoalChange = (goalDescription: string, checked: boolean) => {
    const current = selectedHealthGoals || []
    if (checked) {
      setValue("healthGoals", [...current, goalDescription])
    } else {
      setValue(
        "healthGoals",
        current.filter((id: string) => id !== goalDescription),
      )
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
          <Activity className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-2xl">Health Goals</CardTitle>
        <CardDescription>Select specific health outcomes you want to improve through fitness</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {healthGoalOptions.map((goal) => (
            <div
              key={goal.id}
              className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <Checkbox
                id={goal.id}
                checked={selectedHealthGoals?.includes(goal.description)}
                onCheckedChange={(checked: boolean) => handleHealthGoalChange(goal.description, checked)}
                className="mt-1"
              />
              <Label htmlFor={goal.id} className="flex-1 cursor-pointer">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-lg">{goal.icon}</span>
                  <span className="font-medium">{goal.label}</span>
                </div>
                <p className="text-sm text-muted-foreground">{goal.description}</p>
              </Label>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> These health goals will help us tailor your workout plan to support your overall wellness. 
            Always consult with healthcare professionals for medical conditions.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export function ScheduleStep() {
  const { register } = useFormContext()

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
          <Calendar className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-2xl">Workout Schedule</CardTitle>
        <CardDescription>How much time can you dedicate to your fitness?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="daysPerWeek">Days per Week</Label>
            <Input
              id="daysPerWeek"
              {...register("daysPerWeek", { valueAsNumber: true })}
              type="number"
              placeholder="3"
              min="1"
              max="7"
            />
            <p className="text-sm text-muted-foreground">Recommended: 3-5 days</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sessionDuration">Session Duration (minutes)</Label>
            <Input
              id="sessionDuration"
              {...register("sessionDuration", { valueAsNumber: true })}
              type="number"
              placeholder="60"
              min="15"
              max="180"
            />
            <p className="text-sm text-muted-foreground">Recommended: 45-90 minutes</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function EquipmentStep() {
  const { setValue, watch } = useFormContext()
  const selectedEquipment = watch("equipment") || []

  const equipmentOptions = [
    { id: "none", label: "No Equipment", icon: "🏠" },
    { id: "dumbbells", label: "Dumbbells", icon: "🏋️" },
    { id: "barbell", label: "Barbell", icon: "🏋️‍♂️" },
    { id: "bands", label: "Resistance Bands", icon: "🎯" },
    { id: "machines", label: "Gym Machines", icon: "🏢" },
  ]

  const handleEquipmentChange = (equipmentId: string, checked: boolean) => {
    const current = selectedEquipment || []
    if (checked) {
      setValue("equipment", [...current, equipmentId])
    } else {
      setValue(
        "equipment",
        current.filter((id: string) => id !== equipmentId),
      )
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
          <Dumbbell className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-2xl">Available Equipment</CardTitle>
        <CardDescription>Select all equipment you have access to</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {equipmentOptions.map((equipment) => (
            <div
              key={equipment.id}
              className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <Checkbox
                id={equipment.id}
                checked={selectedEquipment?.includes(equipment.id)}
                onCheckedChange={(checked:boolean) => handleEquipmentChange(equipment.id, checked as boolean)}
              />
              <Label htmlFor={equipment.id} className="flex items-center gap-2 cursor-pointer flex-1">
                <span className="text-lg">{equipment.icon}</span>
                <span>{equipment.label}</span>
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function InjuryStep() {
  const { register } = useFormContext()
   console.log("🩺 InjuryStep component is rendering!")
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
          <Heart className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-2xl">Health & Safety</CardTitle>
        <CardDescription>Help us keep you safe during your workouts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="injuries">Injuries or Physical Restrictions</Label>
          <Textarea
            id="injuries"
            {...register("injuries")}
            placeholder="Please describe any injuries, physical limitations, or areas of concern (e.g., lower back pain, knee issues, etc.). Leave blank if none."
            className="min-h-[120px] resize-none"
          />
          <p className="text-sm text-muted-foreground">
            This information helps us modify exercises to prevent injury and ensure your safety.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}