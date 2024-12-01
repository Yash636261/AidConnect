import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import ResourceCard from "./resource-card";

interface AvailabilityItem {
  resource: string;
  available: number;
  total: number;
}

interface NGO {
  name: string;
  focus: string[];
  contact: string;
  website: string;
}

const availabilityData: AvailabilityItem[] = [
  { resource: "Rescue Teams", available: 15, total: 20 },
  { resource: "Medical Supplies", available: 7500, total: 10000 },
  { resource: "Food Packages", available: 5000, total: 8000 },
  { resource: "Temporary Shelters", available: 300, total: 500 },
];

const ngoData: NGO[] = [
  {
    name: "Goonj",
    focus: ["Disaster Relief", "Rural Development"],
    contact: "+91-11-26972351",
    website: "https://goonj.org",
  },
  {
    name: "Doctors Without Borders India",
    focus: ["Healthcare", "Emergency Response"],
    contact: "+91-11-46580216",
    website: "https://www.msfindia.in",
  },
  {
    name: "Akshaya Patra Foundation",
    focus: ["Food Distribution", "Education"],
    contact: "+91-80-30143400",
    website: "https://www.akshayapatra.org",
  },
  {
    name: "Save the Children India",
    focus: ["Child Protection", "Education", "Health"],
    contact: "+91-11-42294900",
    website: "https://www.savethechildren.in",
  },
];

export default function AvailabilityAndNGOs() {
  return (
    <div className="space-y-10">
      <div className="grid gap-6 md:grid-cols-4">
        {ngoData.map((ngo) => (
          <Card
            key={ngo.name}
            className="rounded-xl shadow-md bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-900 dark:to-black "
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                {ngo.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {ngo.contact}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {ngo.focus.map((focus) => (
                  <Badge
                    key={focus}
                    className="bg-green-100 hover:bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded-full text-xs font-semibold"
                  >
                    {focus}
                  </Badge>
                ))}
              </div>
              <a
                href={ngo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Visit Website
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold mb-8">Resources</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {availabilityData.map((item) => (
            <ResourceCard
              key={item.resource}
              title={item.resource}
              available={item.available}
              total={item.total}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
