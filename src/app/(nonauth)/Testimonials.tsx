import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Jessica Martinez",
      position: "Personal Trainer",
      image:
        "https://images.unsplash.com/photo-1645081522795-231884bfcbfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwd29tYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTkyNDM3MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      quote:
        "FitAI helped me stay consistent with my workouts. The personalized plans adapt as I get stronger, and I love being able to save my favorite routines!",
      rating: 5,
    },
    {
      name: "David Chen",
      position: "Software Developer",
      image:
        "https://images.unsplash.com/photo-1633106485777-eaa336fb40df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc1OTMwOTMxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      quote:
        "The meal planning feature is incredible. It simplified my nutrition completely and the AI recommendations actually taste amazing!",
      rating: 5,
    },
    {
      name: "Amanda Rivera",
      position: "Fitness Enthusiast",
      image:
        "https://images.unsplash.com/photo-1544972917-3529b113a469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwdHJhaW5lciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1OTIyNjc5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      quote:
        "I've tried many fitness apps, but FitAI's progress tracking keeps me motivated. Seeing my improvements over time is so rewarding!",
      rating: 5,
    },
    {
      name: "Michael Thompson",
      position: "College Student",
      image:
        "https://images.unsplash.com/photo-1614282122912-bd77a53b11c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBzdHVkZW50JTIwc21pbGV8ZW58MXx8fHwxNzU5MzExNTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      quote:
        "As a beginner, I always felt lost at the gym. FitAI gave me simple, clear workouts and meal plans that actually fit my busy schedule.",
      rating: 5,
    },
    {
      name: "Linda Walker",
      position: "Retired Teacher",
      image:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGRlciUyMHdvbWFuJTIwc21pbGV8ZW58MXx8fHwxNzU5MzEzMjc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      quote:
        "I was nervous about starting fitness again at my age, but FitAI gave me gentle, safe routines that still challenge me. I feel healthier and more energized every week!",
      rating: 5,
    },
    {
      name: "Carlos Ramirez",
      position: "Marketing Manager & Dad",
      image:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXN5JTIwZGFkJTIwc21pbGV8ZW58MXx8fHwxNzU5MzEzMzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      quote:
        "Between work and family, I never had time to plan workouts or meals. FitAI makes it effortless — I can squeeze in a session at home and know I’m still on track.",
      rating: 5,
    },
  ];
  return (
    <div 
    id="testimonials"
    className="sm:p-10 p-0">
      <h1 className="text-center text-4xl m-4">Loved by Fitness Enthusiasts Worldwide</h1>
      <h4 className="text-center text-2xl m-4 xl:px-64 px-0">
        Join thousands who have transformed their fitness journey with FitAI&apos;s
        personalized approach
      </h4>
      <InfiniteMovingCards
        items={testimonials}
        direction="left"
        speed={"fast"}
      ></InfiniteMovingCards>
    </div>
  );
};

export default Testimonials;
