import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface AvailabilityItem {
  resource: string
  available: number
  total: number
}

interface NGO {
  name: string
  focus: string
  contact: string
}

const availabilityData: AvailabilityItem[] = [
  { resource: "Rescue Teams", available: 15, total: 20 },
  { resource: "Medical Supplies", available: 7500, total: 10000 },
  { resource: "Food Packages", available: 5000, total: 8000 },
  { resource: "Temporary Shelters", available: 300, total: 500 },
]

const ngoData: NGO[] = [
  { name: "Red Cross", focus: "Medical Aid", contact: "+1-800-RED-CROSS" },
  { name: "Doctors Without Borders", focus: "Healthcare", contact: "info@dwb.org" },
  { name: "World Food Programme", focus: "Food Distribution", contact: "wfp.org" },
  { name: "UNICEF", focus: "Child Welfare", contact: "unicef.org/help" },
]

export default function AvailabilityAndNGOs() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Resource Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {availabilityData.map((item) => (
              <li key={item.resource}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{item.resource}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.available} / {item.total}
                  </span>
                </div>
                <Progress value={(item.available / item.total) * 100} />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Helping NGOs and Organizations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {ngoData.map((ngo) => (
              <li key={ngo.name} className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{ngo.name}</h3>
                  <p className="text-sm text-muted-foreground">{ngo.contact}</p>
                </div>
                <Badge>{ngo.focus}</Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

