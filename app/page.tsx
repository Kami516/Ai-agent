import AgentPulse from "@/components/AgentPulse";
import YoutubeVideoForm from "@/components/YoutubeVideoForm";
import { Brain, ImageIcon, MessageSquare, Sparkles, Video } from "lucide-react";

const features = [
  {
    title: "Ai Analysis",
    description: "Get deep insights into your video content with our advanced Ai analysis. Understand your audience better.",
    icon: Brain,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600"
  },
  {
    title: "Smart Transcription",
    description: "Get accurate transcriptions of your videos. Perfect for creating subtitles, blog posts and more.",
    icon: MessageSquare,
    iconBg: "bg-green-100",
    iconColor: "text-green-600"
  },
  {
    title: "Thumbnail Generation",
    description: "Generate eye-catching thumbnails for your videos. Increase your click-through rates.",
    icon: ImageIcon,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600"
  },
  {
    title: "Title Generation",
    description:
      "Create attention-grabbing, SEO-optimized titles for your videos using AI. Maximize views with titles that resonate with your audience.",
    icon: MessageSquare,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    title: "Shot Script",
    description:
      "Get detailed, step-by-step instructions to recreate viral videos. Learn shooting techniques, angles, and editing tips from successful content.",
    icon: Video,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    title: "Discuss with Your AI Agent",
    description:
      "Engage in deep conversations about your content strategy, brainstorm ideas, and unlock new creative possibilities with your AI agent companion.",
    icon: Sparkles,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },]

const steps = [
  {
    title: "1. Connect Your Content",
    description: "Share your YouTube video URL and let your agent get to work",
    icon: Video,
  },
  {
    title: "2. AI Agent Analysis",
    description: "Your personal agent analyzes every aspect of your content",
    icon: Brain,
  },
  {
    title: "3. Receive Intelligence",
    description: "Get actionable insights and strategic recommendations",
    icon: MessageSquare,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center gap-10 text-center mb-12">
              <AgentPulse size="large" color="blue"/>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-600 mb-6">
                Meet Your Personal{" "}
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Ai Content Agent
                </span>
              </h1>
              <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
                AgentTube is a powerful Ai tool that helps you create high quality videos in minutes.
              </p>
              <YoutubeVideoForm />
            </div>
          </div>
        </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful Ai Features for Content Creators
          </h2>
        
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Features */}
          {features.map((feature, index)=>{
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-500 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${feature.iconBg}`}
                >
                  <Icon className={`w-6 h-6 ${feature.iconColor}`}/>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            )
          })}
          </div>
        </div>
      </section>

      {/* How it works Section */}

      <section className="py-20 -bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12"> Meet Your Ai Agents in 3 Simple Steps</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-xl bg-white shadow-md hover;shadow-lg transition-all"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white"/>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-20 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <div className="text-center">
            <h2 className="text-3xl font-bold text-center text-white mb-6">
              Ready to Meet Your Ai Content Agent?
            </h2>
            <p className="text-xl text-blue-50">
              Join creatore leveraging AI to unlock content insights
            </p>
        </div>      
      </footer>
    </div>
  );
}
