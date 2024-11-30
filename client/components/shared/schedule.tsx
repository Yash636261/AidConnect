import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Appointment {
  time: string;
  User: string;
  source: string;
  avatar: string;
}

const appointments: Appointment[] = [
  {
    time: "8:00",
    User: "Esther Howard",
    source: "Facebook",
    avatar: "/placeholder.svg",
  },
  {
    time: "11:00",
    User: "Eleanor Pena",
    source: "Instagram",
    avatar: "/placeholder.svg",
  },
  {
    time: "14:00",
    User: "Brooklyn Simmons",
    source: "Twitter",
    avatar: "/placeholder.svg",
  },
];

export default function Schedule() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Complains</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {appointments.map((appointment) => (
            <div key={appointment.time} className="flex items-center">
              <div className="w-16 text-sm">{appointment.time}</div>
              <div className="flex items-center gap-4 rounded-lg border p-3 flex-1">
                <Avatar>
                  <AvatarImage src={appointment.avatar} />
                  <AvatarFallback>{appointment.User[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{appointment.User}</p>
                  <p className="text-sm text-muted-foreground">
                    {appointment.source}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
