import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Apple, Droplets, Activity, Bed, Brain, ChefHat, Clock, ExternalLink } from "lucide-react";

export function LifestyleRecommendations() {
  const recommendations = [
    {
      category: "Diet",
      icon: <Apple className="w-5 h-5" />,
      color: "bg-green-500",
      items: [
        "Reduce salt intake to less than 2,300mg per day",
        "Eat potassium-rich foods: bananas, oranges, spinach",
        "Choose whole grains over refined carbohydrates",
        "Limit alcohol to 1-2 drinks per day (if any)"
      ]
    },
    {
      category: "Hydration", 
      icon: <Droplets className="w-5 h-5" />,
      color: "bg-blue-500",
      items: [
        "Drink 8 glasses of water daily",
        "Monitor fluid intake if advised by doctor",
        "Choose water over sugary beverages",
        "Stay hydrated during physical activity"
      ]
    },
    {
      category: "Exercise",
      icon: <Activity className="w-5 h-5" />,
      color: "bg-orange-500", 
      items: [
        "Aim for 150 minutes of moderate activity weekly",
        "Start with 10-minute walks after meals",
        "Include strength training 2 days per week",
        "Consult doctor before starting new exercise routine"
      ]
    },
    {
      category: "Sleep",
      icon: <Bed className="w-5 h-5" />,
      color: "bg-purple-500",
      items: [
        "Maintain 7-9 hours of quality sleep nightly",
        "Keep consistent sleep schedule",
        "Create relaxing bedtime routine",
        "Address sleep apnea if suspected"
      ]
    },
    {
      category: "Stress Management",
      icon: <Brain className="w-5 h-5" />,
      color: "bg-pink-500",
      items: [
        "Practice deep breathing exercises daily",
        "Try meditation or mindfulness",
        "Stay connected with family and friends",
        "Consider counseling if stress is overwhelming"
      ]
    }
  ];

  const localResources = [
    {
      name: "Nairobi Heart Centre",
      type: "Specialized Care",
      contact: "+254 20 271 9000"
    },
    {
      name: "Kenya Heart Foundation",
      type: "Support Group", 
      contact: "info@kenyaheart.org"
    },
    {
      name: "Local YMCA Fitness",
      type: "Exercise Programs",
      contact: "+254 20 272 3462"
    }
  ];

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center">
          <ChefHat className="w-5 h-5 mr-2 text-secondary" />
          Lifestyle Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Daily Tip */}
        <div className="p-4 bg-gradient-secondary rounded-lg text-white">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-4 h-4" />
            <span className="font-medium">Today's Tip</span>
          </div>
          <p className="text-sm">
            Take a 10-minute walk after each meal. This simple habit can help lower blood pressure 
            and improve digestion while being easily achievable.
          </p>
        </div>

        {/* Recommendations by Category */}
        {recommendations.map((rec, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className={`p-2 rounded-full ${rec.color} text-white`}>
                {rec.icon}
              </div>
              <h4 className="font-semibold text-foreground">{rec.category}</h4>
            </div>
            
            <div className="pl-12 space-y-2">
              {rec.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-sm text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Cultural Dietary Recommendations for Kenya */}
        <div className="p-4 bg-accent/30 rounded-lg border border-primary/20">
          <h5 className="font-medium text-primary mb-3 flex items-center">
            <Apple className="w-4 h-4 mr-2" />
            Local Kenyan Heart-Healthy Foods
          </h5>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="font-medium">Vegetables:</span>
              <p className="text-muted-foreground">Sukuma wiki, spinach, kunde</p>
            </div>
            <div>
              <span className="font-medium">Fruits:</span>
              <p className="text-muted-foreground">Mangoes, bananas, avocados</p>
            </div>
            <div>
              <span className="font-medium">Grains:</span>
              <p className="text-muted-foreground">Brown ugali, millet, quinoa</p>
            </div>
            <div>
              <span className="font-medium">Proteins:</span>
              <p className="text-muted-foreground">Fish, lean chicken, beans</p>
            </div>
          </div>
        </div>

        {/* Local Resources */}
        <div className="space-y-3">
          <h5 className="font-medium text-foreground">Local Health Resources</h5>
          {localResources.map((resource, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-card rounded-lg border">
              <div>
                <p className="font-medium text-sm">{resource.name}</p>
                <p className="text-xs text-muted-foreground">{resource.type}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  if (resource.contact.includes('@')) {
                    window.open(`mailto:${resource.contact}`, '_blank');
                  } else {
                    window.open(`tel:${resource.contact}`, '_self');
                  }
                }}
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Contact
              </Button>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="p-3 bg-muted/50 rounded-lg text-center">
          <p className="text-xs text-muted-foreground">
            Always consult with your healthcare provider before making significant lifestyle changes. 
            These recommendations are general guidelines and may need to be adjusted based on your individual condition.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}